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
    let prompt = "Aşağıdaki bilgilere göre 7 günlük detaylı bir diyet planı oluştur:\n\n";
    
    userAnswers.forEach(answer => {
        const question = answer.question.replace(/\s*[🧑‍🤝‍🧑👩👨🤷‍♂️🎂📏⚖️🛋️🚶‍♂️🏃‍♂️🏋️‍♂️➖➕💪🎯🥦🌱🍞🚫🥩🍗🍽️🍴🍱🌾🧈🥗🍎]+\s*/g, '');
        const answerText = answer.answer.replace(/\s*[🧑‍🤝‍🧑👩👨🤷‍♂️🎂📏⚖️🛋️🚶‍♂️🏃‍♂️🏋️‍♂️➖➕💪🎯🥦🌱🍞🚫🥩🍗🍽️🍴🍱🌾🧈🥗🍎]+\s*/g, '');
        prompt += `${question}: ${answerText}\n`;
    });
    
    prompt += "\nLütfen bu bilgilere göre 7 günlük detaylı bir diyet planı oluştur. Her gün için kahvaltı, öğle yemeği, akşam yemeği ve ara öğünleri içermeli. Ayrıca günlük kalori ve makro besin hedeflerini de belirt.";
    
    return prompt;
}
