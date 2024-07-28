import { Client, Message, Snowflake } from 'discord.js';
import BaseCommand from "../../Modules/Commands/BaseCommand";
import Command from "../../Types/Command";

export default {
	async run(client:Client, author:Snowflake, message:Message, args:string[]) {
        new Assert(client, author, message, args)
    },
	help:{
		name: 'assert',
	},
    aliases:[],

} as Command;

class Assert extends BaseCommand {
    
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
        const msg = `<@280726849842053120>/API assert ${this.args[0]} ${this.args[1]}`;
        this.message.channel.send(msg);
    }


}