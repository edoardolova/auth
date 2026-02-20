# Full Stack Auth App

Applicazione full-stack con sistema di autenticazione basato su sessioni persistenti salvate in database.

## Tech Stack

### Frontend

- React
- React Router
- Bootstrap
- React Hot Toast

### Backend

- Node.js
- Express
- MySQL
- bcrypt

---

## Come Avviare il Progetto

### 1. Backend

1. Configura il file `.env` in `backend` con le variabili per il database.
2. Installa le dipendenze:
   ```sh
   cd backend
   npm install
   ```
3. Avvia il server:
   ```sh
   npm run dev
   ```
   Il backend sarà disponibile su `http://localhost:5500`.

### 2. Frontend

1. Installa le dipendenze:
   ```sh
   cd frontend
   npm install
   ```
2. Avvia il frontend:
   ```sh
   npm run dev
   ```
   L'app sarà disponibile su `http://localhost:5173` (o porta indicata da Vite).

---

## Features

- Registrazione utente
- Login con creazione sessione
- Logout con invalidazione sessione
- Sessioni con scadenza temporale
- Protezione route frontend
- Logout automatico se sessione scaduta

## Autenticazione

L'autenticazione è basata su:

- Token UUID generato lato server (Valido per 10 minuti)
- Sessioni salvate in tabella sessions

Il token viene salvato in localStorage e inviato nelle richieste tramite header Authorization.

## Schema DB

Lo schema del DB si trova nella cartella schemaSql, basterà importarlo in MySQL per generarlo.

## Endpoint

### SignUp

http://localhost:5500/auth/signUp (metodo POST)
es. body della richesta:

```sh
    {
        "username": "mario",
        "email": "mario@gmail.com",
        "password": "Password123!",
        "name": "mario",
        "surname": "rossi",
        "birth_year": "1995-06-10"
    }
```

### Login

http://localhost:5500/auth/login (metodo POST)
es. body della richesta:

```sh
    {
        "username": "mario",
        "password": "Password123!"
    }
```

### Logout

http://localhost:5500/auth/logout (metodo POST)
es. header della rischiesta:
Key: Authorization
Value: 562ec7a6-3ae4-4cab-96e5-d8dcab4c2963 (Token generato dal backend)

### Profilo

http://localhost:5500/profile (metodo GET)
es. header della rischiesta:
Key: Authorization
Value: 562ec7a6-3ae4-4cab-96e5-d8dcab4c2963 (Token generato dal backend)
