'use client';

import React, { useState, useEffect } from 'react';
import Title from '../components/Title';

const Menu = ({ data }) => {
    const [filteredMenu, setFilteredMenu] = useState(data);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [exitingItems, setExitingItems] = useState([]);

    // Фильтрация по категориям с анимацией
    const filterByCategory = (category) => {
        setSelectedCategory(category);

        // Добавляем элементы, которые будут исчезать
        setExitingItems(filteredMenu.map(item => item.id));

        setTimeout(() => {
            if (category === 'all') {
                setFilteredMenu(data);
            } else {
                const filtered = data.filter(item => item.category.category_name === category);
                setFilteredMenu(filtered);
            }
            setExitingItems([]); // Сбрасываем после завершения анимации
        }, 500); // Время на анимацию исчезновения
    };

    // Получение всех уникальных категорий
    const categories = ['all', ...new Set(data.map(item => item.category.category_name))];

    return (
        <div>
            <Title />
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
                        <div
                            key={item.id}
                            className={`menu-item ${exitingItems.includes(item.id) ? 'fade-out' : 'fade-in'}`}
                        >
                            <h1>{item.title}</h1>
                            <h2>{item.subtitle}</h2>
                            <p>Категория: {item.category.category_name}</p>
                            <p>Цена: {item.price} UZS</p>
                            <img src={item.image} alt={item.title} className="menu-image" />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Menu;
