import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./tabs.css";
import TabsData from "../../mock-data/TabsData";
import { TabsTable } from "./tabsTable";

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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        { TabsData[props.headingName] && (
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
      { TabsData[props.headingName] ? (
        TabsData[props.headingName].map((tab, index) => (
          <TabPanel value={value} index={index}>
            <TabsTable headingName={props.headingName} tabName={tab} />
          </TabPanel>
        ))
      ) : (
        <TabsTable headingName={props.headingName} tabName=''/>
      )}
    </Box>
  );
}
