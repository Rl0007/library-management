import React,{ useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export const Readrow = ({member,handleEdit,refresh}) => {
 const handleDelete=(e,id)=>{
   handleClose()
   e.preventDefault();
   fetch(`/deletemember/${id}`).then(response => response.json()).then(data => console.log(data)).then(
 ()=> refresh())

 }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true);
  return (
    <> 
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body> Are you sure you want to delete</Modal.Body>
        <Modal.Footer>
 <Button variant="outline-danger"   onClick={(e)=> handleDelete(e,member.id)} >
            delete       </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
Button       </Button>
          
                    
        </Modal.Footer>
      </Modal>
    <tr key={member.id}>
    <td>{ member.id}</td>
    <td>{member.name} </td>
    <td>{member.email} </td>
  <td>
      <button type="button"  onClick={handleShow} className="btn btn-sm btn-outline-danger mx-1">Delete</button>
      <button type="button" onClick={(e)=> handleEdit(e,member)} className="btn btn-outline-warning btn-sm">Update</button>
    </td>
    </tr>
    </>
  )
}
