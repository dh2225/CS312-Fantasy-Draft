![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/images/ffdt_banner.png)
# Group Project Proposal: In-person Fantasy Football Draft Tool
## Team Information:
- Drew Heller 
  - Email: dh2225@nau.edu
  - GitHub: https://github.com/dh2225
- Brandon J Shaffer 
  - Email: bjs397@nau.edu
  - GitHub: https://github.com/brandonbjs
#### **GitHub Project Repository link:** https://github.com/dh2225/CS312-Fantasy-Draft
## Project Idea:
The objective of this project is to create a webpage that serves as a tool for users to host, create, manage, and participate in in-person fantasy football drafts.
## Project Requirements:
### Purpose:
The purpose of the project is to provide a tool for users to host, create, manage, and participate in in-person fantasy football drafts. In doing so, football fans may find enjoyment through the building of teams, strategizing draft selections, competing against others, and organization that the tool provides.
### Target Audience:
The target audience will be football fans who are searching for a tool that will aid in the organization, management, and enjoyment of in-person drafts. 
### Functionality:
The webpage should allow a user to host a fantasy football draft virtually, similar to the way they would host an in-person fantasy football draft. Typically, for an in-person draft, a fantasy football draft host (commissioner) would create a large cardboard draft table with enough room for each of the teams in the league (6 - 14 teams) and their players (1QB, 2RB, 2WR, 1TE, 1Flex, 1DST, 1Kicker). As the draft commences, the commissioner fills players into the draft table until each team has a full roster of players. The webpage would act very similarly to the cardboard draft table, allowing a commissioner to create teams and populate them with players queried from a database populated by an active roster NFL API. Unlike a cardboard draft table, this webpage should allow the commissioner to view remaining players in the draft pool while the draft is happening, as well as the teams currently being built. The draft queue will display each player's position, team, bye week, average draft position (ADP), and relevant player statistics from the 2022 season. This data will assist the commissioner and other team managers with making well-informed and strategic draft decisions. Once the commissioner has made a draft selection for a team, they should be able to view the drafted player on the selected team, the player should be removed from the pool of available players, and the draft should continue on for the next team. The draft ends when every user in the draft has their allotted number of players. 
#### Functions and Logic:
##### fetchPlayersEndpoint();
* This endpoint function will be invoked when this route is used: “/fetchPlayers”
  * try: invoke the fetchPlayers() service function which attempts to retrieve data from our MongoDB
    * 200 response upon success
  * catch: Error getting players from DB
    * 500 response upon failure
##### fetchPlayers();
* Asynchronous function that has no parameters.
* Set availablePlayers variable to the response of a find() function finding players with “status” field being true(available). 
* Return availablePlayers.
##### updatePlayerEndpoint();
* This endpoint function will be invoked when this route is used: “/updatePlayer”
  * try: 
    * verify id passed as parameter is valid and exists by invoking the findPlayerByID() helper function 
    * invoke the updatePlayer() service function which attempts to update data in our MongoDB
      * 200 response upon success
  * catch: Error updating player in DB
    * 500 response upon failure
##### updatePlayer();
* Asynchronous function that has id and manager as parameters. 
* Set player variable to the response of findPlayerByID().
* Set player.manager to the passed manager.
* Set player.status to false - showing player as unavailable.
* Save player to database.
##### addPlayerEndpoint();
* This endpoint function will be invoked when this route is used: “/addPlayer”
  * try: 
    * verify that the user passed all the required fields
      * Player being added must have id, adp, name, position, team, bye, manager, status
    * invoke the addPlayer() service function which attempts to add data to our MongoDB
      ○	200 response upon success
  * catch: Error adding player to DB
    * 500 response upon failure
##### addPlayer();
* Asynchronous function that receives id, adp, name, position, team, bye, manager, and status as parameters.
* Create new PlayerModel document - passing the received parameters to the PlayerModel constructor.
* Await and save the player to the database.
##### deletePlayerEndpoint();
* This endpoint function will be invoked when this route is used: “/deletePlayer”
  * try: 
    * verify id passed as parameter is valid and exists by invoking the findPlayerByID() helper function 
    * invoke the deletePlayer() service function which attempts to delete data from our MongoDB
      * 200 response upon success
  * catch: Error deleting player from DB
    * 500 response upon failure
