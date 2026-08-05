/**
 * xXenta AI Impact Scan - Questions, Principles, Domains, and Advice Data
 * Source Documents: "xXenta AI Impact Scan.pdf" & "AI Report Engine.pdf"
 */

const SCAN_QUESTIONS = [
    {
        id: 1,
        title: "1. Human Potential, AI Accelerated",
        domain: "Climate", // Cultuur & Leiderschap (Vraag 1, 7, 9)
        radarAxis: "Human Potential & Culture",
        philosophy: "Het principe: AI is er om de 'koude' (administratieve/repeterende) ruis weg te nemen, zodat de 'warme' (menselijke/empathische) wijsheid de ruimte krijgt. Organisaties groeien niet door harder te trekken aan de resultaten of aan de mensen, maar door de condities te optimaliseren waarin professionals presteren.",
        question: "Op welke manier worden administratieve en repeterende taken in jouw organisatie momenteel ondersteund of geautomatiseerd?",
        options: [
            { score: 1, label: "1 - Niet van toepassing", text: "Administratieve en repeterende taken worden volledig handmatig uitgevoerd door medewerker eventueel met behulp van daarvoor bestemde software systemen die al meer dan 2 jaar ons ondersteunen." },
            { score: 2, label: "2 - In de oriëntatiefase", text: "We verkennen de mogelijkheden om deze taken te ondersteunen of te automatiseren met AI-tools. Individueel werken medewerkers wel met AI, maar we hebben onvoldoende zicht op hoe dit gebeurt en in welke omgevingen." },
            { score: 3, label: "3 - Beginnende integratie", text: "We gebruiken incidenteel eenvoudige systemen of (AI-)tools om repetitieve taken deels te automatiseren. We hebben nog geen optimaal werkend, helder gecommuniceerd en eenduidig AI-beleid." },
            { score: 4, label: "4 - Gevorderde status", text: "Veel administratieve workflows zijn ondersteund door technologische oplossingen waaronder AI, waardoor medewerkers minder tijd kwijt zijn aan 'koude' taken. We zijn ver met ons AI-beleid." },
            { score: 5, label: "5 - Volledig geïntegreerd", text: "AI-oplossingen ondersteunen proactief in het automatiseren van repeterende taken, waardoor de focus van medewerkers structureel ligt op taken die menselijke expertise en empathie vereisen. We hebben beleid op het gebied van AI. (Welke tools, waarvoor, hoe we omgaan met veiligheid, etc.)" }
        ],
        advice: {
            1: "Breng administratieve knelpunten in kaart en identificeer processen waarin AI direct tijdwinst kan opleveren.",
            2: "Start met AI-ondersteuning voor eenvoudige, terugkerende werkzaamheden en meet de behaalde tijdwinst.",
            3: "Breid automatisering uit naar ketenprocessen zodat medewerkers meer ruimte krijgen voor klantwaarde en samenwerking.",
            4: "Optimaliseer processen continu op basis van AI-inzichten en elimineer resterende administratieve belasting.",
            5: "Gebruik de vrijgekomen capaciteit voor innovatie, kwaliteit en strategische verbetering van de organisatie."
        }
    },
    {
        id: 2,
        title: "2. Learning as a Pulse",
        domain: "Flow", // Werk & Processen (Vraag 2, 4, 6)
        radarAxis: "Operational Efficiency & Cognitive Support",
        philosophy: "Het principe: Leren is geen statische gebeurtenis (cursus/diploma), maar een continue stroom (puls) tijdens het werk zelf.",
        question: "Hoe is de toegang tot trainingen, cursussen, opleidingen en andere kennisondersteuning georganiseerd binnen jouw organisatie?",
        options: [
            { score: 1, label: "1 - Niet van toepassing", text: "Leren vindt hoofdzakelijk plaats via geplande, losstaande momenten (zoals klassikale trainingen of e-learning modules)." },
            { score: 2, label: "2 - In de oriëntatiefase", text: "We verkennen manieren om leren meer te koppelen aan het dagelijkse werk, maar het blijft grotendeels een separate activiteit." },
            { score: 3, label: "3 - Beginnende integratie", text: "We bieden naast reguliere trainingen ook al ondersteunende materialen aan die op de werkvloer beschikbaar zijn." },
            { score: 4, label: "4 - Gevorderde status", text: "Leren en werken zijn in belangrijke mate geïntegreerd; medewerkers hebben toegang tot kennis op het moment dat ze deze nodig hebben." },
            { score: 5, label: "5 - Volledig geïntegreerd", text: "Leren is een continu proces ('pulse') dat volledig is verweven met de dagelijkse werkzaamheden; ondersteuning is altijd direct beschikbaar in de workflow." }
        ],
        advice: {
            1: "Verplaats leren van losse trainingen naar de dagelijkse praktijk.",
            2: "Zorg dat medewerkers tijdens het werk eenvoudig toegang krijgen tot kennis en ondersteuning.",
            3: "Integreer AI als leercoach die medewerkers ondersteunt op het moment dat kennis nodig is.",
            4: "Maak leren adaptief door AI persoonlijke feedback en ontwikkeladviezen te laten geven.",
            5: "Gebruik de leerdata om organisatiebreed continu leren en kennisontwikkeling te versnellen."
        }
    },
    {
        id: 3,
        title: "3. Human-in-the-Loop",
        domain: "Growth", // Leren & Talent (Vraag 3, 5, 8)
        radarAxis: "Governance Compliance & Control",
        philosophy: "Het principe: AI is een adviseur, maar de mens blijft de regisseur van het werk en de eigenaar van de groei.",
        question: "In welke mate hebben medewerkers controle behouden over output van AI?",
        options: [
            { score: 1, label: "1 - Niet van toepassing", text: "We hebben geen AI. Of we hebben AI die voor ons autonoom beslissingen neemt en taken uitvoert zonder dat menselijke check nodig is." },
            { score: 2, label: "2 - In de oriëntatiefase", text: "We erkennen het risico van de 'black box'-output, waarbij de uitkomst als leidraad genomen wordt. Maar er zijn nog geen vaste procedures of technische ingewikkeldheden om menselijke autorisatie te verplichten. Het is simpelweg misschien ook niet nodig geweest tot dusver." },
            { score: 3, label: "3 - Beginnende integratie", text: "Bij kritische processen of adviezen moet een medewerker handmatig akkoord geven (human-in-the-loop), al is dit nog een losse controlemaatregel zonder structurele borging." },
            { score: 4, label: "4 - Gevorderde status", text: "Onze workflows zijn zo ingericht dat AI gedetailleerde voorstellen of simulaties levert, waarbij de professional actief wordt geprikkeld om kritisch te duiden en bewust de eindbeslissing te nemen." },
            { score: 5, label: "5 - Volledig geïntegreerd", text: "Door 'human-in-the-loop by design' is de professional te allen tijde de volledige eigenaar van besluitvorming; het systeem stimuleert actieve reflectie en professionele autonomie in plaats van blinde opvolging. AI ondersteunt en adviseert. Niet meer en niet minder." }
        ],
        advice: {
            1: "Positioneer AI als hulpmiddel voor ontwikkeling, niet als vervanging van menselijk denken.",
            2: "Stimuleer medewerkers om AI kritisch te gebruiken en eigen afwegingen te blijven maken.",
            3: "Ontwikkel AI-toepassingen die reflectie, feedback en probleemoplossend vermogen versterken.",
            4: "Maak kritisch denken, feedback en experimenteren onderdeel van het dagelijkse werk.",
            5: "Blijf AI inzetten als sparringpartner die vakmanschap versterkt zonder autonomie weg te nemen."
        }
    },
    {
        id: 4,
        title: "4. Safety-by-Design",
        domain: "Flow", // Werk & Processen (Vraag 2, 4, 6)
        radarAxis: "Governance Compliance & Control",
        philosophy: "Het principe: Privacy, eerlijkheid en ethiek zijn de basis van alles wat we bouwen, volledig conform de EU AI Act.",
        question: "Hoe is de veiligheid, databescherming en naleving van wet- en regelgeving rondom AI binnen jullie organisatie of team verankerd?",
        options: [
            { score: 1, label: "1 - Niet van toepassing", text: "Er wordt experimenteel gewerkt met AI-tools zonder centraal beleid rondom data-eigendom, privacy of ethische kaders." },
            { score: 2, label: "2 - In de oriëntatiefase", text: "Er is bewustwording over risico's zoals privacy-lekken en bias, maar er ontbreken concrete richtlijnen of gecontroleerde systemen om dit te toetsen." },
            { score: 3, label: "3 - Beginnende integratie", text: "We hanteren basisregels voor gegevensbescherming (AVG), we gebruiken goedgekeurde tools. maar de toepassing op het gebied van de EU AI Act is nog ad-hoc." },
            { score: 4, label: "4 - Gevorderde status", text: "Onze AI-toepassingen en datastromen voldoen aan strikte veiligheidscriteria's. Risico's op bias en foutieve outputs worden actief gemonitord en afgedekt." },
            { score: 5, label: "5 - Volledig geïntegreerd", text: "Veiligheid is volledig ingebouwd door 'safety-by-design'. Databeveiliging, ethische transparantie en volledige compliance met de EU AI Act en AVG staan aan de basis van ons AI-gebruik." }
        ],
        advice: {
            1: "Begin met het beschikbaar maken van betrouwbare data als basis voor betere beslissingen.",
            2: "Integreer systemen zodat informatie eenvoudiger beschikbaar komt voor medewerkers.",
            3: "Gebruik AI om inzichten en analyses beschikbaar te maken tijdens het dagelijkse werk.",
            4: "Ontwikkel contextgerichte beslissingsondersteuning waarmee AI actief suggesties doet.",
            5: "Gebruik AI voorspellend om risico's, kansen en afwijkingen vroegtijdig zichtbaar te maken."
        }
    },
    {
        id: 5,
        title: "5. Verified Mastery",
        domain: "Growth", // Leren & Talent (Vraag 3, 5, 8)
        radarAxis: "Mastery Skills & Learning",
        philosophy: "Het principe: Vakmanschap wordt bewezen door real-time prestaties en continue data, niet door verouderde diploma's.",
        question: "Hoe valideert jouw organisatie momenteel de competenties en het vakmanschap van medewerkers?",
        options: [
            { score: 1, label: "1 - Niet van toepassing", text: "We vertrouwen op behaalde diploma's, certificaten en statische kwalificaties." },
            { score: 2, label: "2 - In de oriëntatiefase", text: "Naast diploma's, certificaten en statische kwalificaties erkennen we de waarde van praktijkervaring, maar dit wordt nog niet systematisch vastgelegd." },
            { score: 3, label: "3 - Beginnende integratie", text: "We combineren diploma's met incidentele praktijktoetsen of functioneringsgesprekken." },
            { score: 4, label: "4 - Gevorderde status", text: "We leggen prestaties in de praktijk structureel vast als onderdeel van de professionele ontwikkeling." },
            { score: 5, label: "5 - Volledig geïntegreerd", text: "Vakmanschap wordt continu gevalideerd op basis van real-time prestatiedata en digitale bewijzen van competenties in de dagelijkse werkpraktijk." }
        ],
        advice: {
            1: "Breng kennis, vaardigheden en talenten centraal in beeld.",
            2: "Maak vaardigheden inzichtelijk naast diploma's en functies.",
            3: "Bouw een dynamisch skillsprofiel waarin ontwikkeling zichtbaar wordt.",
            4: "Gebruik AI om vaardigheden automatisch actueel te houden en ontwikkelkansen zichtbaar te maken.",
            5: "Gebruik het AI-skillsprofiel voor strategische personeelsplanning, loopbaanontwikkeling en teamsamenstelling."
        }
    },
    {
        id: 6,
        title: "6. Cognitive Partnership",
        domain: "Flow", // Werk & Processen (Vraag 2, 4, 6)
        radarAxis: "Mastery Skills & Learning",
        philosophy: "Het principe: AI fungeert als een intelligent kompas voor sense-making, oordeelsvorming en actie, niet als statische opslagplaats.",
        question: "Op welke manier ondersteunen de huidige digitale hulpmiddelen jouw medewerkers bij complexe taken en besluitvorming?",
        options: [
            { score: 1, label: "1 - Niet van toepassing", text: "Onze tools zijn primair opslagplaatsen voor informatie of content (zoals statische documenten of databases)." },
            { score: 2, label: "2 - In de oriëntatiefase", text: "We verkennen hoe AI hulpmiddelen medewerkers kunnen helpen bij het verwerken van informatie." },
            { score: 3, label: "3 - Beginnende integratie", text: "We gebruiken tools die medewerkers ondersteunen bij het vinden van relevante informatie of het structureren van data." },
            { score: 4, label: "4 - Gevorderde status", text: "Onze systemen bieden actieve ondersteuning bij het maken van afwegingen (bijv. door scenario's of adviezen te genereren)." },
            { score: 5, label: "5 - Volledig geïntegreerd", text: "Onze AI-technologie fungeert als een volwaardige 'cognitive partner' die medewerkers helpt bij het scherpen van hun oordeelsvorming, het verrijken van hun sense-making en het nemen van onderbouwde beslissingen in de praktijk." }
        ],
        advice: {
            1: "Meet waar AI tijd bespaart en bepaal hoe deze tijd waardevol kan worden ingezet.",
            2: "Maak afspraken over het benutten van vrijgekomen tijd voor samenwerking en klantwaarde.",
            3: "Stimuleer teams om AI-tijd bewust te investeren in innovatie en creativiteit.",
            4: "Maak de inzet van vrijgekomen tijd onderdeel van teamdoelen en leiderschapsgesprekken.",
            5: "Gebruik de extra ruimte structureel voor innovatie, persoonlijke ontwikkeling en duurzame waardecreatie."
        }
    },
    {
        id: 7,
        title: "7. Psychologische Veiligheid & Veranderkracht",
        domain: "Climate", // Cultuur & Leiderschap (Vraag 1, 7, 9)
        radarAxis: "Human Potential & Culture",
        philosophy: "Het principe: Transformatie slaagt wanneer professionals zich veilig voelen om de regie (deels) aan de techniek over te dragen en te experimenteren met nieuwe werkwijzen.",
        question: "Hoe wordt er binnen jouw organisatie omgegaan met de menselijke kant van de AI-transitie en de eventuele weerstand die hierbij kan ontstaan?",
        options: [
            { score: 1, label: "1 - Niet van toepassing", text: "Er is bij ons nooit weerstand op verandering." },
            { score: 2, label: "2 - In de oriëntatiefase", text: "We verkennen hoe we medewerkers beter kunnen betrekken bij verandering." },
            { score: 3, label: "3 - Beginnende integratie", text: "Er is ruimte voor vragen en feedback over nieuwe werkwijzen. Ook laten we medewerkers meedenken. Het is hierbij soms nog onvoldoende volledig duidelijk wat er gedaan wordt / is met input en waar medewerkers nog invloed op hebben." },
            { score: 4, label: "4 - Gevorderde status", text: "We maken weerstand bespreekbaar en we communiceren duidelijk over wat in verandering al wel bekend is en welke informatie nog komt en wanneer men dit kan verwachten. Ook zijn we duidelijk waar medewerkers nog invloed op kunnen denken en waar niet over." },
            { score: 5, label: "5 - Volledig geïntegreerd", text: "Medewerkers worden actief gefaciliteerd in hun veranderproces. Er is een cultuur waarin medewerkers zich veilig voelen om te experimenteren en fouten te maken tijdens veranderingen." }
        ],
        advice: {
            1: "Ontwikkel een gezamenlijke AI-visie en maak eigenaarschap expliciet.",
            2: "Verbind losse AI-pilots aan de organisatiedoelen en leer van de eerste ervaringen.",
            3: "Ontwikkel een organisatiebrede AI-roadmap waarin technologie, leiderschap en verandering samenkomen.",
            4: "Richt een continue verbetercyclus in waarin AI-implementatie actief wordt gemonitord en bijgestuurd.",
            5: "Gebruik veranderkracht als strategisch concurrentievoordeel en blijf de organisatie continu vernieuwen."
        }
    },
    {
        id: 8,
        title: "8. Cognitieve Ontlasting & Talentinzicht",
        domain: "Growth", // Leren & Talent (Vraag 3, 5, 8)
        radarAxis: "Human Potential & Culture",
        philosophy: "Het principe: AI is er om de 'koude' ruis weg te nemen, waardoor er ruimte ontstaat voor 'warme' wijsheid en empathie.",
        question: "In hoeverre helpt technologie om mentale capaciteit vrij te maken voor taken die menselijke expertise vereisen?",
        options: [
            { score: 1, label: "1 - Niet van toepassing", text: "Medewerkers zijn zelf verantwoordelijk voor hun administratieve lasten." },
            { score: 2, label: "2 - In de oriëntatiefase", text: "We verkennen hoe we administratieve druk kunnen verlagen." },
            { score: 3, label: "3 - Beginnende integratie", text: "Er zijn eenvoudige AI-automatiseringen die een deel van de belasting wegnemen. Vaak is dit ontstaan vanuit individuele initiatieven." },
            { score: 4, label: "4 - Gevorderde status", text: "AI-ondersteuning is georganiseerd ter ondersteuning van de gehele organisatie en vermindert de dagelijkse cognitieve belasting." },
            { score: 5, label: "5 - Volledig geïntegreerd", text: "AI-oplossingen nemen routinematige taken over, met maximale focus op mensgerichte interventies." }
        ],
        advice: {
            1: "Creëer een cultuur waarin experimenteren en fouten maken bespreekbaar zijn.",
            2: "Stimuleer leiders om actief ruimte te geven voor vragen, feedback en AI-experimenten.",
            3: "Deel successen en geleerde lessen zodat teams van elkaar leren.",
            4: "Maak psychologische veiligheid een vast onderdeel van leiderschap en teamontwikkeling.",
            5: "Gebruik de open leercultuur als versneller voor innovatie en continue verbetering."
        }
    },
    {
        id: 9,
        title: "9. Regie & Eigenaarschap",
        domain: "Climate", // Cultuur & Leiderschap (Vraag 1, 7, 9)
        radarAxis: "Ecosystems & Future Readiness",
        philosophy: "Het principe: De mens blijft de regisseur van het werk en de eigenaar van de groei; AI adviseert en ondersteunt, maar neemt de autonomie niet over.",
        question: "Hoe is de balans tussen technologische sturing en professionele autonomie ingericht?",
        options: [
            { score: 1, label: "1 - Niet van toepassing", text: "Werkprocessen worden volledig gedicteerd door starre systemen." },
            { score: 2, label: "2 - In de oriëntatiefase", text: "We verkennen hoe we meer ruimte voor autonomie kunnen inbouwen." },
            { score: 3, label: "3 - Beginnende integratie", text: "Er is enige flexibiliteit in het opvolgen van systeemadviezen." },
            { score: 4, label: "4 - Gevorderde status", text: "Professionals kunnen systeemadviezen structureel toetsen aan hun eigen oordeel." },
            { score: 5, label: "5 - Volledig geïntegreerd", text: "Professionals behouden de volledige regie en gebruiken AI als instrument voor eigen groei." }
        ],
        advice: {
            1: "Ontwikkel een gezamenlijke visie op leiderschap in het AI-tijdperk.",
            2: "Investeer in leiderschapsontwikkeling rondom vertrouwen, autonomie en AI.",
            3: "Veranker de nieuwe leiderschapsprincipes organisatiebreed en ondersteun leiders met AI-inzichten.",
            4: "Maak leiderschap voorspellend. Gebruik AI om signalen vroegtijdig zichtbaar te maken.",
            5: "Gebruik het sterke leiderschapsklimaat als voorbeeld voor de rest van de organisatie."
        }
    },
    {
        id: 10,
        title: "10. Ethische Verantwoordelijkheid & Compliance",
        domain: "Ecosystem", // Organisatie & Ecosystem (Vraag 10, 11)
        radarAxis: "Ecosystems & Future Readiness",
        philosophy: "Het principe: Privacy, ethiek en transparantie (o.a. EU AI Act) vormen de basis van elk systeem; techniek is nooit belangrijker dan menselijke waarden.",
        question: "Hoe is de ethische toetsing en juridische borging van AI-toepassingen geregeld?",
        options: [
            { score: 1, label: "1 - Niet van toepassing", text: "Er is geen specifiek beleid voor ethiek bij de inzet van AI." },
            { score: 2, label: "2 - In de oriëntatiefase", text: "We verkennen hoe we ethische kaders kunnen opstellen." },
            { score: 3, label: "3 - Beginnende integratie", text: "Er zijn basisafspraken over ethiek en privacy." },
            { score: 4, label: "4 - Gevorderde status", text: "Ethische toetsing is een vast onderdeel van innovatietrajecten." },
            { score: 5, label: "5 - Volledig geïntegreerd", text: "Ethische kaders en compliancestandaarden zijn integraal ingebed in de organisatie." }
        ],
        advice: {
            1: "Maak kennis centraal toegankelijk en voorkom afhankelijkheid van individuele experts.",
            2: "Ontsluit bestaande kennis met AI zodat informatie sneller vindbaar wordt.",
            3: "Stimuleer kennisdeling tussen teams, locaties en disciplines.",
            4: "Verbind interne en externe expertise via AI-ondersteunde kennisnetwerken.",
            5: "Ontwikkel een zelflerend kennis-ecosysteem waarin expertise continu beschikbaar en verrijkt wordt."
        }
    },
    {
        id: 11,
        title: "11. Continue Dialoog",
        domain: "Ecosystem", // Organisatie & Ecosystem (Vraag 10, 11)
        radarAxis: "Ecosystems & Future Readiness",
        philosophy: "Het principe: AI-implementatie is geen project met een einddatum, maar een permanente dialoog tussen techniek, mens en cultuur.",
        question: "Hoe wordt de interactie tussen mens en AI gemonitord en bijgestuurd in de praktijk?",
        options: [
            { score: 1, label: "1 - Niet van toepassing", text: "Implementaties worden eenmalig uitgevoerd zonder verdere evaluatie." },
            { score: 2, label: "2 - In de oriëntatiefase", text: "We verkennen manieren om feedback op AI-gebruik te verzamelen." },
            { score: 3, label: "3 - Beginnende integratie", text: "Er zijn periodieke evaluatiemomenten over het gebruik van AI." },
            { score: 4, label: "4 - Gevorderde status", text: "Er is een actieve feedbackloop tussen medewerkers en techniekontwikkelaars." },
            { score: 5, label: "5 - Volledig geïntegreerd", text: "Er is een continue dialoog waarbij de werking van AI constant wordt getoetst aan de behoefte en het welzijn van professionals." }
        ],
        advice: {
            1: "Ontwikkel een organisatiebrede visie op AI waarin mens, cultuur en technologie samenkomen.",
            2: "Verbind bestaande AI-initiatieven tot één gezamenlijke aanpak.",
            3: "Integreer AI in processen, leiderschap en organisatieontwikkeling.",
            4: "Maak AI een vanzelfsprekend onderdeel van strategie, besluitvorming en samenwerking.",
            5: "Blijf het volledige ecosysteem continu optimaliseren zodat de organisatie zich blijvend kan aanpassen."
        }
    }
];

