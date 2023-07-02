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
## Planning:
### Front End: 
The front end user interface will be designed using React and will uphold best practices to provide the user with a pleasant draft experience. We will use class components to build different sections of the webpage, for example:
  - App.js: This is the main component that contains the logic and state management of our single-page website.
  - DraftBoard.js: render the draft board
  - AvailablePlayerList.js: displays the remaining players left in the draft pool and their statistics
  - TeamManagement.js: will display teams and their current players while also handling team creation and player management (adding/removing players to/from teams)
  The user interface should be intuitive and not inhibit or burden the drafting process. It is imperative that we use our space wisely when styling this webpage, as the current drafter should be able to view remaining players in the draft pool and the current players on their team simultaneously, in order to allow them to make the best draft selection possible. If the webpage is too clunky or requires too much scrolling, the drafting user will likely spend much of their allotted draft time messing with the webpage, when they should be focusing on their draft pick and the statistics at their disposal. Finally, the commissioner should easily be able to expand the team management section and allow large scale viewing of all teams created, or allow for more precise viewing of particular teams and their drafted players.
### Back End:
The back-end will be integrated using NodeJS. NodeJS will be used to develop and access the required APIs for the draft tool and subsequently populate a database with active players in the NFL. 
  - Server Setup: Set up the Node.js server to handle requests and responses.
  - API Development: Creation of API endpoints that are used to retrieve player data, manage the draft, and provide team management. 
  - Database Integration: Integrate MongoDB with Node.js server. 
