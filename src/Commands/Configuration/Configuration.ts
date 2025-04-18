import fs from "fs";
import type { Client, Message, Snowflake } from "discord.js";
import BaseCommand from "../../Modules/Commands/BaseCommand";
import wUser from "../../Modules/Discordjs/User";
import type Command from "../../Types/Command";

export default {
	async run(
		client: Client,
		author: Snowflake,
		message: Message,
		args: string[],
	) {
		await new Configuration(client, author, message, args).router();
	},
	help: {
		name: "configuration",
	},
	aliases: [],
} as Command;

class Configuration extends BaseCommand {
	static db_path = "./src/config.json";

	private database = this.fetchDatabase();

	public async router(): Promise<void> {
		if (!this.message.channel.isSendable()) return;
		if (!this.database.authorized_user_ids.includes(this.author))
			this.message.channel.send("You are not allowed to use this command.");
		const sub = ["add", "remove", "list"];
		switch (this.getSubCommand(sub)) {
			case "add":
				this.add();
				break;
			case "remove":
				this.remove();
				break;
			case "list":
				this.list();
				break;
		}
	}

	private add() {
		const user_id = this.args[0];
		if (wUser.isSnowflake(user_id)) {
			if (!this.message.channel.isSendable()) return;

			fs.readFile(Configuration.db_path, "utf8", (err, data) => {
				if (err) throw err;
				const json = JSON.parse(data);
				if (
					json.authorized_user_ids.includes(user_id) &&
					this.message.channel.isSendable()
				)
					return this.message.channel.send(
						"User already in the authorized_user_ids list.",
					);
				json.authorized_user_ids.push(user_id);
				fs.writeFile(
					Configuration.db_path,
					JSON.stringify(json),
					"utf8",
					(err) => {
						if (err) throw err;
						if (!this.message.channel.isSendable()) return;
						this.message.channel.send(
							`User <@${user_id}> added to the authorized_user_ids list.`,
						);
					},
				);
			});
		} else {
			if (!this.message.channel.isSendable()) return;
			this.message.channel.send("Please provide a valid user id.");
		}
	}

	private remove() {
		const user_id = this.args[0];
		if (wUser.isSnowflake(user_id)) {
			fs.readFile(Configuration.db_path, "utf8", (err, data) => {
				if (err) throw err;
				const json = JSON.parse(data);
				if (
					!json.authorized_user_ids.includes(user_id) &&
					this.message.channel.isSendable()
				)
					return this.message.channel.send(
						"User not in the authorized_user_ids list.",
					);
				json.authorized_user_ids = json.authorized_user_ids.filter(
					(id: string) => id !== user_id,
				);
				fs.writeFile(
					Configuration.db_path,
					JSON.stringify(json),
					"utf8",
					(err) => {
						if (err) throw err;
						if (!this.message.channel.isSendable()) return;
						this.message.channel.send(
							`User <@${user_id}> removed from the authorized_user_ids list.`,
						);
					},
				);
			});
		} else {
			if (!this.message.channel.isSendable()) return;
			this.message.channel.send("Please provide a valid user id.");
		}
	}

	private list() {
		let msg = `Authorized users: ${this.database.authorized_user_ids.map((id: string) => `<@${id}>`).join(", ")}`;
		if (msg.length > 2000) msg = msg.slice(0, 2000);
		if (!this.message.channel.isSendable()) return;
		this.message.channel.send({ content: msg, allowedMentions: { parse: [] } });
	}

	private fetchDatabase(): {
		authorized_user_ids: string[];
	} {
		const file = fs.readFileSync(Configuration.db_path, "utf8");
		return JSON.parse(file);
	}
}

export { Configuration };
