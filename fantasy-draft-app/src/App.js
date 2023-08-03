import './App.css';
import DraftBoard from './components/DraftBoard';

function App() {
  return (
    <div className="App">
      
      <div className="draftBoard">
        <DraftBoard />
      </div>

      <div className="container">
        <div className="availablePlayerList">
        <h1>Available Player List Placeholder</h1>
        </div>

        <div className="teamManagement">
        <h1>Team Management Placeholder</h1>
        </div>

      </div>
    </div >
  );
}

export default App;
