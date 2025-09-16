import type { Message } from "discord.js";
import EnderbotParser from "./EnderbotParser";

class EnderbotModules {
	private message: Message<boolean>;

	public constructor(message: Message<boolean>) {
		this.message = message;
	}

	public async read(): Promise<void> {
		if (this.isCraft()) this.message.react("🔨");
		if (this.isForge()) this.message.react("🔧");
		if (this.isInventory()) this.message.react("📦");
	}

	private isCraft(): boolean {
		if (!this.message.embeds[1]) return false;
		if (this.message.embeds[1].fields.length < 2) return false;
		const fields = this.message.embeds[1].fields;
		const hasCost = fields.some(field => field.name === "💰 Cost");
		const hasInformation = fields.some(field => field.name === "📜 Information");
		const isPotionCraft = hasCost && hasInformation;
		return isPotionCraft;
	}

	private isForge(): boolean {
		if (!this.message.embeds[1]) return false;
		if (this.message.embeds[1].fields.length < 2) return false;
		return (
			this.message.embeds[1].fields.some(field => field.name.startsWith("💰")) &&
			this.message.embeds[1].fields.some(field => field.name.startsWith("ℹ️"))
		);
	}

	private isInventory(): boolean {
		if (!this.message.embeds[0]) return false;
		if (!this.message.embeds[0].footer) return false;
		return (
			this.message.embeds[0].footer.text === "📜 2 / 7 - Resources" ||
			this.message.embeds[0].footer.text === "📜 3 / 7 - Exploration" ||
			this.message.embeds[0].footer.text === "📜 4 / 7 - Alchemy"
		);
	}
}

export default EnderbotModules;
