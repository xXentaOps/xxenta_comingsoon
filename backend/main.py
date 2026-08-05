import os
import json
import logging
import functions_framework
from google import genai
from google.genai import types

@functions_framework.http
def generate_ai_report(request):
    """
    Google Cloud Function HTTP endpoint to generate personalized management reports for xXenta AI Impact Scan.
    """
    # CORS headers
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json'
    }

    if request.method == 'OPTIONS':
        return ('', 204, headers)

    if request.method != 'POST':
        return (json.dumps({'error': 'Method not allowed. Use POST.'}), 405, headers)

    try:
        request_json = request.get_json(silent=True) or {}
        
        org_name = request_json.get('organization', 'Onbekende Organisatie')
        contact_name = request_json.get('contactPerson', 'Relatie')
        email = request_json.get('email', '')
        results = request_json.get('results', {})

        maturity_level = results.get('maturity', {}).get('level', 'AI Accelerator')
        maturity_sub = results.get('maturity', {}).get('subtitle', '')
        total_score = results.get('totalScore', 35)
        percentage = results.get('percentage', 64)
        
        top_strengths = ", ".join([f"{s.get('title')}: {s.get('userScore')}/5" for s in results.get('topStrengths', [])])
        bottom_priorities = ", ".join([f"{p.get('title')}: {p.get('userScore')}/5" for p in results.get('bottomPriorities', [])])
        
        domain_scores = results.get('domainScores', {})
        climate_score = domain_scores.get('Climate', {}).get('avg', 3)
        flow_score = domain_scores.get('Flow', {}).get('avg', 3)
        growth_score = domain_scores.get('Growth', {}).get('avg', 3)
        ecosystem_score = domain_scores.get('Ecosystem', {}).get('avg', 3)

        patterns = ", ".join([f"{p.get('title')} ({p.get('interpretation')})" for p in results.get('detectedPatterns', [])])

        # Initialize Gemini Client
        api_key = os.environ.get("GEMINI_API_KEY")
        gcp_project = os.environ.get("GCP_PROJECT", "website-ai-impactscan")
        
        # Target model: gemini-3.6-flash
        model_name = 'gemini-3.6-flash'
        
        if api_key:
            client = genai.Client(api_key=api_key)
        else:
            # Vertex AI Mode with ADC set to global location
            client = genai.Client(vertexai=True, project=gcp_project, location="global")

        prompt = f"""
Je bent de xXenta AI Report Engine, een senior C-Level AI Strategy Consultant voor xXenta.
Schrijf een zeer overzichtelijk, hoogwaardig en prachtig geformatteerd managementrapport in het Nederlands voor het leiderschapsteam van {org_name} (gericht aan {contact_name}).

GEGEVENS VAN DE XXENTA AI IMPACT SCAN:
- Organisatie: {org_name}
- Contactpersoon: {contact_name} ({email})
- AI Volwassenheidsniveau: {maturity_level} - {maturity_sub} (Totale Score: {total_score}/55, {percentage}%)
- Domeinscores (0-5 schaal):
  * Climate (Cultuur & Leiderschap): {climate_score}/5
  * Flow (Werk & Processen): {flow_score}/5
  * Growth (Leren & Talent): {growth_score}/5
  * Ecosystem (Organisatie & Ecosysteem): {ecosystem_score}/5
- Sterkste Pijlers: {top_strengths}
- Belangrijkste Ontwikkelprioriteiten: {bottom_priorities}
- Herkende Organisatiepatronen: {patterns}

BELANGRIJKE FORMATTING EN OPMAAK INSTRUCTIES:
- Gebruik GEEN codeblocks (geen ```).
- Gebruik GEEN ASCII-art diagrammen of platte tekst tabellen met pijltekens of pipes (|).
- Gebruik uitsluitend heldere koppen (###), duidelijke alinea's, vette tekst (**tekst**) en overzichtelijke bullet lists (* item) voor optimale leesbaarheid op het web dashboard.

STRUCTUUR VAN HET MANAGEMENTSAMENVATTING & ADVIESRAPPORT:

### 1. Executive Summary & Strategische Positionering
Analyseer de huidige AI-volwassenheid van {org_name}. Bespreek wat de score van {total_score}/55 betekent voor de marktpositie en innovatiekracht. Belicht de sterke punten ({top_strengths}) als fundament voor verdere groei.

### 2. Diepgaande Domein- & Patroonanalyse
Licht het herkenbare patroon toe ({patterns}). Bespreek de balans en wisselwerking tussen cultuur ({climate_score}/5), procesautomatisering ({flow_score}/5), talentontwikkeling ({growth_score}/5) en het ecosysteem ({ecosystem_score}/5). Toon de risico's van achterblijvende factoren ({bottom_priorities}).

### 3. Strategische Roadmap (Komende 90 Dagen)
Formuleer 3 concrete, direct uitvoerbare en onderbouwde initiatieven waarmee {org_name} de komende 90 dagen de AI-transitie versnelt.

### 4. Advies voor Bestuur & Leiderschap
Geef advies aan {contact_name} en het leiderschapsteam over eigenaarschap, psychologische veiligheid, ethiek en duurzame mens-AI samenwerking.

Schrijf in een professionele, inspirerende, zakelijke en actiegerichte stijl.
"""

        response = client.models.generate_content(
            model=model_name,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.7,
                max_output_tokens=3000
            )
        )
        report_text = response.text

        return (json.dumps({
            'success': True,
            'report': report_text,
            'organization': org_name,
            'contactPerson': contact_name
        }), 200, headers)

    except Exception as e:
        logging.error(f"Error generating AI report: {str(e)}")
        return (json.dumps({
            'success': False,
            'error': str(e)
        }), 500, headers)
