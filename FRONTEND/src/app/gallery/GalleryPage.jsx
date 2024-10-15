'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight, FaDownload } from 'react-icons/fa';
import 'swiper/swiper-bundle.css';
import GALLERY from '../utils/gallery';
import Image from 'next/image';

export default function GalleryPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const openCarousel = (index) => {
        setCurrentSlide(index);
        setIsOpen(true);
    };

    const closeCarousel = () => {
        setIsOpen(false);
    };

    const downloadImage = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = 'image.jpg'; // можно задать динамическое название, например, через item.id
        link.click();
    };

    return (
        <div>
            <div className="gallery">
                {GALLERY.map((item, index) => (
                    <Image
                        key={item.id}
                        src={item.photo}
                        alt={`Gallery Image ${item.id}`}
                        className="gallery-image"
                        onClick={() => openCarousel(index)}
                        width={500}
                        height={500}
                    />
                ))}
            </div>

            {isOpen && (
                <div className="carousel-overlay">
                    {/* Кнопка для закрытия карусели */}
                    <button className="close-button" onClick={closeCarousel}>×</button>
                    {/* Кнопка для скачивания изображения */}
                    <button
                        className="download-button"
                        onClick={() => downloadImage(GALLERY[currentSlide].photo)}
                    >
                        <FaDownload /> Скачать
                    </button>
                    
                    <Swiper
                        initialSlide={currentSlide}
                        spaceBetween={10}
                        slidesPerView={1}
                        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        modules={[Navigation]}
                    >
                        {GALLERY.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="ahah">
                                    <Image
                                        src={item.photo}
                                        alt={`Slide ${item.id}`}
                                        className="carousel-image"
                                        width={500}
                                        height={500}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="swiper-button-prev">
                        <FaChevronLeft />
                    </div>
                    <div className="swiper-button-next">
                        <FaChevronRight />
                    </div>
                    <div className="slide-counter">
                        {currentSlide + 1} / {GALLERY.length}
                    </div>
                </div>
            )}
        </div>
    );
}
