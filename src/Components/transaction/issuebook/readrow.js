import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

export const Readrow = ({issuebook,handleEdit,refresh}) => {
 const handleDelete=(e,m_id,b_id)=>{
   handleClose()
   e.preventDefault();
   fetch(`/deleteissuebook/${m_id}/${b_id}`).then(response => response.json()).then((data) => {
   if ( data['609']==='book status is unpaid cannot delete'){setshowalert(true)}   
    // console.log(data)
  
  }).then(()=>refresh())

}
//   return <Button onClick={() => setshowalert(true)}>showalert Alert</Button>;
// } 
 
//  }
//  function convert(str) {
//   var date = new Date(str),
//     mnth = ("0" + (date.getMonth() + 1)).slice(-2),
//     day = ("0" + date.getDate()).slice(-2);
//   return [date.getFullYear(), mnth, day].join("-");
// }
const [show, setShow] = useState(false);
const [showalert, setshowalert] = useState(false);

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true);
  if (showalert) {
    return (
      <Alert variant="danger" onClose={() => setshowalert(false)} dismissible>
        <Alert.Heading>cannot Delete</Alert.Heading>
        <p>
        Since book status is unpaid cannot delete change status in return book
        </p>
      </Alert>
    );
  }
  return (
    <>
    
    
    
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body> Are you sure you want to delete</Modal.Body>
        <Modal.Footer>
 <Button variant="outline-danger"   onClick={(e)=> handleDelete(e,issuebook.m_id,issuebook.b_id)}  >
            delete       </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
Button       </Button>
          
                    
        </Modal.Footer>
      </Modal>
    <tr key={issuebook.m_id}>
    <td>{ issuebook.m_id}</td>
    <td>{issuebook.b_id} </td>
    <td>{issuebook.issuedate} </td>
  <td>
      <button type="button" onClick={handleShow} className="btn btn-sm btn-outline-danger mx-1">Delete</button>
      <button type="button" onClick={(e)=> handleEdit(e,issuebook)} className="btn btn-outline-warning btn-sm">Update</button>
    </td>
    </tr>
</>
  )
}
