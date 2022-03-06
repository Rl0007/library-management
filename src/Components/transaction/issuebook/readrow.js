import React from 'react'

export const Readrow = ({issuebook,handleEdit,refresh}) => {
 const handleDelete=(e,m_id,b_id)=>{
   e.preventDefault();
   fetch(`/deleteissuebook/${m_id}/${b_id}`).then(response => response.json()).then(data => console.log(data))
  refresh()

 }
//  function convert(str) {
//   var date = new Date(str),
//     mnth = ("0" + (date.getMonth() + 1)).slice(-2),
//     day = ("0" + date.getDate()).slice(-2);
//   return [date.getFullYear(), mnth, day].join("-");
// }
  return (
    <tr key={issuebook.m_id}>
    <td>{ issuebook.m_id}</td>
    <td>{issuebook.b_id} </td>
    <td>{issuebook.issuedate} </td>
  <td>
      <button type="button"  onClick={(e)=> handleDelete(e,issuebook.m_id,issuebook.b_id)} className="btn btn-sm btn-outline-danger mx-1">Delete</button>
      <button type="button" onClick={(e)=> handleEdit(e,issuebook)} className="btn btn-outline-warning btn-sm">Update</button>
    </td>
    </tr>
  )
}
