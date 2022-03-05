import React, { useEffect, useState } from 'react'
import { Readrow } from './readrow'
import { Fragment } from 'react'
import { Editrow } from './editrow'
export const Transactiontable = (props) => {
   

    // let tb_data = props.transactiondata.map((item)=>{
    //     return (
    //         <tr key={item.m_id}>
    //           <td>  {item.m_id}</td>
    //           <td>  {item.t_id}</td>
    //           <td>  {item.b_id}</td>
    //           <td>  {item.fees}</td>

    //             </tr>
          

    //     )
    // })
  const[edittransactionid,setedittransactionid] = useState(null);

  const handleEdit = (event, transaction)=>{
    event.preventDefault();
    setedittransactionid(transaction.id);

    const formValues = {
      id : transaction.id,
      m_id : transaction.m_id,
      t_id : transaction.t_id,
      b_id : transaction.b_id,
      fees : transaction.fees,
      issue_date : transaction.issue_date,
      return_date : transaction.return_date,
      status : transaction.status
    }
    seteditformdata(formValues)
  }
  const[editformdata,seteditformdata]= useState({
    id : "",
    m_id : "",
    t_id : "",
    b_id : "",
    fees : "",
    issue_date : "",
    return_date : "",
    status : "unpaid"

  })
  const handleEditFormChange =(e)=>{
    e.preventDefault();

    const fieldName = e.target.getAttribute('name');
    const filedValue = e.target.value;

    const newFormData = {...editformdata};
    newFormData[fieldName] = filedValue;


    seteditformdata(newFormData);
  }
  const handleEditFormSubmit = (e)=>{

    e.preventDefault();
    fetch(`/edittransaction`,{method : "POST",
    body : JSON.stringify({
  id : editformdata.id,
      t_id : editformdata.t_id,
      m_id : editformdata.m_id,
      b_id : editformdata.b_id,
      fees : editformdata.fees,
      issue_date: editformdata.issue_date,
      return_date : editformdata.return_date,
      status : editformdata.status
    })
  }).then(response => response.json()).then(data =>console.log(data)).then(()=>props.refresh())
  
    // const editedtransaction= {
    
    // }
    // const newTransaction = [...props.transactiondata]
    // const index = props.transactiondata.findIndex((transaction)=> transaction.id === edittransactionid )
    // newTransaction[index] = editedtransaction;
    // props.settransactiondata(newTransaction);
    setedittransactionid(null);
  }
  return (
      <div className="container">
        <form onSubmit={handleEditFormSubmit}>
   <table className="table table-hover table-bordered my-2">
  <thead>
    <tr>
    <th scope="col">T_id</th>

      <th scope="col">M_id</th>
      <th scope="col">B_id</th>
      <th scope="col">Fees</th>
      <th scope="col">Issue_date</th>
      <th scope="col">Return_date</th>
      <th scope="col">status</th>

      <th scope="col">Action</th>

    </tr>
  </thead>
  <tbody>
 {props.transactiondata.map((transaction) =>
 
 
 <Fragment>
   {edittransactionid === transaction.id ? <Editrow editformdata={editformdata} handleEditFormChange={handleEditFormChange} transactiondata = {props.transactiondata}/>:<Readrow transaction = {transaction}  handleEdit={handleEdit} refresh={props.refresh}/>}
  
  
  
   </Fragment> 
   )}
  </tbody>
</table>
</form>
  </div>
  )
}
