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
    }

    private isCraft():boolean {
        if(this.message.embeds.length == 0) return false;
        return (this.message.embeds[0].fields[0].name == "Cost" && this.message.embeds[0].fields[1].name == "Information");
    }

    private isForge():boolean {
        if(this.message.embeds.length == 0) return false;
        return this.message.embeds[0].fields[1].name == "Item to Forge" && this.message.embeds[0].fields[0].name == "Cost"
    }
}

export default EnderbotModules;