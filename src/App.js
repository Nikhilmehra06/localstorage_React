import React, { useState } from 'react';
import Form from './components/Form';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Table from './components/Table';
import Active from './components/Active';

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
  const [input, setInput] = useState({
    userName: '',
    email: '',
    phone: '',
  });
  const [editBtn, setEditBtn] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  // Function Edit User
  const edituser = (id) => {
    console.log(id);
    let editUser = user.find((elem) => {
      return elem.id === id;
    });
    setEditBtn(false);
    setInput(editUser);
    setIsEditItem(id);
  };

  const [toggle, setToggle] = useState(true);
  //Handling toggle
  const toggleHandler = () => {
    setToggle(!toggle);
    console.log(toggle);
  };

  return (
    <div>
      <ToastContainer />
      <h1>USER DETAILS</h1>
      <p>You’re in good hands</p>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <Form
              user={user}
              setUser={setUser}
              input={input}
              setInput={setInput}
              editBtn={editBtn}
              isEditItem={isEditItem}
              setEditBtn={setEditBtn}
              setIsEditItem={setIsEditItem}
            />
          </div>
          <div className="col-md-6">
            <Table
              user={user}
              setUser={setUser}
              edituser={edituser}
              toggleHandler={toggleHandler}
            />
            <Active user={user} toggle={toggle} setUser={setUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
