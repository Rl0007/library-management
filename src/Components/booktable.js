import React, { useEffect } from 'react'

export const Booktable = (props) => {
   

    let tb_data = props.bookdata.map((item)=>{
        return (
            <tr key={item.isbn}>
              <td>  {item.isbn}</td>
              <td>  {item.title}</td>
              <td>  {item.author}</td>
              <td>  {item.publisher}</td>

                </tr>
          

        )
    })
  return (
      <div className="container">
   <table className="table table-hover table-bordered">
  <thead>
    <tr>
      <th scope="col">isbn</th>
      <th scope="col">Title</th>
      <th scope="col">Author</th>
      <th scope="col">Publisher</th>
    </tr>
  </thead>
  <tbody>
 {tb_data}
  </tbody>
</table>
  </div>
  )
}
