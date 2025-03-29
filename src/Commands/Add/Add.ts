import { Client, Message, Snowflake } from "discord.js";
import BaseCommand from "../../Modules/Commands/BaseCommand";
import Command from "../../Types/Command";

export default {
	async run(
		client: Client,
		author: Snowflake,
		message: Message,
		args: string[],
	) {
		new Add(client, author, message, args);
	},
	help: {
		name: "add",
	},
	aliases: [],
} as Command;

class Add extends BaseCommand {
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
		const msg = `>trade  <@${this.author}> ${this.args.join(" ")}`;
		this.message.channel.send(msg);
	}
}
