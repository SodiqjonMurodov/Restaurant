'use client'
import React from 'react'

export default function TablesPage({ data }) {
    return (
        <div className='tables'>
            {(!data || data.length === 0) ? (
                <p>Нет столов!</p>
            ) : (
                <div>
                    {data.map((item) => (
                        <div key={item.id}>
                            <h1>{item.name}</h1>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
