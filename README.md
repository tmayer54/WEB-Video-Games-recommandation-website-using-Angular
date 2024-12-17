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

## Features  

### Pre-registered Users  
To test the site's functionalities, the following users are already registered in the database:  

| Username         | Password | Developer? |
|------------------|----------|------------|
| Alex            | iron68   | Yes        |
| Luc             | iron68   | Yes        |
| Iron            | iron68   | No         |
| LeBelfortdu90   | iron68   | Yes        |

---

### User Types  
There are two types of users:  
- **Standard User**  
- **Developer**  

Only **developers** can add games to the store. Both user types interact with games in the same way.  

---

### Game Browsing and Search  
- Regardless of being logged in or not, users can view all listed games in the **"Store"** tab.  
- Users can search for a specific game or user in the **"Search"** tab based on:  
  - Game name  
  - Price (minimum and maximum)  
  - Developer name  

---

### Account Registration  
- Any user can create an account via the **"Register"** tab.  
- Users can choose:  
  - Profile picture  
  - Status (developer or standard user)  

Once registered, the user is automatically logged into their account and can reconnect at any time using their credentials.  

---

### Game Reviews and Ratings  
- Only logged-in users who have **purchased a game** (purchase available via the **"Learn More"** tab) can:  
  - Add a comment  
  - Rate the game  

**Limit**: One comment per user per game.  
- Comments and ratings are displayed in the **"Learn More"** section of each game.  

---

### Game Library  
- The entire library of available games is accessible from the **"Store"** tab.  
- Each game is displayed with:  
  - A representative image  
  - A short description  
  - Categories  
  - Overall player rating  

- The **"Learn More"** tab provides detailed information:  
  - Precise average rating  
  - System requirements  
  - Long description  
  - Trailer video  
  - Game images  
  - Comments and reviews  

---

### User Profiles  
- **Developer profiles** are accessible:  
  - From each game created by the developer  
  - Via the **"Search"** tab  

- **Standard profiles** are only viewable from the **"Search"** tab.  
- Any user, whether developer or standard, can view and edit their own profile at any time from the **"My Profile"** tab.  
