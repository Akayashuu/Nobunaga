import { Client, Message, Snowflake } from 'discord.js';
import BaseCommand from "../../Modules/Commands/BaseCommand";
import Command from "../../Types/Command";

export default {
	async run(client:Client, author:Snowflake, message:Message, args:string[]) {
        args[0] = 'inventory';
        new Inventory(client, author, message, args)
    },
	help:{
		name: 'inventory',
	},
    aliases:[],

} as Command;

class Inventory extends BaseCommand {
    
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
        const msg = `<@280726849842053120>/API inventory ${this.args[0]}`;
        this.message.channel.send(msg);
    }


}

export { Inventory };