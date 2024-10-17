'use client'; // Указываем, что это клиентский компонент

import Title from '../components/Title';
import Tables from '../components/tables/tables';
import BookingPage from './BookingPage';

const Booking = () => {
    return (
        <>
            <Title />
            <Tables />
            <BookingPage /> {/* Компонент BookingPage будет управлять получением данных и состояниями */}
        </>
    );
};

export default Booking;

