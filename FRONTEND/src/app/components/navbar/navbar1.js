import React from 'react';
import Navbar1Page from './Navbar1Page';

export default async function Navbar1() {
    // Получение данных с сервера
    const res = await fetch('http://127.0.0.1:8000/api/v1/contacts');

    if (!res.ok) {
        throw new Error('Ошибка при получении данных');
    }

    const data = await res.json();

    return (
        <div>
            <Navbar1Page data={data} />
        </div>
    );
}