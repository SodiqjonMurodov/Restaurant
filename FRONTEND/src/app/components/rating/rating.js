import React from 'react';
import RatingPage from './RatingPage';

export default async function Rating() {
    // Получение данных с сервера
    const res = await fetch('http://127.0.0.1:8000/api/v1/rating');

    if (!res.ok) {
        throw new Error('Ошибка при получении данных');
    }

    const data = await res.json();

    return (
        <div>
            <RatingPage data={data} />
        </div>
    );
}