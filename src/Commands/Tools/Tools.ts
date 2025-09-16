import type { Client, Message, Snowflake } from "discord.js";
import BaseCommand from "../../Modules/Commands/BaseCommand";
import type Command from "../../Types/Command";
import { Inventory } from "../Inventory/Inventory";

export default {
	async run(
		client: Client,
		author: Snowflake,
		message: Message,
		args: string[],
	) {
		args[0] = "tools";
		new Inventory(client, author, message, args);
	},
	help: {
		name: "tools",
	},
	aliases: [],
} as Command;
