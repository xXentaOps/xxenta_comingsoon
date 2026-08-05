import os
import json
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
        total_score = results.get('totalScore', 35)
        percentage = results.get('percentage', 64)
        
        top_strengths = ", ".join([f"{s.get('title')}: {s.get('userScore')}/5" for s in results.get('topStrengths', [])])
        bottom_priorities = ", ".join([f"{p.get('title')}: {p.get('userScore')}/5" for p in results.get('bottomPriorities', [])])
        
        patterns = ", ".join([f"{p.get('title')} ({p.get('interpretation')})" for p in results.get('detectedPatterns', [])])

        # Initialize Gemini Client
        # Set GEMINI_API_KEY environment variable in Google Cloud Function
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            client = genai.Client() # Fallback to ADC / GCP Project Vertex AI default
        else:
            client = genai.Client(api_key=api_key)

        prompt = f"""
Je bent de xXenta AI Report Engine, een senior AI Strategy Consultant voor xXenta.
Schrijf een hoogwaardig, inspirerend, professioneel en concreet managementrapport in het Nederlands voor organisatieleiders op basis van hun ingevulde xXenta AI Impact Scan.

GEGEVENS:
- Organisatie: {org_name}
- Contactpersoon: {contact_name}
- AI Volwassenheidsniveau: {maturity_level} (Totale Score: {total_score}/55, {percentage}%)
- Sterkste Punten: {top_strengths}
- Belangrijkste Ontwikkelprioriteiten: {bottom_priorities}
- Herkende Patronen & Knelpunten: {patterns}

STRUCTUUR VAN HET RAPPORT:
1. **Management Samenvatting**: Analyse van het volwassenheidsniveau van {org_name}, met waardering voor de sterke punten en een duidelijke spiegel voor de grootste kansen.
2. **Diepgaande Analyse & Risico's**: Toelichting op het herkende patroon ({patterns}). Leg uit wat het betekent als de techniek sneller/langzamer gaat dan cultuur of leiderschap.
3. **Strategische Actieagenda (Roadmap 90 Dagen)**: Geef 3 concrete, direct uitvoerbare vervolgstappen om de AI-transitie te versnellen en de zwakste schakels te versterken.

Toon: Zakenlijk, empathisch, strategisch, onderbouwd, actiegericht en uitnodigend.
"""

        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.7,
                max_output_tokens=1200
            )
        )

        return (json.dumps({
            'success': True,
            'report': response.text,
            'organization': org_name,
            'contactPerson': contact_name
        }), 200, headers)

    except Exception as e:
        return (json.dumps({'error': str(e)}), 500, headers)
