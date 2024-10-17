import React from 'react';
import Section from './Section';

export default async function MenuHome() {
    // Получение данных с сервера
    const res = await fetch('http://127.0.0.1:8000/api/v1/home/menu');

    if (!res.ok) {
        throw new Error('Ошибка при получении данных');
    }

    const data = await res.json();

    return (
        <div>
            <Section data={data} />
        </div>
    );
}