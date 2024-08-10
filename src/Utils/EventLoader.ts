import { Client, Events } from "discord.js";
import Ready from "../Events/ready";
import MessageCreate from "../Events/messageCreate";
import MessageReactionAdd from "../Events/messageReactionAdd";

export default (client:Client) => {
  client.on(Events.ClientReady, async () => await Ready(client));
  client.on(Events.MessageCreate, async (message) => MessageCreate(message));
  client.on(Events.MessageReactionAdd, async (messageReaction, user) => MessageReactionAdd(messageReaction, user));
};