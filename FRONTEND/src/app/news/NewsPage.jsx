import Link from 'next/link'
import React from 'react'

export default function NewsPage({ data }) {

    return (
        <div className='tables'>
            {(!data || data.length === 0) ? (
                <p>Нет новостей!</p>
            ) : (
                <div>
                    {data.map((item) => (
                        <div key={item.id}>
                            <h1>{item.title}</h1>
                            <Link href={`news/${item.id}`}>Detail</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}