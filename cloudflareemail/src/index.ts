import { query, mutation } from "./convex/_generated/server";

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return new Response('Hello World! ');
	},
	async streamToArrayBuffer(stream: any, streamSize: any) {
		let result = new Uint8Array(streamSize);
		let bytesRead = 0;
		const reader = stream.getReader();
		while (true) {
			const { done, value } = await reader.read();
			if (done) {
				break;
			}
			result.set(value, bytesRead);
			bytesRead += value.length;
		}
		return new TextDecoder().decode(result);
	},
	async email(message: ForwardableEmailMessage, env: any, ctx: any) {
		const rawMsgBody = await this.streamToArrayBuffer(message.raw, message.rawSize);
		const urlSignalcollector = "https://shocking-sockeye-101.convex.cloud/api/mutation";
		const initFetch = {
			body: JSON.stringify({
				path: "messages_email:emailAdd",
				args: {
					rawMessage: rawMsgBody,
					emailTo: message.to,
					emailFrom: message.from
				},
				"format": "json"
			}),
			method: "POST",
			headers: {
				"content-type": "application/json;charset=UTF-8"
			}
		};
		const response = await fetch(urlSignalcollector, initFetch);
		if (!response.ok) {
			message.setReject("Failed, user: '" + message.to + "' doesn't exist");
		}
	}
};