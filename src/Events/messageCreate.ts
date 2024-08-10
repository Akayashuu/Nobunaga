import { Client, Message, PermissionFlagsBits } from "discord.js";
import { ApplicationInstance } from "..";
import Command from "../Types/Command";
import Autocomplete from "../Modules/Commands/Autocomplete";
import EnderbotModules from "../Modules/Enderbot/EnderbotModules";
const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const prefix = "."

export default async (messageCreate:Message) => {
    await new MessageCreateEvent(messageCreate).collector();
}


class MessageCreateEvent {

    static enderbotId = "280726849842053120";
    /**
     * @description Discord.js message event object.
     * @date 27/06/2023 - 17:07:29
     * @private
     * @type {Message}
     */
    private messageCreate:Message;
    /**
     * @description Black client.
     * @date 23/01/2024 - 23:45:57
     *
     * @private
     * @type {Client}
     */
    private client:Client;
    /**
     * Creates an instance of MessageCreateEvent.
     * @date 23/01/2024 - 23:32:17
     * @constructor
     * @param {Message} messageCreate
     */
    constructor(messageCreate:Message) {
        this.messageCreate = messageCreate;
        this.client = messageCreate.client
    }

    /**
     * @description Router for the MessageCreateEvent class.
     * @date 23/01/2024 - 23:32:40
     *
     * @public
     * @async
     * @returns {Promise<void>}
     */
    public async collector():Promise<void> {
        if(await this.handleEnderbotMessage()) return;
        if(this.messageCreate.author.bot) return;
        await this.handleMessage();
    }
    
    
    /**
     * @description Message event handler for both DM and server messages
     * @date 23/01/2024 - 23:42:52
     * @private
     * @async
     * @returns {Promise<void>}
     */
    private async handleMessage(): Promise<void> {
        const prefixRegex = new RegExp(`^(<@!?${this.client.user.id}>|${escapeRegex(prefix)})\\s*`);
        var args: string[] = [];
        let command: string = null;
        if(!this.messageCreate.content) return;
        let content = this.messageCreate.content.toLowerCase();
        let is_prefix = prefixRegex.test(content);
        if (is_prefix) {
            const [, matchedPrefix] = content.match(prefixRegex);
            args = content.slice(matchedPrefix.length).trim().split(/ +/);
            content = this.messageCreate.content.toLowerCase().slice(matchedPrefix.length);
            command = args.shift().toLowerCase();
        } else if(this.messageCreate.channel.isDMBased()) {
            command = content.split(' ')[0].slice(0).toLowerCase();
            args = content.split(' ').slice(1);
        }
        if(!command) return;
        let cmd = this.getCommand(command);
        if (!cmd) {
            command = this.getCommandFromAutoComplete(command);
            cmd = this.getCommand(command);
            if (!cmd) return;
        }
        console.log(`[🔄 COMMANDS] Running command: ${command} By ${this.messageCreate.author.username}`);
        cmd.run(this.client, this.messageCreate.author.id, this.messageCreate, args);
    }
    
    /**
     * @description Get the command from the autocompletion
     * @date 24/01/2024 - 12:34:55
     *
     * @private
     * @param {string} command
     * @returns {string}
     */
    private getCommandFromAutoComplete(command:string):string {
        const commandList = Array.from(ApplicationInstance.CommandsList.keys());
        const autocompletion = new Autocomplete(commandList, command);
        return autocompletion.getCommandAutocomplete();
    }


    private async handleEnderbotMessage():Promise<boolean> {
        if(this.messageCreate.author.bot && this.messageCreate.author.id === MessageCreateEvent.enderbotId) {
            const message = this.messageCreate
            await new EnderbotModules(message).read();
            return true
        }
        return false
    }
    

    
    /**
     * @description Get the command from the message
     * @date 23/01/2024 - 23:44:15
     *
     * @private
     * @param {string} command
     * @returns {Command}
     */
    private getCommand(command:string):Command {
        return ApplicationInstance.CommandsList.has(command) ? ApplicationInstance.CommandsList.get(command) : ApplicationInstance.AliasesList.has(command) ?  ApplicationInstance.CommandsList.get(ApplicationInstance.AliasesList.get(command)) : ApplicationInstance.CommandsList.get(command)
    }

}