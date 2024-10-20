import uuid
from django.core.mail import send_mail


def send_confirmation_email(reservation):
    # Generate a unique token
    token = str(uuid.uuid4())

    # Save token to Booking model
    reservation.confirmation_token = token
    reservation.save()

    # Send message
    send_mail(
        subject = 'Подтверждение бронирования',
        message=f"""
            Здравствуйте, {reservation.full_name}!

            Пожалуйста, подтвердите своё бронирование, перейдя по ссылке ниже:
            http://127.0.0.1:8000/api/v1/confirm/{token}

            Спасибо за выбор нашего ресторана!
            """,
        from_email='murodovsodiq1800@gmail.com',
        recipient_list=[reservation.email],
        fail_silently=False,
    )
