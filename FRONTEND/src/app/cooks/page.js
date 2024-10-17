import React from 'react';
import Title from '../components/Title';
import Link from 'next/link';

const CookPage = async () => {
    // Получение данных с сервера
    const res = await fetch('http://127.0.0.1:8000/api/v1/cooks');

    // Проверка на успешность ответа
    if (!res.ok) {
        throw new Error('Ошибка при получении данных');
    }
    
    const data = await res.json();

    return (
        <div>
            <Title />
            {(!data || data.length === 0) ? (
                <p>Нет поваров!</p>
            ) : (
                <div>
                    {data.map((item) => (
                        <div key={item.id}>
                            <h1>{item.id}</h1>
                            <Link href={`cooks/${item.id}`}></Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CookPage;