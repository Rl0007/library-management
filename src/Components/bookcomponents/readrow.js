import React from 'react';
import { useNavigate } from 'react-router-dom'

export const Readrow = ({book,handleEdit,refresh}) => {
  // const history = useNavigate();
  const handleDelete=(e,id)=>{
   e.preventDefault();
   fetch(`/deletebook/${id}`).then(response => response.json()).then(data => console.log(data));
    // history('/');
  refresh()

 }
  return (
    <tr key={book.id}>
    <td>{ book.id}</td>


    <td>{ book.isbn}</td>
    <td>{book.title} </td>
    <td>{book.author} </td>
    <td>{book.publisher} </td>
    <td>{book.stockinlibrary}</td>
    <td>{book.totalstock}</td>
    <td>
      <button type="button"  onClick={(e)=> handleDelete(e,book.id)} className="btn btn-sm btn-outline-danger mx-1 my-1" > <i className="bi bi-trash"></i>Delete</button>
      <button type="button" onClick={(e)=> handleEdit(e,book)} className="btn btn-outline-warning btn-sm mx-1 my-1"><i className="bi bi-brush "></i>Update</button>
    </td>
    </tr>
  )
}
