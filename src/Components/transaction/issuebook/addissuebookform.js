import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert';
import { Erroralert } from '../../erroralert';


export const Addissuebookform = ({refresh}) => {

 const[m_id,setm_id]= useState([''])
const [showalert, setshowalert] = useState(false);
const [showalert2,setshowalert2] = useState(false);
 const[b_id,setb_id]= useState([''])
 const[issuedate,setissuedate]= useState([''])
 const[showerroralert,setshowerroralert]=useState(false)
const erroralertvalue=(value)=>{setshowerroralert(value)}

 let errormessage = "Book already issued"
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
   }).then(response => response.json()).then((data) =>{
     console.log(data)
    if (data['604']==="book issued")
    {setshowalert(true)
    console.log(data)}
    else if (data['605']==="book out of stock"){
      setshowalert2(true)
    }
    else if (data['606']==="member not available"){
      setshowalert2(true)
    }else if (data['607']==="book not available"){
      setshowalert2(true)
    }else if (data['610']==="book already issued"){setshowerroralert(true)}
    
    
    }).then(()=> refresh())
   setm_id('')
   setb_id('')
   setissuedate('')
   

 }
 if(showerroralert){
   return(<Erroralert errormessage={errormessage} erroralertvalue={erroralertvalue}/>)
 }
 if (showalert2){
   return(<>
      <Alert variant="danger" onClose={() => setshowalert2(false)} dismissible>
        <Alert.Heading>Failed</Alert.Heading>
        <p>
 Either book id is wrong or no member available or book out of stock please check!!!    </p>
      </Alert></>
    );
 }
if (showalert) {
    return (
      <Alert variant="success" onClose={() => setshowalert(false)} dismissible>
        <Alert.Heading>submit</Alert.Heading>
        <p>
Added successfully!!!        </p>
      </Alert>
    );
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
