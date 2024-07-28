import { Client, Message, Snowflake } from 'discord.js';
import BaseCommand from "../../Modules/Commands/BaseCommand";
import Command from "../../Types/Command";
import fs from 'fs';
import wUser from '../../Modules/Discordjs/User';

export default {
	async run(client:Client, author:Snowflake, message:Message, args:string[]) {
        await new Configuration(client, author, message, args).router()
    },
	help:{
		name: 'configuration',
	},
    aliases:[],

} as Command;

class Configuration extends BaseCommand {

    static db_path = './src/Modules/Database/config.json';

    private database = this.fetchDatabase();
    
    public constructor(client:Client, author:Snowflake, message:Message, args:string[]) {
        super(client, author, message, args);
    }

    
    /**
     * @description Run the command
     *
     * @public
     * @async
     * @returns {Promise<void>}
     */
    public async router():Promise<void> {
        if(!this.database.authorized_user_ids.includes(this.author)) this.message.channel.send("You are not allowed to use this command.");
        const sub = [
            "add",
            "remove"
        ]
        switch(this.getSubCommand(sub)) {
            case "add":
                this.add();
                break;
            case "remove":
                this.remove();
                break;
        }        
    }

    private add() {
        const user_id = this.args[0];
        if(wUser.isSnowflake(user_id)) {
            fs.readFile(Configuration.db_path, 'utf8', (err, data) => {
                if(err) throw err;
                const json = JSON.parse(data);
                json.authorized_user_ids.push(user_id);
                fs.writeFile(Configuration.db_path, JSON.stringify(json), 'utf8', (err) => {
                    if(err) throw err;
                    this.message.channel.send(`User <@${user_id}> added to the authorized_user_ids list.`);
                });
            })
        } else {
            this.message.channel.send("Please provide a valid user id.");
        }
    }


    private remove() {
        const user_id = this.args[0];
        if(wUser.isSnowflake(user_id)) {
            fs.readFile(Configuration.db_path, 'utf8', (err, data) => {
                if(err) throw err;
                const json = JSON.parse(data);
                json.authorized_user_ids = json.authorized_user_ids.filter((id:string) => id !== user_id);
                fs.writeFile(Configuration.db_path, JSON.stringify(json), 'utf8', (err) => {
                    if(err) throw err;
                    this.message.channel.send(`User <@${user_id}> removed from the authorized_user_ids list.`);
                });
            })
        } else {
            this.message.channel.send("Please provide a valid user id.");
        }
    }

    private fetchDatabase():any { 
        const file = fs.readFile('./src/Modules/Database/config.json', 'utf8', (err, data) => {
            if(err) throw err;
            return JSON.parse(data)
        })
    }
}