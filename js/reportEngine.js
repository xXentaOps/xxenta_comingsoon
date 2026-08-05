/**
 * xXenta AI Impact Scan - Report Engine & Calculation Logic
 * Implementation of all calculations and business rules from "AI Report Engine.pdf"
 */

class ReportEngine {
    static calculateResults(answers) {
        // answers is an object: { 1: score1, 2: score2, ..., 11: score11 }
        const scores = [];
        let totalScore = 0;

        for (let i = 1; i <= 11; i++) {
            const score = parseInt(answers[i] || 1, 10);
            scores.push({ id: i, score: score });
            totalScore += score;
        }

        // 1. Determine Maturity Level
        const maturity = MATURITY_LEVELS.find(m => totalScore >= m.minScore && totalScore <= m.maxScore) || MATURITY_LEVELS[0];

        // 2. Calculate Domain Scores
        const domainScores = {};
        for (const [key, domain] of Object.entries(DOMAINS_INFO)) {
            const domainQuestionScores = domain.questionIds.map(qid => answers[qid] || 1);
            const sum = domainQuestionScores.reduce((acc, val) => acc + val, 0);
            const avg = sum / domainQuestionScores.length;
            const percentage = Math.round((avg / 5) * 100);

            domainScores[key] = {
                name: domain.name,
                avg: parseFloat(avg.toFixed(2)),
                percentage: percentage,
                scores: domainQuestionScores
            };
        }

        // 3. Radar Chart Axes (5 Dimensions)
        const radarAxes = [
            { name: "Human Potential & Culture", ids: [1, 8, 9] },
            { name: "Operational Efficiency", ids: [2, 7] },
            { name: "Governance & Control", ids: [3, 4] },
            { name: "Mastery & Skills", ids: [5, 6] },
            { name: "Ecosystems & Readiness", ids: [10, 11] }
        ].map(axis => {
            const axisScores = axis.ids.map(qid => answers[qid] || 1);
            const avg = axisScores.reduce((a, b) => a + b, 0) / axisScores.length;
            return {
                name: axis.name,
                score: parseFloat(avg.toFixed(2)),
                percentage: Math.round((avg / 5) * 100)
            };
        });

        // 4. Strengths & Priorities
        const sortedQuestions = [...SCAN_QUESTIONS].map(q => ({
            ...q,
            userScore: answers[q.id] || 1
        })).sort((a, b) => b.userScore - a.userScore);

        // Highest 3 questions (Strengths)
        const topStrengths = sortedQuestions.slice(0, 3);
        // Lowest 3 questions (Priorities)
        const bottomPriorities = sortedQuestions.slice(-3).reverse();

        // 5. Balance & Spread Analysis
        const allScoresArray = scores.map(s => s.score);
        const maxScore = Math.max(...allScoresArray);
        const minScore = Math.min(...allScoresArray);
        const balanceSpread = maxScore - minScore;

        let balanceText = "";
        if (balanceSpread === 0) balanceText = "Zeer evenwichtige ontwikkeling. Alle dimensies bevinden zich op hetzelfde niveau.";
        else if (balanceSpread === 1) balanceText = "Goed in balans. Er zijn kleine verschillen tussen dimensies, maar de organisatie ontwikkelt zich grotendeels consistent.";
        else if (balanceSpread === 2) balanceText = "Acceptabele variatie. Sommige onderdelen lopen voor op andere. Gerichte verbeteringen kunnen de samenhang versterken.";
        else if (balanceSpread === 3) balanceText = "Duidelijke onbalans. De organisatie kent zowel sterke als achterblijvende dimensies. Prioritering is noodzakelijk.";
        else balanceText = "Kritische onbalans. Er bestaan grote verschillen in AI-volwassenheid die organisatiebrede impact en adoptie belemmeren.";

        // 6. Pattern Recognition Rules (A to G)
        const detectedPatterns = [];

        const climateAvg = domainScores.Climate.avg;
        const flowAvg = domainScores.Flow.avg;
        const growthAvg = domainScores.Growth.avg;
        const ecosystemAvg = domainScores.Ecosystem.avg;

        // Pattern A: Flow >= 4 AND Climate <= 2
        if (flowAvg >= 4 && climateAvg <= 2) {
            detectedPatterns.push({
                id: "A",
                title: "Technologie ontwikkelt zich sneller dan cultuur",
                interpretation: "De organisatie investeert zichtbaar in AI, automatisering en procesoptimalisatie, maar leiderschap, veranderkracht en psychologische veiligheid blijven achter.",
                risk: "AI-oplossingen worden technisch geïmplementeerd, maar de adoptie blijft achter doordat medewerkers onvoldoende worden meegenomen in de verandering.",
                advice: "Investeer de komende zes maanden primair in leiderschap, gedragsverandering en psychologische veiligheid voordat nieuwe AI-oplossingen worden uitgerold."
            });
        }

        // Pattern B: Growth >= 4 AND Q8 <= 2
        if (growthAvg >= 4 && (answers[8] || 1) <= 2) {
            detectedPatterns.push({
                id: "B",
                title: "Leergedreven organisatie met onzichtbaar talent",
                interpretation: "Er wordt veel geleerd, maar talentontwikkeling en de benutting van vrijgekomen capaciteit blijven onvoldoende zichtbaar.",
                risk: "Nieuwe kennis verdwijnt in de organisatie en strategische personeelsplanning blijft gebaseerd op functies in plaats van vaardigheden.",
                advice: "Investeer in een AI-ondersteund skillsprofiel en maak vaardigheden dynamisch inzichtelijk."
            });
        }

        // Pattern C: Flow >= 4 AND Q6 <= 2
        if (flowAvg >= 4 && (answers[6] || 1) <= 2) {
            detectedPatterns.push({
                id: "C",
                title: "Efficiënt maar niet effectiever",
                interpretation: "AI levert efficiëntiewinst op, maar de vrijgekomen capaciteit wordt vooral gebruikt om meer werk te verrichten in plaats van meer waarde te creëren.",
                risk: "De organisatie realiseert kostenbesparing, maar benut het strategische potentieel van AI onvoldoende.",
                advice: "Maak afspraken over de inzet van vrijgekomen tijd voor innovatie, samenwerking, klantwaarde en persoonlijke ontwikkeling."
            });
        }

        // Pattern D: Q7 <= 2 (Psychologische Veiligheid)
        if ((answers[7] || 1) <= 2) {
            detectedPatterns.push({
                id: "D",
                title: "Cultuurrem op AI-transitie",
                interpretation: "Medewerkers voelen zich onvoldoende veilig om te experimenteren, fouten te maken of AI actief te gebruiken.",
                risk: "AI blijft beperkt tot een kleine groep voorlopers en verspreidt zich niet organisatiebreed.",
                advice: "Investeer eerst in vertrouwen, leiderschap en een lerende cultuur voordat verdere AI-implementatie plaatsvindt."
            });
        }

        // Pattern E: Flow >= 4 AND Ecosystem <= 2
        if (flowAvg >= 4 && ecosystemAvg <= 2) {
            detectedPatterns.push({
                id: "E",
                title: "Eilandautomatisering",
                interpretation: "AI wordt effectief toegepast binnen afzonderlijke teams, maar kennis, standaarden en werkwijzen worden onvoldoende gedeeld.",
                risk: "De organisatie ontwikkelt meerdere losse AI-oplossingen zonder gezamenlijke strategie.",
                advice: "Ontwikkel een organisatiebreed AI-platform en stimuleer kennisdeling tussen teams."
            });
        }

        // Pattern F: Climate >= 4 AND Flow <= 2
        if (climateAvg >= 4 && flowAvg <= 2) {
            detectedPatterns.push({
                id: "F",
                title: "Gezonde cultuur, beperkte technologie",
                interpretation: "De organisatie is cultureel klaar voor AI, maar benut de technologische mogelijkheden in processen nog onvoldoende.",
                risk: "Enthousiasme dooft uit bij gebrek aan concrete AI-tools en ondersteunende infrastructuren.",
                advice: "Versnel de implementatie van AI in processen en besluitvorming."
            });
        }

        // Pattern G: Balance >= 3
        if (balanceSpread >= 3) {
            detectedPatterns.push({
                id: "G",
                title: "Onevenwichtige ontwikkeling",
                interpretation: "Enkele onderdelen behoren tot de koplopers, terwijl andere domeinen duidelijk achterblijven.",
                risk: "Achterblijvende domeinen vormen een rem op het organisatiebrede transformatieproces.",
                advice: "Richt investeringen op de zwakste schakels voordat nieuwe AI-initiatieven worden gestart."
            });
        }

        // Default pattern if none triggered
        if (detectedPatterns.length === 0) {
            detectedPatterns.push({
                id: "Balanced",
                title: "Gestructureerde AI-Groeikoers",
                interpretation: "Jouw organisatie vertoont een gebalanceerde ontwikkeling over de verschillende domeinen.",
                risk: "Pas op voor stilstand; continue stimulering van innovatie en verdieping blijft noodzakelijk.",
                advice: "Blijf de ingeslagen weg vervolgen en versterk de verbinding tussen leiderschap, cultuur en technologie."
            });
        }

        // 7. Executive Summary Text Synthesis
        const summaryText = `Uw organisatie bevindt zich in de fase **${maturity.level}** (${maturity.subtitle}) met een totale score van **${totalScore} van 55** (${Math.round((totalScore/55)*100)}%). ` +
            `De sterkste pijler ligt op **${topStrengths[0].title.replace(/^\d+\.\s*/, '')}** (score: ${topStrengths[0].userScore}/5). ` +
            `De belangrijkste ontwikkelkans ligt bij **${bottomPriorities[0].title.replace(/^\d+\.\s*/, '')}** (score: ${bottomPriorities[0].userScore}/5).\n\n` +
            `Uit de diagnose blijkt: *"${detectedPatterns[0].title}"*. ${detectedPatterns[0].interpretation} ${detectedPatterns[0].advice}`;

        return {
            totalScore,
            maxTotalScore: 55,
            percentage: Math.round((totalScore / 55) * 100),
            maturity,
            domainScores,
            radarAxes,
            topStrengths,
            bottomPriorities,
            maxScore,
            minScore,
            balanceSpread,
            balanceText,
            detectedPatterns,
            summaryText
        };
    }
}
