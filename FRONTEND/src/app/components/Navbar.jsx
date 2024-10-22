'use client';
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { usePathname } from 'next/navigation'; // Используем usePathname вместо useRouter
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // Добавляем состояние для отслеживания мобильной версии
  const pathname = usePathname(); // Получаем текущий путь
  const [activePage, setActivePage] = useState(pathname);

  useEffect(() => {
    setActivePage(pathname); // Обновляем активную страницу при изменении пути
  }, [pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (path) => {
    setIsOpen(false); // Закрываем меню при клике на любую ссылку
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true); // Включаем мобильную версию для экранов <= 768px
      } else {
        setIsMobile(false); // Отключаем для больших экранов
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Выполняем проверку при первой загрузке
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className={`navbar ${isSticky ? 'sticky' : ''}`}>
      <div className="brand">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Image src="/images/brand.png" className="navbar-brand" alt="" width={500} height={500} />
        </Link>
      </div>
      <div className={`menu-icon ${isOpen ? 'hidden' : ''}`} onClick={toggleMenu}>
        <FaBars />
      </div>
      <div className={`menu-links ${isOpen ? 'active' : ''}`}>
        <div className="close-icon" onClick={toggleMenu}>
          <FaTimes />
        </div>
        <Link href="/" onClick={() => handleLinkClick('/')} style={{ color: activePage === '/' ? 'var(--main-color)' : '' }}>
          Главная
        </Link>
        <Link href="/menu" onClick={() => handleLinkClick('/menu')} style={{ color: activePage === '/menu' ? 'var(--main-color)' : '' }}>
          Меню
        </Link>
        <Link href="/gallery" onClick={() => handleLinkClick('/gallery')} style={{ color: activePage === '/gallery' ? 'var(--main-color)' : '' }}>
          Галлерея
        </Link>
        <Link href="/contacts" onClick={() => handleLinkClick('/contacts')} style={{ color: activePage === '/contacts' ? 'var(--main-color)' : '' }}>
          Контакты
        </Link>
        <Link href="/news" onClick={() => handleLinkClick('/news')} style={{ color: activePage === '/news' ? 'var(--main-color)' : '' }}>
          Новости
        </Link>
        <Link href="/booking">
          <button className="book-button" onClick={() => handleLinkClick('/booking')}>
            Бронируй
          </button>
        </Link>
      </div>

      {isOpen && <div className="overlay" onClick={toggleMenu} />}
    </nav>
  );
};