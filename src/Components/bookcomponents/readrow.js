import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const Readrow = ({book,handleEdit,refresh}) => {
  // const history = useNavigate();
  const handleDelete=(e,id)=>{
    handleClose()
   e.preventDefault();
   fetch(`/deletebook/${id}`).then(response => response.json()).then(data => console.log(data)).then(()=>refresh()
 )
    // history('/');
  
 }
 const [show, setShow] = useState(false);

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true);
  return (<>
       

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body> Are you sure you want to delete</Modal.Body>
        <Modal.Footer>
 <Button variant="outline-danger"   onClick={(e)=> handleDelete(e,book.id)} >
            delete       </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
Button       </Button>
          
                    
        </Modal.Footer>
      </Modal>
    <tr key={book.id}>
    <td>{ book.id}</td>


    <td>{ book.isbn}</td>
    <td>{book.title} </td>
    <td>{book.author} </td>
    <td>{book.publisher} </td>
    <td>{book.stockinlibrary}</td>
    <td>{book.totalstock}</td>
    <td>
      <button type="button" onClick={handleShow} className="btn btn-sm btn-outline-danger mx-1 my-1" > <i className="bi bi-trash"></i>Delete</button>
      <button type="button" onClick={(e)=> handleEdit(e,book)} className="btn btn-outline-warning btn-sm mx-1 my-1"><i className="bi bi-brush "></i>Update</button>
    </td>
    </tr>
    </>
  )
}
