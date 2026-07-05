/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { chat } from "./services/chat";

interface ChatRequest {
	message: string;
	history?: {
		role: "user" | "assistant";
		content: string;
	}[];
}
const corsHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:4200",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};
export default {
	async fetch(request: Request, env: Env): Promise<Response> {

		if (request.method === "OPTIONS") {
			return new Response(null, {
				headers: corsHeaders,
			});
		}
		if (request.method !== "POST") {
			return new Response("Method Not Allowed", {
				status: 405,
				headers : corsHeaders,
			});
		}

		const url = new URL(request.url);

		if (url.pathname !== "/chat") {
			return new Response("Not Found", {
				status: 404,
				headers : corsHeaders,
			});
		}

		try {

			const body = await request.json() as ChatRequest;

			// console.log("API Key exists:", !!env.GEMINI_API_KEY);
			// console.log("API Key prefix:", env.GEMINI_API_KEY?.substring(0, 10));
			const reply = await chat(
				body.message,
				body.history??[],
				env.GEMINI_API_KEY
			);

			return Response.json({
				reply,
			},
			{
				headers: corsHeaders,
			});

		} catch (error) {

			console.error(error);

			return Response.json(
				{
					reply: "Something went wrong while talking to Gemini.",
				},
				{
					status: 500,
					headers: corsHeaders,
				}
			);
		}
	},
} satisfies ExportedHandler<Env>;