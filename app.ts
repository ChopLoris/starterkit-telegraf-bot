import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import DotEnv from "dotenv";
import Middleware from '@commands/Middleware';
import { StartScene, startSceneInvoke, pingCommand } from '@commands/Basic';
import { Context, Scenes, Telegraf, session } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';

/** DayJS Configurations */
dayjs.extend(utc);
dayjs.extend(timezone);

/** Set Default Timezone */
dayjs.tz.setDefault('Asia/Jakarta');

/** Load Environment Variables */
DotEnv.config({ path: '.env.local' });

/** Bot Configurations */
const Bot = new Telegraf<Context & SceneContext>(process.env.TELEGRAM_BOT_TOKEN as string);
const stage = new Scenes.Stage<Scenes.SceneContext>([StartScene]);
Bot.use(session());
Bot.use(stage.middleware());

/** Bot BasicCommands */
Bot.command('start', startSceneInvoke);
Bot.command('ping', pingCommand);

/** Bot Launch */
Bot.launch({ dropPendingUpdates: true }).then((_) => console.log('Bot started'));