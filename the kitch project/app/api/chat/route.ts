import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { logChatbotInteraction } from '@/lib/firebase-helpers';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { defaultMenuItems } from '@/lib/menuDefaults';

const openaiApiKey = process.env.OPENAI_API_KEY;
const openai = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null;

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
7. Pour les entreprises, propose les formules pro
8. Si un plat n'est pas dans le menu, dis clairement qu'il n'est pas disponible
9. N'invente pas de prix ni d'ingrédients`;

const formatMenu = (items: Array<{ name: string; price: number; category: string; description?: string }>) => {
  const byCategory: Record<string, Array<{ name: string; price: number; description?: string }>> = {};
  items.forEach((item) => {
    byCategory[item.category] = byCategory[item.category] || [];
    byCategory[item.category].push(item);
  });
  return Object.entries(byCategory)
    .map(([category, items]) => {
      const lines = items.map((item) => `- ${item.name} (${item.price} DH): ${item.description ?? ''}`.trim());
      return `${category.toUpperCase()}:\n${lines.join('\n')}`;
    })
    .join('\n\n');
};

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [], sessionId, language = 'fr' } = await request.json();
    let menuItems = defaultMenuItems.map((item) => ({
      name: item.name,
      price: item.price,
      category: item.category,
      description: item.description
    }));
    try {
      const menuSnapshot = await getDocs(collection(db, 'menu'));
      if (!menuSnapshot.empty) {
        menuItems = menuSnapshot.docs.map((doc) => ({
          name: doc.data().name ?? 'Plat',
          price: doc.data().price ?? 0,
          category: doc.data().category ?? 'plats',
          description: doc.data().description ?? ''
        }));
      }
    } catch (error) {
      console.error('Menu fetch error:', error);
    }

    const menuContent = formatMenu(menuItems);

    if (!openai) {
      const offlineReplies = {
        fr: "Le service IA est momentanément indisponible. Vous pouvez commander via WhatsApp ou consulter le menu sur place.",
        en: "The AI service is temporarily unavailable. You can order via WhatsApp or check the menu on site.",
        ar: "خدمة الذكاء الاصطناعي غير متاحة مؤقتًا. يمكنك الطلب عبر واتساب أو الاطلاع على القائمة في المطعم."
      };
      return NextResponse.json({
        reply: offlineReplies[language as keyof typeof offlineReplies] || offlineReplies.fr,
        timestamp: new Date().toISOString(),
        sessionId: sessionId || `session_${Date.now()}`,
        error: true
      });
    }

    const finalPrompt = SYSTEM_PROMPT.replace('{menu_content}', menuContent);

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
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

    const aiReply = response.choices[0].message.content || '';

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
      reply: fallbackResponses[language as keyof typeof fallbackResponses] || fallbackResponses.fr,
      timestamp: new Date().toISOString(),
      error: true
    });
  }
}
