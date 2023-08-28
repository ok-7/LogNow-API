import { Telegraf } from 'telegraf'
import { UserCollection } from '../database/collections/userCollection';
import { SellerCollection } from '../database/collections/sellerCollection';
import { ObjectId } from 'mongodb';

export const telegram = new class Telegram {

    private bot: Telegraf = null;
    
    constructor() {}

    public async start() {
        this.bot = new Telegraf('6594645810:AAF0A-bZA2J82CVmxwPZohTbtQeahGeYMQU');
        this.bot.launch();
    }

    public async sendMessage(user: UserCollection, message: string) {
        await this.bot.telegram.sendMessage(user.telegramId, message);
    }

    public async stop() {
        this.bot.stop();
    }

}   