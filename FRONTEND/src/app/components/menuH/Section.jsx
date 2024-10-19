'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Section({ data }) {
    const [isVisible, setIsVisible] = useState(false);  // Состояние видимости для мобильной версии
    const sectionRef = useRef(null);  // Ссылка на компонент
    const [isMobile, setIsMobile] = useState(false);  // Состояние для проверки мобильной версии

    // Проверка мобильной версии при монтировании компонента
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 828);  // Измените значение на необходимое для вашей мобильной версии
        };

        checkMobile();  // Проверка на этапе монтирования

        window.addEventListener('resize', checkMobile);  // Проверка при изменении размера окна

        return () => {
            window.removeEventListener('resize', checkMobile);  // Удаляем слушатель при размонтировании
        };
    }, []);

    useEffect(() => {
        if (!isMobile) return;  // Если не мобильная версия, не включаем отслеживание

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);  // Изменяем состояние видимости при пересечении
            },
            {
                threshold: 0.1,  // Процент видимости компонента
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);  // Начинаем отслеживание
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);  // Останавливаем отслеживание при размонтировании
            }
        };
    }, [isMobile]);

    return (
        <div className="section" ref={sectionRef}>
            <h1>Специальные!</h1>
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
                                {/* Для мобильной версии показываем при скролле, для ПК по наведению */}
                                <div className={`section-info ${isMobile ? (isVisible ? 'visible' : '') : ''}`}>
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