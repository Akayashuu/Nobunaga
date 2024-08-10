import { Client, Message, Snowflake } from 'discord.js';
import BaseCommand from "../../Modules/Commands/BaseCommand";
import Command from "../../Types/Command";
import { Inventory } from '../Inventory/Inventory';

export default {
	async run(client:Client, author:Snowflake, message:Message, args:string[]) {
		args[0] = 'ressource';
        new Inventory(client, author, message, args)
    },
	help:{
		name: 'ressource',
	},
    aliases:[],

} as Command;