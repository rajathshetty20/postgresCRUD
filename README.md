
# postgresCRUD

REST API to perform CRUD operations on a PostgreSQL database. 

### Installation
To clone this repo, install dependencies and run the server and database as docker containers:
    
    $git clone https://github.com/rajathshetty20/postgresCRUD.git
    $cd postgresCRUD
    $docker-compose up -d

Use postman to send http requests to [http://localhost:5000/api/users/](http://localhost:5000/api/users/), to perform CRUD operations on the PostgreSQL database.

### Unit testing

For unit testing using Jest and Supertest

    $docker exec -it postgrescrud-server-1 npm test

