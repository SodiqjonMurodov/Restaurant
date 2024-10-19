import React from 'react';
import NewsPage from './NewsPage';
import Title from '../components/Title';

export default async function News() {
    // Получение данных с сервера
    const res = await fetch('http://127.0.0.1:8000/api/v1/posts');

    if (!res.ok) {
        throw new Error('Ошибка при получении данных');
    }

    const data = await res.json();

    return (
        <div>
            <Title />
            <NewsPage data={data} />
        </div>
    );
}
