import React from 'react';
import Title from '../components/Title';
import Link from 'next/link';

const NewsPage = async () => {
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
                            <Link href={`/news/${item.id}`}>Detail</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewsPage;