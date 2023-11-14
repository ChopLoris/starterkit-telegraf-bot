import dayjs from 'dayjs';
import { Context } from 'telegraf';
import { bold, fmt } from 'telegraf/format';

class Middleware {
  static ValidateUser = async (ctx: Context, next: any) => {
    // Action Valid User
  };

  static ValidateAdmin = async (ctx: Context, next: any) => {
    //Action Valid Admin
  };
}

export default Middleware;
