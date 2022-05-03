import React, { useEffect, useState } from 'react';
import View from './components/View';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

//getting the data of local storage

const gettingData = () => {
  const data = localStorage.getItem('data');
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const App = () => {
  const uniqueId = () => parseInt(Date.now() * Math.random());
  const [data, setData] = useState(gettingData());
  const [user, setUser] = useState({
    id: '',
    username: '',
    email: '',
    phone: '',
  });

  const [error, setError] = useState({
    nameErr: '',
    emailErr: '',
    phoneErr: '',
  });

  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
    setError({ ...user, [name]: '' });
  };

  const validation = () => {
    let { username, email, phone } = user;
    let { nameErr, emailErr, phoneErr } = error;
    if (!username || !email || !phone) {
      setError({
        ...error,
        nameErr: 'This Field is required',
        emailErr: 'This Field is required',
        phoneErr: 'This Field is required',
      });
    } else {
      setData([...data, user]);
      toast.success('User Added Successfully');
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    validation();

    setUser({ ...user, email: '', username: '', phone: '', id: '' });
  };

  //Delete data

  const editData = () => {};

  const deleteData = (id) => {
    const filteredData = data.filter((elem, index) => {
      return elem.id !== id;
    });
    toast.error('User Deleted successfully !');
    setData(filteredData);
  };

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  return (
    <div className="wrapper">
      <h1>User record app</h1>
      <p>Add and view user using local storage</p>
      <div className="main">
        <div className="form-container">
          <form
            autoComplete="off"
            className="form-group"
            onSubmit={submitHandler}
          >
            <label htmlFor="id">Username</label>
            <input
              type="number"
              name="id"
              id="id"
              className="form-control"
              placeholder="Enter Id"
              value={user.id}
              onChange={inputHandler}
            />
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control"
              placeholder="Enter your name"
              value={user.username}
              onChange={inputHandler}
            />
            <span
              className="d-flex justify-content-end"
              style={{ color: 'red' }}
            >
              {error.nameErr}
            </span>
            <br />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              className="form-control"
              value={user.email}
              placeholder="Enter your email"
              onChange={inputHandler}
            />
            <span
              className="d-flex justify-content-end"
              style={{ color: 'red' }}
            >
              {error.emailErr}
            </span>
            <br />
            <label htmlFor="phone">Mobile</label>
            <input
              type="phone"
              name="phone"
              id="phone"
              className="form-control"
              placeholder="Enter Your Mobile Number"
              value={user.phone}
              onChange={inputHandler}
            />
            <span
              className="d-flex justify-content-end"
              style={{ color: 'red' }}
            >
              {error.phoneErr}
            </span>
            <br />
            <button type="submit" className="btn btn-success btn-md">
              ADD
            </button>
          </form>
        </div>
        <div className="view-container">
          <></>
          {data.length > 0 && (
            <div className="table-responsive-sm">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <View
                    data={data}
                    deleteData={deleteData}
                    editData={editData}
                  />
                </tbody>
              </table>
              <button
                className="btn btn-danger btn-md"
                onClick={() => setData([])}
              >
                Remove All
              </button>
            </div>
          )}
          {data.length < 1 && <div>No User Added</div>}
        </div>
      </div>
    </div>
  );
};

export default App;
