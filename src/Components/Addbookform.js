import React, { useState } from 'react'

export const Addbookform = () => {

 const[title,settitle]= useState([' '])
 const[isbn,setisbn]= useState([' '])

 const[author,setauthor]= useState([' '])
 const[publisher,setpublisher]= useState([' '])
 
 const handlesubmit = (e)=>{
   e.preventDefault();
   console.log(title,isbn,author,publisher)
   fetch(`/book`,{
     method : "POST",
     body : JSON.stringify({
       title : title,
       isbn : isbn,
       author : author,
       publisher : publisher
     })
   }).then(response => response.json()).then(data =>console.log(data))
   settitle('')
   setisbn('')
   setauthor('')
   setpublisher('')

 }

  return (
  <div className="container"> 
   <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="booktitle" className="form-label" >Book title</label>
    <input type="text" className="form-control"  value={title} onChange={(e)=>settitle(e.target.value)} id="booktitle" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="isbn" className="form-label" >Book isbn</label>
    <input type="number" className="form-control" value={isbn} onChange={(e)=>{setisbn(e.target.value)}} id="isbn" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="author" className="form-label" >Book author</label>
    <input type="text" className="form-control" value={author} onChange={(e)=>{setauthor(e.target.value)}} id="author" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="publisher" className="form-label" >Publisher</label>
    <input type="text" className="form-control" id="publisher" value = {publisher}  onChange={(e)=>{setpublisher(e.target.value)}}/>
  </div>
 
  <button type="submit" className="btn btn-outline-dark">Submit</button>
</form>
</div>
  )

}
