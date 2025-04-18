import type { Client, Message, Snowflake } from "discord.js";

interface Command {
	run: (
		client: Client,
		author: Snowflake,
		message: Message,
		args: string[],
	) => Promise<void>;
	help: {
		name: string;
	};
	aliases: Array<string>;
}

export default Command;
