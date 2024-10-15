import React from 'react';
import Title from '../components/Title';

const MenuPage = async () => {
    // Получение данных с сервера
    const res = await fetch('http://127.0.0.1:8000/api/v1/menu');

    // Проверка на успешность ответа
    if (!res.ok) {
        throw new Error('Ошибка при получении данных');
    }
    
    const data = await res.json();
    console.log(data);

    return (
        <div>
            <Title />
            {(!data || data.length === 0) ? (
                <p>Нет изображений!</p>
            ) : (
                <div>
                    {data.map((item) => (
                        <div key={item.id}>
                            <img src={item.image} alt="Gallery" style={{ width: '100px' }}  />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MenuPage;