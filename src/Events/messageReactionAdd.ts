import { Message, MessageReaction, PartialMessage, PartialMessageReaction, PartialUser, User } from "discord.js";
import EnderbotModules from "../Modules/Enderbot/EnderbotModules";
import EnderbotParser, { EnderbotCraftData, EnderbotForgeData } from "../Modules/Enderbot/EnderbotParser";
import Get from "../Commands/Get/Get";
import Add from "../Commands/Add/Add";



export default async (message:MessageReaction | PartialMessageReaction, user:PartialUser | User) => {
    await new messageReactionAdd(message, user).collector();
}

class messageReactionAdd {

    private message:MessageReaction | PartialMessageReaction;
    private user:PartialUser | User;

    constructor(message:MessageReaction | PartialMessageReaction, user:PartialUser | User) {
        this.message = message;
        this.user = user;
    }

    public async collector():Promise<void> {
        if(!this.message.message) return;
        if(this.message.message.embeds.length == 0) return;
        if (this.isEnderbotCraft()) {
            const craft = EnderbotParser.parseCraftEmbed(this.message.message as Message);
            if(!craft || craft?.canCraft) return;
            this.handleEnderbotAction(craft, this.message.message as Message, this.user.id);
        }
        if (this.isEnderbotForge()) {
            const forge = EnderbotParser.parseForgeEmbed(this.message.message as Message);
            if(!forge || forge?.canForge) return;
            this.handleEnderbotAction(forge, this.message.message as Message, this.user.id);
        }
        if (this.isInventoryAdd()) {
            const inventory = EnderbotParser.parseInventoryEmbed(this.message.message as Message);
            if(!inventory) return;
            const args = Object.keys(inventory).map(key => `${inventory[key].underscoreId} ${inventory[key].number}`);
            await Add.run(this.message.message.client, this.user.id, this.message.message as Message, args);
        }
    }

    private isEnderbotCraft():boolean {
        if(!this.message.message) return false;
        return this.message.emoji.name == "🔨" && this.message.message.author.id == "280726849842053120" && !this.user.bot
    }

    private isEnderbotForge():boolean {
        if(!this.message.message) return false;
        return this.message.emoji.name == "🔧" && this.message.message.author.id == "280726849842053120" && !this.user.bot
    }

    private isInventoryAdd():boolean {
        if(!this.message.message) return false;
        return this.message.emoji.name == "📦" && this.message.message.author.id == "280726849842053120" && !this.user.bot
    }

    private async handleEnderbotAction(action: EnderbotCraftData | EnderbotForgeData, message: Message, userId: string):Promise<void> {
        delete action.cost.mana;
        
        const costArr = Object.entries(action.cost).filter(([e, k]) => k.missing).map(
            ([key, value]) => {
                return `${value.underscoreId} ${parseInt(`${value.number * 1.03}`)}`
            }
        );
        
        await Get.run(message.client, userId, message, costArr);
    }

}