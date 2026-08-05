/**
 * xXenta AI Impact Scan - Front-end Application Controller
 */

// Optional: Set your deployed Google Cloud Function URL here
const API_ENDPOINT = ""; // e.g. "https://europe-west1-xxenta-ops.cloudfunctions.net/generate-ai-report"

let currentStep = 0;
const totalSteps = SCAN_QUESTIONS.length;
const userAnswers = {};
let scanResults = null;
let radarChartInstance = null;

document.addEventListener("DOMContentLoaded", () => {
    initWizard();
});

function initWizard() {
    renderQuestion(currentStep);
    updateProgressBar();

    document.getElementById("btn-prev").addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            renderQuestion(currentStep);
            updateProgressBar();
        }
    });

    document.getElementById("btn-next").addEventListener("click", () => {
        if (!userAnswers[SCAN_QUESTIONS[currentStep].id]) {
            alert("Selecteer alstublieft een optie om verder te gaan.");
            return;
        }

        if (currentStep < totalSteps - 1) {
            currentStep++;
            renderQuestion(currentStep);
            updateProgressBar();
        } else {
            // Show Lead Gate Modal
            openLeadModal();
        }
    });

    document.getElementById("lead-form").addEventListener("submit", (e) => {
        e.preventDefault();
        submitLeadForm();
    });
}

function updateProgressBar() {
    const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);
    document.getElementById("progress-fill").style.width = `${progressPercent}%`;
    document.getElementById("step-counter").textContent = `Vraag ${currentStep + 1} van ${totalSteps}`;
    
    const currentQ = SCAN_QUESTIONS[currentStep];
    document.getElementById("domain-indicator").textContent = `Domein: ${DOMAINS_INFO[currentQ.domain].name}`;
}

function renderQuestion(stepIndex) {
    const q = SCAN_QUESTIONS[stepIndex];
    const container = document.getElementById("question-container");

    const selectedScore = userAnswers[q.id] || null;

    let optionsHTML = "";
    q.options.forEach(opt => {
        const isSelected = selectedScore === opt.score ? "selected" : "";
        const isChecked = selectedScore === opt.score ? "checked" : "";

        optionsHTML += `
            <div class="option-item ${isSelected}" onclick="selectOption(${q.id}, ${opt.score})">
                <input type="radio" name="q_${q.id}" value="${opt.score}" class="option-radio" ${isChecked}>
                <div class="option-text-group">
                    <span class="option-label">${opt.label}</span>
                    <span class="option-desc">${opt.text}</span>
                </div>
            </div>
        `;
    });

    container.innerHTML = `
        <h2 class="question-title">${q.title}</h2>
        <div class="question-philosophy">${q.philosophy}</div>
        <p class="question-prompt">${q.question}</p>
        <div class="options-list">
            ${optionsHTML}
        </div>
    `;

    // Update Nav Button Labels
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");

    btnPrev.style.visibility = stepIndex === 0 ? "hidden" : "visible";
    
    if (stepIndex === totalSteps - 1) {
        btnNext.textContent = "Rapport Genereren";
    } else {
        btnNext.textContent = "Volgende Vraag";
    }
}

function selectOption(questionId, score) {
    userAnswers[questionId] = score;
    renderQuestion(currentStep);
}

function openLeadModal() {
    document.getElementById("lead-modal").style.display = "flex";
}

function submitLeadForm() {
    const orgName = document.getElementById("input-org").value.trim();
    const contactName = document.getElementById("input-name").value.trim();
    const email = document.getElementById("input-email").value.trim();

    if (!orgName || !contactName || !email) {
        alert("Vul alstublieft alle verplichte velden in.");
        return;
    }

    // Hide Modal & Wizard
    document.getElementById("lead-modal").style.display = "none";
    document.getElementById("wizard-card").style.display = "none";

    // Calculate Results
    scanResults = ReportEngine.calculateResults(userAnswers);

    // Render Dashboard
    renderDashboard(orgName, contactName, email);
    document.getElementById("results-card").style.display = "block";

    // Trigger Async AI Report Generation if API endpoint configured
    if (API_ENDPOINT) {
        fetchAIReport(orgName, contactName, email, scanResults);
    }
}

