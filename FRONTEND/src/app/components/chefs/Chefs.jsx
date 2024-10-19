'use client'
import React from 'react'
import Image from 'next/image'

export default function ChefsPage({data}) {
    return (
        <div className="chefs">
            <h1>Наши Профессионалы!</h1>
            <div className="chefs-blok">
                {(!data || data.length === 0) ? (
                    <p>Нет меню!</p>
                ) : (
                    data.map((item) => (
                        <div key={item.id} className="chefs-blok__section">
                            <Image src={item.image} alt={item.full_name} width={500} height={500} />
                            <p className="chefs__title">{item.full_name}</p>
                            <p className="chefs__category">{item.skill} лет опыта</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}