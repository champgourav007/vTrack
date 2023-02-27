import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Modules } from "../../common/constants/sidebar";
import { searchIcon } from "../../common/icons";
import {
  getLabel,
  getMinWidth,
  getTotalHrs,
  startWeek,
  tableColumnsData,
} from "../../common/utils/datatable";
import {
  setTimeSheetData
} from "../../redux/actions";

import {
  getAllUserDetails,
  getAssignedProjects,
  getClientAdminData,
  getClientsData,
  getListItems,
  getMyTimeSheetData,
  getProjectAdminData,
  getProjectAllocationData,
  getProjectTasks,
  getReportees,
  getTimeSheetData,
  getTimesheetProjects,
  getTimeSheetReportee,
  saveTimeSheetPeriodData,
  setSelectedEmployeeId,
  setSelectedProjectId,
  setTimeSheetPeriodWeek,
  submitPeriodForApproval
} from "../../redux/actions";
import { getProjectManagementData } from "../../redux/actions/project-management";
import { DataTable } from "../DataTable/DataTable";
import { toastOptions } from "../../common/utils/toasterOptions";
import "./tabsTable.css";
import { Select } from "@mui/material";
import { CalendarMonth, CalendarMonthRounded, Person } from "@mui/icons-material";
import { assignedProjectsSaga } from "../../saga/get-assigned-projects-saga";
import { DATE_FORMAT } from "../../common/constants/extra-constants";
import { handleSetRows } from "../../common/utils/tabsTable";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { dateCalc } from "../../common/utils/datatable";
import { getTimesheetReports } from "../../redux/actions/reporting";

const getPeriods = () => {
  let date = moment().subtract(42, "days");
  const periods = [];
  for (let i = 0; i < 13; i++) {
    periods.push({
      startDate: moment(date.startOf("isoweek")),
      endDate: moment(date.add(7, "days").startOf("week")),
    });
    date.add(7, "days");
  }
  return periods;
};

