import { Options } from "quick.db";

declare module "quick.xp" {
export class XPManager {
    constructor(options: Options);

    public giveXP(message: object, xprate: number): Promise<number>;
    public getLevel(guildid: string, userid: string): Promise<number>;
    public getXP(guildid: string, userid: string): Promise<number>;
    public leaderboard(guildid: string | false, limit: number): Promise<Leaderboard[]>;
    public resetLevel(guildid: string, userid: string): Promise<boolean>;
    public reset(): Promise<boolean>;
}

export const version: string;
}
