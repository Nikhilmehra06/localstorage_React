import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash } from 'react-icons/fi';

const Table = ({ user, setUser }) => {
  //Handling Drag and Drop
  const handleDragEnd = (results) => {
    if (!results.destination) return;
    let tempUser = [...user];
    let [slectedRow] = tempUser.splice(results.source.index, 1);
    tempUser.splice(results.destination.index, 0, slectedRow);
    setUser(tempUser);
  };

  // Function Deleting user
  const deleteuser = (id) => {
    const filtereduser = user.filter((elem, index) => {
      return elem.id !== id;
    });
    toast.error('User Deleted successfully !');
    setUser(filtereduser);
  };

  // Function Edit User
  const edituser = (id) => {
    console.log(id);
    let editUser = user.find((elem) => {
      return elem.id === id;
    });

    console.log(editUser);
  };

  return (
    <div className="view-container">
      {user.length > 0 && (
        <div className="table-responsive-sm">
          <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <Droppable droppableId="tbody">
                {(provided) => (
                  <tbody ref={provided.innerRef} {...provided.droppableProps}>
                    {user.map((user, index) => (
                      <Draggable
                        draggableId={user.id.toString()}
                        index={index}
                        key={user.id}
                      >
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={index}
                          >
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                              <span
                                className="edit"
                                onClick={() => edituser(user.id)}
                              >
                                <FiEdit />
                              </span>
                              <span
                                className="delete-btn"
                                onClick={() => deleteuser(user.id)}
                              >
                                <FiTrash />
                              </span>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
          </DragDropContext>
          <button className="btn btn-danger btn-md" onClick={() => setUser([])}>
            Remove All
          </button>
        </div>
      )}
      {user.length < 1 && <div>No User Added</div>}
    </div>
  );
};

export default Table;
