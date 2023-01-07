import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./tabs.css";
import { TabsTable } from "./tabsTable";
import { useDispatch, useSelector } from "react-redux";
import { Modules } from "../../common/constants/sidebar";
import { getMappedProjectManagementData } from "../../redux/actions/project-management";

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
  const { userData } = useSelector(({ USER }) => USER);

  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [status, setStatus] = React.useState("All")
  const { mappedProjectManagementData  } = useSelector(({ MODULES }) => MODULES);
  let counter = 0, count = 0;

  const handleChange = (event, newValue) => {
    if(props.headingName === Modules.PROJECT_ALLOCATION){
      if(newValue === 0) setStatus("All");
      else if(newValue === 1) setStatus("Active");
      else if(newValue === 2) setStatus("History");
    }
    setValue(newValue);
  };

  React.useEffect(() => {
    setValue(0);
    setStatus("All");
  }, [ props.headingName ]);

  React.useEffect(() => {
    if(props.headingName === Modules.PROJECT_MANAGEMENT || props.headingName === Modules.TIMESHEET) {
      dispatch(getMappedProjectManagementData());
    }
  }, [ props.headingName ]);
  
  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        {props.headingName === Modules.PROJECT_MANAGEMENT ? 
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            { mappedProjectManagementData && mappedProjectManagementData.map((client) =>
              client.projects.map((project) => {
                return <Tab key={`${client.clientName} / ${project.projectName}`} className="tabs-table" label={`${client.clientName} / ${project.projectName}`} {...a11yProps(count++)} />
              })
            )}
          </Tabs> :
        props.headingName === Modules.TIMESHEET ? 
          userData && userData.data.tabs.timeSheet && (
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {userData.data.tabs.timeSheet.map((tab, index) => (
                <Tab key={index} className="tabs-table" label={tab} {...a11yProps(index)} />
              ))}
            </Tabs>
          ) : 
        props.headingName === Modules.PROJECT_ALLOCATION ? 
        userData && userData.data.tabs.projectAllocation && (
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {userData.data.tabs.projectAllocation.map((tab, index) => (
              <Tab key={index} className="tabs-table" label={tab} {...a11yProps(index)} />
            ))}
          </Tabs>
        ) : null
      }
      </Box>
      {props.headingName === Modules.PROJECT_MANAGEMENT ? 
        mappedProjectManagementData && mappedProjectManagementData.map((client) =>
        client.projects.map((project) => {
          return <TabPanel key={`${client.clientName} / ${project.projectName}`} value={value} index={counter++} >
            <TabsTable headingName={props.headingName} tabName={project} status={status} projectId={project.projectId} />
          </TabPanel>
        })) :
      props.headingName === Modules.TIMESHEET ? 
        userData && userData.data.tabs.timeSheet.map((tab, index) => (
          <TabPanel key={index} value={value} index={index}>
            <TabsTable headingName={props.headingName} tabName={tab} status={status} projectId={null}/>
          </TabPanel>
        )) : 
      props.headingName === Modules.PROJECT_ALLOCATION ? 
        userData && userData.data.tabs.projectAllocation.map((tab, index) => (
          <TabPanel key={index} value={value} index={index}>
            <TabsTable headingName={props.headingName} tabName={tab} status={status} projectId={null}/>
          </TabPanel>
        )) : 
      <TabsTable headingName={props.headingName} tabName='' status={status}  projectId={null}/>
    }
    </Box>
  );
}
