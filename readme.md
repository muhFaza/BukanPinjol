# Project Title

Provide a short, clear description of your project. What does it do? What technologies does it use?

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you continue, ensure you have met the following requirements:

* You have installed the latest version of [Node.js](https://nodejs.org/en/).
* You have installed the latest version of [npm](https://www.npmjs.com/get-npm).
* You have installed the latest version of [PostgreSQL](https://www.postgresql.org/).


### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/muhFaza/BukanPinjol.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Create Database with sequelize-cli
    ```sh
    npx sequelize-cli db:create
    ```
4. Run migrations with sequelize-cli
    ```sh
    npx sequelize-cli db:migrate
    ```
5. Run seeds with sequelize-cli
    ```sh
    npx sequelize-cli db:seed:all
    ```
6. Start the server with any of these commands
    ```sh
    npm start
    ```
    ```sh
    node app.js --watch
    ```
7. Open your browser and go to http://localhost:3000
8. You can login with this account
    ```sh
    username: admin
    password: 123123
    ```
    ```sh

## Usage

Provide examples and code snippets on how to use your project.

## Built With

* [Node.js](https://nodejs.org/en/) - JavaScript runtime
* [EJS](https://ejs.co/) - Embedded JavaScript templating
* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [Sequelize](https://sequelize.org/) - Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.
* [PostgreSQL](https://www.postgresql.org/) - Open source object-relational database system
* [Bootstrap](https://getbootstrap.com/) - Open source toolkit for developing with HTML, CSS, and JS.
* [jQuery](https://jquery.com/) - JavaScript library designed to simplify HTML DOM tree traversal and manipulation, as well as event handling, CSS animation, and Ajax.