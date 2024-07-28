import { Client, Collection, GatewayIntentBits, Partials, RESTPostAPIChatInputApplicationCommandsJSONBody, Snowflake } from "discord.js";
import Command from "./Types/Command";
import EventLoader from "./Utils/EventLoader";
import fs from 'fs';

 
class Application {
    /**
     * @description The client of the application
     * @date 22/01/2024 - 23:28:59
     *
     * @public
     * @type {WhiteClient}
     */
    public Client: Client;
    /**
     * @description The commands list of the application
     * @date 22/01/2024 - 23:30:04
     *
     * @public
     * @type {Collection<string, Command>}
     */
    public CommandsList:Collection<string, Command>;
    /**
     * @description The aliases list of the commands
     * @date 22/01/2024 - 23:33:25
     *
     * @public
     * @type {Collection<string, string>}
     */
    public AliasesList:Collection<string, string>;
    

    /**
     * Creates an instance of Application.
     * @date 22/01/2024 - 23:35:18
     *
     * @constructor
     * @public
     */
    public constructor() {
        this.Client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.MessageContent], partials: [Partials.Message, Partials.Channel, Partials.Reaction, ] });
        this.CommandsList = new Collection();
        this.AliasesList = new Collection()
    }

    
    /**
     * @description Initialize the application
     * @date 22/01/2024 - 23:54:28
     *
     * @private
     * @async
     * @returns {Promise<void>}
     */
    public async init():Promise<void> {
        EventLoader(this.Client)
        this.commandHandler();
        await this.Client.login(process.env.TOKEN);
    }


    /**
     * @description Handle the commands
     * @date 22/01/2024 - 23:57:57
     * @private
     */
    private commandHandler():void {
        fs.readdir(__dirname+'/Commands/', (err, files) => {
            if (err) console.error(err);
            console.log(`[🔄 COMMANDS]  a total of ${files.length} commands.`);
            files.forEach(async f => {
                console.log(`[🔄 COMMANDS] Loading Module: ${f}`);
                const command:{default:Command} = await import(__dirname+`/Commands/${f}/${f}`);
                this.CommandsList.set(command.default.help.name, command.default);    
                if (command.default.aliases) {
                    command.default.aliases.forEach(alias => {
                        this.AliasesList.set(alias, command.default.help.name);
                    });
                }        
            });
        })
    }
}

export default Application;