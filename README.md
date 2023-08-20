![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/ffdt_banner.png)
# CS312-Fantasy-Draft
CS312 Web Programming II - In-person Fantasy Football Draft Tool using React &amp; NodeJS

Try our application yourself: https://brandonbjs.github.io/FF-Draft-Tool-Build/

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

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/design-reference1.PNG)

### Deliverable #2 - Create MongoDB:
The database was created using the command “use Fantasy_Draft”. Following the creation of the database, the collection named “players” was created to hold the documents/players for the database. See the below screenshot to see the command that created the collection as well as the first 5 documents.

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/create-mongodb.png)

### Deliverable #3 - Populate MongoDB:
In order to test the creation of our API endpoints and Service Function code, a populated database was needed. In this deliverable, the database was populated with the first 5 players of our intended database. The initial fields were adp, name, position, team, and bye. Later, the list would be updated to have the two missing fields that are used by our api code, status and manager. The following function within mongosh was used to add these fields, db.players.updateMany({}, { "$set": { "manager": null, "status": true } }). Below is the screenshot showing the players after the initial insert.

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/populate-mongodb.png)

### Deliverable #4 - Create Endpoints & Service Function Code:
* **Created connect.js:** responsible for setting up a connection to the MongoDB database using mongoose. Database class was created allowing an instance of the Database class to be exported and a connection to the MongoDB server to be established upon import. Below is a small snippet showing the database class. 

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/connect.png)

* **Creation of PlayerModel.js:** The PlayerModel.js code is responsible for establishing a schema for the collection of players. The field data types are defined and the model is exported for use in the DraftToolService.js code. The below screenshot shows the schema used. 

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/player-model.png)

* **Creation of DraftToolService.js:** The DraftToolService.js code contains the code for the 5 service functions that are required for the api.
  
**1. addPlayer**

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/addPlayer.png)

**2. fetchPlayers**
   
![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/fetchPlayers.png)

**3. findPlayerById:** Accepts an id as a parameter. Created to be used as a helper function in the api. Finds a player by id.

**4. updatePlayer:** Accepts id and manager as parameters. Finds the appropriate player by the id parameter. If found, sets manager field and status field. Uses .save command and returns the player. 
   
![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/updatePlayer.png)

**5. deletePlayer:** Accepts id as a parameter. Uses findByIdAndDelete command, passing the id. Returns the deleted player.

### Deliverable #5 - Test Endpoints in Postman:
Within Postman, the four endpoints were tested to assure that the right actions were being performed within our Fantasy_Draft database.

**Testing add player endpoint:** In order to test the api functionality, the addPlayer endpoint will pass a player document in JSON format. The below screenshot shows an example of a player that would be passed from the front-end to the API. 

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/test-add.png)

When the body containing this player data was sent, the below screenshot shows the response. 

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/test-add1.png)

This shows that the api is able to successfully use the service functions and add players to the Fantasy_Draft database. Also, the manager and status fields are being added by the DraftToolService.js code. There are two errors that may be thrown if there is an issue with adding the player document. One is the status code 500, if there is an issue adding the player to the DB. The other will return a 400 status code if the data lacks the required fields. Both errors have been tested. See below for the status code 400 response.

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/test-add2.png)

**Testing Fetch Players Endpoint:** The fetch players endpoint is responsible for providing a list of players from the database that are not currently drafted by a manager/team. That is, the status of the player is true. When testing this functionality, the response should deliver a message stating that the list was fetched successfully as well as all of the players with the status of true. As seen in the below screenshot, the endpoint is capable of providing a list of players containing the status true. 

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/test-fetch.png)

If there is an error grabbing this list, the endpoint is capable of responding with the correct error message and status code. 

**Testing Update Player Endpoint:** The update player endpoint is responsible for updating a particular player’s manager and status by the provided id. In the draft, this will enable the selected players to be removed from the available player list. If the update is successful, a success message will be displayed and the player data will be returned as well. See the below response showing the status changed and manager updated accordingly. 

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/test-update.png)

There are two errors that may be thrown, a 404 error stating that the player ID does not exist and the 500 error stating that there was an error updating the player in the database. The below screenshot shows the response from an incorrect id. 

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/test-update1.png)

