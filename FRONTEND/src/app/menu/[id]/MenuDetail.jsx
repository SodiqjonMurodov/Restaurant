import React from 'react'

export default function MenuDetail({ data }) {

    return (
        <div className='tables'>
            <div>
                {(!data) ? (
                    <p>Нет меню подробных</p>
                ) : (
                    <div>
                        <h1>{data.title}</h1>
                    </div>
                )}
            </div>
        </div>
    )
}