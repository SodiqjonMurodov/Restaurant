// app/cooks/[id]/page.js

import React from 'react';
import Title from '@/app/components/Title';

const CooksDetail = async ({ params }) => {
    const { id } = params; // Получаем id из параметров

    // Получение данных с сервера
    const res = await fetch(`http://127.0.0.1:8000/api/v1/cooks/${id}`); // Используем id в URL

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
                    <h1>Умение: {data.skill}</h1>
                    <h1>Полное имя: {data.full_name}</h1>
                </div>
            )}
        </div>
    );
};

export default CooksDetail;