import React from 'react';
import './App.css';
import axios from 'axios';

const GetRequestButton = () => {
  const handleClick = () => {
    axios.post('/api/journal', {
      entry: 'I went to the store today and met a person.',
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
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
