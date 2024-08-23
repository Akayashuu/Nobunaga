import { Message, MessageReaction, PartialMessage, PartialMessageReaction, PartialUser, User } from "discord.js";
import EnderbotModules from "../Modules/Enderbot/EnderbotModules";
import EnderbotParser, { EnderbotCraftData, EnderbotForgeData } from "../Modules/Enderbot/EnderbotParser";
import Get from "../Commands/Get/Get";
import Add from "../Commands/Add/Add";



export default async (oldMessage: Message<boolean> | PartialMessage, newMessage: Message<boolean> | PartialMessage)=> {
    await new messageUpdate(oldMessage, newMessage).collector();
}


class messageUpdate {

    static enderbotId = "280726849842053120";
    private oldMessage: Message<boolean> | PartialMessage;
    private newMessage: Message<boolean> | PartialMessage;

    constructor(oldMessage: Message<boolean> | PartialMessage, newMessage: Message<boolean> | PartialMessage) {
        this.oldMessage = oldMessage;
        this.newMessage = newMessage;
    }

    public async collector():Promise<void> {
        if(await this.handleEnderbotMessage()) return;
        if(this.newMessage.author.bot) return;
    }


    private async handleEnderbotMessage():Promise<boolean> {
        if(this.newMessage.author.bot && this.newMessage.author.id === messageUpdate.enderbotId) {
            await new EnderbotModules(this.newMessage as Message<boolean>).read();
            return true
        }
        return false
    }
}