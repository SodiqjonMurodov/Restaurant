import React from 'react';
import Title from '../components/Title';
import Link from 'next/link';

const CooksPage = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/v1/cooks');

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
                            <h1>Возраст: {item.age}</h1>
                            <h1>Полное имя: {item.full_name}</h1>
                            <Link href={`/cooks/${item.id}`}>Detail</Link>
                            <img src={item.image} alt={item.full_name} style={{width: '100px'}} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CooksPage;