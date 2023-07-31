![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/images/ffdt_banner.png)
# CS312-Fantasy-Draft
CS312 Web Programming II - In-person Fantasy Football Draft Tool using React &amp; NodeJS

## Team Information:
* Brandon James Shaffer
  * Email: bjs397@nau.edu
  * Github: https://github.com/brandonbjs
* Drew J Heller
  * Email: dh2225@nau.edu
  * Github: https://github.com/dh2225

## Summary of Initial Project Proposal
### Project Idea
The objective of this project is to create a webpage that serves as a tool for users to host, create, manage, and participate in in-person fantasy football drafts.

### Purpose
The purpose of the project is to provide football fans with a tool that can be used to host, create, manage, and participate in in-person fantasy football drafts.
By providing this platform, fantasy football fans are able to use the tool to aid in the organization, managment, and overall enjoyment of in-person drafts. 

### Planning
* **Front-End Development:** The front-end user interface will be designed using React and will uphold best practices to provide the user with a pleasant draft experience. 
* **Back-End Development:** Our back-end MongoDB will be integrated using NodeJS. Our custom NodeJS API will make GET, POST, PUT, and DELETE requests to and from our MongoDB.

### Functionality
The webpage will enable a virtually hosted draft, mimicking the traditional physical properties of an in-person draft. This allows for the commissioner and team managers to create teams, populate them, view the remaining players, and track drafted players. The webpage will share information about each player such as player position, team, bye week, ADP, and other relevant statistics. Through this added functionality, team managers will be better equipped to make strategic draft decisions. 

#### React Components
* DraftToolAPI.js: The DraftToolAPI file will be responsible for all of our endpoint functions. Our application will utilize the express and CORS packages to handle routing.
* DraftToolService.js: responsible for all of the application’s service functions
* PlayerModel.js: responsible for mapping out how each document will look in our MongoDB
* connect.js: responsible for establishing connection to mongodb
* App.js: This is the main component that contains the logic and state management of our single-page website. The App.js component will render our DraftBoard.js component, AvailablePlayerList.js component, and our TeamManagement.js component accordingly. We will also pass any required states/functions as props to these components from App.js.
* DraftBoard.js: This component will be responsible for properly displaying the live draft board to the draft host by making GET requests using our “/fetchPlayers” route, which invokes our fetchPlayersEndpoint() and our fetchPlayers() service function. As players are drafted, their “status” will be updated from true to false, using our “/updatePlayer” route, updatePlayerEndpoint() endpoint function and updatePlayer() service function. 
* AvailablePlayerList.js: This component will be responsible for displaying all the available players remaining in the draft and their relevant statistics. This component will achieve this by making GET requests through our NodeJS API. Players who have had their “status” changed from true to false should not be visible in this section unless the user is utilizing advanced filtering to view the players that have already been drafted.
* TeamManagement.js: This component will act as a way for the draft host to manually interact with individual teams. As the draft goes on, the draft host should be able to switch between teams and view their current roster, as well as execute updates on the selected team such as adding a new player.

#### Functions To be Used
* fetchPlayersEndpoint();
* fetchPlayers();
* updatePlayerEndpoint();
* updatePlayer();
* addPlayerEndpoint();
* addPlayer();
* deletePlayerEndpoint();
* hardDeletePlayer();
* findPlayerByID();
* componentDidMount();
* componentDidUpdate();
* handleChange();
* handleSubmit();

#### Endpoints to be Used:
* "/fetchPlayers"
* "/updatePlayer"
* "/addPlayer"
* "/deletePlayer"

#### API Request-Response Formats:
* GET - In order to fetch player documents from our MongoDB, we will need to utilize the GET request-response format in our DraftToolAPI.js file. The website will need to implement a number of GET requests during one page render in order to populate the live draft board with players as they are drafted and the available players list.
* POST - We wish for our application to satisfy all CRUD capabilities, therefore we are including the ability to add players to our MongoDB playerbase for developer purposes. We will need to utilize the POST request-response format in our DraftToolAPI.js file. The user will never have the ability to add new players to and from the database as the database will already be populated with all the active NFL players. Users will only ever get player data and update player data. Therefore, this request-response format will only be used by developers during the testing phase of the application.
* PUT - Other than making get requests, the user will also be making a large number of PUT requests during the duration of a draft. Every time an available player is drafted to a fantasy team, their “manager” field will be updated to the team name of the current drafting manager and their “status” field will be set to false. This indicates that the player is no longer available and allows them to be viewed in their respective team on the live draft board.
* DELETE - We will never need to implement the DELETE request-response format because our application does not need to perform any hard deletions. In the event a player is no longer an active player in the NFL, we can simply utilize a PUT method to change the player's “status” from “Active” to their current status. In this way, we will implement a form of soft-deleting the players from our MongoDB rather than hard-deleting them. However, we will still include a deletion endpoint for possible developer use only.

#### Design References
* Draft Board - The draft board will be in grid form showing each of the team names at the top of their respective columns. Underneath the team names will be the team’s selections. On the draft board will be an indicator that shows which team is currently picking as well as a timer. At the expiration of the timer, if the team manager has not made a selection, the top adp player will be selected.
* Player Board - The player board will also be in grid format. The default view will show all players in order according to their average draft position or ADP. On the far left of each player row will be a button that allows the current manager to make a player selection. In the header section of the player board, there will be filtering functionality that will allow the user to filter the list according to player position.
* Team Management Board - The team management board will allow the user to select any team and see what positions have been filled on their roster. The design will have tabs or possibly a drop down list that will allow the desired team to be displayed.

