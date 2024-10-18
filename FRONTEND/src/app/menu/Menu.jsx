'use client';

import React, { useState } from 'react';
import Title from '../components/Title';
import Link from 'next/link';

const Menu = ({ data }) => {
    const [filteredMenu, setFilteredMenu] = useState(data);
    const [selectedCategory, setSelectedCategory] = useState('все');
    const [isAnimating, setIsAnimating] = useState(false); // Для отслеживания анимации

    // Фильтрация по категориям с анимацией
    const filterByCategory = (category) => {
        if (category === selectedCategory) return; // Если та же категория, не перезагружать

        setSelectedCategory(category);
        setIsAnimating(true); // Начинаем анимацию исчезновения

        setTimeout(() => {
            const filtered = category === 'все' ? data : data.filter(item => item.category.category_name === category);
            setFilteredMenu(filtered);

            setTimeout(() => {
                setIsAnimating(false); // Окончание анимации
            }, 100); // Задержка для плавного перехода к новому меню
        }, 400); // Время на анимацию исчезновения
    };

    // Получение всех уникальных категорий
    const categories = ['все', ...new Set(data.map(item => item.category.category_name))];

    return (
        <div>
            <Title />
            <div className="menu__main">
                <div className="categories">
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
                                    <h1 className='menu__title'>{item.title}</h1>
                                    <h2 className='menu__subtitle'>{item.subtitle}</h2>
                                    <p className='menu__price'>{item.price.toLocaleString('ru-RU')} UZS</p>

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
