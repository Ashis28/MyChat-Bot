import { ChatMessage } from "../types/knowledge";

export async function askGemini(
    message: string,
    systemPrompt : string,
    history : ChatMessage[],
    apiKey: string
): Promise<string> {

 console.log("message "+message);
    const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-goog-api-key": apiKey,
            },
            body: JSON.stringify({
            systemInstruction: {
                parts: [
                    {
                        text: systemPrompt,
                    },
                ],
            },
            contents: [
                ...history.map(msg=>({
                    role : msg.role == "assistant"?"model":"user",
                    parts :[{
                        text : msg.content
                    }]
                })),
                {
                    role: "user",
                    parts: [
                        {
                            text: message,
                        },
                    ],
                },
            ],
        }),
        }
    );

    if (!response.ok) {
        const errorText = await response.text();

        console.error("Gemini Error:", errorText);

        throw new Error(`Gemini API Error: ${errorText}`);
    }

    const data = await response.json() as GeminiResponse;
    console.log(
    JSON.stringify(
        data.candidates?.[0]?.content,
        null,
        2
    )
);

    return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ??
        "Sorry, I couldn't generate a response."
    );
}

interface GeminiResponse {
    candidates?: {
        content?: {
            parts?: {
                text?: string;
            }[];
        };
    }[];
}