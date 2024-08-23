import { APIEmbedField, Message } from "discord.js";

class EnderbotParser {



    static parseInventoryEmbed(message:Message<boolean>):EnderbotInventoryData {
        const embed = message.embeds;
        if(embed.length == 0) return null;
        const inventory = {} as EnderbotInventoryData;
        for(let field of embed[0].fields) {
            const category = field.name;
            const cleaned = this.cleanCraftData(field.value);
            const splitted = cleaned.split("\n");
            for(const line of splitted) {
                const name = line.split(":")[0].trim();
                const underscoreId = this.toUnderscore(name);
                const value = line.split(":")[1];
                const valueSplit = value.split(" ");
                const number = this.binaryNotationToNumber(valueSplit[1]);
                inventory[underscoreId] = {
                    name,
                    underscoreId,
                    number,
                    category
                }
            }
        }
        return inventory;
    }

    static parseForgeEmbed(message:Message<boolean>):EnderbotForgeData {
        const embed = message.embeds;
        if(embed.length == 0) return null;
        const data = embed[0].fields;
        const craftData = {} as EnderbotForgeData;
        for(const field of data) {
            if(field.name == "Cost") {
                craftData.cost = this.getCraftCost(field);
            } 
        }
        craftData.canForge = !Object.values(craftData.cost).some(cost => cost.missing);
        return craftData;
    }

    static parseCraftEmbed(message:Message<boolean>):EnderbotCraftData {
        const embed = message.embeds;
        if(embed.length == 0) return null;
        const data = embed[0].fields;
        const craftData = {} as EnderbotCraftData;
        for(const field of data) {
            if(field.name == "Cost") {
                craftData.cost = this.getCraftCost(field);
            } else {
                const id = field.value.match(/`\D*`/gm)[0].replace(/`/g, "");
                craftData.id = id;
                const secondRow = field.value.split("\n")[1];
                const name = secondRow.split(":")[1].trim();
                craftData.name = name
            }
        }
        craftData.canCraft = !Object.values(craftData.cost).some(cost => cost.missing);
        return craftData;
    }

    static getCraftCost(field:APIEmbedField):EnderbotCraftData["cost"] {
        const cleaned = this.cleanCraftData(field.value);
        const splitted = cleaned.split("\n");
        const cost = {} as EnderbotCraftData["cost"];
        for(const line of splitted) {
            const name = line.split(":")[0].trim();
            const underscoreId = this.toUnderscore(name);
            const value = line.split(":")[1];
            const isMissing = value.includes("❌");
            const valueSplit = value.split(" ");
            const number = isMissing ? valueSplit[valueSplit.length - 1].replace(")", "") : valueSplit[1]
            cost[underscoreId] = {
                name,
                underscoreId,
                number: this.binaryNotationToNumber(number),
                missing: isMissing
            }
        }
        return cost;
    }

    static toUnderscore(data:string):string {
        return data.toLowerCase().split(" ").join("_");
    }

    static cleanCraftData(data:string):string {
        return data.replace(/<:.*:.*>/g, "")
                   .replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, '');
    }

    static binaryNotationToNumber(data:string):number {
        const d = {k:1000, m:1000000, g:1000000000};
        const notation = data.slice(-1).toLocaleLowerCase();
        if(!d[notation]) return parseFloat(data);
        const number = data.slice(0, -1);
        return Math.trunc(parseFloat(number) * d[notation])
    } 
}

interface EnderbotInventoryData {
    [key:string]:{
        number:number
        underscoreId:string
        name:string
        category:string
    }
}

interface EnderbotCraftData {
    id:string
    name:string
    cost:{
        [key:string]:{
            number:number
            underscoreId:string
            name:string
            missing:boolean
        }
    }
    canCraft:boolean
}

interface EnderbotForgeData {
    cost:{
        [key:string]:{
            number:number
            underscoreId:string
            name:string
            missing:boolean
        }
    }
    canForge:boolean
}

export {EnderbotCraftData, EnderbotForgeData}

export default EnderbotParser;