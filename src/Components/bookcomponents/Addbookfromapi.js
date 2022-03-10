import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// onchange for bookname andon click implrment krna hai
export const Addbookfromapi = (props) => {
    const history = useNavigate()
    const[noofbooks,setnoofbooks]= useState([''])
    const[bookname,setbookname]= useState([''])
    
     const handleformsubmit = (e)=>{
   e.preventDefault();
   console.log(noofbooks,bookname)
   fetch(`/addbookfromapi`,{
     method : "POST",
     body : JSON.stringify({
       noofbooks : noofbooks,
       bookname : bookname
     
     })
   }).then(response => response.json()).then(data =>console.log(data)).then(()=>props.refresh())
   setnoofbooks('')
   setbookname('')
   history('/')
 

 }
//  var myModal = new Modal(document.getElementById('exampleModal'),{})
//  const showmodal =()=>{
//    myModal.show()
//  }
//  const hidemodal=()=>{
//    myModal.hide()
//  }
//   return (
// <>
// <div className="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
//     aria-labelledby="staticBackdropLabel" aria-hidden="true">
//     <div className="modal-dialog modal-dialog-centered">
//         <div className="modal-content">
//             <div className="modal-header">
//                 <h5 className="modal-title" id="exampleModalLabel">Add books</h5>
//                 <button type="button" className="btn-close" onClick={hidemodal} aria-label="Close"></button>
//             </div>
//             <div className="modal-body">
//                 <form onSubmit={handleformsubmit}>
//                         <div className="mb-3">
//                             <label htmlFor="noofbooks" className="form-label">no of books</label>
//                             <input type="number" className="form-control" value={noofbooks} onChange={(e)=>setnoofbooks(e.target.value)} name='totalnoofbooks' id="noofbooks" aria-describedby="emailHelp"/>
                        
//                         </div>
                      
                
//                         <button type="submit" className="btn btn-outline-warning">Add</button>
//                 </form>
//             </div>
//             <div className="modal-footer">
//                 {/* <!-- <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> --> */}
                
//             </div>
//         </div>
//     </div>
// </div>


//     <div><button type="button" className="btn btn-outline-dark" onClick={showmodal}>
//                     Addbookfromapi
//                 </button></div>

//     </>
//   )
 const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-dark" onClick={handleShow}>
        addbookfromapi
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add book</Modal.Title>
        </Modal.Header>
        <Modal.Body>  <form onSubmit={handleformsubmit}>
                        <div className="mb-3">
                            <label htmlFor="noofbooks" className="form-label">no of books</label>
                            <input type="number" className="form-control" value={noofbooks} onChange={(e)=>setnoofbooks(e.target.value)} name='totalnoofbooks' id="noofbooks" aria-describedby="emailHelp"/>
                        
                        </div>
                      
                
                       <button type="submit" onClick={handleClose} className="btn btn-outline-warning">Add</button>
               </form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
Button       </Button>
          
                    
        </Modal.Footer>
      </Modal>
    </>
  );
}
