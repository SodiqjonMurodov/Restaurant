import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className="header">
      <div className="header-blok">
        <h1 className="header__h1-1">Вкусная еда вовремя</h1>
        <h1 className="header__h1-2">Ресторан</h1>
        <h2 className="header__h1-3">Гурманы любят нас, ведь мы даем миру наши ожоги!</h2>
        <div className="header-blok__container">
          <Link href="/menu"><button className='header__button-1'>К Блюдам</button></Link>
          <Link href="/booking"><button className='header__button-2'>Забронировать</button></Link>
        </div>
      </div>
    </div>
  )
}