**Testing Delete Player Endpoint:** The delete player endpoint is an admin only endpoint. The front-end will not be able to use this endpoint since it is a hard delete. The endpoint will accept an id of a player and either respond successfully or throw one of two errors. The first error will throw a 404 status code stating that the id doesn’t exist. The other will throw a 500 status code stating that there was an error deleting the player from the database. The functionality of the delete player endpoint is working correctly. Players may be deleted and each error may successfully be thrown. The screenshot below shows that the id check of the player is working correctly. 

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/test-delete.png)

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

## Phase-2 Deliverable Report
### Deliverable #1 - Write React Code:
The front-end react app utilizes 4 components - App.js, DraftBoard.js, AvailablePlayerList.js, and TeamManagement.js. 
1. **Implementation of App.js:** App.js is the main component that contains the logic and state management of our single-page website.
* Changes made since Phase 1: App.js changed a considerable amount in Phase 2 compared to Phase 1. After spending more time with the project, it became clear that the draft state was not going to be able to be managed in DraftBoard.js. This is because many aspects of the draft state had to be checked and monitored all around the application, in multiple components. Therefore, to assure there were no issues changing state, reading state and managing the draft, we moved all of the state out of DraftBoard.js and into App.js, as well as most of the handler functions that altered the state.
* Challenges: Initially, we ran into a lot of problems trying to get the draft logic to work like a proper snake draft. The difficult part was ensuring that Team 1 and Team 10 got 2 picks in a row as long as the draft was not on round 1 or round 10. Once the draft logic was figured out, we realized that the other two components being rendered were going to need to have access to much of the draft state that was being manipulated in DraftBoard.js. Since AvailablePlayerList.js and TeamManagement.js are not children of DraftBoard.js, it made sense to move all the state and their accompanying functions out of DraftBoard.js and into App.js (now a class component) and then pass them as props to the components that needed them.
* App.js utilizes a constructor to maintain the state of the array of teams which includes the team id, name, and players. The component also maintains the state of the pickingId, isRoundEven, roundNum, countdown, draftStarted, and isEndOfDraft.

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/app-constructor.png)

* App.js has 10 functions that allow for the management of the fantasy football draft.
   **updatePickingId:** Manages which team is picking and draft logic. Has no parameters. Utilizes nested conditionals to handle different scenarios in a snake draft such as the first and last rounds, or even/odd rounds. Ensures that the pickingId, isRoundEven, and roundNum variables are updated so that the draft can progress in a snake draft order. See snippet below to see the conditional in updatePickingId that handles the progression of the first round.

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/app-updatePickingId.png)
 
 * **updateCountdown:** Decrements the countdown timer. Uses setState and prevState to accurately decrement the countdown at the set interval.

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/app-updateCountdown.png)

 * **resetCountdown:** Resets the countdown timer. Has num parameter which is the number of seconds that the countdown is reset to. Sets the state of countdown variable to num parameter.

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/app-resetCountdown.png)

* **componentDidMount:** Component Lifecycle Method. Sets initial value of this.interval that is used to manage the countdown timer once the draft is started.
* **componentWillUnmount:** Component Lifecycle Method. Uses clearInterval function to stop the interval that was setup for the countdown timer.
* **startDraft:** Starts the draft process. Updates the state of the boolean variable draftStarted to true. Uses setInterval function to call updateCountdown function, setting function to be called every 1000 milliseconds.

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/app-startDraft.png)
   
* **componentDidUpdate:** Component Lifecycle Method used to manage draft flow and update draft order. If the draft has started, the countdown is 0, and the draft has not ended, the picking id will be updated and the countdown will be reset. Essentially skipping that player’s turn. The player will end the draft with an empty spot on the roster due to the skipped turn. If the draft has ended, do nothing. Preventing weird interactions that occur when components are re-rendered.

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/app-componentDidUpdate.png)
   
* **handleStartDraft:** Starts Draft - Passed as prop to Draftboard.js. Invokes startDraft function.
* **handleNameChange:** Updates name of team upon handleTeamNameClick() in Draftboard.js. Utilizes setState, prevState, and map function to update the name in the state teams array.

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/app-handleNameChange.png)
   
* **render:** The App.js component renders the other components - DraftBoard.js, AvailablePlayerList.js, and TeamManagement.js. Passes appropriate props and functions to each component.

