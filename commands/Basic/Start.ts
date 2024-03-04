import dayjs from 'dayjs';
import os from 'node-os-utils';
import { Markup, Scenes } from 'telegraf';
import { bold, fmt } from 'telegraf/format';

export const StartScene = new Scenes.BaseScene<Scenes.SceneContext>('start');

/**
 * Start
 * @param ctx Scenes.SceneContext
 * @returns Promise<Scenes.SceneContextMessageUpdate>
 */
StartScene.enter(async (ctx) => {
  /** Start Message */
  const startMessage = fmt`
${bold`Welcome To ChopLoris Bot`}

${bold`[ Your Info ] :`}
${bold`Your Name :`} ${ctx.from.first_name ?? ''} ${ctx.from.last_name ?? ''}
${bold`Your ID :`} ${ctx.from.id}
${bold`Chat ID :`} @${ctx.from.username ?? ''}

${bold`[ System Info ] :`}
${bold`System Status :`} Online
${bold`Owner :`} @ChopLoris
${bold`CPU (%) :`} ${isNaN(await os.cpu.usage()) ? '0' : await os.cpu.usage()}%
${bold`RAM (%) :`} ${(await os.mem.info()).usedMemPercentage}%
${bold`Time [IST] :`} ${dayjs.tz().format('DD-MM-YYYY hh:mm A')}
  `;

  /** For CallBack EditCaption
   * Otherwise Return The StartMessage
   */
  ctx.callbackQuery
    ? await ctx.editMessageCaption(startMessage, {
        ...Markup.inlineKeyboard(
          [
            Markup.button.callback('📝 Usecase ?', 'usecase'),
            Markup.button.callback('📚 Commands', 'commands'),
            Markup.button.callback('🧑🏼 Debrid Info', 'debrid_info'),
            Markup.button.callback('📊 Hosters', 'hoster_page'),
          ],
          {
            columns: 2,
          }
        ),
      })
    : await ctx.replyWithPhoto('https://i.pinimg.com/564x/20/be/dd/20beddba354a4e5eade803dd63d7f306.jpg', {
        caption: startMessage,
        ...Markup.inlineKeyboard(
          [
            Markup.button.callback('📝 Usecase ?', 'usecase'),
            Markup.button.callback('📚 Commands', 'commands'),
            Markup.button.callback('🧑🏼 Debrid Info', 'debrid_info'),
            Markup.button.callback('📊 Hosters', 'hoster_page'),
          ],
          {
            columns: 2,
          }
        ),
        reply_to_message_id: ctx.message.message_id,
      });
});

StartScene.action('back_to_start', async (ctx: Scenes.SceneContext) => {
    await ctx.answerCbQuery();
    await ctx.scene.enter('start');
  });
  
export const startSceneInvoke = async (ctx: Scenes.SceneContext) => {
    await ctx.scene.enter('start');
};