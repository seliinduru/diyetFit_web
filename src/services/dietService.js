// Diyet planı oluşturan fonksiyon (REST API)
export async function generateDietPlan(userAnswers) {
    const REACT_APP_GEMINI_API_KEY = "AIzaSyC7BQLi27xQnVBWq-dS0pQsv6bWqiClRCA";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${REACT_APP_GEMINI_API_KEY}`;
    
    // Kullanıcı cevaplarını metin formatına dönüştür
    const userPrompt = formatUserAnswersForPrompt(userAnswers);
    
    const requestBody = {
        contents: [
            {
                role: "user",
                parts: [{ text: userPrompt }],
            },
        ],
        generationConfig: {
            temperature: 0.7,
            topK: 1,
            topP: 1,
            maxOutputTokens: 512,
        },
    };
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API hatası: ${errorData.error?.message || response.statusText}`);
        }
        const data = await response.json();
        if (!data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
            throw new Error("API boş bir yanıt döndürdü.");
        }
        const resultText = data.candidates[0].content.parts[0].text;
        console.log("✅ Diyet planı başarıyla oluşturuldu (REST API)");
        return resultText;
    } catch (error) {
        console.error("❌ Diyet planı oluşturulurken hata:", error.message);
        throw error;
    }
}

// Streaming API ile diyet planı oluşturan fonksiyon
export async function generateDietPlanStreaming(userAnswers, onChunk) {
    const REACT_APP_GEMINI_API_KEY = "AIzaSyC7BQLi27xQnVBWq-dS0pQsv6bWqiClRCA";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${REACT_APP_GEMINI_API_KEY}`;
    
    // Kullanıcı cevaplarını metin formatına dönüştür
    const userPrompt = formatUserAnswersForPrompt(userAnswers);
    
    const requestBody = {
        contents: [
            {
                role: "user",
                parts: [{ text: userPrompt }],
            },
        ],
        generationConfig: {
            temperature: 0.7,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        },
    };
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API hatası: ${errorData.error?.message || response.statusText}`);
        }
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullText = '';
        
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value, { stream: true });
            try {
                // Chunk'ı satırlara böl ve her satırı JSON olarak parse et
                const lines = chunk.split('\n').filter(line => line.trim() !== '');
                
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const jsonStr = line.substring(6);
                        if (jsonStr === '[DONE]') continue;
                        
                        const data = JSON.parse(jsonStr);
                        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                            const textChunk = data.candidates[0].content.parts[0].text;
                            fullText += textChunk;
                            onChunk(textChunk);
                        }
                    }
                }
            } catch (e) {
                console.error('Streaming yanıt işlenirken hata:', e);
            }
        }
        
        console.log("✅ Diyet planı başarıyla oluşturuldu (Streaming API)");
        return fullText;
    } catch (error) {
        console.error("❌ Diyet planı oluşturulurken hata:", error.message);
        throw error;
    }
}