2. **Implementation of DraftBoard.js:** DraftBoard.js is a class component that is responsible for displaying the live draft board and functionality for resetting the draft.
* DraftBoard.js utilizes a constructor that manages the state of the individual team colors. These are randomly generated per team id.
* Changes made since Phase 1: DraftBoard.js went through considerable changes from Phase 1 to Phase 2. Originally, we had all the draft states being handled by DraftBoard.js, however, as we continued to code the application, it became apparent that other components were going to need access to the draft states and their methods. This lended us to refactoring DraftBoard.js and moving the state and their functions to App.js. We then passed the state and methods as props to the components as needed. After this change was made, DraftBoard became responsible for properly displaying all 10 teams and their players as well as the draft buttons and the countdown.
* Challenges: We had a lot of trouble with the draft state and the accompanying methods. As we started working on the other components of the application, we were encountering errors trying to keep the draft countdown and the pickingId up to date. Once we moved it all into App.js and passed the state and method as props, everything began to work as expected.
* DraftBoard.js has 2 functions allowing for the display and reset of the draft.
* **getRandomColor:** Generates random ASCII color to be used for team borders.
* **handleResetDraft:** Resets the draft. Invokes the resetPlayers endpoint. Fetches using reset endpoint url and put method updating the status and manager of all players in the database. Reloads the webpage.

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/draft-handleResetDraft.png)

* **render:** Renders the startDraftButton, resetDraftButton, end of draft message, and teams (with colored borders). If draft is not started or finished, display the start draft button and reset button. If draft is started but not finished, display current round, picking team, and countdown. If draft is over, display draft is over message. Uses map function to display each team. Uses inline css styling to customize the border colors. Red for picking team and teamColor if not picking. Lists all players on each team by position. The below snippet shows teams.map.

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/draft-render.png)

3. **Implementation of AvailablePlayerList.js:** AvailablePlayerList.js is a function component responsible for rendering and displaying all the players with a status that evaluates to true. That means that the player has not been touched by the updatePlayer endpoint or service functions and that the player is free to draft by the next team in the draft. Shows relevant draft data such as ADP, position, player name, bye, and team.
* Changes made since Phase 1: Originally, this component rendered the available players in a table using grid to style and organize. However, since we decided that our users should have the ability to search, sort and paginate their players, we implemented a package called “react-data-table-component” that has built in sorting and pagination. From there we created a custom search function that uses the built in filter() and includes() functions to search through the players useState() hook. We also added the button that allows the user to add a player to the team that is currently drafting.
* Challenges: It was not hard to implement the “react-data-table-component” package as invoking the DataTable custom html tag is straightforward. We did have some trouble getting the “Add Player” button to work properly along with its accompanying functions and methods. The hardest part was actually coding all the conditions that needed to be checked every time a player was added to a new team. Fantasy Football teams have a number of open slots per position, as well as a number of flex spots that can hold any type of player. This meant that as the user clicks the “Add Player” button, the players should be dynamically added to the team in the next available position or be placed in an open flex spot. We have included the conditions that were checked when a wide-receiver is attempted to be added to a team in order to better display what had to be checked for each player to be added properly.

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/availPlayerListSnip.PNG)

* AvailablePlayerList.js is a function component that utilizes hooks to fetch the player data that is to be displayed.We utilized the useState() and the useEffect() hooks to accurately get and set our playersData as well as search through our playersData with our custom filteredPlayers() function.
 
![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/hooks.PNG)

* The AvailablePlayerList.js is passed a number of state variables as props as well as the updatePickingID() method and the resetCountdown() method. It consists of two functions called handleAddPlayerToTeam() and filteredPlayers().
* **handleAddPlayerToTeam():** this function is the handler function that is invoked whenever the “Add Player” button is clicked. First, it completes a large number of if statements to ensure that the player being selected actually has an open slot of the team that is attempting to draft it. If there is an open slot, we first update the teams array (passed as a prop from App.js) to include the new player. Then we make our “/updatePlayer” endpoint call to reflect those changes in the back-end. Finally, this function invokes the resetCountdown() method and the updatePickingId() method (passed as props from App.js) to move the draft along to the next team in the draft (in accordance with our snake draft logic). We included a snapshot of the function, after the if statements.

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/availPlayerHandleAddPlayer.PNG)

* **filteredPlayers():** a small helper function that utilizes the built-in functions filter() and includes() that functions as a search bar.

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/searchFunction.PNG)

* Finally, the last thing to note is that we defined an array called “columns” that outlines the DataTable that is invoked in the return statement. We pass the columns array and the filteredPlayers data to the DataTable to be displayed with sort and pagination capabilities. 

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/dataTable.PNG)
 
