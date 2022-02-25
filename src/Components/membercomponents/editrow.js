import React from 'react'

export const Editrow = (props) => {
  return (
    <tr key={props.editformdata.id}>
 <td><input type="number" required = 'required' 
            name='id'value={props.editformdata.id} /></td>
        <td>
            <input type="text" required = 'required' placeholder='enter name..'
            name='name' value={props.editformdata.name} onChange={props.handleEditFormChange}/>
        </td>
       
        <td><input type="text" required = 'required' placeholder='enter email..'
            name='email'value={props.editformdata.email} onChange={props.handleEditFormChange} /></td>
       
          <td>  <button type='submit' className='btn btn-outline-success btn-small'>save</button>
          </td>

    </tr>
  )
}
