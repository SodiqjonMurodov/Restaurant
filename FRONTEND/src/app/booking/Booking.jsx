'use client';
import React, { useState, useEffect } from 'react';
import IMask from 'imask';
import { getCookie } from '../utils/cookies';  // Импортируем функцию получения cookies

export default function BookingPage() {
  const [formData, setFormData] = useState({
    full_name: '', // Изменено с fullname на full_name
    phone: '',
    email: '',
    guests: '',
    time: '',
    day: '', // Изменено с date на day
  });

  const [errors, setErrors] = useState({});

  const validatePhone = (phone) => {
    return /^\+998\d{9}$/.test(phone);
  };

  const validateGuests = (guests) => {
    const number = Number(guests);
    return number > 0 && number <= 20;
  };

  const validateTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours >= 11 && hours <= 21; // Убрано ограничение на минуты
  };

  const validateDate = (date) => {
    const today = new Date();
    const selectedDate = new Date(date);
    const threeMonthsFromNow = new Date(today);
    threeMonthsFromNow.setMonth(today.getMonth() + 3); // Устанавливаем максимум на 3 месяца

    return selectedDate >= today && selectedDate <= threeMonthsFromNow;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'guests' ? Number(value) : value, // Преобразуем в число, если это guests
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
  
    const newErrors = {};
    console.log('Form Data:', formData);
  
    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Некорректный формат телефона. Используйте формат +998XXXXXXXXX.';
    }
    if (!validateGuests(formData.guests)) {
      newErrors.guests = 'Количество гостей должно быть от 1 до 20.';
    }
    if (!validateTime(formData.time)) {
      newErrors.time = 'Время должно быть между 11:00 и 21:00.'; // Убрано ограничение на минуты
    }
  
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const threeMonthsFromNow = new Date(today);
    threeMonthsFromNow.setMonth(today.getMonth() + 3);
    const maxDateString = threeMonthsFromNow.toISOString().split('T')[0];
    
    if (formData.day < todayString || formData.day > maxDateString) { // Изменено с formData.date на formData.day
      newErrors.date = `Дата должна быть между ${todayString} и ${maxDateString}.`;
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    const csrfToken = getCookie('csrftoken');
  
    try {
      const dataToSend = {
        ...formData,
        guests: Number(formData.guests), // Преобразование в число
      };
  
      const res = await fetch('http://127.0.0.1:8000/api/v1/booking-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(dataToSend), // Отправляем изменённые данные
      });
  
      if (!res.ok) {
        throw new Error('Ошибка при отправке данных');
      }
  
      const result = await res.json();
      alert('Бронирование успешно отправлено!');
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при бронировании.');
      console.log('токеннн: ' + csrfToken);
    }
  };
  

  const minTime = "11:00";
  const maxTime = "21:00";

  return (
    <div className='booking'>
      <h1>Бронирование</h1>
      <div className="booking-blok">
        <form onSubmit={handleSubmit} className='booking-form'>
          <div className='booking-form__section'>
            <div className="booking-form__section-part">
              <input
                type="text"
                name="full_name" // Изменено с fullname на full_name
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Ваше полное имя"
                maxLength={35}
                minLength={3}
                required
              />
              {errors.fullname && <p className="error-text">{errors.fullname}</p>}
            </div>

            <div className="booking-blok__section-part">
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
              <p className='error-text hidden'>No text</p>
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
                placeholder="Время"
                required
                min={minTime} // Минимальное время
                max={maxTime} // Максимальное время
              />
              {errors.time && <p className="error-text">{errors.time}</p>}
            </div>
            <div className="booking-form__section-part">
              <input
                type="date"
                name="day" // Изменено с date на day
                value={formData.day}
                onChange={handleChange}
                placeholder="Дата"
                required
                min={new Date().toISOString().split('T')[0]} // Устанавливаем минимальную дату
                max={new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0]} // Устанавливаем максимальную дату на 3 месяца вперед
              />
              {errors.date && <p className="error-text">{errors.date}</p>}
            </div>
          </div>

          <button type="submit">Забронировать</button>
        </form>
      </div>
    </div>
  );
};
