import React from 'react';
import { useNavigate } from 'react-router-dom'

export const Readrow = ({transaction,handleEdit,refresh}) => {
  // const history = useNavigate();
  const handleDelete=(e,id)=>{
   e.preventDefault();
   fetch(`/deletetransaction/${id}`).then(response => response.json()).then(data => console.log(data));
    // history('/');
  refresh()

 }
  return (
    <tr key={transaction.t_id}>
    <td>{ transaction.t_id}</td>


    <td>{ transaction.m_id}</td>
    <td>{transaction.b_id} </td>
    <td>{transaction.fees} </td>
    <td>{transaction.issue_date}</td>
    <td>{transaction.return_date}</td>
    <td>{transaction.status}</td>

    <td>
      <button type="button"  onClick={(e)=> handleDelete(e,transaction.id)} className="btn btn-sm btn-outline-danger mx-1 my-1" > <i className="bi bi-trash"></i>Delete</button>
      <button type="button" onClick={(e)=> handleEdit(e,transaction)} className="btn btn-outline-warning btn-sm mx-1 my-1"><i className="bi bi-brush "></i>Update</button>
    </td>
    </tr>
  )
}
