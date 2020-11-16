import { table } from "quick.db";
import { Database } from 'quickmongo';

declare module "quick.xp" {
    
    interface Options {
        cooldown: number;
        levelUpMessage: string;
        levelUpChannel: string;
        dm: boolean;
        noDM: string;
    }

    interface Leaderboard {
        position: number;
        id: string;
        xp: number;
    }

    interface MongoOptions extends Options {
        mongodbURL: string;
    }

    export class SQLiteManager {
        db: table;
        cooldown: number;
        levelUpMessage: string;
        levelUpChannel: string;
        dm: boolean;
        noDM: string;
        
        constructor(options: Options);

        public giveXP(message: object, xprate: number): Promise<number>;
        public getLevel(guildid: string, userid: string): Promise<number>;
        public getXP(guildid: string, userid: string): Promise<number>;
        public leaderboard(guildid: string | false, limit: number): Promise<Leaderboard[]>;
        public resetLevel(guildid: string, userid: string): Promise<boolean>;
        public reset(): Promise<boolean>;
        public validateOptions(): boolean;

        private substitute(): string;
    }

    export class MongoManager {
        
        db: Database;
        cooldown: number;
        levelUpMessage: string;
        levelUpChannel: string;
        dm: boolean;
        noDM: string;

        constructor(options: MongoOptions);

        public giveXP(message: object, xprate: number): Promise<number>;
        public getLevel(guildid: string, userid: string): Promise<number>;
        public getXP(guildid: string, userid: string): Promise<number>;
        public leaderboard(guildid: string | false, limit: number): Promise<Leaderboard[]>;
        public resetLevel(guildid: string, userid: string): Promise<boolean>;
        public reset(): Promise<boolean>;
        public validateOptions(): boolean

        private substitute(): string;
    }

    export const version: string;
}