import React, { useState } from 'react';
import Form from './components/Form';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Table from './components/Table';

const App = () => {
  const gettinguser = () => {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    } else {
      return [];
    }
  };
  const [user, setUser] = useState(gettinguser());

  return (
    <>
      <ToastContainer />
      <h1>USER DETAILS</h1>
      <p>Add the user to save in Local Storage</p>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <Form user={user} setUser={setUser} />
          </div>
          <div className="col-md-6">
            <Table user={user} setUser={setUser} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
