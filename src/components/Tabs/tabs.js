import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./tabs.css";
import TabsData from "../../mock-data/TabsData";
import { TabsTable } from "./tabsTable";
import { useSelector } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  console.log(props.headingName);
  const [value, setValue] = React.useState(0);
  const [status, setStatus] = React.useState("All")
  const { mappedProjectManagementData  } = useSelector(({ MODULES }) => MODULES);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    if(props.headingName === "Project Allocation"){
    if(newValue === 0) setStatus("All")
    else if(newValue === 1) setStatus("Active")
    else if(newValue === 2) setStatus("History")
  }
    setValue(newValue);
  };

  React.useEffect(() => {
    setValue(0);
  }, [props.headingName, props.selectedClient.id])
  
  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        {props.headingName === "Project Management" ? 
        <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {mappedProjectManagementData && mappedProjectManagementData?.filter((projectVal)=>projectVal.clientId === props.selectedClient.id)[0]
            ?.projects?.map((project, index)=> (
              <Tab className="" label={project.projectName} {...a11yProps(index)} onClick={()=>props.setSelectedProjectName(project.projectName)} />
            ))}
          </Tabs>
         : TabsData[props.headingName] && (
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {TabsData[props.headingName].map((tab, index) => (
              <Tab className="" label={tab} {...a11yProps(index)} />
            ))}
          </Tabs>
        )}
      </Box>
      {props.headingName === "Project Management" ? mappedProjectManagementData &&
      mappedProjectManagementData?.filter((projectVal)=>projectVal.clientId === props.selectedClient.id)[0]
            ?.projects?.map((tab, index)=><TabPanel key={index} value={value} index={index}>
            <TabsTable headingName={props.headingName} tabName={tab} status={status} projectId={tab.projectId}/>
          </TabPanel>)
      : (TabsData[props.headingName] ? (
        TabsData[props.headingName].map((tab, index) => (
          <TabPanel key={index} value={value} index={index}>
            <TabsTable headingName={props.headingName} tabName={tab} status={status} projectId={null}/>
          </TabPanel>
        ))
      ) : (
        <TabsTable headingName={props.headingName} tabName='' status={status}  projectId={null}/>
      ))}
    </Box>
  );
}
