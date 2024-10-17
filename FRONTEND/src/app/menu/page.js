// pages/menu.js (серверный компонент)
import Menu from './Menu'; // Импортируем клиентский компонент

// Этот компонент автоматически будет серверным
const MenuPage = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/v1/menu');

    if (!res.ok) {
        throw new Error('Ошибка при получении данных');
    }

    const data = await res.json();

    // Передаем данные в клиентский компонент
    return <Menu data={data} />;
};

export default MenuPage;
