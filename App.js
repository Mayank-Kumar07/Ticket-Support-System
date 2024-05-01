import './App.css';
import axios from 'axios';

import Dashboard from './components/Dashboard';
import TicketForm from './components/TicketForm';

function App() {
  return (
    <div className="App">
      <h1>Support Ticketing System</h1>
      <TicketForm /> {/* Rendering the TicketForm component */}
      <Dashboard /> {/* Rendering the Dashboard component */}
    </div>
  );
}

export default App;