'use client'; // Указываем, что это клиентский компонент

import React, { useState, useEffect } from 'react';

const BookingPage = () => {
    const [data, setData] = useState([]);
    const [full_name, setFullName] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [guests, setGuests] = useState('');
    const [phone, setPhone] = useState('');
    const [table, setTable] = useState('');

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    // Получаем данные при монтировании компонента
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://127.0.0.1:8000/api/v1/booking-form', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    throw new Error('Ошибка при получении данных');
                }

                const result = await res.json();
                setData(result);
            } catch (err) {
                setError('Ошибка получения данных: ' + err.message);
            }
        };

        fetchData();
    }, []);

    // Обработка отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);

        try {
            const formData = { full_name, time, date, guests, phone, table };

            const res = await fetch('http://127.0.0.1:8000/api/v1/booking-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            if (res.ok) {
                setSuccess(result.message);
                alert('Успешно отправлено!');
            } else {
                let errorMessage;
                switch (res.status) {
                    case 400:
                        errorMessage = 'Некорректные данные. Пожалуйста, проверьте форму.';
                        break;
                    case 401:
                        errorMessage = 'Необходима авторизация.';
                        break;
                    case 500:
                        errorMessage = 'Ошибка сервера. Попробуйте позже.';
                        break;
                    default:
                        errorMessage = 'Произошла ошибка. Пожалуйста, попробуйте еще раз.';
                }
                throw new Error(errorMessage);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setFullName('');
            setTime('');
            setPhone('');
            setDate('');
            setGuests('');
            setTable('');
        }
    };

    return (
        <div className="booking">
            <h1>Book a Table</h1>
            <div className="booking-blok">
                <form className="booking-form" onSubmit={handleSubmit}>
                    <div className="booking-form__section">
                        <input
                            type="text"
                            value={full_name}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Full Name"
                            required
                        />
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            placeholder="Time"
                            required
                        />
                    </div>
                    <div className="booking-form__section">
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone"
                            required
                        />
                        <input
                            type="number"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            placeholder="Guests"
                            required
                        />
                    </div>
                    <div className="booking-form__section">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            placeholder="Date"
                            required
                        />
                    </div>
                    <div className="booking-form__section">
                        <input
                            value={table}
                            onChange={(e) => setTable(e.target.value)}
                            placeholder="Table"
                            required
                        />
                    </div>
                    <button className="booking__button" type="submit" disabled={loading}>
                        {loading ? 'Отправка...' : 'Отправить'}
                    </button>

                    {success && <p style={{ color: 'green' }}>{success}</p>}
                    {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
                </form>
            </div>
        </div>
    );
};

export default BookingPage;