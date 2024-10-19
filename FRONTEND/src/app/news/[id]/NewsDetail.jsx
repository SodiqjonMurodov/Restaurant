import React from 'react'

export default function NewsDetailPage({ data }) {

    return (
        <div className='tables'>
            <div>
                {(!data) ? ( // Проверка только на наличие данных
                    <p>Нет новостей подробных</p>
                ) : (
                    <div>
                        <h1>{data.title}</h1>
                    </div>
                )}
            </div>
        </div>
    )
}