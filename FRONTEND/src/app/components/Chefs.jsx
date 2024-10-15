'use client'
import React from 'react'
import { CHEFS } from '../utils/chefs'
import Image from 'next/image'

export default function Chefs() {
    return (
        <div className="chefs">
            <h1>Meet our professionals</h1>
            <div className="chefs-blok">
                {CHEFS.map(chef => (
                    <div key={chef.id} className="chefs-blok__section">
                        <Image src={chef.image} alt='' width={500} height={500} />
                        <p className="chefs__title">{chef.title}</p>
                        <p className="chefs__category">{chef.category}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}