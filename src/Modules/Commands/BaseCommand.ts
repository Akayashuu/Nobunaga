import { Client, Message, Snowflake } from "discord.js";
import Autocomplete, { AutcompleteOptions } from "./Autocomplete";

class BaseCommand {

    public client:Client;
    public author:Snowflake;
    public message:Message;
    public args:string[];

    /**
     * Creates an instance of BaseCommand.
     *
     * @constructor
     * @public
     * @param {Client} client
     * @param {Snowflake} author
     * @param {Message} message
     * @param {string[]} args
     */
    public constructor(client:Client, author:Snowflake, message:Message, args:string[]) {
        this.client = client;
        this.author = author;
        this.message = message;
        this.args = args;
    }

    protected getSubCommand(subcommands:Array<string>, options:AutcompleteOptions & {ignore?:boolean} = {}):(string|false) {
        if(options.ignore) return false;
        const auto = new Autocomplete(subcommands, this.args[0] || "", options);
        const sub = auto.getSubArgumentAutocomplete()
        if(sub) {
            this.args.shift();
            return sub
        }
        (async e => {
            await this.message.channel.send("Please provide a valid subcommand: " + subcommands.join(", "));
        })()
        return false;
    }
}

export default BaseCommand;