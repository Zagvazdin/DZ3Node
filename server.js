const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Файл для хранения счетчиков
const counterFilePath = path.join(__dirname, 'counters.json');

// Функция для чтения счетчиков из файла
function readCounters() {
    try {
        const data = fs.readFileSync(counterFilePath);
        return JSON.parse(data);
    } catch (error) {
        return { home: 0, about: 0 }; // Возвращаем начальные значения, если файл не найден или ошибка
    }
}

// Функция для записи счетчиков в файл
function writeCounters(counters) {
    fs.writeFileSync(counterFilePath, JSON.stringify(counters));
}

// Обработчик для главной страницы "/"
app.get('/', (req, res) => {
    console.log('Главная страница была запрошена');
    let counters = readCounters();
    counters.home += 1; 
    writeCounters(counters); 

    res.send(`
        <h1>Главная страница</h1>
        <p>Количество просмотров: ${counters.home}</p>
        <a href="/about">О нас</a>
    `);
});

app.get('/about', (req, res) => {
    console.log('Страница "О нас" была запрошена');
    let counters = readCounters();
    counters.about += 1; 
    writeCounters(counters); 

    res.send(`
        <h1>О нас</h1>
        <p>Количество просмотров: ${counters.about}</p>
        <a href="/">На главную</a>
    `);
});


// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
