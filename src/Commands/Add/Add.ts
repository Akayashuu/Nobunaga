import { Client, Message, Snowflake } from 'discord.js';
import BaseCommand from "../../Modules/Commands/BaseCommand";
import Command from "../../Types/Command";

export default {
	async run(client:Client, author:Snowflake, message:Message, args:string[]) {
        new Add(client, author, message, args)
    },
	help:{
		name: 'add',
	},
    aliases:[],

} as Command;

class Add extends BaseCommand {
    
    public constructor(client:Client, author:Snowflake, message:Message, args:string[]) {
        super(client, author, message, args);
        this.run();
    }

    
    /**
     * @description Run the command
     *
     * @public
     * @async
     * @returns {Promise<void>}
     */
    public async run():Promise<void> {
        const msg = `<@280726849842053120>/API trade <@${this.author}> ${this.args.join(' ')}`;
        this.message.channel.send(msg);
    }


}