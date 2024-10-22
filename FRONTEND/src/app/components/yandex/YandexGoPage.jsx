'use client'
import React, { useEffect, useState } from 'react';

export default function YandexGoPage({ data }) {
  const [isMobile, setIsMobile] = useState(false);

  // Определение устройства
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Проверяем, мобильное ли устройство
    if (/android|webOS|iPhone|iPad|iPod|blackberry|iemobile|opera mini/i.test(userAgent)) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  const handleClickMobile = (item) => {
    const latitude = item.latitude;
    const longitude = item.longitude;

    if (!latitude || !longitude) {
      console.error("Latitude or longitude is missing");
      return;
    }

    const yandexNavigatorUrl = `yandexnavi://build_route_on_map?lat_to=${latitude}&lon_to=${longitude}`;
    window.location.href = yandexNavigatorUrl;
  };

  const handleClickDesktop = (item) => {
    const latitude = item.latitude;
    const longitude = item.longitude;
    const address = encodeURIComponent(item.address); // Кодируем адрес для URL

    if (!latitude || !longitude) {
      console.error("Latitude or longitude is missing");
      return;
    }

    // Формируем URL для Яндекс Такси, передавая адрес и координаты
    const yandexGoWebUrl = `https://taxi.yandex.ru/?from=${address}&to=${latitude},${longitude}`;
    window.open(yandexGoWebUrl, '_blank');
  };

  if (!data || data.length === 0) {
    return <p>Нет данных для отображения</p>;
  }

  return (
    <div className="yandexgo">
      {data.map((item) => (
        <div key={item.id}>
          {/* Условие отображения в зависимости от устройства */}
          {isMobile ? (
            <div onClick={() => handleClickMobile(item)} className="yandexgo-blok">
              <img src="/images/yandexgo.png" alt="Яндекс Навигатор" />
              <p>Вызвать Такси</p>
            </div>
          ) : (
            <div onClick={() => handleClickDesktop(item)} className="yandexgo-blok">
              <img src="/images/yandexgo.png" alt="Яндекс Карты" />
              <p>Вызвать Такси</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
