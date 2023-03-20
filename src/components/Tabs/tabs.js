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
// import { withStyles } from "@mui/styles";
import {TabScrollButton, Tooltip} from "@mui/material";
import styled from "@emotion/styled";
import { blue } from "@mui/material/colors";
import { pdfIcon } from "../../common/icons";
import { EMPLOYEE_USER_MANUAL_LINK } from "../../common/constants/extra-constants";
import { Settings } from "../Settings/settings";

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

export default function BasicTabs({headingName, value, setValue}) {
  const { userData } = useSelector(({ USER }) => USER);

  const dispatch = useDispatch();
  // const [value, setValue] = React.useState(0);
  const [status, setStatus] = React.useState("Active")
  const [noDataFound, setNoDataFound] = React.useState(false)
  const { mappedProjectManagementData  } = useSelector(({ MODULES }) => MODULES);
  const { vTrackLoader } = useSelector(({ APP_STATE }) => APP_STATE);
  let counter = 0, count = 0;

  const MyTabScrollButton = styled(TabScrollButton)({
    '&.Mui-disabled': {
        width: 0,
    },
    overflow: 'hidden',
    transition: 'width 0.5s',
    width: 28,
    color: '#073044',
    backgroundColor: '#fafafa'
  });

  const handleChange = (event, newValue) => {
    if(headingName === Modules.PROJECT_ALLOCATION){
      if(newValue === 0) setStatus("All");
      else if(newValue === 1) setStatus("Active");
      else if(newValue === 2) setStatus("History");
    }
    setValue(newValue);
  };

  React.useEffect(() => {
    if(headingName === Modules.PROJECT_ALLOCATION){
      setValue(1);
      setStatus("Active");
    }
    // else{
    //   setValue(0);
    // }
  }, [ headingName ]);

  React.useEffect(() => {
    if(headingName === Modules.PROJECT_MANAGEMENT || headingName === Modules.TIMESHEET) {
      dispatch(getMappedProjectManagementData());
    }
  }, [ headingName ]);

  React.useEffect(() => {
    if((mappedProjectManagementData===null || mappedProjectManagementData.length===0) && headingName === Modules.PROJECT_MANAGEMENT) setNoDataFound(true);
    else setNoDataFound(false);
  }, [mappedProjectManagementData, headingName])

  let projectsTab = [];
  let projectsTabs = [];
  if(mappedProjectManagementData){
    mappedProjectManagementData.forEach((client) => {
      client.projects.forEach((project) => {
        projectsTab.push({
          projectName : project.projectName,
          clientName : client.clientName,
          projectId : project.projectId
        });
      });
    });

    projectsTabs = projectsTab.sort(function(a,b){return (a.projectName).localeCompare(b.projectName)})
  }
  
  return (
    <Box sx={{ width: "100%" }}>
      {!vTrackLoader && noDataFound && headingName===Modules.PROJECT_MANAGEMENT && <h1 className="no-data">Currently you are not Project Manager in any Project. </h1>}
      <Box>
        {headingName === Modules.PROJECT_MANAGEMENT ? 
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            ScrollButtonComponent={MyTabScrollButton}
            variant="scrollable"
            scrollButtons="auto"
          >
            { projectsTabs && projectsTabs.map((project) =>{
                return <Tab key={`${project.clientName} / ${project.projectName}`} className="tabs-table" label={`${project.projectName} (${project.clientName})`} {...a11yProps(project.projectId)} />
              })}
          </Tabs> :
        headingName === Modules.TIMESHEET ? 
          userData && userData.data.tabs.timeSheet && (
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              ScrollButtonComponent={MyTabScrollButton}
              variant="scrollable"
              scrollButtons="auto"
            >
              {userData.data.tabs.timeSheet.map((tab, index) => (
                <Tab key={index} className="tabs-table" label={tab} {...a11yProps(index)} />
              ))}
            </Tabs>
          ) : 
        headingName === Modules.PROJECT_ALLOCATION ? 
        userData && userData.data.tabs.projectAllocation && (
          <>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              ScrollButtonComponent={MyTabScrollButton}
              variant="scrollable"
              scrollButtons="auto"
            >
              {userData.data.tabs.projectAllocation.map((tab, index) => (
                <Tab key={index} className="tabs-table" label={tab} {...a11yProps(index)} />
              ))}
            </Tabs>
            {
                <Tooltip title={<h2>User Guide for vTrack</h2>}>
                    <a href={EMPLOYEE_USER_MANUAL_LINK} style={{textDecoration: 'None'}} target="_blank">
                      <button style={{ minHeight: '0'}} className="MuiTab-textColorPrimary tabs-table css-1h9z7r5-MuiButtonBase-root-MuiTab-root">
                        <div style={{display: 'flex',alignItems: 'center', gap: '0.5rem'}}>
                          <p>User Guide</p>
                            <img src={pdfIcon} />
                        </div>
                      </button>
                    </a>
                </Tooltip>
              }
          </>
        ) :
      headingName === Modules.REPORTING ?
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          ScrollButtonComponent={MyTabScrollButton}
          variant="scrollable"
          scrollButtons="auto"
        >
          {userData.data.tabs.reporting.map((tab, index) => (
            <Tab key={index} className="tabs-table" label={tab} {...a11yProps(index)} />
          ))}
        </Tabs> : 
      headingName === Modules.SETTINGS ?
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          ScrollButtonComponent={MyTabScrollButton}
          variant="scrollable"
          scrollButtons="auto"
        >
          {userData.data.tabs.settings.map((tab, index) => (
            <Tab key={index} className="tabs-table" label={tab} {...a11yProps(index)} />
          ))}
        </Tabs> :
        null
      }
      </Box>
      {headingName === Modules.PROJECT_MANAGEMENT ? 
        projectsTabs && projectsTabs.map((project) => {
          return <TabPanel key={`${project.clientName} / ${project.projectName}`} value={value} index={counter++} >
            <TabsTable headingName={headingName} tabName={project.projectName} status={status} projectId={project.projectId} />
          </TabPanel>
        }) :
      headingName === Modules.TIMESHEET ? 
        userData && userData.data.tabs.timeSheet.map((tab, index) => (
          <TabPanel key={index} value={value} index={index}>
            <TabsTable headingName={headingName} tabName={tab} status={status} projectId={null}/>
          </TabPanel>
        )) :
      headingName === Modules.PROJECT_ALLOCATION ? 
        userData && userData.data.tabs.projectAllocation.map((tab, index) => (
          <TabPanel key={index} value={value} index={index}>
            <TabsTable headingName={headingName} tabName={tab} status={status} projectId={null}/>
          </TabPanel>
        )) :
      headingName === Modules.REPORTING ? 
        userData && userData.data.tabs.reporting.map((tab, index) => (
          <TabPanel key={index} value={value} index={index}>
            <TabsTable headingName={headingName} tabName={tab} status={null} projectId={null}/>
          </TabPanel>
        )) :
      headingName === Modules.SETTINGS ? 
          (userData && userData.data.tabs.settings.map((tab, index) => (
          <TabPanel key={index} value={value} status={status} index={index}>
            <Settings tabName={tab} />
          </TabPanel>
          ))) :
      <TabsTable headingName={headingName} tabName='' status={status}  projectId={null}/>
    }
    </Box>
  );
}
