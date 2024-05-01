// Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Fetch tickets from backend API
    axios.get('/api/tickets')
      .then(response => {
        setTickets(response.data);
      })
      .catch(error => {
        console.error('Error fetching tickets:', error);
      });
  }, []);

  return (
    <div>
      <h2>Support Staff Dashboard</h2>
      <div>
        <h3>Tickets</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Category</th>
              <th>Urgency</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.description}</td>
                <td>{ticket.category}</td>
                <td>{ticket.urgency}</td>
                <td>{ticket.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
