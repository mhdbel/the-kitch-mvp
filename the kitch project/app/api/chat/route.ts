import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { logChatbotInteraction } from '@/lib/firebase-helpers';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `Tu es KitchBot, l'assistant IA premium du restaurant The Kitch à Rabat.
Tu es situé à Rabat, près de Hassan Tower sur l'avenue Mohammed V.

TON RÔLE:
1. Assistant gastronomique expert en cuisine marocaine moderne
2. Conseiller en service pour professionnels de Rabat
3. Guide pour les commandes et réservations

TON PERSONNAGE:
- Élégant, professionnel, chaleureux
- Parle français, anglais, et arabe marocain (darija)
- Connais parfaitement Rabat et ses environs
- Recommande selon les goûts et restrictions alimentaires

INFORMATIONS CRITIQUES:
📍 ADRESSE: Avenue Mohammed V, Rabat (près de Hassan Tower)
📞 TÉLÉPHONE: +212 661 11 22 33
🕒 HORAIRES: 12h-23h tous les jours
🛵 LIVRAISON: Rabat (30-45min), Salé (45-60min)
🏢 SERVICE PRO: Formules déjeuner pour entreprises

MENU ACTUEL:
{menu_content}

RÈGLES DE RÉPONSE:
1. Réponds dans la langue de l'utilisateur
2. Sois concis mais complet
3. Propose des alternatives selon les restrictions
4. Pour les commandes, oriente vers WhatsApp
5. Pour les réservations, propose le formulaire en ligne
6. Mentionne toujours la localisation Rabat
7. Pour les entreprises, propose les formules pro`;

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [], sessionId, language = 'fr' } = await request.json();
    
    // Simple menu content (in production, fetch from Firebase)
    const menuContent = `
    ENTREES:
    - Salade The Kitch (85 DH): Mix de salades, noix, vinaigrette maison
    - Brick au thon (65 DH): Brick légère au thon et coriandre
    - Soupe Harira (45 DH): Traditionnelle avec lentilles et pois chiches
    
    PLATS PRINCIPAUX:
    - Tajine Poulet Citron (145 DH): Poulet mijoté avec citron confit et olives
    - Couscous Royal (165 DH): Viandes multiples, légumes de saison
    - Pastilla au Poulet (155 DH): Feuilleté sucré-salé, amandes, cannelle
    - Brochette d'Agneau (175 DH): Agneau mariné, servi avec légumes grillés
    - Burger Marocain (135 DH): Viande d'agneau, fromage, épices marocaines
    
    DESSERTS:
    - Briouates aux Amandes (65 DH): Feuilleté aux amandes et miel
    - Mille-feuille Pistache (75 DH): Pâte feuilletée, crème pistache
    - Salade de Fruits Frais (55 DH): Fruits de saison, menthe fraîche
    
    BOISSONS:
    - Thé à la Menthe (35 DH): Thé vert, menthe fraîche, sucre
    - Jus d'Orange Pressé (40 DH): Oranges pressées à la minute
    - Café Arabica (30 DH): Café torréfié localement
    
    FORMULES PRO (Rabat entreprises):
    - Formule Déjeuner: 120 DH (plat + boisson + dessert)
    - Formule Équipe: 450 DH pour 4 personnes
    `;

    const finalPrompt = SYSTEM_PROMPT.replace('{menu_content}', menuContent);

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: finalPrompt },
        ...conversationHistory.slice(-6), // Last 6 messages for context
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 250,
      presence_penalty: 0.3,
      frequency_penalty: 0.2,
    });

    const aiReply = response.choices[0].message.content;

    // Log the interaction for analytics
    await logChatbotInteraction({
      sessionId: sessionId || `session_${Date.now()}`,
      message,
      response: aiReply,
      language,
      timestamp: new Date(),
      intent: 'general_inquiry', // In production, use NLP to detect intent
    });

    return NextResponse.json({
      reply: aiReply,
      timestamp: new Date().toISOString(),
      sessionId: sessionId || `session_${Date.now()}`,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Fallback responses in multiple languages
    const fallbackResponses = {
      fr: "Désolé, je rencontre une difficulté technique. Vous pouvez nous contacter directement au +212 661 11 22 33 ou passer votre commande via WhatsApp.",
      en: "Sorry, I'm experiencing a technical issue. You can contact us directly at +212 661 11 22 33 or place your order via WhatsApp.",
      ar: "عذرًا، أواجه مشكلة تقنية. يمكنك الاتصال بنا مباشرة على الرقم 212661112233+ أو تقديم طلبك عبر واتساب."
    };

    return NextResponse.json({
      reply: fallbackResponses.fr,
      timestamp: new Date().toISOString(),
      error: true
    });
  }
}
