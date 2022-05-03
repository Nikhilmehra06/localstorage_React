import React from 'react';
import { FiTrash, FiEdit } from 'react-icons/fi';
const View = ({ data, deleteData, editData }) => {
  return data.map((data, index) => (
    <tr key={index}>
      <td>{data.id}</td>
      <td>{data.username}</td>
      <td>{data.email}</td>
      <td>{data.phone}</td>
      <td>
        <span className="edit" onClick={() => editData(data.id)}>
          <FiEdit />
        </span>
        <span className="delete-btn" onClick={() => deleteData(data.id)}>
          <FiTrash />
        </span>
      </td>
    </tr>
  ));
};

export default View;
