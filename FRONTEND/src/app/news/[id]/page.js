import React from 'react';
import Title from '@/app/components/Title';
import NewsDetailPage from './NewsDetail';

const NewsDetail = async ({ params }) => {
    const { id } = params; // Получаем id из параметров

    const res = await fetch(`http://127.0.0.1:8000/api/v1/posts/${id}`);

    if (!res.ok) {
        throw new Error('Ошибка при получении данных');
    }

    const data = await res.json();

    return (
        <div>
            <Title />
            <NewsDetailPage data={data} />
        </div>
    );
};

export default NewsDetail;