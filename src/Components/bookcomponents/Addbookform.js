import React, { useState } from 'react'
import { Addbookfromapi } from './Addbookfromapi'

export const Addbookform = ({refresh}) => {

 const[title,settitle]= useState([' '])
 const[isbn,setisbn]= useState([' '])

 const[author,setauthor]= useState([' '])
 const[publisher,setpublisher]= useState([' '])
 const[stockinlibrary,setstockinlibrary]= useState([' '])
 const[totalstock,settotalstock]= useState([' '])

 
 const handlesubmit = (e)=>{
   e.preventDefault();
   console.log(title,isbn,author,publisher)
   fetch(`/book`,{
     method : "POST",
     body : JSON.stringify({
       title : title,
       isbn : isbn,
       author : author,
       publisher : publisher,
       stockinlibrary: stockinlibrary,
       totalstock : totalstock
     })
   }).then(response => response.json()).then(data =>console.log(data))
   settitle('')
   setisbn('')
   setauthor('')
   setpublisher('')
   setstockinlibrary('')
   settotalstock('')
   refresh()

 }

  return (
  <div className="container"> 
   <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="booktitle" className="form-label" >Book title</label>
    <input type="text" className="form-control" required='required' value={title} onChange={(e)=>settitle(e.target.value)} id="booktitle" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="isbn" className="form-label" >Book isbn</label>
    <input type="number" className="form-control"required='required' value={isbn} onChange={(e)=>{setisbn(e.target.value)}} id="isbn" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="author" className="form-label" >Book author</label>
    <input type="text" className="form-control"required='required' value={author} onChange={(e)=>{setauthor(e.target.value)}} id="author" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="publisher" className="form-label" >Publisher</label>
    <input type="text" className="form-control" id="publisher" required='required'value = {publisher}  onChange={(e)=>{setpublisher(e.target.value)}}/>
  </div>
   <div className="mb-3">
    <label htmlFor="stockinlibraryr" className="form-label" >Stock in library</label>
    <input type="number" className="form-control" id="stockinlibrary" required='required'value = {stockinlibrary}  onChange={(e)=>{setstockinlibrary(e.target.value)}}/>
  </div>
   <div className="mb-3">
    <label htmlFor="totalstock" className="form-label" >Total</label>
    <input type="number" className="form-control" id="totalstock"required='required' value = {totalstock}  onChange={(e)=>{settotalstock(e.target.value)}}/>
  </div>
 
  <button type="submit" className="btn btn-outline-dark my-2">Submit</button>
</form>
<Addbookfromapi/>
</div>
  )

}
