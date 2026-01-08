import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openaiApiKey = process.env.OPENAI_API_KEY;
const openai = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null;

const prompts = {
  fr: `Tu es un chef marocain expert en marketing culinaire. Génère une description appétissante pour un plat de restaurant.

Plat: {dishName}
Catégorie: {category}
Ingrédients: {ingredients}

Instructions:
1. Décris le plat de manière alléchante
2. Mets en avant les ingrédients principaux
3. Évoque les saveurs et textures
4. Inclus un hashtag pertinent
5. Sois concis (1-2 phrases maximum)
6. Utilise un ton chaleureux et moderne
7. N'invente pas d'ingrédients absents

Exemple: "Un tajine de poulet aux citrons confits et olives vertes, mijoté lentement pour révéler des saveurs riches et complexes. La viande fondante et les épices parfumées créent une expérience culinaire authentique. #CuisineMarocaineModerne"`,

  en: `You are a Moroccan chef and culinary marketing expert. Generate an appetizing description for a restaurant dish.

Dish: {dishName}
Category: {category}
Ingredients: {ingredients}

Instructions:
1. Describe the dish in an enticing way
2. Highlight the main ingredients
3. Mention flavors and textures
4. Include a relevant hashtag
5. Be concise (1-2 sentences maximum)
6. Use a warm and modern tone
7. Do not invent ingredients that are not provided

Example: "A chicken tagine with preserved lemons and green olives, slow-cooked to reveal rich, complex flavors. The tender meat and aromatic spices create an authentic culinary experience. #ModernMoroccanCuisine"`,

  ar: `أنت طاه مغربي خبير في التسويق الغذائي. أنشئ وصفًا شهيًا لطبق مطعم.

الطبق: {dishName}
الفئة: {category}
المكونات: {ingredients}

التعليمات:
1. صف الطبق بطريقة جذابة
2. سلط الضوء على المكونات الرئيسية
3. اذكر النكهات والقوام
4. أضف هاشتاغ ذو صلة
5. كن موجزًا (جملة أو جملتين كحد أقصى)
6. استخدم نبرة دافئة وعصرية
7. لا تضف مكونات غير مذكورة

مثال: "طاجين الدجاج بالليمون المخمر والزيتون الأخضر، مطهو ببطء ليظهر نكهات غنية ومعقدة. اللحم الطري والتوابل العطرية تخلق تجربة طهي أصيلة. #المطبخ_المغربي_الحديث"`
};

export async function POST(request: NextRequest) {
  try {
    const { dishName, category, ingredients, language = 'fr' } = await request.json();
    
    const promptTemplate = prompts[language as keyof typeof prompts] || prompts.fr;
    const prompt = promptTemplate
      .replace('{dishName}', dishName)
      .replace('{category}', category)
      .replace('{ingredients}', Array.isArray(ingredients) ? ingredients.join(', ') : ingredients);

    if (!openai) {
      return NextResponse.json({
        description: `Description marketing pour ${dishName}. Ajoutez une clé OpenAI pour générer du contenu personnalisé.`,
        language,
        generatedAt: new Date().toISOString(),
        model: 'offline'
      });
    }

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 100,
    });

    return NextResponse.json({
      description: response.choices[0].message.content,
      language,
      generatedAt: new Date().toISOString(),
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    });
  } catch (error: any) {
    console.error('AI generation error:', error);
    
    return NextResponse.json({
      error: 'Failed to generate description',
      message: error.message,
    }, { status: 500 });
  }
}