function renderDashboard(orgName, contactName, email) {
    // 1. Maturity Banner
    document.getElementById("res-org-name").textContent = orgName;
    document.getElementById("res-maturity-title").textContent = scanResults.maturity.level;
    document.getElementById("res-maturity-sub").textContent = scanResults.maturity.subtitle;
    document.getElementById("res-score-badge").textContent = `Score: ${scanResults.totalScore} / 55 (${scanResults.percentage}%)`;
    document.getElementById("res-maturity-desc").textContent = scanResults.maturity.description;

    // 2. Domain Scores Progress Bars
    const domainsContainer = document.getElementById("domains-grid");
    let domainsHTML = "";
    for (const [key, domain] of Object.entries(scanResults.domainScores)) {
        domainsHTML += `
            <div class="domain-card">
                <div class="domain-header">
                    <span>${domain.name}</span>
                    <span>${domain.avg}/5 (${domain.percentage}%)</span>
                </div>
                <div class="domain-bar">
                    <div class="domain-fill" style="width: ${domain.percentage}%"></div>
                </div>
            </div>
        `;
    }
    domainsContainer.innerHTML = domainsHTML;

    // 3. Render Chart.js Radar Chart
    renderRadarChart(scanResults.radarAxes);

    // 4. Strengths & Priorities
    const strengthsList = document.getElementById("list-strengths");
    strengthsList.innerHTML = scanResults.topStrengths.map(s => `
        <li style="margin-bottom: 12px;">
            <strong style="color: var(--color-accent-cyan);">${s.title}</strong> (Score: ${s.userScore}/5)<br>
            <span style="font-size: 14px; color: var(--color-text-muted);">${s.advice[s.userScore]}</span>
        </li>
    `).join("");

    const prioritiesList = document.getElementById("list-priorities");
    prioritiesList.innerHTML = scanResults.bottomPriorities.map(p => `
        <li style="margin-bottom: 12px;">
            <strong style="color: #FF6B6B;">${p.title}</strong> (Score: ${p.userScore}/5)<br>
            <span style="font-size: 14px; color: var(--color-text-muted);">${p.advice[p.userScore]}</span>
        </li>
    `).join("");

    // 5. Recognized Pattern Alert
    const patternBox = document.getElementById("pattern-alert-box");
    const pattern = scanResults.detectedPatterns[0];
    patternBox.innerHTML = `
        <div class="pattern-title">Herkend Patroon: ${pattern.title}</div>
        <div class="pattern-section-label">Interpretatie</div>
        <p style="color: var(--color-text-muted);">${pattern.interpretation}</p>
        <div class="pattern-section-label">Risico voor de Organisatie</div>
        <p style="color: var(--color-text-muted);">${pattern.risk}</p>
        <div class="pattern-section-label">Strategisch Advies</div>
        <p style="color: var(--color-accent-cyan); font-weight: 600;">${pattern.advice}</p>
    `;

    // 6. Management Summary Text
    document.getElementById("res-summary-text").innerText = scanResults.summaryText;
}

function renderRadarChart(radarAxes) {
    const ctx = document.getElementById("radarChart").getContext("2d");
    
    if (radarChartInstance) {
        radarChartInstance.destroy();
    }

    const labels = radarAxes.map(a => a.name);
    const dataValues = radarAxes.map(a => a.score);

    radarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'xXenta Impact Score (1-5)',
                data: dataValues,
                backgroundColor: 'rgba(53, 208, 247, 0.25)',
                borderColor: '#35D0F7',
                borderWidth: 2,
                pointBackgroundColor: '#FFFFFF',
                pointBorderColor: '#35D0F7',
                pointHoverBackgroundColor: '#35D0F7',
                pointHoverBorderColor: '#FFFFFF',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.15)' },
                    grid: { color: 'rgba(255, 255, 255, 0.12)' },
                    pointLabels: {
                        color: '#FFFFFF',
                        font: { size: 12, family: 'Plus Jakarta Sans', weight: '600' }
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        backdropColor: 'transparent',
                        stepSize: 1,
                        min: 0,
                        max: 5
                    }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

async function fetchAIReport(orgName, contactName, email, results) {
    const aiContainer = document.getElementById("ai-report-content");
    aiContainer.innerHTML = `<p style="color: var(--color-accent-cyan);"><em>Bezig met genereren van uw gepersonaliseerde AI-managementrapport via Google Cloud Gemini...</em></p>`;

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                organization: orgName,
                contactPerson: contactName,
                email: email,
                results: results
            })
        });

        const data = await response.json();
        if (data.success && data.report) {
            aiContainer.innerText = data.report;
        } else {
            console.warn("AI Report fallback active.");
        }
    } catch (err) {
        console.error("AI Report Endpoint Error:", err);
    }
}
