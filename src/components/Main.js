import React, { useState } from 'react';
import validator from 'validator';
import './Main.css';
import Employees from '../data/Employees.json';
import Requests from '../data/Requests.json';


function Main() {
  const [email, setEmail] = useState('');
  const [requests, setRequests] = useState();
  const handleCheckClick = () => {
    if (email != null) {
      if (validator.isEmail(email)) {
        const foundEmployee = Employees.find(
          (employee) => employee.email === email
        );

        if (foundEmployee) {
          const foundRequests = Requests.filter(
            (request) => request.employee_id === foundEmployee.employee_id
          );
          console.log('requests found', foundRequests);
          setRequests(foundRequests);
        } else {
          alert('No Request found aganist the email');
        }
      } else {
        alert('Enter valid email');
      }
    }
  };
  return (
    <div>
      <h1>Ticket Request App</h1>
      <h2> Enter Employee Email</h2>
      <label>Email: </label>
      <input
        type="email"
        required
        placeholder="Enter your email "
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <button onClick={() => handleCheckClick()}>Check</button>

      <div className="requestsContainer">
        <ul>
          {requests?.map((request) => {
            return (
              <li>
                <>
                  <span>RequestId: {request.request_id} </span>
                  <span>NoOfTickets: {request.number_of_tickets} </span>
                  <span>
                    DateRequested:{' '}
                    {new Date(request.date_requested).toLocaleDateString()}
                  </span>
                  <span>
                    {' '}
                    gameDate: {new Date(request.game_date).toLocaleDateString()}
                  </span>
                  <span>
                    {''}
                    entryTime:{' '}
                    {new Date(request.entry_time).toLocaleDateString()}
                  </span>
                  <span>
                    {''} isApproved: {request.isApproved}
                  </span>
                </>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Main;
