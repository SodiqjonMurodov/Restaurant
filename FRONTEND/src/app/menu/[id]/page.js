import React from 'react';
import MenuDetail from './MenuDetail';
import TitleDetail from '@/app/components/TitleDetail';

const NewsDetail = async ({ params }) => {
    const { id } = params; // Получаем id из параметров

    const res = await fetch(`http://127.0.0.1:8000/api/v1/menu/${id}`);

    if (!res.ok) {
        throw new Error('Ошибка при получении данных');
    }

    const data = await res.json();

    return (
        <div>
            <TitleDetail data={data} />
            <MenuDetail data={data} />
        </div>
    );
};

export default NewsDetail;