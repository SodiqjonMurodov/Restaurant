import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className="header">
      <div className="header-blok">
        <h1 className="header__h1-1">On Time Delicious Food</h1>
        <h1 className="header__h1-2">Restaurant</h1>
        <h2 className="header__h1-3">Foodies loves us, serving the world with our burns!</h2>
        <div className="header-blok__container">
          <Link href="/menu"><button>EXPLORE FOOD</button></Link>
          <Link href="/booking"><button>BOOK A TABLE</button></Link>
        </div>
      </div>
    </div>
  )
}