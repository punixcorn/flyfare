<h1 align="center">
    flyfare
</h1>

> [!WARNING]
> Still a work in progress

## Table of Contents

-   [Overview](#overview)
-   [Project Structure](#project-structure)
-   [Tech Stack](#tech-stack)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [Backend Setup](#backend-setup)
-   [Frontend Setup](#frontend-setup)
-   [Endpoints](#endpoints)

## Overview

This application allows users to search for the best flight prices between
two cities. The application consists of a frontend built with React and a
backend built with Express.js, using the Amadeus API for flight data.

## Project Structure

```bash
/flyfare
├── /backend
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── /node_modules
├── /frontend
│   ├── public/
│   ├── src/
│   │   ├── utils/
│   │   │   └── iataUtils.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── /node_modules
└── README.md
```

## Tech Stack

-   Backend: Node.js, Express
-   Frontend: React.js, Tailwindcss, Vitejs

## Getting Started

Follow these instructions to get a copy of the project up and running on your
local machine for dev and testing.

### Prerequisites

-   Node.js installed on local machine
-   npm(Node Package Manager)

### Installation

1. Clone the repository:

```
git clone https://github.com/m0nztrum/flyfare.git
cd flyfare
```

2. Install dependencies for both backend and frontend

```
npm install
cd backend
npm install
```

## Backend setup

1. Navigate to the backend directory

```
cd backend
```

2. Create a `.env` file in the backen directory and add your env variables.

```
PORT=7000
AMADEUS_API_KEY=''
AMADEUS_API_SECRET=''
```

3. Start the backend server

```
npm start
```

The backend server should now be running on `http://localhost:7000`

## Frontend setup

1. Navigate to the backend directory

```
cd frontend
```

2. Start the dev server

```
npm run start
```

The frontend development server should now b running on `http://localhost:3000`

## Endpoints

-   `/search` Searches for flight prices based on the provided data.

## Contributing

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/NewFeature)
3. Commit your Changes (git commit -m 'Adddeed some New Feature')
4. Push to the Branch (git push origin feature/NewFeature)
5. Open a Pull Request
