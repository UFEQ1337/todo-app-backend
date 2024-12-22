# Backend Aplikacji Todo

To jest serwis backendowy dla Aplikacji Todo. Zapewnia RESTful API do zarządzania zadaniami.

## Funkcje

- Tworzenie, odczytywanie, aktualizowanie i usuwanie zadań
- Uwierzytelnianie i autoryzacja użytkowników
- Walidacja danych wejściowych i obsługa błędów

## Użyte Technologie

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)

## Jak Zacząć

### Wymagania

- Node.js (v14 lub wyższy)
- MongoDB

### Instalacja

1. Sklonuj repozytorium:
   ```sh
   git clone https://github.com/UFEQ1337/todo-app-backend.git
   ```
2. Przejdź do katalogu projektu:
   ```sh
   cd todo-app-backend
   ```
3. Zainstaluj zależności:
   ```sh
   npm install
   ```

### Konfiguracja

1. Utwórz plik `.env` w katalogu głównym i dodaj następujące zmienne środowiskowe:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/todo-app
   JWT_SECRET=your_jwt_secret
   ```

### Uruchamianie Aplikacji

1. Uruchom serwer MongoDB:
   ```sh
   mongod
   ```
2. Uruchom aplikację:
   ```sh
   npm start
   ```

Serwer uruchomi się na `http://localhost:3000`.

## Endpointy API

### Uwierzytelnianie

- `POST /api/users/register` - Rejestracja nowego użytkownika
- `POST /api/users/login` - Logowanie użytkownika
- `GET /api/users/me` - Pobierz dane zalogowanego użytkownika

### Zadania

- `GET /api/tasks` - Pobierz wszystkie zadania
- `POST /api/tasks` - Utwórz nowe zadanie
- `PUT /api/tasks/:id` - Zaktualizuj zadanie według ID
- `DELETE /api/tasks/:id` - Usuń zadanie według ID

## Licencja

Ten projekt jest licencjonowany na warunkach licencji MIT.
