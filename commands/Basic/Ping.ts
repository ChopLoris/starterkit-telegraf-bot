import { Context } from "telegraf";
import { Message, Update } from 'telegraf/typings/core/types/typegram';

/**
 * Description
 * @param {any} ctx:Context<Update.MessageUpdate<Message.TextMessage>>
 * @returns {any}
 */
export const pingCommand = async (ctx: Context<Update.MessageUpdate<Message.TextMessage>>) => {
    try {
        const t_id = ctx.message.text.split(' ').slice(1)[0];
        return await ctx.reply('Helow succ')
    }
    catch (err) {
        console.log(err)
    }
}