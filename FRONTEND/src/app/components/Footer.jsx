import Link from 'next/link'
import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-blok">
        <div className="footer-blok__section">
          <p className="footer-blok__section-1__p1">О Нас</p>
          <br />
          <p className="footer-blok__section-1__p2">Lorem Ipsum is simply dummy text of the printing
            and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
          </p>
        </div>
        <div className="footer-blok__section footer-blok__section-2">
          <div className="footer-blok__section-container">
            <b className="footer-blok__section__b">Полезные</b>
            <br /><br />
            <div>
              <MdKeyboardArrowRight className="footer-blok__section-container__icon" />
              <Link href="/" className="footer-blok__section-container__link">Главная</Link>
            </div>
            <div>
              <MdKeyboardArrowRight className="footer-blok__section-container__icon" />
              <Link href="/about-us" className="footer-blok__section-container__link">Подробно</Link>
            </div>
            <div>
              <MdKeyboardArrowRight className="footer-blok__section-container__icon" />
              <Link href="/booking" className="footer-blok__section-container__link">Забронировать</Link>
            </div>
            <div>
              <MdKeyboardArrowRight className="footer-blok__section-container__icon" />
              <Link href="/menu" className="footer-blok__section-container__link">Меню</Link>
            </div>
          </div>
          <div className="footer-blok__section-container">
            <b className="footer-blok__section__b">Подпишитесь</b>
            <br /><br />
            <div>
              <MdKeyboardArrowRight className="footer-blok__section-container__icon" />
              <Link href="/" className="footer-blok__section-container__link">Home</Link>
            </div>
            <div>
              <MdKeyboardArrowRight className="footer-blok__section-container__icon" />
              <Link href="/about-us" className="footer-blok__section-container__link">About Us</Link>
            </div>
            <div>
              <MdKeyboardArrowRight className="footer-blok__section-container__icon" />
              <Link href="/booking" className="footer-blok__section-container__link">Book a table</Link>
            </div>
            <div>
              <MdKeyboardArrowRight className="footer-blok__section-container__icon" />
              <Link href="/menu" className="footer-blok__section-container__link">Menu</Link>
            </div>
          </div>
        </div>
        <div className="footer-blok__section footer-blok__section-3">
          <b className="footer-blok__section__b">Связаться с нами</b>
          <br /><br />
          <p className="footer-blok__section-3__p">Адрес вашей улицы, рядом с метро 65467 east direction, Atlanta</p>
          <p className="footer-blok__section-3__p"><b>Телефон:</b> +1 9989 8867 98, +1 6573 874636</p>
          <p className="footer-blok__section-3__p"><b>Email:</b> youremail@gmail.com</p>
        </div>
      </div>
      <div className="footer-footer">
        <p>© Copyright <b>РЕСТОРАН</b>. Все права защищены!</p>
      </div>
    </div>
  )
}
