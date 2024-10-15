'use client';
import React, { useState } from 'react';
import Title from '../components/Title';

const Feedback = () => {
    const [full_name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [body, setBody] = useState('');

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    // Функция для отправки данных формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);
    
        try {
            const formData = { full_name, email, phone, body };
    
            const res = await fetch('http://127.0.0.1:8000/api/v1/feedback-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            // Читаем тело ответа только один раз
            const result = await res.json(); // Считываем тело ответа
    
            // Логируем статус ответа
            console.log('Статус ответа:', res.status);
    
            if (res.ok) {
                setSuccess(result.message);
                alert('Успешно отправлено!'); // Показать алерт
            } else {
                // Обработка ошибок
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
            if (err instanceof SyntaxError) {
                setError('Некорректный ответ от сервера');
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
            setFullName('');
            setEmail('');
            setPhone('');
            setBody('');
        }
    };

    return (
        <>
            <Title />
            <div className="feedback">
                <h1>Contact Us</h1>
                <div className="feedback-blok">
                    <form onSubmit={handleSubmit} className="feedback-form">
                        <div className="feedback-form__section feedback-form__section-1">
                            <input
                                type="text"
                                value={full_name}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Name"
                                required
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Phone"
                                required
                            />
                        </div>
                        <div className="feedback-form__section feedback-form__section-2">
                            <textarea
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                placeholder="Any Specific Message"
                                required
                            />
                        </div>
                        <button className="feedback__button" type="submit" disabled={loading}>
                            {loading ? 'Отправка...' : 'Отправить'}
                        </button>

                        {/* Отображение состояния отправки */}
                        {success && <p style={{ color: 'green' }}>{success}</p>}
                        {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
                    </form>
                </div>
            </div>
        </>
    );
};

export default Feedback;
