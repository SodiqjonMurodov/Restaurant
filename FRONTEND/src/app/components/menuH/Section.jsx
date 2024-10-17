'use client';
import React from 'react';
import Image from 'next/image';

export default function Section({ data }) {
    return (
        <div className="section">
            <h1>Our Specials</h1>
            <div className="section-blok">
                {(!data || data.length === 0) ? (
                    <p>Нет меню!</p>
                ) : (
                    data.map((item) => (
                        <div className="section-blok__section" key={item.id}>
                            <div className="section-image-container">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={500}
                                    height={300}
                                    className="section-image"
                                />
                                <div className="section-info">
                                    <h1>{item.title}</h1>
                                    <h4>{item.subtitle}</h4>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
