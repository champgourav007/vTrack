import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DATE_FORMAT } from "../../common/constants/extra-constants";
import { Modules } from "../../common/constants/sidebar";
import { AddDisableIcon, AddEnableIcon, crossIcon, editIcon } from "../../common/icons";
import { getApproversIds, getFullName, getLabel, getMinWidth, getTotalHrs, UniqueIds } from "../../common/utils/datatable";
import { dropDownMockData, initialData } from "../../mock-data/TableData";
import { getDetailedTimeSheetData, getProjectAllocationData, saveTimeSheetData, setDetailedTimeSheetData, updateTimeSheetData } from "../../redux/actions";
import TablePagination from "@mui/material/TablePagination";
import "./DetailView.css";
import { getCircularProgressColor } from "../../common/utils/circular-progress-color";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import Loader from "../Loaders/Loader";
import TableLoader from "../Loaders/TableLoader";
import CircularLoader from "../Loaders/CircularLoader";

export const DetailView = ({viewDetails, setViewDetails, selectedEmpId, selectedPeriodWeek, headingName}) => {
  const { clientsData, allTasks, listItems, assignedProjects, detailedTimeSheetData, projectAllocationData } = useSelector(({ MODULES }) => MODULES);
  const { userData, allUserDetails } = useSelector(({ USER }) => USER);
  const { vTrackLoader } = useSelector(({ APP_STATE }) => APP_STATE);
  const dispatch = useDispatch();

  const [ rows, setRows ] = useState([]);
  const [ columns, setColumns ] = useState([]);
  const [ rowToBeUpdated, setRowToBeUpdated ] = useState({});
  const [ newRowAdded, setNewRowAdded ] = useState(initialData(headingName,selectedPeriodWeek));
  const [ isEditButtonClicked, setIsEditButtonClicked ] = useState(false);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleClose = () => {
    setViewDetails(false);
    setIsEditButtonClicked(false);
    setNewRowAdded(initialData(headingName,selectedPeriodWeek));
    setRowToBeUpdated({});
    setRows([]);
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
      let totalHrs = 0.00;
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
      let finalHours=totalHrs.toFixed(2);
      if(finalHours.split('.')[1]==="00") finalHours=parseInt(totalHrs);
      restProps['totalHrs'] = finalHours;
      restProps['periodWeek'] = selectedPeriodWeek.startDate.format(DATE_FORMAT) +
      " - " +
      selectedPeriodWeek.endDate.format(DATE_FORMAT);
      restProps['employeeId'] = selectedEmpId;
      restProps['fromDetailView'] = true;
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
    let valuesArray = event.target.value.split(".");
    if(valuesArray.length !== 1 && valuesArray[1] >= 100){
      toast.info(`You can not enter values after 2 decimal places`);
    }
    else if(event.target.value !== '' && (event.target.id === 'time' || col === 'billAllocation') && (parseInt(event.target.value) < parseInt(event.target.min) || parseInt(event.target.value) > parseInt(event.target.max))){
      toast.info(`Please Enter values between ${event.target.min}-${event.target.max}`);
    }
    else{
      setNewRowAdded({ ...newRowAdded, [col]: event.target.value });
    }
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
    } else if (col === "task"){
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
              renderInput={(params) => <TextField {...params} error />}
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
                  <img src={AddDisableIcon} className="editDeleteIcon" alt="" />
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
      const selctedProjectForUser = newRowAdded.projectId !== undefined ? newRowAdded.projectId : newRowAdded.projectID;
      let startDate = null;
      let endDate = null;
      assignedProjects.forEach((data) => {
        if(data.projectId === selctedProjectForUser){
          startDate = data.sowStartDate;
          endDate = data.sowEndDate;
        }
      });

      if(date >= startDate && date <= endDate)
      {
        return (
          <TableCell key={col.id} className="timeField">
            <TextField
              label={"Time"}
              id="time"
              type="number"
              inputProps={{min:0, max:24}}
              value={newRowAdded[date] === '-' ? 0 : newRowAdded[date]}
              style={{maxWidth:'6rem'}}
              required={col.isRequired}
              sx={{
              "& label": {
                lineHeight: '0.8rem'
              }
            }}
              onChange={(e) => inputFieldHandler(e, date)}
            />
          </TableCell>
        );
      }else{
        return (
          <TableCell key={col.id} className="timeField">
            <TextField
              label={"Time"}
              type="number"
              disabled
              value={0}
              style={{maxWidth:'6rem'}}
              required={col.isRequired}
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
    };
  }

  const getNameByEmail = (email) => {
    let name = "";
    allUserDetails &&
      allUserDetails.data.length &&
      allUserDetails.data.forEach((user) => {
        if (user.email === email) {
          name = getFullName(user.firstName, user.lastName);
        }
      });
    return name;
  }

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
    if (headingName===Modules.TIMESHEET && detailedTimeSheetData && detailedTimeSheetData.length) {
      let temp = [ 
        { id: 'projectName', label: 'Project Name', align: 'left', type: 'select', isRequired: true },
        { id: "task", label: "Task", minWidth: 100,maxWidth: 150, type: 'select',isRequired: true },
        { id: "notes", label: "Notes", minWidth: 100,maxWidth: 150, type: 'textfield',isRequired: false },
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
            rowData[col] = col === "approver" ? getNameByEmail(row[col]) : row[col];
          }
        });
        rowsData.push(rowData);
      });
      setRows([...rowsData]);
      setCount(rows.length)
    } else if (headingName===Modules.PROJECT_MANAGEMENT && projectAllocationData && projectAllocationData.data.length) {
      setCount(projectAllocationData.totalCount)
      let temp=[];
      Object.keys(projectAllocationData.data[0]).forEach((col) => {
        if (!col.includes('Id') && getLabel(col, "ProjectAllocation") !== '') {
          temp.push({
            id: col,
            label: getLabel(col, "ProjectAllocation"),
            minWidth: getMinWidth(col, "ProjectAllocation"),
            sortDir: "DESC",
            align: "left",
            isRequired:col.isRequired
          });
        } else if (col === 'employeeId') {
          temp.push({
            id: 'employeeName',
            label: getLabel('employeeName', "ProjectAllocation"),
            minWidth: getMinWidth('employeeName', "ProjectAllocation"),
            sortDir: "DESC",
            align: "left",
          });
        }
      })
      let rowsData=[], rowsToshow=projectAllocationData.data;
      rowsToshow.forEach((row) => {
        let rowData = {};
        Object.keys(row).forEach((col) => {
          rowData[col] = row[col];
        })
        rowsData.push(rowData);
      })
      setColumns([...temp]);
      setRows([...rowsData]);
    }
  }, [detailedTimeSheetData, projectAllocationData]);

  useEffect(() => {
    if (headingName === Modules.TIMESHEET && viewDetails){
      dispatch(
        getDetailedTimeSheetData({
          periodWeek:
            selectedPeriodWeek.startDate.format(DATE_FORMAT) +
            " - " +
            selectedPeriodWeek.endDate.format(DATE_FORMAT),
          employeeId: selectedEmpId,
          projectId: null,
          projectManagerId: null,
        })
      );
    } else if (headingName === Modules.PROJECT_MANAGEMENT && viewDetails) {
      dispatch(
        getProjectAllocationData({
          pageNo: 1,
          pageSize: 10,
          sortBy: "projectName",
          sortDir: "ASC",
          searchData: "",
          status: "Active",
          employeeID: selectedEmpId
        })
      );
    }
  }, [ selectedEmpId, selectedPeriodWeek, viewDetails ]);

  useEffect(() => {
    if(headingName === Modules.PROJECT_MANAGEMENT){
      dispatch(
        getProjectAllocationData({
          pageNo: page + 1,
          pageSize: rowsPerPage,
          sortBy: "projectName",
          sortDir: "ASC",
          searchData: "",
          status: "Active",
          employeeID: selectedEmpId
        })
      )
    }
  }, [rowsPerPage, page])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  }

  const detailViewCloseButtonHandler = () => {
    setViewDetails(false);
    setRows([]);
  }

  return (
    <>
    <Dialog
        fullWidth={true}
        maxWidth='lg'
        open={viewDetails}
        onClose={handleClose}
      >
          <DialogTitle sx={{ fontSize: '2.25rem', color: '#1773bc' }}>{headingName} Detailed View</DialogTitle>
          <DialogContent>
            <div className="empName-period">
              <div className="namePeriodDiv">
                <div className="namePeriodLabel">Employee Name:</div>
                <div className="namePeriodField">{getEmployeeName(selectedEmpId)}</div>
              </div>
              { headingName===Modules.TIMESHEET && 
                <div className="namePeriodDiv">
                  <div className="namePeriodLabel">Period Week:</div>
                  <div className="namePeriodField">{selectedPeriodWeek.startDate.format(DATE_FORMAT) + " - " + selectedPeriodWeek.endDate.format(DATE_FORMAT)}</div>
                </div>
              }
            </div>
             {vTrackLoader && <CircularLoader/>}
            {(rows.length !== 0) && !vTrackLoader && <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                                : col.id==="employeeName" ? getEmployeeName(row["employeeId"]) 
                                : col.id.toLowerCase().includes("allocation") && row[col.id] ? (
                                  <div className="allocation">
                                    <Box sx={{ position: 'relative' }}>
                                      <CircularProgress
                                        variant="determinate"
                                        sx={{
                                          color: (theme) =>
                                            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                                        }}
                                        size={20}
                                        thickness={4}
                                        value={100}
                                      />
                                      <CircularProgress
                                        variant="determinate"
                                        value={row[col.id]}
                                        thickness={4}
                                        style = {getCircularProgressColor(row[col.id])}
                                        size = {20}
                                      />
                                    </Box>
                                  <div>{row[col.id]}%</div>
                                </div>
                                )
                                : col.id==="startDate" || col.id==="endDate" ? row[col.id].split('T')[0]
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
              {headingName === Modules.PROJECT_MANAGEMENT &&
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />}
            </Paper>}
            { headingName===Modules.TIMESHEET && detailedTimeSheetData && detailedTimeSheetData.length && !vTrackLoader ?
              <div className="totalWorkingHrs">
                {`Total Hours: ${getTotalHrs(detailedTimeSheetData)}`}
              </div> : null
            }
          </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => detailViewCloseButtonHandler()} >Close</Button>
        </DialogActions>
      </Dialog>
      </>
  )
}