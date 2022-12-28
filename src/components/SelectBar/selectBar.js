import { FormControl, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./selectBar.css";

const SelectBar = ({ setSelectedClient }) => {
  const [clients, setClients] = useState([])
  const { clientsData  } = useSelector(({ MODULES }) => MODULES);
  const [selectedProject, setSelectedProject] = useState(clientsData? clientsData[0]:"");

  useEffect(() => {
    setSelectedClient(selectedProject)

  }, [selectedProject]);

  useEffect(()=>{
    if(clientsData)
    setClients(clientsData)
  },[]);


  return (
    <div className='selectBarWrapper'>
      <div className='subHeading'>Digital Applications</div>
      <div className='divider'>|</div>
      <div className='searchName'>Client Name</div>
      <FormControl variant="standard" sx={{ minWidth: 100, }}>
        <Select
          labelId="demo-simple-select-standard-label"
          className='selectClient'
          placeholder="select client"
          defaultValue={clientsData[0]}
          disableUnderline
        >
        {clients?.map((client)=> <MenuItem value={client} onClick={()=>setSelectedProject(client)} key={client.id}>{client.name}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  )
}

export default SelectBar