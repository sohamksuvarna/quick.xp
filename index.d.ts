import { Options } from "quick.db";

declare module "quick.xp" {
export class SQLiteManager {
    constructor(options: Options);

    public giveXP(message: object, xprate: number): Promise<number>;
    public getLevel(guildid: string, userid: string): Promise<number>;
    public getXP(guildid: string, userid: string): Promise<number>;
    public leaderboard(guildid: string | false, limit: number): Promise<Leaderboard[]>;
    public resetLevel(guildid: string, userid: string): Promise<boolean>;
    public reset(): Promise<boolean>;
}

export class MongoManager {
    constructor(options: Options);

    public async giveXP(message: object, xprate: number): Promise<number>;
    public async getLevel(guildid: string, userid: string): Promise<number>;
    public async getXP(guildid: string, userid: string): Promise<number>;
    public async leaderboard(guildid: string | false, limit: number): Promise<Leaderboard[]>;
    public async resetLevel(guildid: string, userid: string): Promise<boolean>;
    public async reset(): Promise<boolean>;
}

export const version: string;
}