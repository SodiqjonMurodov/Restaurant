import React from 'react';
import Title from '../components/Title';
import ContactsPage from './Contacts';

export default async function Contacts() {
    // Получение данных с сервера
    const res = await fetch('http://127.0.0.1:8000/api/v1/home/contacts');

    if (!res.ok) {
        throw new Error('Ошибка при получении данных');
    }

    const data = await res.json();

    return (
        <div>
            <Title />
            <ContactsPage data={data} />
        </div>
    );
}