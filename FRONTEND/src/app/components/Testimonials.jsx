'use client';
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { TESTIMONIALS } from '../utils/testimonials';

export default function Testimonials() {
  // Настройки карусели
  const settings = {
    dots: true, // Показывать точки под слайдами
    arrows: false, // Отключение кнопок "Prev" и "Next"
    infinite: true, // Зацикливание
    speed: 500, // Скорость смены слайдов
    slidesToShow: 3, // Количество отображаемых слайдов
    slidesToScroll: 1, // Количество слайдов, прокручиваемых за раз
    customPaging: (i) => (
      <div className="custom-dot">
        {/* Кастомное отображение точки */}
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024, // На экранах меньше 1024 пикселей
        settings: {
          slidesToShow: 1, // Один слайд
        },
      },
      {
        breakpoint: 640, // На экранах меньше 640 пикселей
        settings: {
          slidesToShow: 1, // Один слайд
        },
      },
    ],
  };

  return (
    <div className="testimonials">
      <Slider {...settings}>
        {TESTIMONIALS.map(testimonial => (
          <div key={testimonial.id} className="testimonials-blok__section">
            <h3 className="testimonials__title">{testimonial.title}</h3>
            <p className="testimonials__description">- {testimonial.description}</p>
            <img src={testimonial.image} alt={testimonial.title} className="testimonial-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
}
