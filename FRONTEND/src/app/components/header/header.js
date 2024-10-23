import React from 'react'
import HeaderPage from './Headerpage';

export default async function Header() {

    const res = await fetch('http://127.0.0.1:8000/api/v1/contacts')

    if (!res.ok) {
        throw new Error('Ошибка при получении данных')
    }

    const data = await res.json();

    return (
        <div>
            <HeaderPage data={data} />
        </div>
    )
};