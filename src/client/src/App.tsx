import React from 'react';
import logo from './logo.svg';
import './App.css';

const GetRequestButton = () => {
  const handleClick = () => {
    fetch('/api', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      return response.json()
    })
    .then(data => {
      console.log(data)
      // do something with the data
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <button onClick={handleClick}>
      Make GET Request
    </button>
  )
}

function App() {
  return (
    <div>
      <GetRequestButton/>
    </div>
  );
}

export default App;
