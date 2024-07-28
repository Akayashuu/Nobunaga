import { Client, Events } from "discord.js";
import Ready from "../Events/ready";
import MessageCreate from "../Events/messageCreate";

export default (client:Client) => {
  client.on(Events.ClientReady, async () => await Ready(client));
  client.on(Events.MessageCreate, async (message) => MessageCreate(message));
};