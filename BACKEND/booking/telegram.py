from telegram import Bot
from telegram.error import TelegramError

TELEGRAM_TOKEN = '7284195478:AAG_vhbliECGSev14vuVy7Wc_GG6pq1-tbc'  # BotFather'dan olingan token
TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID'  # Restoran egasining Telegram chat ID'si

def send_to_telegram(message):
    bot = Bot(token=TELEGRAM_TOKEN)
    try:
        bot.send_message(chat_id=TELEGRAM_CHAT_ID, text=message)
    except TelegramError as e:
        print(f"Telegram error: {e}")