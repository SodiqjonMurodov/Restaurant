'use client';
import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaDownload } from 'react-icons/fa';
import 'swiper/swiper-bundle.css';
import Image from 'next/image';

export default function GalleryPage({ data }) {
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
        fetch(url, { mode: 'no-cors' })
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.setAttribute('download', `image_${currentSlide + 1}.jpg`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => console.error('Ошибка при скачивании изображения', error));
    };

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    return (
        <div>
            {(!data || data.length === 0) ? (
                <p>Нет изображений для отображения!</p>
            ) : (
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="gallery"
                    columnClassName="gallery-column"
                >
                    {data.map((item, index) => (
                        <div key={item.id} className="gallery-item">
                            <Image
                                src={item.image}
                                alt={`Gallery Image ${item.id}`}
                                className="gallery-image"
                                width={500}
                                height={500}
                                onClick={() => openCarousel(index)}
                            />
                        </div>
                    ))}
                </Masonry>
            )}

            {isOpen && (
                <div className="carousel-overlay">
                    <button className="close-button" onClick={closeCarousel}>×</button>
                    <button
                        className="download-button"
                        onClick={() => downloadImage(data[currentSlide].image)}
                    >
                        <FaDownload />
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
                        {data.map((item) => (
                            <SwiperSlide key={item.id}>
                                <Image
                                    src={item.image}
                                    alt={`Slide ${item.id}`}
                                    className="carousel-image"
                                    width={500}
                                    height={500}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="slide-counter">
                        {currentSlide + 1} / {data.length}
                    </div>
                </div>
            )}
        </div>
    );
}