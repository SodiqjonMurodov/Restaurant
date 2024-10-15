import React from 'react';
import Title from '@/app/components/Title';

const NewsDetail = async ({ params }) => {
    const { id } = params; // Получаем id из параметров

    // Получение данных с сервера
    const res = await fetch(`http://127.0.0.1:8000/api/v1/news/${id}`); // Используем id в URL

    // Проверка на успешность ответа
    if (!res.ok) {
        throw new Error('Ошибка при получении данных');
    }
    const data = await res.json();

    return (
        <div>
            <Title />
            {(!data) ? ( // Проверка только на наличие данных
                <p>Нет повара для отображения.</p>
            ) : (
                <div>
                    <h1>ДИНАМИЧЕСКАЯ СТРАНИЦА!</h1>
                </div>
            )}
        </div>
    );
};

export default NewsDetail;