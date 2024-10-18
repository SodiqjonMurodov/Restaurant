'use client';

import React, { useState, useRef, useEffect } from 'react';
import Title from '../components/Title';
import Link from 'next/link';

const Menu = ({ data }) => {
    const [filteredMenu, setFilteredMenu] = useState(data);
    const [selectedCategory, setSelectedCategory] = useState('все');
    const [isAnimating, setIsAnimating] = useState(false);

    const categoryScrollRef = useRef(null);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    // Фильтрация по категориям
    const filterByCategory = (category) => {
        if (category === selectedCategory) return;

        setSelectedCategory(category);
        setIsAnimating(true);

        setTimeout(() => {
            const filtered = category === 'все' ? data : data.filter(item => item.category.category_name === category);
            setFilteredMenu(filtered);

            setTimeout(() => {
                setIsAnimating(false);
            }, 100);
        }, 400);
    };

    // Все уникальные категории
    const categories = ['все', ...new Set(data.map(item => item.category.category_name))];

    // Функции для скролла
    const handleMouseDown = (e) => {
        isDown.current = true;
        startX.current = e.pageX - categoryScrollRef.current.offsetLeft;
        scrollLeft.current = categoryScrollRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDown.current = false;
    };

    const handleMouseUp = () => {
        isDown.current = false;
    };

    const handleMouseMove = (e) => {
        if (!isDown.current) return;
        e.preventDefault();
        const x = e.pageX - categoryScrollRef.current.offsetLeft;
        const walk = (x - startX.current) * 2; // Скорость прокрутки
        categoryScrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    return (
        <div>
            <Title />
            <div className="menu__main">
                <div
                    className="categories"
                    ref={categoryScrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => filterByCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div className="menu-items">
                    {(!filteredMenu || filteredMenu.length === 0) ? (
                        <p>Нет элементов меню!</p>
                    ) : (
                        filteredMenu.map((item) => (
                            <div key={item.id} className={`menu-item ${isAnimating ? 'fade-out' : 'fade-in'}`}>
                                <Link href={`menu/${item.id}`}>
                                    <img src={item.image} alt={item.title} className="menu__image" />
                                    <div className='menu-item__container'>
                                        <h1 className='menu__title'>{item.title}</h1>
                                        <h2 className='menu__subtitle'>{item.subtitle}</h2>
                                        <p className='menu__price'>{item.price.toLocaleString('ru-RU')} UZS</p>
                                    </div>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Menu;
