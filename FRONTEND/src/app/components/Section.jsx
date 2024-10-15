'use client';
import React from 'react';
import { SECTION } from '../utils/section';
import Image from 'next/image';

export default function Section() {
    return (
        <div className="section">
            <h1>Our Specials</h1>
            <div className="section-blok">
                {SECTION.map((section) => (
                    <div className="section-blok__section" key={section.id}>
                        <div className="section-image-container">
                            <Image
                                src={section.image}
                                alt={section.title}
                                width={500}
                                height={300}
                                className="section-image"
                            />
                            <div className="section-info">
                                <h1>{section.title}</h1>
                                <h4>{section.subtitle}</h4>
                                <p>{section.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
