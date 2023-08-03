import './App.css';
import DraftBoard from './components/DraftBoard';
import AvailablePlayerList from './components/AvailablePlayerList';

function App() {
  return (
    <div className="App">
      
      <div className="draftBoard">
        <DraftBoard />
      </div>

      <div className="container">
        <div className="availablePlayerList">
          <AvailablePlayerList />
        </div>

        <div className="teamManagement">
        <h1>Team Management Placeholder</h1>
        </div>

      </div>
    </div >
  );
}

export default App;