export const TabsTable = ({ headingName, tabName, status, projectId }) => {
  const { clientAdminData, projectAdminData, projectAllocationData, timeSheetData, projectManagementData, mappedProjectManagementData, selectedProjectId, reportees, reportingData } = useSelector(({ MODULES }) => MODULES);
  const { allUserDetails, userData } = useSelector(({ USER }) => USER);
  const { allTasks, listItems, clientsData, timeSheetProjects } = useSelector(({ MODULES }) => MODULES);
  const dispatch = useDispatch();

  const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [searchData, setSearchData] = useState("");
  const periodWeeks = getPeriods();
  const [ selectedPeriodWeek, setSelectedPriodWeek ] = useState({
    startDate : moment().startOf('isoweek'),
    endDate : moment().day() === 0 ? moment().startOf('week') : moment().add(7,'days').startOf('week')
  });
  const [ selectedProject, setSelectedProject ] = useState({});
  const [ selectedEmployee, setSelectedEmployee ] = useState({});
  const [rowToBeUpdated, setRowToBeUpdated] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [weekStart, setWeekStart] = useState(null);
  const [disableDate, setDisableDate] = useState(false);
  const [disablePeriodWeek, setDisablePeriodWeek] = useState(false);
  const inputRef = useRef("");

  const getData = (event) => {
    if(headingName === Modules.REPORTING){
      if(disableDate){
        dispatch(
          getTimesheetReports({
            startDate: moment(selectedPeriodWeek.startDate).format("YYYY-MM-DDT00:00:00"),
            endDate: moment(selectedPeriodWeek.endDate).format("YYYY-MM-DDT00:00:00")
          })
        )
      }
      else{
        if(!startDate){
          toast.info("Please Enter Start Date", toastOptions);
        }
        else if(!endDate){
          toast.info("Please Enter End Date", toastOptions);
        }
        else{
          dispatch(
            getTimesheetReports({
              startDate: startDate.format("YYYY-MM-DDT00:00:00"),
              endDate: endDate.format("YYYY-MM-DDT00:00:00")
            })
          )
        }
      }
    }
  }

  const FilterData = () => {
    return (
      <>
        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{
            minWidth: '15rem',
            "& label": {
              lineHeight: '0.8rem'
            }
          }}
        >
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => {
                setDisablePeriodWeek(true);
                setStartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              disabled={disableDate}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => {
                setDisablePeriodWeek(true);
                setEndDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              disabled={disableDate}
            />
         </LocalizationProvider>
         <span style={{fontSize: "1.5rem", fontWeight: "600", color: "gray"}}>OR</span>
         {periodWeek(false)}
         <button style={{ marginLeft: 0 }} className={(disableDate || disablePeriodWeek) ? "addBtn showDataBtn" : "disableAddButton"} onClick={() => {
          setDisableDate(false);
          setStartDate(null);
          setEndDate(null);
          setDisablePeriodWeek(false);
          setSelectedPriodWeek({
            startDate : moment().startOf('isoweek'),
            endDate : moment().day() === 0 ? moment().startOf('week') : moment().add(7,'days').startOf('week')
          });
         }}>Clear Selection</button>
         <button 
         onClick={(event) => getData()} 
         className={
          (startDate && endDate && !startDate.isValid() && !endDate.isValid()) ? "disableAddButton" : "showDataBtn"}
          disabled={startDate && endDate && !startDate.isValid() && !endDate.isValid()}>Show Data</button>
        </>
    )
  }

  const periodWeek = (flag) => {
    return (
      <Select
        IconComponent = {CalendarMonthRounded}
        defaultValue={moment().startOf('isoweek').format(DATE_FORMAT) + ' - ' + moment().add(7,'days').startOf('week').format(DATE_FORMAT)}
        sx={{minWidth: '15rem'}}
        className={"select-date"}
        disabled={headingName===Modules.REPORTING ? disablePeriodWeek : false }
      >{getDateItems(flag)}
      </Select>
    )
  }

  const pendingApprovalReportessTab = () => {
    return (
      <div className="pendingApprovalDiv">
        <TextField
          select
          label={"Projects"}
          value={selectedProject.projectName ? selectedProject.projectName : ""}
          sx={{
            minWidth: '15rem',
            "& label": {
              lineHeight: '0.8rem'
            }
          }}
        >
          {timeSheetProjects && timeSheetProjects.map(option=>
            // data.map((option) => (
              <MenuItem
                key={option.id}
                value={option.name}
                required
                onClick={() =>{
                    setSelectedProject({
                      projectId: option.id,projectName: option.name
                    });
                    dispatch(setSelectedProjectId(option.id));
                  }
                }
              >
                {option.name}
              </MenuItem>
            // ))
          )}
        </TextField>
        <TextField
          select
          label={"Employee Name"}
          value={selectedEmployee.employeeName ? selectedEmployee.employeeName : ""}
          sx={{
            minWidth: '15rem',
            "& label": {
              lineHeight: '1rem',
              marginTop: '-0.1rem'
            }
          }}
        >
          {reportees && reportees.map((option) => (
            <MenuItem
              key={option.id}
              value={`${option.firstName} ${option.lastName}`}
              onClick={() =>{
                  setSelectedEmployee({
                    employeeId: option.id,employeeName: `${option.firstName} ${option.lastName}`
                  });
                  dispatch(setSelectedEmployeeId(option.id));
                }
              }
            >
              {`${option.firstName} ${option.lastName}`}
            </MenuItem>
          ))}
        </TextField>
        {periodWeek(false)}
        <button 
          className={"addBtn showDataBtn"}
          onClick={()=>{
            if(tabName === 'REPORTEES'){
              dispatch(
                getTimeSheetReportee({
                  periodWeek: selectedPeriodWeek.startDate.format(DATE_FORMAT) + ' - ' + selectedPeriodWeek.endDate.format(DATE_FORMAT),
                  projectId: selectedProject.projectId ? selectedProject.projectId : "",
                  employeeId: selectedEmployee.employeeId ? selectedEmployee.employeeId : ""
                })
              );
            }
            else{
              dispatch(
                getTimeSheetData({
                  periodWeek: selectedPeriodWeek.startDate.format(DATE_FORMAT) + ' - ' + selectedPeriodWeek.endDate.format(DATE_FORMAT),
                  employeeId: selectedEmployee.employeeId,
                  projectId: selectedProject.projectId
                })
              );
            }
          }}
        >
          Show Data
        </button>
        <button 
          className={(selectedEmployee.employeeId || selectedProject.projectId) ? "addBtn showDataBtn" : "disableAddButton"}
          onClick={()=>{
            setSelectedEmployee({});
            dispatch(setSelectedEmployeeId(null));
            setSelectedProject({});
            dispatch(setSelectedProjectId(null));
          }}
        >
          Clear Selection
        </button>
      </div>
    )
  }
  const myTimeSheetTab = () => {
    return (
      <>
        {(timeSheetData && timeSheetData.length) ?
            <div className="searchWrapperText">
              <span className="searchWrapperSpan">Timesheet Period Status : </span>{timeSheetData[0].periodStatus}
            </div> : null
        }
        <div className="button-flex">
          {periodWeek(true)}
          <button
            disabled={isAddButtonClicked || isEditButtonClicked || (timeSheetData && timeSheetData.length && (timeSheetData[0].periodStatus !== 'Open'))}
            className={
              isAddButtonClicked || isEditButtonClicked || (timeSheetData && timeSheetData.length && (timeSheetData[0].periodStatus !== 'Open'))
                ? "disableAddButton"
                : "addBtn"
            }
            onClick={() => setIsAddButtonClicked(true)}
          >
              Add
          </button>
          <button
            disabled={isAddButtonClicked || isEditButtonClicked || (timeSheetData && timeSheetData.length && getTimesheetStatus(timeSheetData))}
            className={
              isAddButtonClicked || isEditButtonClicked || (timeSheetData && timeSheetData.length && getTimesheetStatus(timeSheetData))
                ? "disableAddButton"
                : "addBtn"
            }
            onClick={()=>{
              let sum = 0;
              rows.forEach(row=>{
                if(row.status !== 'Rejected') sum+=parseFloat(row.totalHrs);
              });
              if(sum.toFixed(2) >= 40) dispatch(submitPeriodForApproval());
              else toast.info("Total Hours must be greater than or equal to 40", toastOptions);
            }}
          >
            Submit For Approval
          </button>
          </div> 
      </>
    )
  }
  const handleSetColumnsData = (data) => {
    const temp = [];
    let totalHrs = {};
    let status = {};
    if (headingName !== Modules.TIMESHEET) {
      setColumns(tableColumnsData[headingName.replace(' ', '')]);
    }
    else {
    Object.keys(data).forEach((col) => {
      if (col === "dateHours" && tabName !== 'REPORTEES') {
        data[col].forEach((dateHour, index) => {
          let month = {
            isDate: true,
          };
          if(index === 0 || moment(dateHour.date).format('DD') === '01') month['day'] = moment(dateHour.date).format('MMM');
          temp.push({
            id: moment(dateHour.date).format("ddd DD"),
            label: moment(dateHour.date).format("ddd DD"),
            date: moment(dateHour.date).format(),
            minWidth: 55,
            sortDir: "",
            align: "left",
            ...month,
          });
        });
      } else if (col === "totalHrs") {
        totalHrs = {
          id: col,
          label: getLabel(col, headingName),
          minWidth: getMinWidth(col, headingName),
          sortDir: "DESC",
          align: "left",
        };
      }
      else if(col === 'status' && headingName === Modules.TIMESHEET){
        if(tabName === 'MY TIMESHEET' || tabName === 'REPORTEES'){
          status = {
            id: col,
            label: getLabel(col, headingName),
            minWidth: getMinWidth(col, headingName),
            sortDir: "DESC",
            align: "left"
          };
        }
      }
      else if (!col.includes('Id') && getLabel(col, headingName) !== '') {
        temp.push({
          id: col,
          label: getLabel(col, headingName),
          minWidth: getMinWidth(col, headingName),
          sortDir: "DESC",
          align: "left",
          isRequired:col.isRequired
        });
      } else if (col === 'employeeId' && tabName !== "MY TIMESHEET") {
        temp.push({
          id: 'employeeName',
          label: tabName === 'PENDING APPROVAL' || tabName === 'REPORTEES' ? 'Employee Name' : getLabel('employeeName', headingName),
          minWidth: tabName === 'PENDING APPROVAL' || tabName === 'REPORTEES' ? '12rem' : getMinWidth('employeeName', headingName),
          sortDir: "DESC",
          align: "left",
        });
      }
    });
    if (headingName === Modules.PROJECT_ALLOCATION) {
      setColumns([...temp]);
    } else {
      if(totalHrs){
        var removeByAttr = function(arr, attr, value){
        var i = arr.length;
        while(i--){
          if( arr[i] 
              && arr[i].hasOwnProperty(attr) 
              && (arguments.length > 2 && arr[i][attr] === value ) ){ 
              arr.splice(i,1);
          }
        }
          return arr;
        }
        if(tabName === 'REPORTEES'){
          removeByAttr(temp, 'id', 'task');
          removeByAttr(temp, 'id', 'projectName');
          setColumns([
            ...temp,
            totalHrs,status,
            { id: "viewDetails", label: "View Details", minWidth: 80, type: 'action' },
          ])
        }
        else{
          setColumns([
            ...temp, totalHrs, 
            {
              id: "actions",
              label: "Actions",
              minWidth: 60,
              sortDir: "",
              align: "left",
            },status,
          ]);
        }
      }
      else{
        setColumns([
          ...temp,
          {
            id: "actions",
            label: "Actions",
            minWidth: 100,
            sortDir: "",
            align: "left",
          },
        ]);
      }
    }
    }
  };

  const setTableData = (tableData) => {
    handleSetColumnsData(tableData.data[0]);
    setTotalRecord(tableData.totalCount);
  };

  const resetSearchData = () => {
    setSearchData("");
    if(inputRef && inputRef.current)
    inputRef.current.value = "";
  };
  
  const setSearchDataHelper = (e) => {
    if(headingName === Modules.REPORTING){
      let value = e.target.value.toLowerCase();
      let searchedData = reportingData.filter((data) =>{
        if((data.employeeName.toLowerCase()).includes(value)
         || (data.periodWeek.toLowerCase()).includes(value)){
          return data;
        }
      });
      setRows(searchedData);
      return;
    }
    if (headingName !== Modules.REPORTING && e.target.value.length > 2 || e.target.value.length === 0)
      setSearchData(e.target.value);
  };

  const periodWeekClickHandler = (fromMyTimeSheet, periodWeek) => {
    setSelectedPriodWeek(periodWeek);
    if(headingName === Modules.TIMESHEET) {
      if (fromMyTimeSheet) {
        dispatch(
          saveTimeSheetPeriodData({
            periodWeek:
              periodWeek.startDate.format(DATE_FORMAT) +
              " - " +
              periodWeek.endDate.format(DATE_FORMAT),
            startDT: periodWeek.startDate.format(),
            endDT: periodWeek.endDate.endOf('isoweek').format(),
          })
        );
        setRowToBeUpdated({});
        setIsAddButtonClicked(false);
        setIsEditButtonClicked(false);
      }
      let startDate = moment(periodWeek.startDate);
      let endDate = moment(periodWeek.endDate);
      if(tabName === "MY TIMESHEET")
        dispatch(getAssignedProjects({
          startDate: moment(startDate).format("YYYY-MM-DDT00:00:00"),
          endDate: moment(endDate).format("YYYY-MM-DDT00:00:00")
        }));
      dispatch(
        setTimeSheetPeriodWeek(
          periodWeek.startDate.format(DATE_FORMAT) +
            " - " +
            periodWeek.endDate.format(DATE_FORMAT)
        )
      );
    } else if(headingName === Modules.REPORTING) {
      setDisableDate(true);
    }
  }
  const getDateItems = (fromMyTimeSheet) => {
    return periodWeeks.map((periodWeek) => (
      <MenuItem
        value={
          periodWeek.startDate.format(DATE_FORMAT) +
          " - " +
          periodWeek.endDate.format(DATE_FORMAT)
        }
        onClick={() => periodWeekClickHandler(fromMyTimeSheet, periodWeek)}
      >
        {periodWeek.startDate.format(DATE_FORMAT) +
          " - " +
          periodWeek.endDate.format(DATE_FORMAT)}
      </MenuItem>
    ));
  };

  const getTimesheetStatus = (timeSheetData) => {
    for(let i=0; i<timeSheetData.length; i++) {
      if(timeSheetData[i].status === "Open") return false;
    }
    return true;
  }

  useEffect(()=>{
    dispatch(
      setTimeSheetPeriodWeek(
        `${selectedPeriodWeek.startDate.format(DATE_FORMAT)} - ${selectedPeriodWeek.endDate.format(DATE_FORMAT)}`
      )
    );
    if(timeSheetData === null && headingName === Modules.TIMESHEET && tabName === 'MY TIMESHEET'){
      dispatch(
        saveTimeSheetPeriodData({
          periodWeek: moment().startOf('isoweek').format(DATE_FORMAT) + ' - ' + moment().add(7,'days').startOf('week').format(DATE_FORMAT),
          startDT: moment().startOf('isoweek').format(),
          endDT: moment().endOf('isoweek').format(),
        })
      );
      dispatch(setTimeSheetPeriodWeek(moment().startOf('isoweek').format(DATE_FORMAT) + ' - ' + moment().add(7,'days').startOf('week').format(DATE_FORMAT)));  
      setRowToBeUpdated({});
      setIsAddButtonClicked(false);
      setIsEditButtonClicked(false);
    }
    if(headingName === Modules.TIMESHEET && tabName === 'MY TIMESHEET'){
      dispatch(
        getMyTimeSheetData({
          periodWeek:
            selectedPeriodWeek.startDate.format(DATE_FORMAT) +
            " - " +
            selectedPeriodWeek.endDate.format(DATE_FORMAT),
        })
      );
    }
    else if(headingName === Modules.TIMESHEET){
      if(tabName === 'REPORTEES'){
        dispatch(
          getTimeSheetReportee({
            periodWeek:
              selectedPeriodWeek.startDate.format(DATE_FORMAT) +
              " - " +
              selectedPeriodWeek.endDate.format(DATE_FORMAT),
            projectId: "",
            employeeId: ""
          })
        );
      }
      else{
        dispatch(
          getTimeSheetData({
            periodWeek:
              selectedPeriodWeek.startDate.format(DATE_FORMAT) +
              " - " +
              selectedPeriodWeek.endDate.format(DATE_FORMAT),
            employeeId: null,
            projectId: null
          })
        );
      }
    }
  },[headingName,tabName]);

  useEffect(() => {
    if (headingName === Modules.CLIENT_ADMIN && clientAdminData && clientAdminData.totalCount) {
      setTableData(clientAdminData);
      setRows(clientAdminData.data);
    } else if (headingName === Modules.PROJECT_ADMIN && projectAdminData && projectAdminData.totalCount) {
      setTableData(projectAdminData);
      setRows(projectAdminData.data);
    } else if (headingName === Modules.PROJECT_ALLOCATION && projectAllocationData && projectAllocationData.totalCount) {
      setTableData(projectAllocationData);
      setRows(projectAllocationData.data);
    } else if (headingName === Modules.TIMESHEET && timeSheetData && timeSheetData.length) {
      handleSetColumnsData(timeSheetData[0]);
      setTotalRecord(timeSheetData.length);
      setRows(handleSetRows(timeSheetData, tabName));
      setIsAddButtonClicked(false)
    } else if (headingName === Modules.PROJECT_MANAGEMENT && projectManagementData && projectManagementData.totalCount) {
      setTableData(projectManagementData);
      setRows(projectManagementData.data);
    } else if(headingName === Modules.REPORTING && reportingData && reportingData.length) {
      // setTableData(reportingData);
      handleSetColumnsData(reportingData[0]);
      setRows(reportingData);
    } else {
      if (tableColumnsData[headingName.replace(' ', '')]) {
        let temp = [...tableColumnsData[headingName.replace(' ', '')]];
        let status;
        if(headingName === Modules.TIMESHEET && tabName === 'MY TIMESHEET'){
          status = temp.pop();
        }
        if(headingName === Modules.TIMESHEET){
          let totalHrs = temp.pop();
          let date = moment(selectedPeriodWeek.startDate);
          if (tabName !== 'REPORTEES')
          for (let i = 0; i < 7; i++) {
            if(i===0 || moment(date).format("DD") == "01") {              
              let tempDate = moment(date).format()
              let month = {
                isDate: true,
              };
              month['day'] = moment(tempDate).format('MMM');
              temp.push({
                id: moment(date).format("ddd DD"),
                label: moment(date).format("ddd DD"),
                date: moment(date).format(),
                minWidth: 55,
                sortDir: "",
                align: "left",
                isDate: true,
                ...month
              });
            } else {
              temp.push({
                id: moment(date).format("ddd DD"),
                label: moment(date).format("ddd DD"),
                date: moment(date).format(),
                minWidth: 55,
                sortDir: "",
                align: "left",
                isDate: true,
              });
            }
            date.add(1, "days");
          }
          temp.push(totalHrs);
        }
        if (headingName === Modules.TIMESHEET) {
          setColumns([
            ...temp,
            {
              id: "actions",
              label: "Actions",
              minWidth: 100,
              sortDir: "",
              align: "left",
              isRequired:true
            },
          ])
        }
        else { 
          setColumns([ ...temp ]); 
        }
      } else {
        setColumns([]);
      }
      setRows([]);
      setTotalRecord(0);
    }
  }, [ clientAdminData, projectAdminData, projectAllocationData, projectManagementData, timeSheetData, reportingData, headingName ]);

  useEffect(() => {
    switch (headingName) {
      case Modules.CLIENT_ADMIN:
        dispatch(
          getClientAdminData({
            pageNo: 1,
            pageSize: 10,
            sortBy: "clientName",
            sortDir: "ASC",
            searchData: searchData,
          })
        );
        break;
      case Modules.PROJECT_ADMIN:
        dispatch(
          getProjectAdminData({
            pageNo: 1,
            pageSize: 10,
            sortBy: "projectName",
            sortDir: "ASC",
            searchData: searchData,
          })
        );
        break;
      case Modules.PROJECT_ALLOCATION:
        dispatch(
          getProjectAllocationData({
            pageNo: 1,
            pageSize: 10,
            sortBy: "projectName",
            sortDir: "ASC",
            searchData: searchData,
            status: status,
            employeeID: ""
          })
        );
      break;
      case Modules.PROJECT_MANAGEMENT:
        dispatch(
          getProjectManagementData({
            projectId: projectId,
            pageNo: 1,
            pageSize: 10,
            sortBy: "projectName",
            sortDir: "ASC",
            searchData: searchData,
          })
        );
        break;
      case Modules.REPORTING:
        dispatch(
        getTimesheetReports({
          startDate: moment(selectedPeriodWeek.startDate).format("YYYY-MM-DDT00:00:00"),
          endDate: moment(selectedPeriodWeek.endDate).format("YYYY-MM-DDT00:00:00")
        }));
        break;
      case Modules.TIMESHEET:
        if(tabName !== 'MY TIMESHEET')
          dispatch(getTimesheetProjects());
        break;
      default:
        break;
    }
  }, [headingName, searchData]);

  useEffect(() => {
    setRows([])
    if (clientsData === null && headingName === Modules.PROJECT_ADMIN) {
      dispatch(getClientsData());
    }
    if ((headingName === Modules.PROJECT_ADMIN || headingName === Modules.CLIENT_ADMIN) && listItems === null) {
      dispatch(getListItems());
    }
    if ((headingName === Modules.TIMESHEET && tabName === "MY TIMESHEET") || headingName === Modules.PROJECT_MANAGEMENT && projectManagementData === null) {
      let startDate = moment(selectedPeriodWeek.startDate);
      let endDate = moment(selectedPeriodWeek.endDate);
      dispatch(getAssignedProjects({
            startDate: moment(startDate).format("YYYY-MM-DDT00:00:00"),
            endDate: moment(endDate).format("YYYY-MM-DDT00:00:00")
          }));
    }
    if(headingName === Modules.TIMESHEET && tabName !== 'MY TIMESHEET'){
      if(selectedProjectId){
        dispatch(getReportees(selectedProjectId));
      }
      else{
        dispatch(getReportees(null));
      }
    }
    resetSearchData();
    setIsAddButtonClicked(false);
    setIsEditButtonClicked(false);
    if(headingName!==Modules.TIMESHEET){
      dispatch(setSelectedEmployeeId(null));
      dispatch(setSelectedProjectId(null));
    }
  }, [ headingName ]);

  useEffect(() => {
    if(allTasks === null) dispatch(getProjectTasks());
    if(allUserDetails === null) dispatch(getAllUserDetails());
  }, []);

  return (
    <div className={`tableDiv ${tabName === 'MY TIMESHEET' ? "timesheetTable" : ""}`}>
      <div className="searchHeader">
        {headingName !== Modules.TIMESHEET && headingName !== Modules.PROJECT_MANAGEMENT &&  <div className="searchWrapper">
          <img src={searchIcon} className="searchIcon" alt="" />
          <input
            className="searchBox"
            type="search"
            placeholder="Search"
            ref={inputRef}
            onChange={setSearchDataHelper}
          />
        </div>
        }
        {
          headingName === Modules.TIMESHEET ? (
            tabName === 'MY TIMESHEET' ? myTimeSheetTab() : pendingApprovalReportessTab()
          ) : headingName === Modules.REPORTING ? FilterData()
          : headingName !== Modules.PROJECT_ALLOCATION ? (
            <>
            <button
                disabled={isAddButtonClicked || isEditButtonClicked}
                className={
                  isAddButtonClicked || isEditButtonClicked
                    ? "disableAddButton"
                    : "addBtn"
                }
                onClick={() => setIsAddButtonClicked(true)}
              >
                <div
                  className={
                    isAddButtonClicked || isEditButtonClicked
                      ? "disableAddButtonText"
                      : "btnText"
                  }
                >
                  Add
                </div>
              </button>
            </>
          ) : null
        }
        
      </div>
      <DataTable
        rows={rows}
        columns={columns}
        headingName={headingName}
        tabName={tabName}
        setColumns={setColumns}
        setRows={setRows}
        totalRecord={totalRecord}
        isAddButtonClicked={isAddButtonClicked}
        setIsAddButtonClicked={setIsAddButtonClicked}
        isEditButtonClicked={isEditButtonClicked}
        setIsEditButtonClicked={setIsEditButtonClicked}
        searchData={searchData}
        resetSearchData={resetSearchData}
        projectStatus={status}
        selectedPeriodWeek={selectedPeriodWeek}
        projectId={projectId}
        rowToBeUpdated={rowToBeUpdated}
        setRowToBeUpdated={setRowToBeUpdated}
        dataForExcel={projectManagementData}
      />
      { headingName === Modules.TIMESHEET && tabName === "MY TIMESHEET" && timeSheetData && timeSheetData.length ?
        <div className="totalWorkingHrs">
          {`Total Hours: ${getTotalHrs(timeSheetData)}`}
        </div> : null
      }
      {/* {headingName===Modules.PROJECT_MANAGEMENT && <ExportExcel data={headingName===Modules.PROJECT_MANAGEMENT ? projectManagementData : []} headingName={headingName} projectId={projectId}/>} */}
    </div>
  );
};
