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

### Planning
* **Front-End Development:** The front-end user interface will be designed using React and will uphold best practices to provide the user with a pleasant draft experience. 
* **Back-End Development:** The back-end will be integrated using NodeJS. Our custom NodeJS API will make GET, POST, PUT, and DELETE requests to and from our MongoDB.
Please read our full [Project Proposal](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/project-proposal.md) document for more details on the specifics of our project. 



