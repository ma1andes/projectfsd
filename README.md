# Проект Full Stack приложения

## Описание проекта

Данный проект представляет собой полноценное веб-приложение, построенное с использованием следующих технологий:

### Клиентская часть (Frontend)

- React (v18.2.0)
- React Router DOM для маршрутизации
- Vite как инструмент сборки
- CSS для стилизации

### Серверная часть (Backend)

- Django (v5.2)
- Django REST Framework для API
- SQLite в качестве базы данных
- Token-аутентификация для безопасности

## Функциональность проекта

Приложение предоставляет следующие возможности:

- Регистрация и авторизация пользователей
- Просмотр, создание и управление постами
- Работа с категориями
- Профиль пользователя
- Защищенные маршруты с авторизацией

## Структура проекта

Проект разделен на две основные части:

- `/client` - клиентская часть (React)
- `/backend` - серверная часть (Django)

## Инструкция по запуску

### Запуск серверной части (Backend)

1. Перейдите в папку backend:

```
cd backend
```

2. Создайте и активируйте виртуальное окружение:

```
python -m venv venv
# Для Windows
venv\Scripts\activate
# Для Linux/MacOS
source venv/bin/activate
```

3. Установите необходимые зависимости:

```
pip install django djangorestframework django-cors-headers
```

4. Выполните миграции:

```
python manage.py migrate
```

5. Запустите сервер:

```
python manage.py runserver
```

Сервер будет доступен по адресу: http://127.0.0.1:8000/

### Запуск клиентской части (Frontend)

1. Перейдите в папку client:

```
cd client
```

2. Установите необходимые зависимости:

```
npm install
```

3. Запустите приложение в режиме разработки:

```
npm run dev
```

Клиентская часть будет доступна по адресу: http://localhost:5173/

## Маршруты приложения

- `/` - Главная страница
- `/posts` - Страница со всеми постами
- `/posts/:id` - Страница отдельного поста
- `/create-post` - Страница создания поста
- `/category-create` - Страница создания категории
- `/auth` - Страница авторизации
- `/reg` - Страница регистрации
- `/profile` - Профиль пользователя

## Требования

- Node.js и npm для клиентской части
- Python 3.x для серверной части
