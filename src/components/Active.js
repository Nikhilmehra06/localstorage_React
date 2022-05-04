import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';

const Active = ({ user, setUser, toggle }) => {
  const handleDragEnd = (results) => {
    if (!results.destination) return;
    let tempUser = [...user];
    let [slectedRow] = tempUser.splice(results.source.index, 1);
    tempUser.splice(results.destination.index, 0, slectedRow);
    setUser(tempUser);
  };
  return (
    <div className="view-container">
      <h1>Active User</h1>
      {!toggle && (
        <div className="table-responsive-sm">
          <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
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
        </div>
      )}
      {!toggle < 1 && <div className="text-center">No Active User </div>}
    </div>
  );
};

export default Active;
