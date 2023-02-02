import { FormControl, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./selectBar.css";

const SelectBar = ({ setSelectedClient, selectedProjectName }) => {
  const [clients, setClients] = useState([])
  const { mappedProjectManagementData  } = useSelector(({ MODULES }) => MODULES);
  const [selectedProject, setSelectedProject] = useState(mappedProjectManagementData? mappedProjectManagementData[0]:"");

  useEffect(() => {
    setSelectedClient(selectedProject)
  }, [selectedProject]);

  useEffect(()=>{
    if(mappedProjectManagementData)
    setClients(mappedProjectManagementData)
  },[]);



  return (
    <div className='selectBarWrapper'>
      <div className='subHeading'>{selectedProjectName}</div>
    {selectedProjectName?.length > 0 &&  <div className='verticalBar'>|</div>}
      <div className='searchName'>Client Name</div>
      <FormControl variant="standard" sx={{ minWidth: 100, }}>
        {mappedProjectManagementData && mappedProjectManagementData.length && mappedProjectManagementData[0].clientName &&
        <Select
          labelId="demo-simple-select-standard-label"
          className='selectClient'
          placeholder="select client"
          defaultValue={mappedProjectManagementData[0]}
          disableUnderline
        >
        {clients.map((client)=> <MenuItem value={client} onClick={()=> setSelectedProject(client)} key={client.clientId}>{client.clientName}</MenuItem>)}
        </Select>
        }
      </FormControl>
    </div>
  )
}

export default SelectBar