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
		new Assert(client, author, message, args);
	},
	help: {
		name: "assert",
	},
	aliases: [],
} as Command;

class Assert extends BaseCommand {
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
		const msg = `>assert ${this.args[0]} ${this.args[1] ? this.args[1] : ""}`;
		if (!this.message.channel.isSendable()) return;
		this.message.channel.send(msg);
	}
}