## Phase-1 Deliverable Report
### Deliverable #1 - Design Front-End: 
The team has agreed upon an overall look and style for the front-end. From the agreed upon design, the team is better equipped to complete the Phase-2 deliverables which includes the creation of the application. 
The draft board will be the centerpiece component which will be in grid format, showing all of the picks throughout the draft and who is currently picking. The available players section in the lower left will show all of the available players with filtering functionality. Finally, the lower right will show the team management console. This will have tabs/dropdown that will allow the user to see each team and positions that are empty/filled on their roster.

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/images/design-reference1.PNG)

### Deliverable #2 - Create MongoDB:
The database was created using the command “use Fantasy_Draft”. Following the creation of the database, the collection named “players” was created to hold the documents/players for the database. See the below screenshot to see the command that created the collection as well as the first 5 documents.

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/images/create-mongodb.png)

### Deliverable #3 - Populate MongoDB:
In order to test the creation of our API endpoints and Service Function code, a populated database was needed. In this deliverable, the database was populated with the first 5 players of our intended database. The initial fields were adp, name, position, team, and bye. Later, the list would be updated to have the two missing fields that are used by our api code, status and manager. The following function within mongosh was used to add these fields, db.players.updateMany({}, { "$set": { "manager": null, "status": true } }). Below is the screenshot showing the players after the initial insert.

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/images/populate-mongodb.png)

### Deliverable #4 - Create Endpoints & Service Function Code:
* **Created connect.js:** responsible for setting up a connection to the MongoDB database using mongoose. Database class was created allowing an instance of the Database class to be exported and a connection to the MongoDB server to be established upon import. Below is a small snippet showing the database class. 

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/images/connect.png)

* **Creation of PlayerModel.js:** The PlayerModel.js code is responsible for establishing a schema for the collection of players. The field data types are defined and the model is exported for use in the DraftToolService.js code. The below screenshot shows the schema used. 

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/images/player-model.png)

* **Creation of DraftToolService.js:** The DraftToolService.js code contains the code for the 5 service functions that are required for the api.
  
**1. addPlayer**

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/images/addPlayer.png)

**2. fetchPlayers**
   
![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/images/fetchPlayers.png)

**3. findPlayerById:** Accepts an id as a parameter. Created to be used as a helper function in the api. Finds a player by id.

**4. updatePlayer:** Accepts id and manager as parameters. Finds the appropriate player by the id parameter. If found, sets manager field and status field. Uses .save command and returns the player. 
   
![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/images/updatePlayer.png)

**5. deletePlayer:** Accepts id as a parameter. Uses findByIdAndDelete command, passing the id. Returns the deleted player.

### Deliverable #5 - Test Endpoints in Postman:
Within Postman, the four endpoints were tested to assure that the right actions were being performed within our Fantasy_Draft database.

**Testing add player endpoint:** In order to test the api functionality, the addPlayer endpoint will pass a player document in JSON format. The below screenshot shows an example of a player that would be passed from the front-end to the API. 

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/images/test-add.png)

When the body containing this player data was sent, the below screenshot shows the response. 

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/images/test-add1.png)

This shows that the api is able to successfully use the service functions and add players to the Fantasy_Draft database. Also, the manager and status fields are being added by the DraftToolService.js code. There are two errors that may be thrown if there is an issue with adding the player document. One is the status code 500, if there is an issue adding the player to the DB. The other will return a 400 status code if the data lacks the required fields. Both errors have been tested. See below for the status code 400 response.

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/images/test-add2.png)

**Testing Fetch Players Endpoint:** The fetch players endpoint is responsible for providing a list of players from the database that are not currently drafted by a manager/team. That is, the status of the player is true. When testing this functionality, the response should deliver a message stating that the list was fetched successfully as well as all of the players with the status of true. As seen in the below screenshot, the endpoint is capable of providing a list of players containing the status true. 

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/images/test-fetch.png)

If there is an error grabbing this list, the endpoint is capable of responding with the correct error message and status code. 

**Testing Update Player Endpoint:** The update player endpoint is responsible for updating a particular player’s manager and status by the provided id. In the draft, this will enable the selected players to be removed from the available player list. If the update is successful, a success message will be displayed and the player data will be returned as well. See the below response showing the status changed and manager updated accordingly. 

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/images/test-update.png)

There are two errors that may be thrown, a 404 error stating that the player ID does not exist and the 500 error stating that there was an error updating the player in the database. The below screenshot shows the response from an incorrect id. 

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/images/test-update1.png)

**Testing Delete Player Endpoint:** The delete player endpoint is an admin only endpoint. The front-end will not be able to use this endpoint since it is a hard delete. The endpoint will accept an id of a player and either respond successfully or throw one of two errors. The first error will throw a 404 status code stating that the id doesn’t exist. The other will throw a 500 status code stating that there was an error deleting the player from the database. The functionality of the delete player endpoint is working correctly. Players may be deleted and each error may successfully be thrown. The screenshot below shows that the id check of the player is working correctly. 

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/images/test-delete.png)

### Summary of Phase-1 Deliverables
#### Implemented Features:
In this deliverable phase, the front-end remains untouched. A design has been agreed upon, but nothing has been implemented. The back-end however has been updated. This included the creation and population of the database as well as the creation of the projects endpoints/service function code.

#### Technologies Used:
Node.js, express.js, MongoDB, Postman

#### Instructions for Running Project Locally:
1. Clone repository
2. Install required dependencies
3. Install MongoDB and run it on your local machine
4. Install Postman
5. Start server by running npm start
6. Test API endpoints using Postman

## Phase-2 Deliverables
![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/images/phase2_deliverables.png)

Please read our full [Project Proposal](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/project-proposal.md) document for more details on the specifics of our project. 



