import React from 'react'

export const Readrow = ({member,handleEdit,refresh}) => {
 const handleDelete=(e,id)=>{
   e.preventDefault();
   fetch(`/deletemember/${id}`).then(response => response.json()).then(data => console.log(data))
  refresh()

 }
  return (
    <tr key={member.id}>
    <td>{ member.id}</td>
    <td>{member.name} </td>
    <td>{member.email} </td>
  <td>
      <button type="button"  onClick={(e)=> handleDelete(e,member.id)} className="btn btn-sm btn-outline-danger mx-1">Delete</button>
      <button type="button" onClick={(e)=> handleEdit(e,member)} className="btn btn-outline-warning btn-sm">Update</button>
    </td>
    </tr>
  )
}
