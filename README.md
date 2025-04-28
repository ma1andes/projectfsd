# Social Network Project

Полноценная социальная сеть с бэкендом на Django и фронтендом на React.

## Структура проекта

```
projectfsd/
├── backend/                 # Django бэкенд
│   ├── backend/            # Основные настройки Django
│   ├── posts/              # Приложение для постов, комментариев и лайков
│   ├── user/               # Приложение для пользователей и аутентификации
│   ├── requirements.txt    # Зависимости Python
│   └── manage.py          # Утилита управления Django
│
└── client/                 # React фронтенд
    ├── src/               # Исходный код React
    ├── public/            # Статические файлы
    └── package.json       # Зависимости Node.js
```

## Технологии

### Backend

- Django 5.0.2
- Django REST Framework 3.14.0
- JWT аутентификация
- Swagger документация
- PostgreSQL/MySQL (опционально)
- pytest для тестирования

### Frontend

- React 18
- Vite
- React Router 6
- Material-UI
- React Query
- Zustand
- Axios
- React Hook Form
- Yup

## Установка и запуск

### Backend

1. Создайте виртуальное окружение:

```bash
python -m venv .venv
source .venv/bin/activate  # для Linux/Mac
.venv\Scripts\activate     # для Windows
```

2. Установите зависимости:

```bash
cd backend
pip install -r requirements.txt
```

3. Настройте базу данных в `backend/backend/settings.py`

4. Примените миграции:

```bash
python manage.py migrate
```

5. Запустите сервер:

```bash
python manage.py runserver
```

### Frontend

1. Установите зависимости:

```bash
cd client
npm install
```

2. Запустите сервер разработки:

```bash
npm run dev
```

## API Endpoints

### Аутентификация

- `POST /login/` - Вход в систему
- `POST /logout/` - Выход из системы

### Пользователи

- `GET /users/` - Список пользователей
- `POST /users/` - Регистрация нового пользователя

### Посты

- `GET /posts/` - Список всех постов
- `POST /posts/create/` - Создание поста
- `GET /posts/<id>/detail/` - Детали поста
- `PUT /posts/<id>/update/` - Обновление поста
- `DELETE /posts/<id>/delete/` - Удаление поста

### Комментарии

- `GET /posts/<post_id>/comments/` - Список комментариев к посту
- `POST /posts/<post_id>/comments/create/` - Создание комментария
- `DELETE /posts/comments/<comment_id>/delete/` - Удаление комментария

### Лайки

- `POST /posts/<post_id>/like/` - Поставить лайк
- `DELETE /posts/<post_id>/unlike/` - Убрать лайк
- `GET /posts/<post_id>/likes/count/` - Количество лайков

## Документация API

Swagger UI доступен по адресу:

- http://localhost:8000/swagger/
- http://localhost:8000/redoc/

## Тестирование

### Backend

```bash
cd backend
pytest
```

### Frontend

```bash
cd client
npm test
```

## Разработка

### Backend

- Используйте black для форматирования кода
- Используйте flake8 для проверки стиля
- Используйте isort для сортировки импортов

### Frontend

- Используйте ESLint для проверки кода
- Используйте Prettier для форматирования
- Используйте SASS для стилей

## Лицензия

BSD License
