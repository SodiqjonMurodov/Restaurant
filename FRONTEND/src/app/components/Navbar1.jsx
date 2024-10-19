'use client';
import React from 'react'
import Link from 'next/link';

export default function Navbar1() {
  return (
    <div className='navbar1'>
      <div className="navbar1-blok">
        <div className="navbar1-blok__section">
          <p>11 Zulfiya Street, Bukhara 200100 Uzbekistan</p>
        </div>
        <div className="navbar1-blok__section">
          <Link href='/contacts' className='navbar1__contact'>Сяжитесь с нами</Link>
        </div>
      </div>
    </div>
  )
}