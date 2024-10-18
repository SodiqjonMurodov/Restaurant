'use client'
import React from 'react'

export default function RatingPage({ data }) {
  return (
    <div>
      {(!data || data.length === 0) ? (
        <p>Нет меню!</p>
      ) : (
        data.map((item) => (
          <div key={item.id} className="rating">
            
          </div>
        ))
      )}
    </div>
  )
}