##### hardDeletePlayer();
* Asynchronous function that receives an id as the sole parameter.
* This function utilizes the deleteOne() method on our PlayerModel with the id as the filter field.
##### findPlayerByID();
* This async function is simply a helper function that accepts an id as a parameter
* It uses the findOne() method on our PlayerModel to match the parameter id to a player id in our MongoDB.
##### componentDidMount();
* This lifecycle method will be used to initially populate our page with our MongoDB data.
##### componentDidUpdate();
* This lifecycle method will be used when the user makes updates to player status during the drafts themselves.
##### handleChange();
* This is a handler function that will handle any field changes that might occur in our application. An example of this would be when a team manager wants to add a player to their team using a submit button or a drop down menu selection. We must have a handler to handle these field changes.
##### handleSubmit();
* This is a handler function that will handle when a user clicks a button and submits a data change. The most likely scenario would be when a team manager wants to end their turn and add a player to their team. We need a handler to handle the button press the user makes when they select their player.

#### API Request-Response Formats:
##### **GET** - In order to fetch player documents from our MongoDB, we will need to utilize the GET request-response format in our DraftToolAPI.js file. The website will need to implement a number of GET requests during one page render in order to populate the live draft board with players as they are drafted and the available players list.

##### **POST** - We wish for our application to satisfy all CRUD capabilities, therefore we are including the ability to add players to our MongoDB playerbase for developer purposes. We will need to utilize the POST request-response format in our DraftToolAPI.js file. The user will never have the ability to add new players to and from the database as the database will already be populated with all the active NFL players. Users will only ever get player data and update player data. Therefore, this request-response format will only be used by developers during the testing phase of the application.

##### **PUT** - Other than making get requests, the user will also be making a large number of PUT requests during the duration of a draft. Every time an available player is drafted to a fantasy team, their “manager” field will be updated to the team name of the current drafting manager and their “status” field will be set to false. This indicates that the player is no longer available and allows them to be viewed in their respective team on the live draft board.

##### **DELETE** - We will never need to implement the DELETE request-response format because our application does not need to perform any hard deletions. In the event a player is no longer an active player in the NFL, we can simply utilize a PUT method to change the player's “status” from “Active” to their current status. In this way, we will implement a form of soft-deleting the players from our MongoDB rather than hard-deleting them. However, we will still include a deletion endpoint for possible developer use only.


#### Endpoint Routes:
##### **app.use("/fetchPlayers", fetchPlayersEndpoint);**
* Our first route will be the “/fetchPlayers” route which will invoke the fetchPlayersEndpoint(). This route is responsible for making a GET request to our MongoDB. The endpoint invoked will call the fetchPlayers() service method to fetch all the players from our database or throw errors and console messages upon failure.

##### **app.use("/updatePlayer", updatePlayerEndpoint);**
* Our second route will be the “/updatePlayer” route which will invoke the updatePlayerEndpoint(). This route is responsible for making a PUT request to our MongoDB. The endpoint invoked will call the updatePlayer() service method which takes an id as a parameter and updates the selected player’s “manager” and “status” or throws errors and console messages upon failure.

##### **app.use("/addPlayer", addPlayerEndpoint);**
* Our third route will strictly be used by developers during the development phase. We are populating our own MongoDB with player data, therefore to ensure we have a smooth experience handling our database, we are implementing an “/addPlayer” endpoint. The developer must explicitly include all the fields in the JSON body (other than ID, which MongoDB generates for us by default) when using this endpoint. This endpoint will invoke the updatePlayer() service method.

##### **app.use("/deletePlayer", deletePlayerEndpoint);**
* Our last route will also strictly be used by developers during the development phase. We are populating our own MongoDB with player data, therefore to ensure we have a smooth experience handling our database, we are implementing a “/deletePlayer” endpoint. This endpoint will invoke the hardDeletePlayer() service method which takes a single id parameter and uses the deleteOne() method to hard delete a player from the database. To reiterate, this hard deletion method will only be used during the development phase and will not be a public endpoint.

### Design References:
* **Draft Tool Inspiration**
![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/images/design-reference1.PNG)
* **Draft Board** - The draft board will be in grid form showing each of the team names at the top of their respective columns. Underneath the team names will be the team’s selections. On the draft board will be an indicator that shows which team is currently picking as well as a timer. At the expiration of the timer, if the team manager has not made a selection, the top average draft player (ADP) will be selected. 
![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/images/stat1.PNG)
* **Player Board** - The player board will also be in grid format. The default view will show all players in order according to their average draft position or ADP. On the far left of each player row will be a button that allows the current manager to make a player selection. In the header section of the player board, there will be filtering functionality that will allow the user to filter the list according to player position. 
![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/images/team1.PNG)
* **Team Management Board** - The team management board will allow the user to select any team and see what positions have been filled on their roster. The design will have tabs or possibly a drop down list that will allow the desired team to be displayed. 
