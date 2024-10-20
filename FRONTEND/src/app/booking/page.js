import React from 'react';
import Title from '../components/Title';
import BookingPage from './Booking';

export default async function Booking() {
    // Получение данных с сервера
    const res = await fetch('http://127.0.0.1:8000/api/v1/home/menu');

    if (!res.ok) {
        throw new Error('Ошибка при получении данных');
    }

    const data = await res.json();

    return (
        <div>
            <Title />
            <BookingPage data={data} />
        </div>
    );
}