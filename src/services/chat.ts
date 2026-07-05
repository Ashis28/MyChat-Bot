import { askGemini } from "../ai/gemini";
import { buildSystemPrompt } from "../ai/prompt";
import { ChatMessage } from "../types/knowledge";

export async function chat(
    message: string,
    history : ChatMessage[],
    apiKey: string
): Promise<string> {

    const systemPrompt = await buildSystemPrompt();
    // console.log("---------System Prompt-----------",systemPrompt);

    const reply = await askGemini(
        message,
        systemPrompt,
        history,
        apiKey
    );

    return reply;
}