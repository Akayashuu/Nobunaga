import { Client, Message, Snowflake } from 'discord.js';
import BaseCommand from "../../Modules/Commands/BaseCommand";
import Command from "../../Types/Command";
import fs from 'fs';

export default {
	async run(client:Client, author:Snowflake, message:Message, args:string[]) {
        new Get(client, author, message, args)
    },
	help:{
		name: 'get',
	},
    aliases:[],

} as Command;

class Get extends BaseCommand {
    
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
        const database = this.fetchDatabase();
        if(database.authorized_user_ids.includes(this.author)) {
            const msg = `<@280726849842053120>/API trade ${this.args.join(' ')} <@${this.author}>`;
            this.message.channel.send(msg);
        } else {
            this.message.channel.send('You are not authorized to use this command :(');
        }
    }

    private fetchDatabase():any { 
        const file = fs.readFile('./src/Modules/Database/config.json', 'utf8', (err, data) => {
            if(err) throw err;
            return JSON.parse(data)
        })
    }


}