'use client'
import RatingPage from '@/app/components/rating/RatingPage';
import React from 'react'
import { IoTimeOutline } from "react-icons/io5";

export default function MenuDetail({ data }) {

    return (
        <div>
            <div>
                {(!data) ? (
                    <p>Нет меню подробных</p>
                ) : (
                    <div className='menudetail'>
                        <div className="menudetail-blok">
                            <div className="menudetail-blok__section menudetail-blok__section-1">
                                <img src={data.image} alt={data.title} />
                            </div>
                            <div className="menudetail-blok__section">
                                <h1 className='menudetail__title'>{data.title}</h1>
                                <p className='menudetail-blok__section-p'>Описание</p>
                                <p className='menudetail__subtitle'>{data.subtitle}</p>
                                <div className="menudetail-blok__section-container">
                                    <IoTimeOutline className='menudetail__icon' />
                                    <b className='menudetail__time'>{data.time} мин</b>
                                </div>
                                <RatingPage />  
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}