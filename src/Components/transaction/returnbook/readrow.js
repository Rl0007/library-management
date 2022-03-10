import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

export const Readrow = ({return1book,handleEdit,refresh}) => {
 const handleDelete=(e,m_id,b_id)=>{
   handleClose()
   e.preventDefault();
   fetch(`/deletereturnbook/${m_id}/${b_id}`).then(response => response.json()).then((data) => {
 if( data['709']==='book status is unpaid cannot delete'){setshowalert(true)} 
    // console.log(data)
  
  
  }).then(()=>refresh())
  

 }
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
 <Button variant="outline-danger"   onClick={(e)=> handleDelete(e,return1book.m_id,return1book.b_id)}>
            delete       </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
Button       </Button>
          
                    
        </Modal.Footer>
      </Modal>
    <tr key={return1book.m_id}>
    <td>{ return1book.m_id}</td>
    <td>{return1book.b_id} </td>
    <td>{return1book.issuedate} </td>
    <td>{return1book.returndate} </td>
    <td>{return1book.fees} </td>
    <td>{return1book.status} </td>
  <td>
      <button type="button"  onClick={handleShow} className="btn btn-sm btn-outline-danger mx-1">Delete</button>
      <button type="button" onClick={(e)=> handleEdit(e,return1book)} className="btn btn-outline-warning btn-sm">Update</button>
      {/* <button type="button" onClick={()=> fetch(`/fees/${return1book.m_id}/${return1book.b_id}`)} className="btn btn-outline-dark btn-sm">fees</button> */}
    </td>
    </tr>
</>  )
}
