import "./tabsTable.css";
import { searchIcon } from "../../common/icons";
import { useEffect, useState } from "react";
import { DataTable } from "../DataTable/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { Modules } from "../../common/constants/sidebar";
import { getAllProjectsData, getAllUserDetails, getAllUsersData, getClientAdminData, getClientsData, getListItems, getProjectAdminData, getProjectAllocationData, getProjectManagersData } from "../../redux/actions";
import { getLabel, getMinWidth, tableColumnsData } from "../../common/utils/datatable";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import moment from 'moment';

export const TabsTable = ({ headingName, tabName }) => {
  const { clientAdminData, projectAdminData, projectAllocationData, timeSheetData } = useSelector(({ MODULES }) => MODULES);
  const dispatch = useDispatch();

  const [ isAddButtonClicked, setIsAddButtonClicked ] = useState(false);
  const [ isEditButtonClicked, setIsEditButtonClicked ] = useState(false);
  const [ rows, setRows ] = useState([]);
  const [ columns, setColumns ] = useState([]);
  const [ totalRecord, setTotalRecord ] = useState(0);
  const [ searchData, setSearchData ] = useState("");

  const handleSetColumnsData = (data) => {
    const temp = [];
    Object.keys(data).forEach((col) => {
      if(col === 'dateHours'){
        data[col].forEach((dateHour,index)=>{
          let month = {
            isDate: true
          };
          if(index === 0 || dateHour.date.format('DD') === '01') month['day'] = dateHour.date.format('MMM')
          temp.push({
            id: dateHour.date.format('ddd DD'),
            label: dateHour.date.format('ddd DD'),
            minWidth: 55,
            sortDir: "",
            align: "left",
            ...month
          })
        })
      }
      else if (!col.includes('Id') && getLabel(col, headingName) !== '') {
        const tableHeading = col === 'employeeId' ? 'employeeName' : col;
        temp.push({
          id: tableHeading,
          label: getLabel(tableHeading, headingName),
          minWidth: getMinWidth(tableHeading, headingName),
          sortDir: "DESC",
          align: "left",
        });
      }
    });
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
  };

  const setTableData = (tableData) => {
    handleSetColumnsData(tableData.data[0]);
    // setRows(tableData.data);
    setTotalRecord(tableData.totalCount);
  };

  const handleSetRows = (tableData) => {
    console.log('here')
    let rowsData = [];
    tableData.forEach((row)=>{
      let rowData = {};
      Object.keys(row).forEach((col) => {
        if(col === 'dateHours'){
          row[col].forEach((dateHour)=>{
            rowData[dateHour.date.format('ddd DD')] = dateHour.hours === 0 ? '-' : dateHour.hours;
          })
        }
        else {
          rowData[col] = row[col];
        }
      });
      rowsData.push(rowData);
    });
    console.log(rowsData)
    setRows([...rowsData]);
  }

  const setSearchDataHelper = (e) => {
    if(e.target.value.length > 2 || e.target.value.length === 0)
      setSearchData(e.target.value);
  }

  const getPeriods = () => {
    let date = moment().subtract(42,'days');
    const periods = [];
    for(let i = 0; i < 13; i++){
      periods.push({
        startDate : moment(date.startOf('isoweek')),
        endDate : moment(date.add(7,'days').startOf('week'))
      })
      date.add(7,'days');
    }
    return periods;
  }

  const periodWeeks = getPeriods();

  const getDateItems = () => {
    return periodWeeks.map((periodWeek)=>(
      <MenuItem
        value={periodWeek.startDate.format('DD MMM') + ' - ' + periodWeek.endDate.format('DD MMM')}
        onClick={() =>
          console.log('b')
        }
      >
        {periodWeek.startDate.format('DD MMM') + ' - ' + periodWeek.endDate.format('DD MMM')}
      </MenuItem>
    ));
  }

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
    } else if (headingName === Modules.TIMESHEET){
      setTableData(timeSheetData);
      handleSetRows(timeSheetData.data);
    } else{
      if (tableColumnsData[headingName.replace(' ', '')]) {
        setColumns([
          ...tableColumnsData[headingName.replace(' ', '')],
          {
            id: "actions",
            label: "Actions",
            minWidth: 100,
            sortDir: "",
            align: "left",
          },
        ]);
      }
      else {
        setColumns([]);
      }
      setRows([]);
      setTotalRecord(0);
    }
  }, [ clientAdminData, projectAdminData, projectAllocationData, headingName ]);

  useEffect(() => {
    switch(headingName) {
      case Modules.CLIENT_ADMIN:
        dispatch(
          getClientAdminData({
            pageNo: 1,
            pageSize: 10,
            sortBy: 'clientName',
            sortDir: "ASC",
            searchData: searchData
          })
        );
        break;
      case Modules.PROJECT_ADMIN:
        dispatch(
          getProjectAdminData({
            pageNo: 1,
            pageSize: 10,
            sortBy: 'projectName',
            sortDir: "ASC",
            searchData: searchData
          })
        );
        break;
      case Modules.PROJECT_ALLOCATION:
        dispatch(
          getProjectAllocationData({
            pageNo: 1,
            pageSize: 10,
            sortBy: 'projectName',
            sortDir: "ASC",
            searchData: searchData
          })
        );
        break;
      default:
        dispatch(
          getClientAdminData({
            pageNo: 1,
            pageSize: 10,
            sortBy: 'clientName',
            sortDir: "ASC",
            searchData: searchData
          })
        );
    }
  }, [ headingName, searchData ]);

  useEffect(() => {
    dispatch(getProjectManagersData());
    dispatch(getClientsData());
    dispatch(getListItems());
    dispatch(getAllUsersData());
    dispatch(getAllUserDetails());
    dispatch(getAllProjectsData());
    setSearchData('')
  }, [ headingName]);

  return (
    <div className="tableDiv">
      <div className="searchHeader">
        <div className="searchWrapper">
          <img src={searchIcon} className="searchIcon" alt="" />
          <input
            className="searchBox"
            type="search"
            placeholder="Search"
            onChange={setSearchDataHelper}
          />
        </div>
        {
          headingName === 'TimeSheet' ? (
            <div className="button-flex">
              <TextField
                select
                defaultValue={periodWeeks[0].startDate.format('DD MMM') + ' - ' + periodWeeks[0].endDate.format('DD MMM')}
              >
                {getDateItems()}
              </TextField>
              <button
                disabled={isAddButtonClicked || isEditButtonClicked}
                className={
                  isAddButtonClicked || isEditButtonClicked
                    ? "disableAddButton"
                    : "addBtn"
                }
                onClick={() => setIsAddButtonClicked(true)}
              >
                  Add
              </button>
              <button
                disabled={isAddButtonClicked || isEditButtonClicked}
                className={
                  isAddButtonClicked || isEditButtonClicked
                    ? "disableAddButton"
                    : "addBtn"
                }
              >
                  Submit For Approval
              </button>
            </div>
          ) : (
            <button
              disabled={isAddButtonClicked || isEditButtonClicked}
              className={
                isAddButtonClicked || isEditButtonClicked
                  ? "disableAddButton"
                  : "addBtn"
              }
              onClick={() => setIsAddButtonClicked(true)}
            >
                Add
            </button>
          )
        }
        
      </div>
      {
        headingName === 'TimeSheet' ? (
          <DataTable
            rows={rows}
            columns={columns}
            headingName={headingName}
            setColumns={setColumns}
            totalRecord={totalRecord}
            isAddButtonClicked={isAddButtonClicked}
            setIsAddButtonClicked={setIsAddButtonClicked}
            isEditButtonClicked={isEditButtonClicked}
            setIsEditButtonClicked={setIsEditButtonClicked}
            searchData={searchData}
          />
        ) : (
          <DataTable
            rows={rows}
            columns={columns}
            headingName={headingName}
            setColumns={setColumns}
            totalRecord={totalRecord}
            isAddButtonClicked={isAddButtonClicked}
            setIsAddButtonClicked={setIsAddButtonClicked}
            isEditButtonClicked={isEditButtonClicked}
            setIsEditButtonClicked={setIsEditButtonClicked}
            searchData={searchData}
          />
        )
      }
    </div>
  );
};

