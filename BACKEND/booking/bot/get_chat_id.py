import requests

TELEGRAM_TOKEN = '7284195478:AAG_vhbliECGSev14vuVy7Wc_GG6pq1-tbc'

def get_chat_id():
    url = f'https://api.telegram.org/bot{TELEGRAM_TOKEN}/getUpdates'
    response = requests.get(url)
    data = response.json()
    print(data)  # Bu yerda chat_id ni izlang

get_chat_id()