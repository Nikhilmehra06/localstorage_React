import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Form = ({ user, setUser }) => {
  // Function to get data from Local storage

  const [input, setInput] = useState({
    userName: '',
    email: '',
    phone: '',
  });

  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const validation = (e) => {
    let { userName, email, phone } = input;
    if (userName === '') {
      toast.error('Name is Required');
    } else if (
      email === '' ||
      !email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) // eslint-disable-line
    ) {
      toast.error('Enter valid email');
    } else if (phone.length !== 10 || !phone.match(/^[0-9]{10}$/)) {
      // eslint-disable-line

      toast.error('Please Enter Valid Number');
    } else {
      toast.success('User Added Successfully');
      const newUser = { ...input, id: new Date().getTime().toString() };
      setUser([...user, newUser]);
      setInput({ ...input, userName: '', email: '', phone: '' });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    validation();
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return (
    <div className="form-container">
      <form autoComplete="off" onSubmit={submitHandler}>
        <label>Username</label>
        <input
          type="text"
          name="userName"
          className="form-control"
          placeholder="Enter your name"
          value={input.userName}
          onChange={inputHandler}
        />
        <br />
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={input.email}
          placeholder="Enter your email"
          className="form-control"
          onChange={inputHandler}
        />
        <br />
        <label>Mobile</label>
        <input
          type="text"
          name="phone"
          className="form-control"
          placeholder="Enter Your Mobile Number"
          value={input.phone}
          onChange={inputHandler}
        />
        <br />

        <button type="submit" className="btn btn-success btn-md">
          Add
        </button>
      </form>
    </div>
  );
};

export default Form;
