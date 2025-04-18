import fs from "fs";
import type { Client, Message, Snowflake } from "discord.js";
import BaseCommand from "../../Modules/Commands/BaseCommand";
import type Command from "../../Types/Command";
import { Configuration } from "../Configuration/Configuration";

export default {
	async run(
		client: Client,
		author: Snowflake,
		message: Message,
		args: string[],
	) {
		new Get(client, author, message, args);
	},
	help: {
		name: "get",
	},
	aliases: [],
} as Command;

class Get extends BaseCommand {
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
		const database = this.fetchDatabase();
		if (database.authorized_user_ids.includes(this.author)) {
			const msg = `>trade ${this.args.join(" ")} <@${this.author}>`;
			if (this.message.channel.isSendable()) {
				this.message.channel.send(msg);
			}
		} else {
			if (this.message.channel.isSendable()) {
				this.message.channel.send(
					"You are not authorized to use this command :(",
				);
			}
		}
	}

	private fetchDatabase(): {
		authorized_user_ids: string[];
	} {
		const file = fs.readFileSync(Configuration.db_path, "utf8");
		return JSON.parse(file);
	}
}
