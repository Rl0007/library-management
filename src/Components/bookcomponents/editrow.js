import React from 'react'

export const Editrow = (props) => {
  return (
    <tr >
 <td><input type="number" required = 'required' placeholder='enter isbn..'
            name='isbn'value={props.editformdata.isbn} onChange={props.handleEditFormChange}/></td>
        <td>
            <input type="text" required = 'required' placeholder='enter title..'
            name='title' value={props.editformdata.title} onChange={props.handleEditFormChange}/>
        </td>
       
        <td><input type="text" required = 'required' placeholder='enter author..'
            name='author'value={props.editformdata.author} onChange={props.handleEditFormChange} /></td>
        <td><input type="text" required = 'required' placeholder='enter publisher..'
            name='publisher'value={props.editformdata.publisher} onChange={props.handleEditFormChange} /></td>
          <td>
            <button type='submit' className='btn btn-outline-success btn-small'>save</button>
          </td>

    </tr>
  )
}
