'use client';
import React, { useState, useEffect } from 'react';
import IMask from 'imask';
import { getCookie } from '../utils/cookies';  // Импортируем функцию получения cookies

export default function BookingPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    guests: '',
    time: '',
    day: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // Для предотвращения спама кнопки
  const [isSuccess, setIsSuccess] = useState(false); // Для отображения компонента успешной отправки

  const validatePhone = (phone) => {
    return /^\+998\d{9}$/.test(phone);
  };

  const validateGuests = (guests) => {
    const number = Number(guests);
    return number > 1 && number <= 20;
  };

  const validateTime = (time) => {
    const [hours] = time.split(':').map(Number);
    return hours >= 11 && hours <= 21;
  };

  const validateDate = (date) => {
    const today = new Date();
    const selectedDate = new Date(date);
    const threeMonthsFromNow = new Date(today);
    threeMonthsFromNow.setMonth(today.getMonth() + 3);
    return selectedDate >= today && selectedDate <= threeMonthsFromNow;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'guests' ? Number(value) : value,
    });
  };

  useEffect(() => {
    const phoneInput = document.querySelector('[name="phone"]');
    if (phoneInput) {
      IMask(phoneInput, {
        mask: '+998000000000',
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Блокируем кнопку
    const newErrors = {};
    console.log('Form Data:', formData);

    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Некорректный формат телефона.';
    }
    if (!validateGuests(formData.guests)) {
      newErrors.guests = 'Количество гостей должно быть от 2 до 20.';
    }
    if (!validateTime(formData.time)) {
      newErrors.time = 'Выберите время между 11:00 и 21:00.';
    }

    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const threeMonthsFromNow = new Date(today);
    threeMonthsFromNow.setMonth(today.getMonth() + 3);
    const maxDateString = threeMonthsFromNow.toISOString().split('T')[0];

    if (formData.day < todayString || formData.day > maxDateString) {
      newErrors.date = `Дата должна быть между ${todayString} и ${maxDateString}.`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false); // Разблокируем кнопку
      return;
    }

    const csrfToken = getCookie('csrftoken');

    try {
      const dataToSend = {
        ...formData,
        guests: Number(formData.guests),
      };

      const res = await fetch('http://127.0.0.1:8000/api/v1/booking-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) {
        throw new Error('Ошибка при отправке данных');
      }

      const result = await res.json();
      alert('Бронирование успешно отправлено!');

      // Очистка формы
      setFormData({
        full_name: '',
        phone: '',
        email: '',
        guests: '',
        time: '',
        day: '',
      });

      setIsSuccess(true); // Отображаем компонент подтверждения
    } catch (error) {
      alert('Произошла ошибка при бронировании.');
    } finally {
      setIsSubmitting(false); // Разблокируем кнопку
    }
  };

  const minTime = '11:00';
  const maxTime = '21:00';

  return (
    <div className='booking'>
      <h1>Бронирование</h1>

      {isSuccess ? (
        <div className="success-message">
          <h2>Бронирование успешно!</h2>
          <p>Ваше бронирование подтверждено. Спасибо за выбор нашего ресторана!</p>
        </div>
      ) : (
        <div className="booking-blok">
          <form onSubmit={handleSubmit} className='booking-form'>
            <div className='booking-form__section'>
              <div className="booking-form__section-part">
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Ваше полное имя"
                  maxLength={35}
                  minLength={3}
                  required
                />
                {errors.full_name && <p className="error-text">{errors.full_name}</p>}
              </div>

              <div className="booking-form__section-part">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Телефон"
                  required
                />
                {errors.phone && <p className="error-text">{errors.phone}</p>}
              </div>
            </div>

            <div className='booking-form__section'>
              <div className="booking-form__section-part">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>

              <div className="booking-form__section-part">
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  placeholder="Гости"
                  required
                  min={0}
                  max={20}
                />
                {errors.guests && <p className="error-text">{errors.guests}</p>}
              </div>
            </div>

            <div className='booking-form__section'>
              <div className="booking-form__section-part">
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  min={minTime}
                  max={maxTime}
                />
                {errors.time && <p className="error-text">{errors.time}</p>}
              </div>

              <div className="booking-form__section-part">
                <input
                  type="date"
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  max={new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0]}
                />
                {errors.date && <p className="error-text">{errors.date}</p>}
              </div>
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Отправка...' : 'Забронировать'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};