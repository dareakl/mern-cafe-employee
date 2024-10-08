# mern-cafe-employee

1.To start Server (Dockerized)

Navigate to the Root Directory
Open your terminal and change to the root folder of the project.

Create the Docker Containers
Use the docker-compose.yml file to create the Docker containers by executing the following command:
docker-compose up -d --build
Please allow a few moments for Docker to complete the setup. You should see output indicating the creation of the containers.

        [+] Building 6.0s (10/10) FINISHED

=> [internal] load .dockerignore 0.0s
=> => transferring context: 2B 0.0s
=> [internal] load build definition from Dockerfile 0.0s
=> => transferring dockerfile: 432B 0.0s
=> [internal] load metadata for docker.io/library/node:16 5.3s
=> [internal] load build context 0.6s
=> => transferring context: 605.63kB 0.6s
=> [1/5] FROM docker.io/library/node:16@sha256:f77a1aef2da8d83e45ec990f45df50f1a286c5fe8bbfb8c6e4246c6389705c0b 0.0s
=> CACHED [2/5] WORKDIR /usr/src/app 0.0s
=> CACHED [3/5] COPY package\*.json ./ 0.0s
=> CACHED [4/5] RUN npm install 0.0s
=> CACHED [5/5] COPY . . 0.0s
=> exporting to image 0.0s
=> => exporting layers 0.0s
=> => writing image sha256:b4ca2bc583144126a3bea86a1a220d6ee4d008d58110a6e97ea336066d90430a 0.0s
=> => naming to docker.io/library/mern-cafe-employee-backend 0.0s
[+] Running 3/3
✔ Network mern-cafe-employee_default Created 0.1s
✔ Container mongo_db Started 0.6s
✔ Container mern-cafe-employee-backend-1 Started

Verify Container Status
To check if the Docker containers are running, use the following command:
docker ps

CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
63a1ca6fd602 mern-cafe-employee-backend "docker-entrypoint.s…" 19 seconds ago Up 18 seconds 0.0.0.0:4001->4001/tcp mern-cafe-employee-backend-1
40d927552498 mongo:latest "docker-entrypoint.s…" 19 seconds ago Up 19 seconds 0.0.0.0:27017->27017/tcp mongo_db

Access the Application
Once the services are running, you can access the application at:
http://localhost:4001

Summary
With this refactor, you now have a more organized code structure:

- Models handle data representation.
- Controllers manage the HTTP requests and responses.
- Services encapsulate the business logic and interactions with the database.
- Utilities handle common functions like logging and validation.
- Configuration holds application settings.
  This structure enhances maintainability, readability, and scalability of your application.Employee Service handles the business logic for employee-related operations.
  Employee Controller manages the HTTP request-response cycle for employees.
  Routes use the controller to handle specific routes, and validation checks are in place for the employee's attributes.

  2.To start front end

      go to frontend folder

          npm i or npm install
          After installation done
          npm start

folder structure is organized to facilitate a React application, likely following common conventions for component organization and testing. Here’s a breakdown of the key components:

### Folder Structure Overview

1. **src/**: This is the main source folder where application's code resides.

2. **components/**: This folder contains reusable components that can be shared across different pages.

   - **CafeTable.js**: A component that displays a table of cafes.
   - **EmployeeTable.js**: A component that likely displays a table of employees.
   - **CafeTable.test.js** and **EmployeeTable.test.js**: Test files for the corresponding components, ensuring they function correctly.

3. **pages/**: This folder includes the various pages of this application, which likely correspond to different routes in app.

   - **CafesPage.js**: A page that may display a list of cafes.
   - **EditCafePage.js**: A page for editing cafe details.
   - **EmployeesPage.js**: A page that shows a list of employees.
   - **EditEmployeePage.js**: A page for editing employee details.
   - The `.test.js` files for each page serve the same purpose as the component tests, ensuring that the page functionality is working as expected.

4. **utils/**: This folder is likely used for utility functions or modules that can be reused throughout \ app.
   - **api.js**: A module that likely handles API calls, encapsulating logic to fetch or send data to backend.

### Summary of How It Works

- **Components**: These are the building blocks of UI. They are designed to be reusable, so you can compose them together to build complex interfaces.

- **Pages**: Each page component typically corresponds to a specific route in application. They utilize components from the `components` folder to construct the layout and functionality.

- **Testing**: Each component and page has an associated test file, which is a good practice for maintaining code quality. These tests help verify that your components behave as expected, which is crucial for ensuring stability as app evolves.

- **Utilities**: The `utils` folder helps keep code organized by separating concerns. Functions related to data fetching or other shared logic are centralized here, making them accessible throughout app.

### Overall Flow

1. **User Interaction**: Users navigate through app, triggering different pages.
2. **Page Components**: Each page component is rendered based on the current route, pulling in necessary components.
3. **Reusable Components**: These components can be reused across various pages, allowing for a consistent look and feel.
4. **API Interaction**: When needed, the page components call functions from `api.js` to fetch or manipulate data.
5. **Testing**: Regularly running tests helps catch bugs early, ensuring each component and page works correctly.

This structure is clean and modular, making it easier to maintain and scale application over time.

3.To do unit test

    go to backend folder
        npm test

4.To do unit test frontend

    go to frontend folder
        npm test
