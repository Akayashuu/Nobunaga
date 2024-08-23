import { Message } from "discord.js";
import EnderbotParser from "./EnderbotParser";

class EnderbotModules {

    private message:Message<boolean>;

    public constructor(message:Message<boolean>) {
        this.message = message;
    }

    public async read():Promise<void> {
        if(this.isCraft()) this.message.react("🔨")
        if(this.isForge()) this.message.react("🔧")
        if(this.isInventory()) this.message.react("📦")
    }

    private isCraft():boolean {
        if(this.message.embeds.length == 0) return false;
        if(this.message.embeds[0].fields.length < 2) return false
        const isPotionCraft = (this.message.embeds[0].fields[0].name == "Cost" && this.message.embeds[0].fields[1].name == "Information") 
        const isItemCraft = (this.message.embeds[0].fields[0].name == "Cost" && this.message.embeds[0].fields[1].name == "Item to Craft")
        return isPotionCraft || isItemCraft;
    }

    private isForge():boolean {
        if(this.message.embeds.length == 0) return false;
        if(this.message.embeds[0].fields.length < 2) return false;
        return this.message.embeds[0].fields[1].name == "Item to Forge" && this.message.embeds[0].fields[0].name == "Cost"
    }

    private isInventory():boolean {
        if(this.message.embeds.length == 0) return false;
        return this.message.embeds[0].title == "Resource page" || 
            this.message.embeds[0].title == "Exploration page" ||
            this.message.embeds[0].title == "Alchemy page"
    }
}

export default EnderbotModules;