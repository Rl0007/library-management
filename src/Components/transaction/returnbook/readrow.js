import React from 'react'

export const Readrow = ({return1book,handleEdit,refresh}) => {
 const handleDelete=(e,m_id,b_id)=>{
   e.preventDefault();
   fetch(`/deletereturnbook/${m_id}/${b_id}`).then(response => response.json()).then(data => console.log(data))
  refresh()

 }
  return (
    <tr key={return1book.m_id}>
    <td>{ return1book.m_id}</td>
    <td>{return1book.b_id} </td>
    <td>{return1book.issuedate} </td>
    <td>{return1book.returndate} </td>
    <td>{return1book.fees} </td>
    <td>{return1book.status} </td>
  <td>
      <button type="button"  onClick={(e)=> handleDelete(e,return1book.m_id,return1book.b_id)} className="btn btn-sm btn-outline-danger mx-1">Delete</button>
      <button type="button" onClick={(e)=> handleEdit(e,return1book)} className="btn btn-outline-warning btn-sm">Update</button>
      {/* <button type="button" onClick={()=> fetch(`/fees/${return1book.m_id}/${return1book.b_id}`)} className="btn btn-outline-dark btn-sm">fees</button> */}
    </td>
    </tr>
  )
}
