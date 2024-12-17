# WE4B Project - Video Game Recommendation Website  
**Alexandre BARTHELME, Thibault MAYER, Loric RAVASSARD, Louis ROLLAND**
Spring 2023
---

## Prerequisites  
Before running the project, you must have a **MySQL server** running with the database file `backend/we4b.sql` (using tools like XAMPP or UwAmp, for example).  

For the **back-end**, we combined concepts learned in the WE4B course with skills already acquired in WE4A.  
The back-end is organized as follows:  
- A **Node.js server** to interact with a MySQL database.  
- A **relational database** that we are familiar with from WE4A.  
- A **service system** connecting the back-end and front-end using various HTTP requests (PUT, POST, and GET).  

The Angular project source files are located in the `frontend` folder.  

---

## Database Connection Parameters  
Database connection settings are in the file `backend/index.js` in the `createConnection()` function.  
Default parameters are:  
- `host`: "localhost"  
- `user`: "root"  
- `password`: ""  
- `database`: "we4b"  
- `port`: 3306  

---

## Project Setup  
1. **Create an Angular project** using `ng new`, then replace the files and `src` folder with the contents of the `frontend` folder.  
2. Run `npm install` in **both** the `backend` and `frontend` folders to install all necessary dependencies.  

---

## Running the Project  
- **Back-end**: Run `nodemon index.js` from the `backend` folder.  
- **Front-end**: Run `ng serve` from the `frontend` folder.  

Alternatively, both the back-end and front-end can be launched with a single command from the `frontend` folder:  
```bash
npm start
