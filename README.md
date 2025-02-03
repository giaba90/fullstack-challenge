# fullstack-challenge

## About
The brief requires the creation of a simple full-stack CRUD application to manage a list of "entries". 

This application will:
- Backend: Expose RESTful endpoints for CRUD (Create, Read, Update, Delete) operations on these entries.
- Frontend: Display the list of entries, the details of a single entry, and provide forms for creating and editing entries.

## Usage

Clone repo
```
git clone https://github.com/giaba90/fullstack-challenge.git
cd fullstack-challenge
```
Create .env file and put the text below into

(REMEMBER): Never push on git your .env file!! Insert its name into .gitignore file
```
DATABASE_URL="file:dev.db"
NEXT_PUBLIC_API_URL="http://localhost:3000/api/"  # This is the URL of the API
NEXT_PUBLIC_API_KEY="1234567890" 
```

Install the dependecies 
```
npm install
```

Start server
```
npm run dev
```

Visit the url http:\\\localhost:3000

TROUBLE: if you have a problem with prisma client , follow the istruct command
```
cd src/app/prisma
```
run
```
npx prisma generate
```
after into root folder
```
npm run dev 
```

EXTRA: If you want the Database dashboard panel, follow the instructions below

Open a new window of your favorite terminal and type
```
cd src\app\prisma
npx prisma studio
```

Visit the url http:\\\localhost:5555

## Tecnologies
- Language : typescript
- Framework : NextJs + React
- Database : SQLite
- Libreries :  prismaORM , tailwindcss , zod , heroicons , headlessui
- Tools : turbpack , npm-check

## Required CRUD Endpoints
- GET /api/entry to retrieve all data.
- GET /api/entry/:id to retrieve the details of a single item.
- POST /api/entry to create a new entry.
- PUT /api/entry/:id to update an existing entry.
- DELETE /api/entry/:id to delete an entry.

## Extra Endpoints
- GET /api/entrydetail to retrieve all data about detail
- GET /api/entrydetail/:id to retrieve data about single detail item
- POST /api/entrydetail to create a new entry detail.
- PUT /api/entrydetail/:id to update an existing entry detail.
- DELETE /api/entrydetail/:id to delete an entry detail.