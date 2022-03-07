import React, { useState } from 'react'

export const Addissuebookform = ({refresh}) => {

 const[m_id,setm_id]= useState([' '])

 const[b_id,setb_id]= useState([' '])
 const[issuedate,setissuedate]= useState([' '])
 

 
 const handlesubmit = (e)=>{
   e.preventDefault();
   console.log(m_id,b_id,issuedate)
   fetch(`/addissuebook`,{
     method : "POST",
     body : JSON.stringify({
       m_id : m_id,
       b_id : b_id,
       issuedate : issuedate,
     })
   }).then(response => response.json()).then(data =>console.log(data))
   setm_id('')
   setb_id('')
   setissuedate('')
   refresh()

 }

  return (
  <div className="container"> 
   <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="issuebookid" className="form-label" >Member id</label>
    <input type="number" className="form-control" required='required' value={m_id} onChange={(e)=>setm_id(e.target.value)} id="Memberid" aria-describedby="emailHelp"/>
  </div>
 
  <div className="mb-3">
    <label htmlFor="b_id" className="form-label" >Book b_id</label>
    <input type="number" className="form-control"required='required' value={b_id} onChange={(e)=>{setb_id(e.target.value)}} id="b_id" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="issuedate" className="form-label" >issuedate</label>
    <input type="date" className="form-control" id="issuedate" value = {issuedate} required='required' onChange={(e)=>{setissuedate(e.target.value)}}/>
  </div>
 
 
  <button type="submit" className="btn btn-outline-dark">Submit</button>
</form>
</div>
  )

}