4. **Implementation of TeamManagement.js:** TeamManagement.js is a class component that is responsible for displaying each of the teams with their players. The players will be displayed with columns showing positions, player name, team, bye week, adp, and round drafted. In the draft, this will be used by teams to see the outlook of each team allowing for strategizing throughout the draft process.
* Changes from Phase 1: TeamManagement.js did not exist  in Phase 1, we only had a placeholder div that was styled, therefore all of its code was completed in Phase 2.
* Problems encountered with TeamManagement.js: The problems we encountered in TeamManagement.js were related to displaying the correct information in a pleasing format. We ended up using some refactored grid code that Drew wrote in Phase 1 (for AvailablePlayerList.js) to display the table in the TeamManagement window. We also created a new endpoint and service function called “/fetchTeams”, “fetchTeamsEndpoint()” and “fetchTeams()” that accepted a manager in the request.body and used the find() method to return all players with the matching manager id. Lastly, we added a final field to our ODM Player Model called “draftedRound” that tracks the exact round the player was drafted in.
* TeamManagement.js utilizes a constructor to maintain the state of variables selectedTeamID and selectedTeamPlayers.
* TeamManagement.js has 3 functions that are used to display each team correctly.
* **sortPlayersByPosition:** Sorts the team according to position for display purposes. Accepts parameter players that are to be sorted. Uses positionOrder to maintain an array of positions with order values. Returns the players sorted by positionOrder.

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/tm-sortPlayersByPosition.png)

* **handleTeamSelect:** Handler used to display the correct team that is selected from the drop down. Sets the selectedTeamId to the event target value. Fetches the fetchTeamEndpoint passing the selectedTeamId as query parameter. Maps over player data. The below snippet shows fetch function and data handling. 

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/tm-handleTeamSelect.png)

* **render:** Renders the drop down list and selected team. Uses Drop Down List that calls handleTeamsSelect with selectedTeamId as value onChange. Maps over team displaying grid headers and sortedPlayers according to position. The below code snippet shows the grid container and grid body using the sortedPlayers function.

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/tm-render.png)

### Deliverable #2 - Integrate React Code with NodeJS:
The bulk of this deliverable was completed in Phase-1 with the creation and testing of our API and database. However, throughout Phase-2, our front-end code relied on the successful integration of React code with our API. Our DraftBoard.js, AvailablePlayerList, and TeamManagment.js components each make api requests to fetch player data from the MongoDB database. See the below snippet showing the use of the resetPlayers endpoint in DraftBoard that resets the players in our database, making them available for another draft. 

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/deliverable2-1.png)

### Deliverable #3 - Ensure Data Synchronization:
This deliverable is used to ensure that the data being manipulated, stored, and retrieved from the database is accurate in both our application as well as our MongoDB database. Thorough testing in Phase-2 showed that the fetch requests, api endpoints, service functions, and database are functioning correctly. See the below screenshot showing our dynamic available player list that is shown through the use of a fetch request, api endpoint, service function, and populated database. 

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/deliverable3-1.png)

### Deliverable #4 - Style Front-End:
The front-end is styled exclusively using CSS. We utilized both a style sheet and in-line styling for different situations. The only time in-line styling was performed was when there was a specific condition that had to be checked that affected how the component was styled. An example of this was that we wanted the team that is currently drafting to have a thick red border around their team when they are drafting. This meant checking the teams.id with the pickingId and changing the border color accordingly. We have included a picture to illustrate one of these in-line style conditions.

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/inlineStyling1.PNG)

* **Style Implementation:** First, we created and styled three main wrapper divs that carved out the correct space for our three respective components. This has the draftBoard wrapper extending horizontally across the web page with a width of 100%. The availablePlayerList wrapper and the TeamManagement wrapper are positioned, side-by-side, below the draftBoard wrapper. With these wrapper divs in place, it was much easier to add in our buttons and tables without fear of messing up any styling. From there, all the CSS in the style sheet is organized into groupings by comments. This makes it so that, at a glance, it is easy to see what CSS is styling what part of the page.
* Changes from Phase 1:: We implemented a large number of style changes that were not and could not be present for Phase 1. Things like the DraftBoard and the TeamManagement table were not included or styled in Phase 1. We also styled buttons to start and reset the draft and we created conditional divs that only display when the draft is over. We themed the Fantasy Draft App to have a “dark” theme feel. Lastly, the TeamManagement table was styled using grid, rather than using the “react-data-table-component”. We felt that the package was too much for the data we were trying to display in the TeamManagement.js component, therefore we implemented grid.
* Challenges: Implementing the conditional in-line styling was the hardest part about styling this application. As well as getting the “Start Draft” button and the countdown to disappear once the draft is complete.
* Below we have included a graphic of the Fantasy Draft App in action to show off our styling choices: **Note:** Our pagination feature has been cut off from this graphic because the team player names are pushing it down.