// Kullanıcı cevaplarını prompt formatına dönüştüren yardımcı fonksiyon
function formatUserAnswersForPrompt(userAnswers) {
    // Önemli bilgileri bul
    const mealPreference = userAnswers.find(a => a.question.includes("Günde kaç öğün"))?.answer.replace(/\s*[🍽️🍴🍱]+\s*/g, '') || "3 Ana Öğün";
    const dietPreference = userAnswers.find(a => a.question.includes("beslenme tercihiniz"))?.answer.replace(/\s*[🥦🌱🍞🚫🥩🍗🍽️]+\s*/g, '') || "";
    const dietPriority = userAnswers.find(a => a.question.includes("öncelik vermek"))?.answer.replace(/\s*[🍗🍞🚫🌾🧈🥗]+\s*/g, '') || "";
    
    // Temel kullanıcı bilgilerini özet olarak ekle
    let userInfo = "";
    userAnswers.forEach(answer => {
        if (answer.question.includes("Cinsiyetiniz") || 
            answer.question.includes("Yaşınızı") || 
            answer.question.includes("Boyunuz") || 
            answer.question.includes("Kilonuz") || 
            answer.question.includes("hareketliliğinizi") || 
            answer.question.includes("Diyet amacınız") || 
            answer.question.includes("Hedef kilonuz")) {
            const question = answer.question.replace(/\s*[🧑‍🤝‍🧑👩👨🤷‍♂️🎂📏⚖️🛋️🚶‍♂️🏃‍♂️🏋️‍♂️➖➕💪🎯]+\s*/g, '');
            const answerText = answer.answer.replace(/\s*[🧑‍🤝‍🧑👩👨🤷‍♂️🎂📏⚖️🛋️🚶‍♂️🏃‍♂️🏋️‍♂️➖➕💪🎯]+\s*/g, '');
            userInfo += `${question}: ${answerText}. `;
        }
    });
    
    // Öğün yapısını belirle
    let mealStructure = "";
    if (mealPreference.includes("1 Ana")) {
        mealStructure = "Ana Öğün";
    } else if (mealPreference.includes("2 Ana Öğün")) {
        mealStructure = "Sabah, Akşam";
    } else if (mealPreference.includes("3 Ana Öğün")) {
        mealStructure = "Kahvaltı, Öğle Yemeği, Akşam Yemeği";
    } else if (mealPreference.includes("2 Ana + 1 Ara")) {
        mealStructure = "Kahvaltı, Ara Öğün, Akşam Yemeği";
    } else if (mealPreference.includes("3 Ana + 2 Ara")) {
        mealStructure = "Kahvaltı, Kuşluk, Öğle Yemeği, İkindi, Akşam Yemeği";
    } else if (mealPreference.includes("5-6 küçük")) {
        mealStructure = "Sabah, Kuşluk, Öğle, İkindi, Akşam, Gece";
    } else {
        mealStructure = "Kahvaltı, Öğle Yemeği, Akşam Yemeği";
    }
    
    // Ana prompt
    let prompt = `Bir diyetisyen olarak, şu bilgilere sahip bir kişi için 7 günlük diyet planı oluşturmanı istiyorum: ${userInfo}\n\n`;
    prompt += `Diyet planı şu özelliklere sahip olmalıdır:\n`;
    prompt += `- Günde ${mealPreference} şeklinde beslenme\n`;
    if (dietPreference) prompt += `- ${dietPreference} beslenme tarzı\n`;
    if (dietPriority) prompt += `- ${dietPriority} öncelikli\n`;
    prompt += `- Her öğün için gram cinsinden porsiyon miktarları\n`;
    prompt += `- Her gün için toplam kalori ve makro besin değerleri\n\n`;
    
    prompt += `ÇOK ÖNEMLİ: Yanıtını aşağıdaki formatta yapılandır ve TÜM 7 GÜNÜ MUTLAKA TAMAMLA. Yanıtını kısaltma veya özet geçme. Her gün için ayrıntılı bilgi ver.\n\n`;
    
    // Her gün için numaralandırılmış başlıklar kullan
    prompt += `# 1. GÜN\n`;
    prompt += `# 2. GÜN\n`;
    prompt += `# 3. GÜN\n`;
    prompt += `# 4. GÜN\n`;
    prompt += `# 5. GÜN\n`;
    prompt += `# 6. GÜN\n`;
    prompt += `# 7. GÜN\n\n`;
    
    prompt += `Her gün için şu öğünleri detaylandır: ${mealStructure}.\n\n`;
    
    prompt += `Şimdi lütfen yukarıdaki başlıkları sırayla doldur. Her gün için farklı yemekler öner. Tüm 7 günü tamamlayana kadar devam et. Yanıtını kısaltma, her gün için detaylı bilgi ver.\n\n`;
    
    prompt += `Başla:\n\n# 1. GÜN\n`;
    
    return prompt;
}
