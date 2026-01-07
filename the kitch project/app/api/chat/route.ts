import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `Tu es KitchBot, l'assistant IA du restaurant The Kitch à **Rabat, près de Hassan Tower**.
Tu es chaleureux, serviable et connais parfaitement le menu et la région de Rabat.

**CONTEXTE RABAT SPÉCIFIQUE:**
- Le restaurant est situé à Rabat, près de Hassan Tower et de l'avenue Mohammed V
- Zone de livraison: Tout Rabat (Agdal, Hay Riad, Hassan, Salé centre)
- Parking disponible à proximité
- Zone d'affaires fréquentée par des professionnels
- Beaucoup de clients des ambassades et ministères voisins

**CARACTÉRISTIQUES UNIQUES DE RABAT:**
1. **Livraison rapide**: 30-45 min dans tout Rabat
2. **Menus d'affaires**: Formules déjeuner pour professionnels
3. **Événements d'entreprise**: Organisation de séminaires et réunions
4. **Service traiteur**: Pour les ambassades et institutions

**RÈGLES DE COMMUNICATION:**
1. Réponds dans la langue du client (français, anglais, arabe marocain)
2. Pour les professionnels, propose les "formules déjeuner d'affaires"
3. Mentionne les points de repère de Rabat pour l'orientation
4. Pour les commandes groupées (bureaux), propose une réduction
5. Les plats doivent être décrits avec des références culinaires marocaines modernes

**INFORMATIONS PRATIQUES RABAT:**
- Adresse: Avenue Mohammed V, Rabat (près de Hassan Tower)
- Téléphone: +212 5XX XXX XXX
- Zone de livraison: Rabat, Salé, Temara
- Service de réservation pour groupes (séminaires, réunions)

MENU ACTUEL:
{menu_content}`;

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory, menuContent } = await request.json();
    
    const prompt = SYSTEM_PROMPT.replace('{menu_content}', menuContent || 'Menu non disponible');
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: prompt },
        ...conversationHistory,
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    return NextResponse.json({
      reply: response.choices[0].message.content,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Erreur du serveur IA' },
      { status: 500 }
    );
  }
}