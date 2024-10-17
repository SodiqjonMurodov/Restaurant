import React from 'react';
import TablesPage from './tablespage';

export default async function Gallery() {
    // Получение данных с сервера
    const res = await fetch('http://127.0.0.1:8000/api/v1/tables');

    if (!res.ok) {
        throw new Error('Ошибка при получении данных');
    }

    const data = await res.json();

    return (
        <div>
            <TablesPage data={data} />
        </div>
    );
}