const MATURITY_LEVELS = [
    {
        minScore: 11,
        maxScore: 20,
        level: "AI Starter",
        subtitle: "Bewustwording & Verkenning",
        description: "Jouw organisatie bevindt zich in de verkenningsfase. Er is eerste bewustwording rondom de mogelijkheden van AI, maar toepassingen zijn nog ad-hoc of niet ingebed. Focus ligt op het creëren van visie, basisvoorwaarden en eerste leerervaringen."
    },
    {
        minScore: 21,
        maxScore: 30,
        level: "AI Explorer",
        subtitle: "Experimenteren & Pilots",
        description: "Jouw organisatie experimenteert actief op kleine schaal. Medewerkers ontdekken individueel of in pilots de mogelijkheden van AI. De volgende stap is het verbinden van deze losse initiatieven aan organisatiedoelen en structureel beleid."
    },
    {
        minScore: 31,
        maxScore: 40,
        level: "AI Accelerator",
        subtitle: "Schaalvergroting & Integratie",
        description: "AI wordt op meerdere plekken succesvol ingezet en levert aantoonbare waarde op in het dagelijkse werk. Er is een solide basis. De uitdaging is nu om de samenhang te versterken tussen leiderschap, cultuur en techniek."
    },
    {
        minScore: 41,
        maxScore: 49,
        level: "AI Transformer",
        subtitle: "Organisatiebreed Geïntegreerd",
        description: "AI is organisatiebreed ingebed in workflows, leiderschap en leercultuur. Mens en technologie versterken elkaar duurzaam. De focus ligt op het bewaken van ethische kaders en het verder aanscherpen van professionele autonomie."
    },
    {
        minScore: 50,
        maxScore: 55,
        level: "AI-Native Leader",
        subtitle: "Onderdeel van het DNA",
        description: "Jouw organisatie behoort tot de absolute koplopers. AI is een vanzelfsprekend onderdeel van strategie, vakmanschap en cultuur. Het ecosysteem leert zichzelf continu aan op basis van real-time inzichten."
    }
];

const DOMAINS_INFO = {
    Climate: {
        name: "Climate (Cultuur & Leiderschap)",
        questionIds: [1, 7, 9],
        description: "Creëren wij het juiste klimaat waarin mensen én AI kunnen floreren?"
    },
    Flow: {
        name: "Flow (Werk & Processen)",
        questionIds: [2, 4, 6],
        description: "Maakt AI het dagelijkse werk slimmer, eenvoudiger en waardevoller?"
    },
    Growth: {
        name: "Growth (Leren & Talent)",
        questionIds: [3, 5, 8],
        description: "Ontwikkelen onze mensen zich iedere dag dankzij AI?"
    },
    Ecosystem: {
        name: "Ecosystem (Organisatie & Ecosysteem)",
        questionIds: [10, 11],
        description: "Werken mensen, kennis en AI als één verbonden ecosysteem?"
    }
};
