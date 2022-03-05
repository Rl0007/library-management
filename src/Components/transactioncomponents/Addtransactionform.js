import React, { useState } from 'react'

export const Addtransactionform = ({refresh}) => {

 const[t_id,sett_id]= useState([' '])
 const[m_id,setm_id]= useState([' '])

 const[b_id,setb_id]= useState([' '])
 const[fees,setfees]= useState([' '])
 const[issue_date,setissue_date]= useState([' '])
 const[return_date,setreturn_date]= useState([' '])
 const[status,setstatus]= useState(['unpaid'])


 
 const handlesubmit = (e)=>{
   e.preventDefault();
   console.log(t_id,m_id,b_id,fees)
   fetch(`/transaction`,{
     method : "POST",
     body : JSON.stringify({
       t_id : t_id,
       m_id : m_id,
       b_id : b_id,
       fees : fees,
       issue_date: issue_date,
       return_date : return_date,
       status : status
     })
   }).then(response => response.json()).then(data =>console.log(data))
   sett_id('')
   setm_id('')
   setb_id('')
   setfees('')
   setissue_date('')
   setreturn_date('')
   setstatus('unpaid')
   refresh()

 }

  return (
  <div className="container"> 
   <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="transactiont_id" className="form-label" >transaction t_id</label>
    <input type="number" className="form-control"  value={t_id} onChange={(e)=>sett_id(e.target.value)} id="transactiont_id" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="m_id" className="form-label" >transaction m_id</label>
    <input type="number" className="form-control" value={m_id} onChange={(e)=>{setm_id(e.target.value)}} id="m_id" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="b_id" className="form-label" >transaction b_id</label>
    <input type="number" className="form-control" value={b_id} onChange={(e)=>{setb_id(e.target.value)}} id="b_id" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="fees" className="form-label" >fees</label>
    <input type="number" className="form-control" id="fees" value = {fees}  onChange={(e)=>{setfees(e.target.value)}}/>
  </div>
   <div className="mb-3">
    <label htmlFor="issue_date" className="form-label" >Issue_date</label>
    <input type="date" className="form-control" id="issue_date" value = {issue_date}  onChange={(e)=>{setissue_date(e.target.value)}}/>
  </div>
   <div className="mb-3">
    <label htmlFor="return_date" className="form-label" >Return_date</label>
    <input type="date" className="form-control" id="return_date" value = {return_date}  onChange={(e)=>{setreturn_date(e.target.value)}}/>
  </div>
  {/* <div className="mb-3">
    <label htmlFor="status" className="form-label" >status</label>
    <input type="text" className="form-control" id="status" value = {status}  onChange={(e)=>{setstatus(e.target.value)}}/>
  </div> */}
 
  <button type="submit" className="btn btn-outline-dark my-2">Submit</button>
</form>
</div>
  )

}
