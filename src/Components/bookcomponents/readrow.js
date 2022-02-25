import React from 'react'

export const Readrow = ({book,handleEdit,refresh}) => {
 const handleDelete=(e,id)=>{
   e.preventDefault();
   fetch(`/deletebook/${id}`).then(response => response.json()).then(data => console.log(data))
  refresh()

 }
  return (
    <tr key={book.id}>
    <td>{ book.isbn}</td>
    <td>{book.title} </td>
    <td>{book.author} </td>
    <td>{book.publisher} </td>
    <td>
      <button type="button"  onClick={(e)=> handleDelete(e,book.id)} className="btn btn-sm btn-outline-danger mx-1">Delete</button>
      <button type="button" onClick={(e)=> handleEdit(e,book)} className="btn btn-outline-warning btn-sm">Update</button>
    </td>
    </tr>
  )
}
