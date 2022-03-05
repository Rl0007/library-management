import React from 'react'

export const Editrow = (props) => {
  return (
    <tr >
      <td>{props.editformdata.t_id}</td>
 <td><input type="number" required = 'required' placeholder='enter b_id..'
            name='b_id'value={props.editformdata.b_id} onChange={props.handleEditFormChange}/></td>
        <td>
            <input type="number" required = 'required' placeholder='enter m_id..'
            name='m_id' value={props.editformdata.m_id} onChange={props.handleEditFormChange}/>
        </td>
       
        <td><input type="number" required = 'required' placeholder='enter fees..'
            name='fees'value={props.editformdata.fees} onChange={props.handleEditFormChange} /></td>
        <td><input type="date" required = 'required' placeholder='enter issue_date..'
            name='issue_date'value={props.editformdata.issue_date} onChange={props.handleEditFormChange} /></td>
          <td><input type="date" required = 'required' placeholder='stock..'
            name='return_date'value={props.editformdata.return_date} onChange={props.handleEditFormChange} /></td>
            <td><input type="text" required = 'required' placeholder='Total'
            name='status'value={props.editformdata.status} onChange={props.handleEditFormChange} /></td>
          
          <td>
            <button type='submit' className='btn btn-outline-success btn-small'><i class="bi bi-save"></i>save</button>
          </td>

    </tr>
  )
}
