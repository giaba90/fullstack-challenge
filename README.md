# fullstack-challenge

## About
The brief requires the creation of a simple full-stack CRUD application to manage a list of "entries". 

This application will:
- Backend: Expose RESTful endpoints for CRUD (Create, Read, Update, Delete) operations on these entries.
- Frontend: Display the list of entries, the details of a single entry, and provide forms for creating and editing entries.
## Tecnologies
- Language : typescript
- Framework : NextJs + React
- Database : SQLite
- Libreries :  prismaORM, react-query, tailwindcss, axios, react-hook-form
- Tools : turbpack , npm-check

## CRUD endpoints richiesti 
- GET /api/entries per recuperare tutti i dati.
- GET /api/entries/:id per recuperare i dettagli di un singolo elemento.
- POST /api/entries per creare una nuova voce.
- PUT /api/entries/:id per aggiornare una voce esistente.
- DELETE /api/entries/:id per eliminare una voce.