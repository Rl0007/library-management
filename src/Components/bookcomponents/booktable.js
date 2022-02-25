import React, { useEffect, useState } from 'react'
import { Readrow } from './readrow'
import { Fragment } from 'react'
import { Editrow } from './editrow'
export const Booktable = (props) => {
   

    // let tb_data = props.bookdata.map((item)=>{
    //     return (
    //         <tr key={item.isbn}>
    //           <td>  {item.isbn}</td>
    //           <td>  {item.title}</td>
    //           <td>  {item.author}</td>
    //           <td>  {item.publisher}</td>

    //             </tr>
          

    //     )
    // })
  const[editbookid,seteditbookid] = useState(null);

  const handleEdit = (event, book)=>{
    event.preventDefault();
    seteditbookid(book.id);

    const formValues = {
      id : book.id,
      isbn : book.isbn,
      title : book.title,
      author : book.author,
      publisher : book.publisher
    }
    seteditformdata(formValues)
  }
  const[editformdata,seteditformdata]= useState({
    id : "",
    isbn : "",
    title : "",
    author : "",
    publisher : ""

  })
  const handleEditFormChange =(e)=>{
    e.preventDefault();
    const fieldName = e.target.getAttribute('name');
    const filedValue = e.target.value;

    const newFormData = {...editformdata};
    newFormData['id'] = editbookid
    newFormData[fieldName] = filedValue;

    seteditformdata(newFormData);
  }
  const handleEditFormSubmit = (e)=>{

    e.preventDefault();
    fetch(`/editbook`,{method : "POST",
    body : JSON.stringify({
  id : editformdata.id,
      title : editformdata.title,
      isbn : editformdata.isbn,
      author : editformdata.author,
      publisher : editformdata.publisher
    })
  }).then(response => response.json()).then(data =>console.log(data)).then(()=>props.refresh())
  
    // const editedbook= {
    
    // }
    // const newBook = [...props.bookdata]
    // const index = props.bookdata.findIndex((book)=> book.id === editbookid )
    // newBook[index] = editedbook;
    // props.setbookdata(newBook);
    seteditbookid(null);
  }
  return (
      <div className="container">
        <form onSubmit={handleEditFormSubmit}>
   <table className="table table-hover table-bordered my-2">
  <thead>
    <tr>
      <th scope="col">isbn</th>
      <th scope="col">Title</th>
      <th scope="col">Author</th>
      <th scope="col">Publisher</th>
      <th scope="col">Action</th>

    </tr>
  </thead>
  <tbody>
 {props.bookdata.map((book) =>
 
 
 <Fragment>
   {editbookid === book.id ? <Editrow editformdata={editformdata} handleEditFormChange={handleEditFormChange} bookdata = {props.bookdata}/>:<Readrow book = {book}  handleEdit={handleEdit} refresh={props.refresh}/>}
  
  
  
   </Fragment> 
   )}
  </tbody>
</table>
</form>
  </div>
  )
}
