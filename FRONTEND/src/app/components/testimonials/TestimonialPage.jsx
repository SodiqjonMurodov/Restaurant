'use client'
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function TestimonialPage({ data }) {
    // Настройки карусели
    const settings = {
        dots: true,
        arrows: false,
        infinite: data.length > 3, // Зацикливание только если отзывов больше, чем показывается
        speed: 500,
        slidesToShow: Math.min(3, data.length), // Количество отображаемых слайдов не больше, чем отзывов
        slidesToScroll: 1,
        customPaging: (i) => (
            <button className="custom-dot"></button>
        ),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="testimonials">
            <Slider {...settings}>
                {(!data || data.length === 0) ? (
                    <p>Нет отзывов!</p>
                ) : (
                    data.map((item) => (
                        <div key={item.id} className="testimonials-blok__section">
                            <h3 className="testimonials__title">{item.name}</h3>
                            <p className="testimonials__description">- {item.description}</p>
                            <img src={item.image} alt={item.title} className="testimonial-image" />
                        </div>
                    ))
                )}
            </Slider>
        </div>
    );
}
