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
		if (this.message.embeds.length === 0) return false;
		if (this.message.embeds[0].fields.length < 2) return false;
		const isPotionCraft =
			this.message.embeds[0].fields[0].name === "💰 Cost" &&
			this.message.embeds[0].fields[1].name === "📜 Information";
		return isPotionCraft;
	}

	private isForge(): boolean {
		if (this.message.embeds.length === 0) return false;
		if (this.message.embeds[0].fields.length < 2) return false;
		return (
			this.message.embeds[0].fields[0].name === "💰 Cost" &&
			this.message.embeds[0].fields[1].name === "ℹ️ Information"
		);
	}

	private isInventory(): boolean {
		if (this.message.embeds.length === 0) return false;
		return (
			this.message.embeds[0].footer.text === "📜 2 / 7 - Resources" ||
			this.message.embeds[0].title === "📜 3 / 7 - Exploration" ||
			this.message.embeds[0].title === "📜 4 / 7 - Alchemy"
		);
	}
}

export default EnderbotModules;
