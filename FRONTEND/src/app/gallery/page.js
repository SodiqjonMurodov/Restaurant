import React from 'react';
import GalleryPage from './GalleryPage';
import Title from '../components/Title';

export default async function Gallery() {
    // Получение данных с сервера
    const res = await fetch('http://127.0.0.1:8000/api/v1/gallery');

    if (!res.ok) {
        throw new Error('Ошибка при получении данных');
    }

    const data = await res.json();

    return (
        <div>
            <Title />
            <GalleryPage data={data} />
        </div>
    );
}
