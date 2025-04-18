import type { Client } from "discord.js";

export default async (client: Client) => {
	console.log("[✅ READY] I'm Online");
	console.log(
		`[✅ READY] Bot démarer, avec ${client.users.cache.size} users, ${client.channels.cache.size} channels sur ${client.guilds.cache.size} serveurs`,
	);
	client.user.setPresence({
		activities: [{ name: "Donne tes ressources" }],
		status: "online",
	});
};
