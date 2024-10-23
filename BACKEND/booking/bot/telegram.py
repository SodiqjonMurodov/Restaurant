from telegram import Bot
from telegram.error import TelegramError

TELEGRAM_TOKEN = '7284195478:AAG_vhbliECGSev14vuVy7Wc_GG6pq1-tbc'
TELEGRAM_CHAT_ID = '6808301881'

async def send_to_telegram(message):
    bot = Bot(token=TELEGRAM_TOKEN)

    try:
        await bot.send_message(chat_id=TELEGRAM_CHAT_ID, text=message)
    except TelegramError as e:
        print(f"Telegram error: {e}")

