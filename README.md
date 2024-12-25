# GitHub Search

Full-stack application built with Angular and .NET Core for searching and managing GitHub repositories.

## Quick Start

### Prerequisites

- Node.js (>= 18.x)
- .NET Core SDK (>= 8.x)

### Installation & Run

Steps to run the app:  
1- `npm i`  
2- `npm run install_all`- to install client&server packaged  
3- `npm run start_all` - to run the app (client+server)

Application will run at:

http://localhost:4200

Frontend: Angular 18, TypeScript
Backend: .NET Core, Entity Framework, SQLite
Authentication: JWT

### Notes

* I used SQLite instead of SQL Server for easier development.

* The next steps I would take are:
    - make sure no warnings
    - currently default number of results in search result, would add pagination & Show the total count of matching repositories
    - prettier toasts in the client
    - toggle add/remove favorites in search results + favorites list
