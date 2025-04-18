import type { Client, Message, Snowflake } from "discord.js";
import BaseCommand from "../../Modules/Commands/BaseCommand";
import type Command from "../../Types/Command";

export default {
	async run(
		client: Client,
		author: Snowflake,
		message: Message,
		args: string[],
	) {
		new Inventory(client, author, message, args);
	},
	help: {
		name: "inventory",
	},
	aliases: [],
} as Command;

class Inventory extends BaseCommand {
	public constructor(
		client: Client,
		author: Snowflake,
		message: Message,
		args: string[],
	) {
		super(client, author, message, args);
		this.run();
	}

	public async run(): Promise<void> {
		const msg = `>inventory ${this.args[0]}`;
		if (this.message.channel.isSendable()) {
			this.message.channel.send(msg);
		}
	}
}

export { Inventory };
