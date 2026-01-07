import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { db, collections } from '@/lib/firebase';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Get current menu for context
async function getMenuContext() {
  try {
    const querySnapshot = await getDocs(collection(db, collections.menu));
    const menuItems = querySnapshot.docs.map(doc => doc.data());
    
    // Format menu for AI context
    const formattedMenu = menuItems
      .filter((item: any) => item.available)
      .map((item: any) => 
        `• ${item.name} (${item.price} DH): ${item.description} [Tags: ${item.tags.join(', ')}]`
      )
      .join('\n');
    
    return formattedMenu;
  } catch (error) {
    console.error('Error fetching menu:', error);
    return 'Menu non disponible';
  }
}

const SYSTEM_PROMPT = `Tu es KitchBot, l'assistant IA intelligent du restaurant The Kitch à Rabat.
Tu es chaleureux, serviable, et expert en cuisine marocaine moderne.

CONTEXTE SPÉCIFIQUE RABAT:
• Le restaurant est situé Avenue Mohammed V, Rabat (près de Hassan Tower)
• Zone de livraison: Rabat centre, Hassan, Agdal, Hay Riad, Salé centre
• Horaires: 12h-23h tous les jours
• Spécialités: Cuisine marocaine fusion, plats santé, options végétariennes
• Services: Livraison express, réservations, événements d'entreprise

TON RÔLE:
1. Tu aides les clients à choisir des plats basés sur leurs préférences
2. Tu réponds aux questions sur les livraisons à Rabat
3. Tu guides pour les réservations et commandes groupées
4. Tu es multilingue: français, anglais, arabe (réponds dans la langue du client)

RÈGLES IMPORTANTES:
• Sois concis mais informatif
• Propose toujours des alternatives si un plat n'est pas disponible
• Pour les commandes, guide vers WhatsApp ou le site
• Pour les réservations, propose le formulaire en ligne
• Mentionne les promotions en cours si pertinentes

MENU ACTUEL:
{MENU_CONTENT}

FORMULES PROFESSIONNELLES:
• Formule Déjeuner Pro: 120 DH (plat + boisson + dessert)
• Formule Équipe (4+): 450 DH (4 plats + boissons + desserts)

COMMENCE TOUJOURS TA RÉPONSE PAR UNE SALUTATION AMICALE.`;

export async function POST(request: NextRequest) {
  try {
    const { message, conversationId, language = 'fr' } = await request.json();
    
    // Get current menu for context
    const menuContent = await getMenuContext();
    const prompt = SYSTEM_PROMPT.replace('{MENU_CONTENT}', menuContent);

    // Log conversation
    const conversationData = {
      message,
      timestamp: serverTimestamp(),
      language,
      source: 'web',
    };

    await addDoc(collection(db, collections.chatbotConversations), conversationData);

    // Generate AI response
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const aiResponse = response.choices[0].message.content;

    // Log AI response
    await addDoc(collection(db, collections.chatbotConversations), {
      ...conversationData,
      message: aiResponse,
      isAI: true,
    });

    return NextResponse.json({
      reply: aiResponse,
      timestamp: new Date().toISOString(),
      conversationId,
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    
    // Fallback response
    const fallbackResponses = {
      fr: "Désolé, je rencontre des difficultés techniques. Veuillez réessayer ou nous contacter directement au +212 661 234 567.",
      en: "Sorry, I'm experiencing technical difficulties. Please try again or contact us directly at +212 661 234 567.",
      ar: "عذرًا، أواجه صعوبات تقنية. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة على 212 661 234 567."
    };

    return NextResponse.json({
      reply: fallbackResponses[language as keyof typeof fallbackResponses] || fallbackResponses.fr,
      timestamp: new Date().toISOString(),
      error: error.message,
    });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    service: 'The Kitch Rabat AI Chatbot',
    version: '1.0',
    languages: ['fr', 'en', 'ar'],
  });
}
