import React, { useEffect } from 'react'

export const Booktable = (props) => {

    const handledelete =(item)=>{
      fetch(`/delete/${item.isbn}`).then(response => response.json())
      .then(data =>console.log(data))
    }

    let tb_data = props.bookdata.map((item,index)=>{
        return (<>
            <tr key={index}>
              <td>  {item.isbn}</td>
              <td>  {item.title}</td>
              <td>  {item.author}</td>
              <td>  {item.publisher}</td>
              <td><button type="button" onClick={handledelete(item)} className="btn btn-outline-danger btn-sm mx-1">delete</button>
              <button type="button" className="btn btn-outline-warning btn-sm">update</button></td>

                </tr>
                </>
          

        )
    })
  return (
      <div className="container">
   <table className="table table-hover table-bordered">
  <thead>
    <tr>
    <th scope="col">Sno</th>

      <th scope="col">isbn</th>
      <th scope="col">Title</th>
      <th scope="col">Author</th>
      <th scope="col">Publisher</th>
      <th scope='col'>action</th>
    </tr>
  </thead>
  <tbody>
 {tb_data}
  </tbody>
</table>
  </div>
  )
}
