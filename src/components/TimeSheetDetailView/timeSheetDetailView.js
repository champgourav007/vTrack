import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modules } from "../../common/constants/sidebar";
import { AddDisableIcon, AddEnableIcon, crossIcon, editIcon } from "../../common/icons";
import { getApproversIds, getFullName, getLabel, getTotalHrs, UniqueIds } from "../../common/utils/datatable";
import { dropDownMockData, initialData } from "../../mock-data/TableData";
import { getDetailedTimeSheetData, saveTimeSheetData, setDetailedTimeSheetData, updateTimeSheetData } from "../../redux/actions";
import "./timeSheetDetailView.css";

export const TimeSheetDetailView = ({viewDetails, setViewDetails, selectedEmpId, selectedPeriodWeek}) => {
  const headingName = Modules.TIMESHEET;
  const { clientsData, allTasks, listItems, assignedProjects, detailedTimeSheetData } = useSelector(({ MODULES }) => MODULES);
  const { userData, allUserDetails } = useSelector(({ USER }) => USER);
  const { vTrackLoader } = useSelector(({ APP_STATE }) => APP_STATE);
  const dispatch = useDispatch();

  const [ rows, setRows ] = useState([]);
  const [ columns, setColumns ] = useState([]);
  const [ rowToBeUpdated, setRowToBeUpdated ] = useState({});
  const [ newRowAdded, setNewRowAdded ] = useState(initialData(headingName,selectedPeriodWeek));
  const [ isEditButtonClicked, setIsEditButtonClicked ] = useState(false);

  const handleClose = () => {
    setViewDetails(false);
    setIsEditButtonClicked(false);
    setNewRowAdded(initialData(headingName,selectedPeriodWeek));
    setRowToBeUpdated({});
  }

  const getEmployeeName = (id) => {
    let employeeName = "";
    allUserDetails &&
      allUserDetails.data.length &&
      allUserDetails.data.forEach((user) => {
        if (user.id === id) {
          employeeName = getFullName(user.firstName, user.lastName);
        }
      });
    return employeeName;
  };

  const saveDataHandler = () => {
    setIsEditButtonClicked(false);
    if (headingName === Modules.TIMESHEET){
      const dateHours = [];
      const restProps = {};
      let totalHrs = 0;
      Object.keys(newRowAdded).forEach(key=>{
        if(moment(key).isValid()){
          dateHours.push({
            date: key,
            hours: newRowAdded[key]
          });
          if(newRowAdded[key] !== "") totalHrs += parseFloat(newRowAdded[key]);
        }
        else{
          restProps[key] = newRowAdded[key];
        }
      });
      restProps['dateHours'] = [...dateHours];
      restProps['totalHrs'] = totalHrs.toString();
      restProps['periodWeek'] = selectedPeriodWeek.startDate.format("DD MMM") +
      " - " +
      selectedPeriodWeek.endDate.format("DD MMM");
      restProps['employeeId'] = selectedEmpId;
      dispatch(updateTimeSheetData(restProps));
    }
    setRowToBeUpdated({});
    setNewRowAdded(initialData(headingName,selectedPeriodWeek));
  };

  const closeButtonHandler = () => {
    setIsEditButtonClicked(false);
    setRowToBeUpdated({});
    setNewRowAdded(initialData(headingName,selectedPeriodWeek));
  };

  const inputFieldHandler = (event, col) => {
    setNewRowAdded({ ...newRowAdded, [col]: event.target.value });
  };

  const isDateAdded = () =>{
    let isAdded = false;
    Object.keys(newRowAdded).forEach(key=>{
      if(moment(key).isValid() && newRowAdded[key] !== "") isAdded = true;
    });
    return isAdded;
  };

  const getTypeofColumn = (col, moduleName) => {
    if (columns && columns.length) {
      for (let column of columns) {
        if (column.id === col) {
          return column.type;
        }
      }
    }
  };

  const displayMenuItem = (col) => {
    if (col === "type") {
      return (
        listItems &&
        listItems.type.map((option) => (
          <MenuItem
            key={option.id}
            value={option.shortCodeValue}
            onClick={() =>
              setNewRowAdded({
                ...newRowAdded,
                [col]: option.shortCodeValue,
                typeId: option.id,
              })
            }
          >
            {option.shortCodeValue}
          </MenuItem>
        ))
      );
    } else if (col === "projectManagerName") {
      return (
        allUserDetails &&
        allUserDetails.data.map((option) => (
          <MenuItem
            key={option.id}
            value={getFullName(option.firstName, option.lastName)}
            onClick={() =>
              setNewRowAdded({
                ...newRowAdded,
                [col]: getFullName(option.firstName, option.lastName),
                projectManagerId: option.id,
              })
            }
          >
            {`${getFullName(option.firstName, option.lastName)} (${option.email})`}
          </MenuItem>
        ))
      );
    } else if (col === "businessOwner" || col === "deliveryOfficer") {
      return (
        allUserDetails &&
        allUserDetails.data.map((option) => (
          <MenuItem
            key={option.id}
            value={getFullName(option.firstName, option.lastName)}
            onClick={() =>
              setNewRowAdded({
                ...newRowAdded,
                [col]: getFullName(option.firstName, option.lastName),
                [`${col}Id`]: option.id,
              })
            }
          >
            {`${getFullName(option.firstName, option.lastName)} (${option.email})`}
          </MenuItem>
        ))
      );
    } else if (col === "employeeName") {
      return (
        allUserDetails &&
        allUserDetails.data.map((option) => (
          <MenuItem
            key={option.id}
            value={getFullName(option.firstName, option.lastName)}
            onClick={() =>
              setNewRowAdded({
                ...newRowAdded,
                [col]: getFullName(option.firstName, option.lastName),
                employeeId: option.id,
              })
            }
          >
            {`${getFullName(option.firstName, option.lastName)} (${option.email})`}
          </MenuItem>
        ))
      );
    } else if (col === "projectName") {
      return assignedProjects && assignedProjects.map((option) => (
        <MenuItem
          key={option.projectId}
          value={option.projectName}
          onClick={() =>
            setNewRowAdded({
              ...newRowAdded,
              [col]: option.projectName,
              projectId: option.projectId,
            })
          }
        >
          {option.projectName}
        </MenuItem>
      ))
    } else if (col === "taskName"){
      return allTasks ? allTasks.map((option,index) => (
        <MenuItem
          key={index}
          value={option.taskName}
          onClick={() =>
            setNewRowAdded({
              ...newRowAdded,
              [col]: option.taskName,
              taskId: option.taskID,
            })
          }
        >
          {option.taskName}
        </MenuItem>
      )) : null;
    } else {
      return dropDownMockData[col].map((option) => (
        <MenuItem
          key={option}
          value={option}
          onClick={() => setNewRowAdded({ ...newRowAdded, [col]: option })}
        >
          {option}
        </MenuItem>
      ));
    }
  };

  const createInputField = (col) => {
    if (getTypeofColumn(col.id, headingName) === "textfield") {
      return (
        <TableCell key={col.id} style={{maxWidth:col.maxWidth ? col.maxWidth : 'auto'}}>
          <TextField
            id="outlined-required"
            label={getLabel(col.id, headingName)}
            placeholder=""
            value={newRowAdded[col.id]}
            required ={col.isRequired}
            sx={{
            "& label": {
              lineHeight: '0.8rem'
            }
          }}
            onChange={(e) => inputFieldHandler(e, col.id)}
          />
        </TableCell>
      );
    } else if (getTypeofColumn(col.id, headingName) === "select") {
      return (
        <TableCell key={col.id}  style={{maxWidth:col.maxWidth ? col.maxWidth : 'auto'}}>
          <TextField
            id="outlined-select-currency"
            select
            label={getLabel(col.id, headingName)}
            value={newRowAdded[col.id]}
            required ={col.isRequired}
            sx={{
            "& label": {
              lineHeight: '0.8rem'
            }}}
            // onChange={(e) => inputFieldHandler(e, col.id)}
            style={{ width: "80%" }}
          >
            {displayMenuItem(col.id)}
          </TextField>
        </TableCell>
      );
    } else if (getTypeofColumn(col.id, headingName) === "date") {
      return (
        <TableCell key={col.id} style={{maxWidth: '7rem'}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label=""
              value={newRowAdded[col.id]}
              onChange={(newValue) => {
                setNewRowAdded({ ...newRowAdded, [col.id]: newValue });
              }}
              placeholder="Date"
              renderInput={(params) => <TextField {...params} error={false} />}
            />
          </LocalizationProvider>
        </TableCell>
      );
    } else if (col.id === "actions") {
      return (
        <TableCell key={col.id}>
          <div className="attachmentContainer">
            {
              (newRowAdded.clientName === "" || 
                (headingName===Modules.TIMESHEET && 
                  (newRowAdded.projectName==="" || newRowAdded.task==="" || !isDateAdded())
                )
              ) ? (
                <button disable className="buttonBackgroundBorder">
                  <img src={AddDisableIcon} className="editDeleteIcon" alt="" />
                </button>
              ) : (
                <img
                  src={AddEnableIcon}
                  onClick={saveDataHandler}
                  className="cursorPointer editDeleteIcon"
                  alt=""
                />
              )
            }
            <img
              src={crossIcon}
              className="cursorPointer editDeleteIcon"
              onClick={closeButtonHandler}
              alt=""
            />
          </div>
        </TableCell>
      );
    }
    else if(col.isDate){
      let date = Object.keys(newRowAdded).find(i=>moment(i).isValid() && moment(i).format('DD') === moment(col.date).format('DD'));
      return (
        <TableCell key={col.id} className="timeField">
          <TextField
            label={"Time"}
            type="number"
            value={newRowAdded[date] === '-' ? 0 : newRowAdded[date]}
            style={{maxWidth:'6rem'}}
            sx={{
            "& label": {
              lineHeight: '0.8rem'
            }
          }}
            onChange={(e) => inputFieldHandler(e, date)}
          />
        </TableCell>
      );
    }
    else if(getTypeofColumn(col.id, headingName) === "empty"){
      return (
        <TableCell key={col.id}/>
      );
    }
  };

  const editButtonClicked = (id) => {
    let idx = rows.findIndex(
      (row) => row[UniqueIds[headingName.replace(" ", "")]] === id
    );
    let rowData = initialData(headingName,selectedPeriodWeek);
    Object.keys(rows[idx]).forEach(key=>{
      if(Object.keys(rowData).includes(key)){
        rowData[key] = rows[idx][key];
      }
      else{
        let keys = Object.keys(rowData).filter(i=>moment(i).isValid());
        if(keys.map(i=>moment(i).format('DD')).includes(key.slice(-2)) && rows[idx][key]!=='-'){
          rowData[keys.find(i=>moment(i).format('DD') === key.slice(-2))] = rows[idx][key].toString();
        }
        else if(!keys.map(i=>moment(i).format('DD')).includes(key.slice(-2))){
          rowData[key] = rows[idx][key];
        }
      }
    })
    rowData['timesheetDetailID'] = rows[idx]['timesheetDetailID'];
    setRowToBeUpdated(rowData);
    setNewRowAdded(rowData);
    setIsEditButtonClicked(true);
  };

  useEffect(() => {
    if (detailedTimeSheetData && detailedTimeSheetData.length) {
      let temp = [ 
        { id: 'projectName', label: 'Project Name', align: 'left', type: 'select', isRequired: true },
        { id: 'task', label: 'Task', align: 'left', type: 'textfield', isRequired: true },
      ];
      detailedTimeSheetData[0]['dateHours'].forEach((dateHour, index) => {
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
      temp.push({ id: 'totalHrs', label: 'Total', align: 'left', type: 'empty' });
      temp.push({ id: 'status', label: 'Status', align: 'left', type: 'empty' });
      temp.push({ id: 'approver', label: 'Approved By', align: 'left', type: 'empty' });
      temp.push({ id: 'actions', label: 'Actions', align: 'left', type: 'actions' });
      setColumns([ ...temp ]);
      let rowsData = [];
      let rowsToShow = [...detailedTimeSheetData];
      rowsToShow.forEach((row)=>{
        let rowData = {};
        Object.keys(row).forEach((col) => {
          if (col === "dateHours") {
            row[col].forEach((dateHour) => {
              rowData[moment(dateHour.date).format("ddd DD")] =
                dateHour.hours === 0 ? "-" : dateHour.hours;
            });
          } else {
            rowData[col] = row[col];
          }
        });
        rowsData.push(rowData);
      });
      setRows([...rowsData]);
    }
  }, [detailedTimeSheetData]);

  useEffect(() => {
    if (headingName === Modules.TIMESHEET && viewDetails)
    dispatch(
      getDetailedTimeSheetData({
        periodWeek:
          selectedPeriodWeek.startDate.format("DD MMM") +
          " - " +
          selectedPeriodWeek.endDate.format("DD MMM"),
        employeeId: selectedEmpId,
        projectId: null,
        projectManagerId: null,
      })
    );
  }, [ selectedEmpId, selectedPeriodWeek ]);

  return (
    <>
    <Dialog
        fullWidth={true}
        maxWidth='lg'
        open={viewDetails && !vTrackLoader}
        onClose={handleClose}
      >
        <DialogTitle sx={{ fontSize: '2.25rem', color: '#1773bc' }}>TimeSheet Detailed View</DialogTitle>
        <DialogContent>
          <div className="empName-period">
            <div className="namePeriodDiv">
              <div className="namePeriodLabel">Employee Name:</div>
              <div className="namePeriodField">{getEmployeeName(selectedEmpId)}</div>
            </div>
            <div className="namePeriodDiv">
              <div className="namePeriodLabel">Period Week:</div>
              <div className="namePeriodField">{selectedPeriodWeek.startDate.format("DD MMM") + " - " + selectedPeriodWeek.endDate.format("DD MMM")}</div>
            </div>
          </div>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: "36rem" }}>
              <Table aria-label="sticky table" size="small">
                <TableHead>
                  <TableRow>
                    { columns.map((column) => {
                      return <TableCell 
                        key={column.id} 
                        align={column.align}
                        sx={{
                          backgroundColor: "#1773bc0d",
                          color: "#1773bc",
                          fontWeight: 700,
                        }}
                      >
                        {column.label}
                      </TableCell>
                    }) }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows && rows.map((row, rowIdx) => {
                    if (
                      rowToBeUpdated[UniqueIds[headingName.replace(" ", "")]] ===
                      row[UniqueIds[headingName.replace(" ", "")]]
                    ) {
                      return (
                        <TableRow id="new_row" key={rowIdx}>
                          {columns.map((col) => {
                            return createInputField(col, headingName, newRowAdded, inputFieldHandler, );
                          })}
                        </TableRow>
                      );
                    } else {
                    return <TableRow
                      hover
                    >
                      { columns.map((col, colIdx) => {
                        return <TableCell key={col.id}>
                          {
                            col.id === 'actions' && row.projectManagerID === userData?.data?.activeUsers?.id && row.status !== 'Approved'  ?
                              <button className="buttonBackgroundBorder cursorPointer">
                                <img src={editIcon} className="editDeleteIcon" alt="" 
                                  onClick={() =>
                                    editButtonClicked(row['timesheetDetailID'])
                                  }
                                />
                              </button>
                              : row[col.id]
                          }
                        </TableCell>
                      })}
                    </TableRow>
                    }
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          { detailedTimeSheetData && detailedTimeSheetData.length ?
            <div className="totalWorkingHrs">
              {`Total Hours: ${getTotalHrs(detailedTimeSheetData)}`}
            </div> : null
          }
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setViewDetails(false)} >Close</Button>
        </DialogActions>
      </Dialog>
      </>
  )
}