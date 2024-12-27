import { randomUUID } from "crypto"
import { URL } from "url"

export async function generateMeaningfulAlias(longUrl:string,userId:string): Promise<string>{
    try {
        const url = new URL(longUrl)
        const alias = url.hostname.includes("www")?url.hostname.split(".")[1]:url.hostname.split(".")[0]
        return alias+"-"+userId.slice(-3)
       } catch (error) {
        return `${randomUUID().slice(-3)}-${userId.slice(-3)}`
    }
}

export function generateTopic():string{
    const random = Math.floor(Math.random()*10)
    return ["acquisition", "activation", "retention"][random>2 ? 2:random]
}
export function extractOS(userAgent:string):string{
    if(userAgent.includes('Windows')) return "Windows"
    if(userAgent.includes('Mac')) return "Mac"
    if(userAgent.includes('Linux')) return "Linux"
    if(userAgent.includes('Android')) return "Android"
    if(userAgent.includes('iOS')) return "iOS"
    return 'unknown'
}

export function extractDevice(userAgent:string):string{
    if(userAgent.includes("Mobile")) return "Mobile";
    if(userAgent.includes("Tablet")) return "Tablet";
    return 'Desktop'
}