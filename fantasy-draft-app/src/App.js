import './App.css';
import DraftBoard from './components/DraftBoard'
import AvailablePlayerList from './components/AvailablePlayerList'
import TeamManagement from './components/TeamManagement'
import React, { Component } from 'react'


class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      teams: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `Team ${i + 1}`,
        players: {
          QB: null,
          RB1: null,
          RB2: null,
          WR1: null,
          WR2: null,
          TE: null,
          FLEX1: null,
          FLEX2: null,
          DST: null,
          K: null,
        },
      })),
      pickingId: 1,
      isRoundEven: false,
      roundNum: 1,
      countdown: 20,
      draftStarted: false,
      isEndOfDraft: false,
    }
  }

  // Decided to move pickingId and it's accompanying functions/logic outside of 
  // DraftBoard.js. This is due to the fact that pickingId is relevant throughout
  // the entire draft process, not just the Draft Board. This will allow passing of
  // props and functions.
  
  // function responsible for keeping track of picking ID and maintaining
  // the snake draft logic
  updatePickingId = () => {
    let { pickingId, isRoundEven, roundNum } = this.state
  
    // first round/last round will behave differently than the rest
    if (roundNum === 1) {
      // bottom of the draft order
      if (pickingId === 10) {
        this.setState((prevState) => ({
          isRoundEven: true,
          roundNum: prevState.roundNum + 1,
        }))
        return
      }
      // not round 10 but still in round 1, increment until round 10
      // OR this is allows the second pick for Team 10 to occurr
      this.setState((prevState) => ({
        pickingId: prevState.pickingId + 1,
      }))
    } else if (roundNum === 10 && pickingId === 1) {
      this.setState({isEndOfDraft: true})
      alert("All teams have been filled. The draft is over!")
    } else {
      // For subsequent rounds, use the snake draft logic
      // During even rounds, we are descending through the draft order
      if (isRoundEven) {
        if (pickingId === 1) {
          this.setState((prevState) => ({
            isRoundEven: false,
            roundNum: prevState.roundNum + 1,
          }))
        } else {
          this.setState((prevState) => ({
            pickingId: prevState.pickingId - 1,
          }))
        }
      } else {
        // during odd rounds, we are ascending through the draft order
        // making sure to give players 1 and 10 2 picks in a row
        // (as long as it is not the first or last round in the draft)
        if (pickingId === 10) {
          this.setState((prevState) => ({
            isRoundEven: true,
            roundNum: prevState.roundNum + 1,
          }))
        } else {
          this.setState((prevState) => ({
            pickingId: prevState.pickingId + 1,
          }))
        }
      }
    }
  };

  // this function uses setState and previous state to accurately
  // decrement the countdown at the set interval
  updateCountdown = () => {
    this.setState((prevState) => ({
        countdown: prevState.countdown - 1,
      }))
  }

  resetCountdown = (num) => {
      this.setState({ countdown: num })
  }

  componentDidMount() {
    this.interval = null
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

    // startDraft function is responsible for starting the draft timer
    // and keeping the timer running appropriately
    startDraft = () => {
        this.setState({draftStarted: true}) 
        this.interval = setInterval(this.updateCountdown, 1000)
    }

  componentDidUpdate(prevProps) {
    const { countdown, draftStarted, isEndOfDraft } = this.state;

    if (draftStarted && countdown === 0 && !isEndOfDraft) {
      this.updatePickingId();
      this.resetCountdown(20);
    } 
    
    if (isEndOfDraft) {

    }
  }

  handleStartDraft = () => {
    this.startDraft()
  }
  
  handleNameChange = (teamId, newName) => {
    this.setState((prevState) => ({
      teams: prevState.teams.map((team) =>
        team.id === teamId ? { ...team, name: newName } : team
      ),
    }))
  }
  
  render() {
    const { pickingId, teams, isRoundEven, roundNum, countdown, isEndOfDraft, draftStarted } = this.state
    return (
      <div className="App">
        
        <div className="draftBoard">
          <DraftBoard pickingId={pickingId} teams={teams} isRoundEven={isRoundEven} 
          roundNum={roundNum} countdown={countdown} isEndOfDraft={isEndOfDraft} draftStarted={draftStarted}
          handleStartDraft={this.handleStartDraft} handleNameChange={this.handleNameChange}/>
        </div>
  
        <div className="container">
          <div className="availablePlayerList">
            <AvailablePlayerList pickingId={pickingId} teams={teams} countdown={countdown} draftStarted={draftStarted} 
            roundNum={roundNum} updatePickingId={this.updatePickingId} resetCountdown={this.resetCountdown}/>
          </div>
  
          <div className="teamManagement">
          <TeamManagement teams={teams} draftStarted={draftStarted}/>
          </div>
  
        </div>
      </div >
    )
  }
}

export default App