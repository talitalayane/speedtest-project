SpeedTest Backend:

This project is an API designed to record, retrieve, and manage internet speed tests and interval settings. It uses Node.js, Express, Sequelize (for database interaction), and node-cron for scheduling automatic speed tests.

Features:

-CRUD for Speed Tests: Create, list, update, and delete speed test records.  
-CRUD for Interval Settings: Manage interval settings for automatic speed test scheduling.    
-Automatic Scheduling: Speed tests are automatically scheduled at configurable intervals using node-cron.    
-Real Speed Tests: The speed tests are performed using the speedtest-net library to fetch real internet speed results.   

Technologies Used:

-Node.js: JavaScript runtime for server-side development.   
-Express: Framework for building APIs.   
-Sequelize: ORM (Object Relational Mapping) for database interaction.    
-SQLite: Local database for storing speed test results.    
-speedtest-net: Library for performing internet speed tests.    
-node-cron: Library for scheduling recurring tasks (speed tests in this case).  

Requirements:

-Node.js: Version 14.x or higher.   
-npm: Package manager to install dependencies.  

How to Run the Project:   

-Step 1: Clone the Repository  
  git clone https://github.com/username/speedtest-backend.git   
  cd speedtest-backend    
-Step 2: Install Dependencies     
  npm install    
-Step 3: Set Up the Database    
  This project uses SQLite as the database. You need to run migrations to create the necessary tables.   
  npx sequelize-cli db:migrate    
-Step 4: Run the Server    
  npm start   
  The server will start on http://localhost:3000.    

API Endpoints:   

1. Speed Tests   
  GET /speed-tests: Returns all recorded speed tests.    
  POST /speed-tests: Executes a new speed test and stores the result in the database.    
  DELETE /speed-tests/:id: Deletes a speed test by ID.    
2. Interval Settings    
  GET /config: Returns the current interval settings for automatic speed tests.   
  POST /config: Updates the interval settings.   

Manually Running Speed Tests:    
-You can test the API using CURL or an HTTP client like Postman or Insomnia.    
-Example Request to Create a Speed Test:    
  curl -X POST -H "Content-Type: application/json" http://localhost:3000/speed-tests    
-Example Request to List Speed Tests:   
  curl -X GET http://localhost:3000/speed-tests   
-Automatic Speed Test Scheduling     
-Speed tests are automatically scheduled using node-cron based on the configured interval. To change the interval, send a request to the config endpoint.    
-Example of Updating the Interval:    
  curl -X POST -H "Content-Type: application/json" -d '{"interval": "*/5 * * * *"}' http://localhost:3000/config   
-The example above configures the cron job to run a speed test every 5 minutes.    