![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/appStyleWithBanner.PNG)

### Deliverable #5a - Refactor Front-End Code:
We refactored a large amount of code in Phase 2 in comparison to Phase 1. The main thing that was refactored was that we removed all of the draft state variables out of DraftBoard.js and moved them into App.js, as well as their accompanying methods. This made it so that our components could reference the draft state much easier and ensured that no complications would be met with state during the draft process. We then passed the relevant state and methods through to each component as props to be further utilized. We also added two more endpoints than we thought we would need. We created a new endpoint called “/fetchTeams” that accepts a manager parameter as a request.body and returns all the players with the matching manager id. We also created another endpoint called “/resetPlayers”. This endpoint is invoked whenever the big red “Reset Draft” button is pressed and it simply changes the manager and status fields to null and true, respectively. The last refactoring we did for the project involved some quality of life and style changes, such as distinguishing which team is currently drafting, adding a reset draft button, and giving each team a random colored border.

### Deliverable #5b - Refactor Back-End Code: 
Added two new endpoints to the back-end code that were both utilized in our finished product:
1. “/fetchTeam” - the endpoint being fetched (this is a GET method that passes a query parameter to the fetchTeam() service function)
* fetchTeamEndpoint() - invoked when the endpoint is called, which calls our fetchTeam() service function with the manager id passed as a query.
* fetchTeam() - service function that uses the built-in find() method to sort by manager id and return all the players that match.
2. “/resetPlayers” - the endpoint being fetched (this is a PUT method that takes no parameters)
* resetPlayersEndpoint() - invoked when the endpoint is called, which calls our resetPlayers() service function.
* resetPlayers() - service function that uses the built-in mongosh method updateMany() to change the manager and status field of every player in the DB.

### Deliverable #6a - Cleanup Front-End Code:
For our clean-up process we went through the code and made sure all functions and states had comments that accurately describe what is being done. We removed any unnecessary code that may have been overlooked and we also removed all console.log() invocations. Some other small clean-up includes following ES6 and AirBnB standards, which includes removing all semicolons. 

### Deliverable #6b - Cleanup Back-End Code:
For our clean-up process we went through the code and made sure all functions and states had comments that accurately describe what is being done. We also removed any unnecessary code that may have been overlooked. We removed all console.log() calls that may have been left over as well.

### Summary of Phase-2 Deliverables
#### Implemented Features:
Front-End: In this phase of deliverables the full entirety of the front-end has been implemented. That includes 4 components - App.js, DraftBoard.js, AvailablePlayerList.js, and TeamManagement.js. Through these components the logic and functionality of our fantasy draft website has been establised. A user of the application can expect working features such as a start draft button, reset draft button, draft timer, filtering player list, add player buttons, and a drop down list used to manage the teams in the current draft. The styling of the front-end was implemented through App.css. 

Back-End: Most of the back-end was already implemented in phase 1. However, there are a few implemented features in phase 2. These include the addition of two endpoints resetPlayers and fetchTeam. The PlayerModel schema was also changed to include a new field - draftedRound. Finally, the json file that is used to populate the database was updated to include required fields. All of these back-end changes enabled the implementation of effective front-end logic and functionality. 

#### Technologies Used:
HTML5, CSS, ReactJS, Node.js, express.js, MongoDB, Postman

#### Instructions for Running Project Locally:
1. Clone repository
2. Install MongoDB
3. Upload fitlered_players.json to MongoDB (using something like MongoDBCompass)
4. Navigate to fantasy-draft-api directory
5. Install required dependencies - npm install
6. Start API - npm run start
7. Navigate to fantasy-draft-app directory in another terminal
8. Install required dependencies - npm install
9. Start Application - npm run start

Please read our full [Project Proposal](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/project-proposal.md) document for more details on the specifics of our project. 



