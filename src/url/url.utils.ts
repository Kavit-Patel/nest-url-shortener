import { URL } from "url"

export async function generateMeaningfulAlias(longUrl:string,userId:string): Promise<string>{
    try {
        const url = new URL(longUrl)
        return url.hostname.split(".")[1]+"-"+userId.slice(0,3)
    } catch (error) {
        return "alias"
    }
}

export function generateTopic():string{
    const random = Math.floor(Math.random()*10)
    return ["acquisition", "activation", "retention"][random>2 ? 2:random]
}