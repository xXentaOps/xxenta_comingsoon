/**
 * xXenta AI Impact Scan - Front-end Application Controller
 */

// Deployed Google Cloud Function URL
const API_ENDPOINT = "https://generate-ai-report-fiemy2wigq-ew.a.run.app";

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

    // Trigger Async AI Report Generation
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

    // 6. Management Summary Container (Loading state for Gemini AI generation)
    document.getElementById("res-summary-content").innerHTML = `
        <div id="ai-status-loader" style="display: flex; align-items: center; justify-content: center; gap: 12px; padding: 24px; background: rgba(53, 208, 247, 0.08); border: 1px solid rgba(53, 208, 247, 0.3); border-radius: var(--radius-md);">
            <span style="width: 10px; height: 10px; background: var(--color-accent-cyan); border-radius: 50%; box-shadow: 0 0 10px var(--color-accent-cyan); display: inline-block;"></span>
            <span style="font-size: 15px; font-weight: 600; color: var(--color-accent-cyan);">✨ AI Report Engine is een uitgebreid managementrapport aan het schrijven via Google Gemini...</span>
        </div>
    `;
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
                label: 'xXenta Score (0-5)',
                data: dataValues,
                backgroundColor: 'rgba(53, 208, 247, 0.35)',
                borderColor: '#35D0F7',
                borderWidth: 3,
                pointBackgroundColor: '#FFFFFF',
                pointBorderColor: '#35D0F7',
                pointHoverBackgroundColor: '#35D0F7',
                pointHoverBorderColor: '#FFFFFF',
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                r: {
                    min: 0,
                    max: 5,
                    suggestedMin: 0,
                    suggestedMax: 5,
                    angleLines: { color: 'rgba(255, 255, 255, 0.25)' },
                    grid: { color: 'rgba(255, 255, 255, 0.2)' },
                    pointLabels: {
                        color: '#FFFFFF',
                        font: { size: 12, family: 'Plus Jakarta Sans', weight: '700' }
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        backdropColor: 'transparent',
                        stepSize: 1,
                        showLabelBackdrop: false,
                        font: { size: 11 }
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
            const formattedHTML = formatMarkdown(data.report);
            const summaryContainer = document.getElementById("res-summary-content");
            
            summaryContainer.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <span style="font-size: 12px; background: rgba(53, 208, 247, 0.2); color: var(--color-accent-cyan); padding: 4px 12px; border-radius: 20px; font-weight: 700; border: 1px solid var(--color-accent-cyan);">
                        ✨ Gepersonaliseerd door Google Gemini AI
                    </span>
                </div>
                <div class="ai-formatted-report" style="color: var(--color-text-main); font-size: 15px; line-height: 1.7;">
                    ${formattedHTML}
                </div>
            `;
        }
    } catch (err) {
        console.error("AI Report Endpoint Error:", err);
        const loader = document.getElementById("ai-status-loader");
        if (loader) loader.style.display = "none";
    }
}

function formatMarkdown(text) {
    if (!text) return "";
    let html = text;
    
    // Strip raw code blocks ```
    html = html.replace(/```[\s\S]*?```/g, function(match) {
        return match.replace(/```/g, '').trim();
    });

    // Replace bold text
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace headings
    html = html.replace(/^### (.*$)/gim, '<h3 style="color: var(--color-accent-cyan); margin-top: 24px; margin-bottom: 10px; font-size: 18px; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 6px;">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 style="color: var(--color-accent-cyan); margin-top: 28px; margin-bottom: 12px; font-size: 20px;">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 style="color: var(--color-accent-cyan); margin-top: 30px; margin-bottom: 14px; font-size: 22px;">$1</h1>');

    // Bullet lists
    html = html.replace(/^\* (.*$)/gim, '<li style="margin-left: 20px; margin-bottom: 8px;">$1</li>');
    html = html.replace(/^- (.*$)/gim, '<li style="margin-left: 20px; margin-bottom: 8px;">$1</li>');

    // Paragraph breaks & newlines
    html = html.replace(/\n\n/g, '</p><p style="margin-bottom: 14px;">');
    html = html.replace(/\n/g, '<br>');
    html = '<p style="margin-bottom: 14px;">' + html + '</p>';
    
    return html;
}
