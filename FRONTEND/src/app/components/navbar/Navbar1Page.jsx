'use client';
import React from 'react'

export default function Navbar1Page({ data }) {
  return (
    <div className='navbar1'>
      {(!data || data.length === 0) ? (
        <p>нет инфы</p>
      ) : (
        data.map((item => (
          <div className="navbar1-blok" key={item.id}>
            <div className="navbar1-blok__section">
              <p>{item.address}</p>
            </div>
            <div className="navbar1-blok__section navbar1-blok__section-2">
              <a href={`tel:${item.phone1}`}>{item.phone1}</a>
              <a className='navbar1__phone2' href={`tel:${item.phone2}`}>{item.phone2}</a>
            </div>
          </div>
        )))
      )}
    </div>
  );
};