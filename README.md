# Simfy Africa Music API

## Prerequisite

- [Docker](https://docs.docker.com/engine/install/)
- [Visual Studio Code](https://code.visualstudio.com/download)
    - Install [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension to easily trigger each endpoint
- [Postman](https://www.postman.com/downloads/)

## How to run

At the root of the project contains a **docker-compose.yml** file that will run the project and all it’s dependancies.

Open a terminal to the project root and run the command below

```jsx
docker-compose up --build -d
```

Three docker containers will startup

- Postgres
- Redis
- Express API

Once all the images have started, in the project root should be a **requests.rest** file alternatively there is a Postman collection, **Simfy Africa API.postman_collection.json** located at the root of the project.

Open that file in Visual Studio Code and it will contain some of the endpoints available from the API.

Stop all the containers by running the command below  

```jsx
docker-compose down
```