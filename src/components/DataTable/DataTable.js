import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Checkbox, FormControl, InputLabel, ListItemText, ListSubheader, OutlinedInput, Select, styled } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modules } from "../../common/constants/sidebar";
import {
  AddDisableIcon,
  AddEnableIcon, approveIcon, crossIcon, deleteIcon, downloadIcon, editIcon, rejectIcon, TableArrows
} from "../../common/icons";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  convertDateToDDMYYYY,
  fileHandler,
  getApprovers,
  getApproversIds,
  getApproversWithIds,
  getFullName,
  getLabel,
  getTypeofColumn,
  initialSort,
  UniqueIds
} from "../../common/utils/datatable";
import { dropDownMockData, initialData } from "../../mock-data/TableData";
import {
  deleteProjectAdminData,
  getProjectAdminData,
  getProjectAllocationData,
  saveProjectAdminData,
  updateProjectAdminData
} from "../../redux/actions";
import {
  deleteClientAdminData,
  getClientAdminData,
  saveClientAdminData,
  updateClientAdminData
} from "../../redux/actions/client-admin";
import { getProjectManagementData, saveProjectManagementData, updateProjectManagementData } from "../../redux/actions/project-management";
import { deleteTimeSheetData, saveTimeSheetData, updateTimeSheetData, updateTimeSheetStatus } from "../../redux/actions/timesheet";
import DialogBox from "../DialogBox/dialogBox";
import Loader from "../Loader";
import "./DataTable.css";
import { TimeSheetDetailView } from "../TimeSheetDetailView/timeSheetDetailView";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: theme.typography.pxToRem(18),
  },
}));

export const DataTable = ({
  headingName,
  tabName,
  rows,
  columns,
  setColumns,
  totalRecord,
  isAddButtonClicked,
  setIsAddButtonClicked,
  isEditButtonClicked,
  setIsEditButtonClicked,
  searchData,
  resetSearchData,
  projectStatus,
  selectedPeriodWeek,
  projectId
}) => {
  const { clientsData, allTasks, listItems, assignedProjects } =
    useSelector(({ MODULES }) => MODULES);

  const { allUserDetails } = useSelector(({ USER }) => USER);
  const { vTrackLoader } = useSelector(({ APP_STATE }) => APP_STATE);
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [newRowAdded, setNewRowAdded] = useState(initialData(headingName, selectedPeriodWeek));
  const [sortBy, setSortBy] = useState(initialSort[headingName]);
  const [rowToBeUpdated, setRowToBeUpdated] = useState({});
  const [fileState, setFileState] = useState("");
  const [showDialogBox, setShowDialogBox] = useState(false);
  const [deleteRow, setDeleteRow] = useState();
  const [dialogDeleteButtonClicked, setDialogDeleteButtonClicked] =
    useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState('');
  const [teamMembers, setTeamMembers] = useState(allUserDetails)
  const setDialogBoxText = () => {
    if (headingName === Modules.PROJECT_ADMIN) {
      return 'Delete action on Project  will impact all active allocations for this project.  Are you sure you want to delete?';
    }
    else if (headingName === Modules.CLIENT_ADMIN) {
      return 'Delete action on Client data will delete all active projects for this client. Are you sure you want to delete?';
    }
    return 'Are you sure you want to Delete?';
  }

  const filterNamesHandler = (e) => {
    console.log(e);
    setTeamMembers({ ...allUserDetails, data: allUserDetails.data.filter(i => i.firstName.toLowerCase().includes(e.toLowerCase())) });
  }

  React.useEffect(() => {
    console.log(teamMembers);
  }, [teamMembers])

  const saveDataHandler = () => {
    if (!isEditButtonClicked) {
      if (headingName === Modules.CLIENT_ADMIN) {
        dispatch(saveClientAdminData(newRowAdded));
      } else if (headingName === Modules.PROJECT_ADMIN) {
        let approverIds = getApproversIds(newRowAdded.approvers);
        dispatch(saveProjectAdminData({ ...newRowAdded, projectApprovers: approverIds }));
      } else if (headingName === Modules.PROJECT_MANAGEMENT) {
        dispatch(saveProjectManagementData({ ...newRowAdded, projectId: projectId }));
      }
    }
    else {
      if (headingName === Modules.CLIENT_ADMIN) {
        if (fileState && newRowAdded.clientId && newRowAdded.clientName) {
          fileHandler(
            fileState,
            newRowAdded.clientId,
            newRowAdded.clientName,
            headingName
          );
        }
        dispatch(updateClientAdminData(newRowAdded));
      } else if (headingName === Modules.PROJECT_ADMIN) {
        if (fileState && newRowAdded.projectId && newRowAdded.projectName) {
          fileHandler(
            fileState,
            newRowAdded.projectId,
            newRowAdded.projectName,
            headingName
          );
        }
        let approverIds = getApproversIds(newRowAdded.approvers);
        dispatch(updateProjectAdminData({ ...newRowAdded, projectApprovers: approverIds }));
      } else if (headingName === Modules.PROJECT_MANAGEMENT) {
        dispatch(updateProjectManagementData({ ...newRowAdded, projectId: projectId }));
      }
      setIsEditButtonClicked(false);
    }
    if (headingName === Modules.TIMESHEET) {
      const dateHours = [];
      const restProps = {};
      let totalHrs = 0;
      Object.keys(newRowAdded).forEach(key => {
        if (moment(key).isValid()) {
          dateHours.push({
            date: key,
            hours: newRowAdded[key]
          });
          if (newRowAdded[key] !== "") totalHrs += parseFloat(newRowAdded[key]);
        }
        else {
          restProps[key] = newRowAdded[key];
        }
      });
      restProps['dateHours'] = [...dateHours];
      restProps['totalHrs'] = totalHrs.toString();
      isEditButtonClicked ? dispatch(updateTimeSheetData(restProps)) : dispatch(saveTimeSheetData(restProps));
    }
    resetSearchData()
    setIsAddButtonClicked(false);
    setRowToBeUpdated({});
    setNewRowAdded(initialData(headingName, selectedPeriodWeek));
  };

  const closeButtonHandler = () => {
    if (!isEditButtonClicked) {
      setIsAddButtonClicked(false);
    } else {
      setIsEditButtonClicked(false);
    }
    setRowToBeUpdated({});
    setNewRowAdded(initialData(headingName, selectedPeriodWeek));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (headingName === Modules.CLIENT_ADMIN) {
      dispatch(
        getClientAdminData({
          pageNo: newPage + 1,
          pageSize: rowsPerPage,
          sortBy: sortBy,
          sortDir: "ASC",
          searchData: searchData,
        })
      );
    } else if (headingName === Modules.PROJECT_ADMIN) {
      dispatch(
        getProjectAdminData({
          pageNo: newPage + 1,
          pageSize: rowsPerPage,
          sortBy: sortBy,
          sortDir: "ASC",
          searchData: searchData,
        })
      );
    } else if (headingName === Modules.PROJECT_ALLOCATION && assignedProjects === null) {
      dispatch(
        getProjectAllocationData({
          pageNo: newPage + 1,
          pageSize: rowsPerPage,
          sortBy: sortBy,
          sortDir: "ASC",
          searchData: searchData,
          status: projectStatus
        })
      );
    } else if (headingName === Modules.PROJECT_MANAGEMENT) {
      dispatch(
        getProjectManagementData({
          projectId: projectId,
          pageNo: newPage + 1,
          pageSize: rowsPerPage,
          sortBy: sortBy,
          sortDir: "ASC",
          searchData: searchData,
        })
      );
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
    if (headingName === Modules.CLIENT_ADMIN) {
      dispatch(
        getClientAdminData({
          pageNo: 1,
          pageSize: event.target.value,
          sortBy: sortBy,
          sortDir: "ASC",
          searchData: searchData,
        })
      );
    } else if (headingName === Modules.PROJECT_ADMIN) {
      dispatch(
        getProjectAdminData({
          pageNo: 1,
          pageSize: event.target.value,
          sortBy: sortBy,
          sortDir: "ASC",
          searchData: searchData,
        })
      );
    } else if (headingName === Modules.PROJECT_ALLOCATION && assignedProjects === null) {
      dispatch(
        getProjectAllocationData({
          pageNo: 1,
          pageSize: event.target.value,
          sortBy: sortBy,
          sortDir: "ASC",
          searchData: searchData,
          status: projectStatus
        })
      );
    } else if (headingName === Modules.PROJECT_MANAGEMENT) {
      dispatch(
        getProjectManagementData({
          projectId: projectId,
          pageNo: 1,
          pageSize: event.target.value,
          sortBy: sortBy,
          sortDir: "ASC",
          searchData: searchData,
        })
      );
    }
  };

  const inputFieldHandler = (event, col) => {
    setNewRowAdded({ ...newRowAdded, [col]: event.target.value });
  };

  const handleSortBy = (colName) => {
    setSortBy(colName);
    let sortDirection;
    let tempColumnsData = JSON.parse(JSON.stringify([...columns]));
    let idx = tempColumnsData.findIndex((col) => col.id === colName);
    if (tempColumnsData[idx].sortDir === "ASC") {
      tempColumnsData[idx].sortDir = "DESC";
      sortDirection = "DESC";
    } else {
      tempColumnsData[idx].sortDir = "ASC";
      sortDirection = "ASC";
    }
    setColumns([...tempColumnsData]);
    if (headingName === Modules.CLIENT_ADMIN) {
      dispatch(
        getClientAdminData({
          pageNo: page + 1,
          pageSize: rowsPerPage,
          sortBy: colName,
          sortDir: sortDirection,
          searchData: searchData,
        })
      );
    } else if (headingName === Modules.PROJECT_ADMIN) {
      dispatch(
        getProjectAdminData({
          pageNo: page + 1,
          pageSize: rowsPerPage,
          sortBy: colName,
          sortDir: sortDirection,
          searchData: searchData,
        })
      );
    } else if (headingName === Modules.PROJECT_ALLOCATION && assignedProjects === null) {
      dispatch(
        getProjectAllocationData({
          pageNo: page + 1,
          pageSize: rowsPerPage,
          sortBy: colName,
          sortDir: sortDirection,
          searchData: searchData,
          status: projectStatus
        })
      );
    } else if (headingName === Modules.PROJECT_MANAGEMENT) {
      dispatch(
        getProjectManagementData({
          projectId: projectId,
          pageNo: page + 1,
          pageSize: rowsPerPage,
          sortBy: colName,
          sortDir: sortDirection,
          searchData: searchData,
        })
      );
    }
  };

  const handleChange = (event) => {
    let tempList = event.target.value;
    let idx = tempList.findIndex(ele => ele.approverId === tempList[tempList.length - 1].approverId);
    if (idx !== tempList.length - 1) {
      tempList.pop();
      tempList.splice(idx, 1);
    }
    setNewRowAdded({ ...newRowAdded, approvers: tempList });
  };

  const displayMenuItem = (col) => {
    if (col === "clientName") {
      return clientsData && clientsData.map((option) => (
        <MenuItem
          key={option.id}
          value={option.name}
          onClick={() =>
            setNewRowAdded({
              ...newRowAdded,
              [col]: option.name,
              clientId: option.id,
            })
          }
        >
          {option.name}
        </MenuItem>
      ));
    } else if (col === "currency" || col === "paymentTerms" || col === 'location' || col === 'status') {
      return listItems && listItems[col].map((option) => (
        <MenuItem
          key={option.id}
          value={option.shortCodeValue}
          onClick={() =>
            setNewRowAdded({
              ...newRowAdded,
              [col]: option.shortCodeValue,
              [`${col}Id`]: option.id,
            })
          }
        >
          {option.shortCodeValue}
        </MenuItem>
      ))
    } else if (col === "type") {
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
        teamMembers &&
        teamMembers.data.map((option) => (
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
        teamMembers &&
        teamMembers.data.map((option) => (
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
        teamMembers &&
        teamMembers.data.map((option) => (
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
          required={col.isRequired}
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
    } else if (col === "task") {
      return allTasks ? allTasks.map((option, index) => (
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
    if (col.id === "paymentTerms") {
      return (
        <TableCell key={col.id}>
          <TextField
            className="numberInput"
            type="number"
            id="outlined-required"
            label={getLabel(col.id, headingName)}
            placeholder=""
            value={newRowAdded[col.id]}
            required={col.isRequired}
            onChange={(e) => inputFieldHandler(e, col.id)}
            sx={{
              "& label": {
                lineHeight: '0.8rem'
              }
            }}
          />
        </TableCell>
      );
    } else if (getTypeofColumn(col.id, headingName) === "textfield") {
      return (
        <TableCell key={col.id} style={{ maxWidth: col.maxWidth ? col.maxWidth : 'auto' }}>
          <TextField
            id="outlined-required"
            inputProps={{ maxLength: 100 }}
            type={col.fieldType}
            label={getLabel(col.id, headingName)}
            placeholder=""
            value={newRowAdded[col.id]}
            required={col.isRequired}
            sx={{
              "& label": {
                lineHeight: '0.8rem'
              }
            }}
            disabled={col.id === 'costAllocation' ? true : false}
            onChange={(e) => inputFieldHandler(e, col.id)}
          />
        </TableCell>
      );
    } else if (getTypeofColumn(col.id, headingName) === "multi-select") {
      return (
        <TableCell key={col.id} style={{ maxWidth: col.maxWidth ? col.maxWidth : 'auto' }}>
          <FormControl sx={{ m: 1, width: 120, margin: '0' }}>
            <InputLabel id="demo-multiple-checkbox-label">Approvers</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={newRowAdded[col.id]}
              onChange={handleChange}
              required={col.isRequired}
              input={<OutlinedInput label="Approvers" />}
              renderValue={() => getApprovers(newRowAdded[col.id])}
              MenuProps={MenuProps}
            >
              {allUserDetails && allUserDetails.data.map(user => ({ approverId: user.id, approverName: getFullName(user.firstName, user.lastName), approverEmail: user.email })).map((approver, index) => (
                <MenuItem key={index} value={approver} className="no-left-margin">
                  <Checkbox checked={newRowAdded[col.id].findIndex(app => app.approverId === approver.approverId) > -1} />
                  <ListItemText primary={`${approver.approverName} (${approver.approverEmail})`} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </TableCell>
      );
    } else if (getTypeofColumn(col.id, headingName) === "select") {
      return (
        <TableCell key={col.id} style={{ maxWidth: col.maxWidth ? col.maxWidth : 'auto' }}>
          <TextField
            id="outlined-select-currency"
            select
            label={getLabel(col.id, headingName)}
            value={newRowAdded[col.id]}
            required={col.isRequired}
            sx={{
              "& label": {
                lineHeight: '0.8rem'
              }
            }}
            autoComplete={false}
            autoFocus={false}
            MenuProps={{ autoFocus: false }}
            style={{ width: "80%" }}
            disabled={isEditButtonClicked && col.id === "employeeName"}
          >
            <ListSubheader className="subheader">
              <TextField placeholder="Search Here..." className="subheader-field" onKeyDown={(e) => {
                e.stopPropagation();
              }} autoFocus={true} onChange={(e) => filterNamesHandler(e.target.value)} />
            </ListSubheader>
            {displayMenuItem(col.id)}
          </TextField>
        </TableCell>
      );
    } else if (getTypeofColumn(col.id, headingName) === "date") {
      return (
        <TableCell key={col.id} style={{ maxWidth: '7rem' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label=""
              value={newRowAdded[col.id]}
              onChange={(newValue) => {
                setNewRowAdded({ ...newRowAdded, [col.id]: newValue });
              }}
              placeholder="Date"
              required={col.isRequired}
              renderInput={(params) => <TextField {...params} error={false} />}
            />
          </LocalizationProvider>
        </TableCell>
      );
    } else if (col.id === "actions") {
      return (
        <TableCell key={col.id}>
          <div className="attachmentContainer">
            {(headingName === Modules.PROJECT_ADMIN || headingName === Modules.CLIENT_ADMIN) && isEditButtonClicked &&
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="*"
                  type="file"
                  onChange={(e) => setFileState(e.target.files[0])}
                  required={col.isRequired}
                />
                <AttachFileIcon />
              </IconButton>
            }
            {
              (newRowAdded.clientName === "" ||
                (headingName === Modules.TIMESHEET &&
                  (newRowAdded.projectName === "" || newRowAdded.task === "" || !isDateAdded())
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
    else if (col.isDate) {
      let date = Object.keys(newRowAdded).find(i => moment(i).isValid() && moment(i).format('DD') === moment(col.date).format('DD'));
      const selctedProjectForUser = newRowAdded.projectId !== undefined ? newRowAdded.projectId : newRowAdded.projectID;
      let startDate = null;
      let endDate = null;
      assignedProjects.forEach((data) => {
        if (data.projectId === selctedProjectForUser) {
          startDate = data.sowStartDate;
          endDate = data.sowEndDate;
        }
      });

      if (date >= startDate && date <= endDate) {
        return (
          <TableCell key={col.id} className="timeField">
            <TextField
              label={"Time"}
              type="number"
              value={newRowAdded[date] === '-' ? 0 : newRowAdded[date]}
              style={{ maxWidth: '6rem' }}
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
      } else {
        return (
          <TableCell key={col.id} className="timeField">
            <TextField
              label={"Time"}
              type="number"
              disabled
              value={0}
              style={{ maxWidth: '6rem' }}
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
    }
    else if (getTypeofColumn(col.id, headingName) === "empty") {
      return (
        <TableCell key={col.id} />
      );
    }
  };

  const editButtonClicked = (id) => {
    let idx = rows.findIndex(
      (row) => row[UniqueIds[headingName.replace(" ", "")]] === id
    );
    if (headingName === Modules.TIMESHEET) {
      let rowData = initialData(headingName, selectedPeriodWeek);
      Object.keys(rows[idx]).forEach(key => {
        if (Object.keys(rowData).includes(key)) {
          rowData[key] = rows[idx][key];
        }
        else {
          let keys = Object.keys(rowData).filter(i => moment(i).isValid());
          if (keys.map(i => moment(i).format('DD')).includes(key.slice(-2)) && rows[idx][key] !== '-') {
            rowData[keys.find(i => moment(i).format('DD') === key.slice(-2))] = rows[idx][key].toString();
          }
          else if (!keys.map(i => moment(i).format('DD')).includes(key.slice(-2))) {
            rowData[key] = rows[idx][key];
          }
        }
      })
      rowData['timesheetDetailID'] = rows[idx]['timesheetDetailID'];
      setRowToBeUpdated(rowData);
      setNewRowAdded(rowData);
    }
    else {
      setRowToBeUpdated(rows[idx]);
      if (rows[idx].employeeId) {
        setNewRowAdded({ ...rows[idx], employeeName: getEmployeeName(rows[idx].employeeId) });
      }
      else {
        setNewRowAdded(rows[idx]);
      }
    }
    setIsEditButtonClicked(true);
  };

  const deleteButtonClicked = (id) => {
    if (headingName === Modules.CLIENT_ADMIN) {
      dispatch(deleteClientAdminData(id));
    } else if (headingName === Modules.PROJECT_ADMIN) {
      dispatch(deleteProjectAdminData(id));
    } else if (headingName === Modules.TIMESHEET) {
      dispatch(deleteTimeSheetData(id));
    }
    setDialogDeleteButtonClicked(false);
  };

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

  const dialogBoxHandler = (rowData) => {
    setDeleteRow(rowData);
    setShowDialogBox(true);
  };

  const isDateAdded = () => {
    let isAdded = false;
    Object.keys(newRowAdded).forEach(key => {
      if (moment(key).isValid() && newRowAdded[key] !== "") isAdded = true;
    });
    return isAdded;
  };

  const handleViewDetails = (empId) => {
    setViewDetails(true);
    setSelectedEmpId(empId);
  };

  React.useEffect(() => {
    setRowToBeUpdated({});
    setNewRowAdded(initialData(headingName, selectedPeriodWeek));
    setSortBy(initialSort[headingName]);
    setPage(0);
    setRowsPerPage(10);
  }, [headingName]);

  React.useEffect(() => {
    if (dialogDeleteButtonClicked) {
      deleteButtonClicked(deleteRow);
      setDialogDeleteButtonClicked(false)
    }
  }, [dialogDeleteButtonClicked]);

  React.useEffect(() => {
    if (selectedPeriodWeek) {
      setNewRowAdded(initialData(headingName, selectedPeriodWeek));
    }
  }, [selectedPeriodWeek]);

  return (
    <>
      {vTrackLoader && <Loader />}
      <TimeSheetDetailView viewDetails={viewDetails} setViewDetails={setViewDetails} selectedEmpId={selectedEmpId} selectedPeriodWeek={selectedPeriodWeek} />
      {showDialogBox && (
        <DialogBox
          setShowDialogBox={setShowDialogBox}
          setDialogDeleteButtonClicked={setDialogDeleteButtonClicked}
          header={setDialogBoxText()}
        />
      )}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "48rem" }}>
          <Table aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                {columns.map(
                  (column) => {
                    if (!column.id) return null;
                    return column.id !== UniqueIds[headingName.replace(" ", "")] && (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, position: 'relative', maxWidth: column.maxWidth ? column.maxWidth : 'auto' }}
                        sx={{
                          backgroundColor: "#1773bc0d",
                          color: "#1773bc",
                          fontWeight: 700,
                        }}
                        className={column.isDate ? 'dateHeading' : ''}
                      >
                        <div className="table-header-cell">
                          <span>{column.label}</span>
                          {!column.isDate && headingName !== Modules.TIMESHEET && column.id !== 'actions' &&
                            <img
                              src={TableArrows}
                              alt=""
                              className="tableArrows"
                              onClick={() => handleSortBy(column.id)}
                            />
                          }
                          {column.day &&
                            <div className="month">{column.day}</div>
                          }
                        </div>
                      </TableCell>
                    )
                  }
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {isAddButtonClicked && (
                <TableRow id="new_row">
                  {columns.map((col) => {
                    return createInputField(col);
                  })}
                </TableRow>
              )}
              {rows.map((row, rowIdx) => {
                if (
                  rowToBeUpdated[UniqueIds[headingName.replace(" ", "")]] ===
                  row[UniqueIds[headingName.replace(" ", "")]]
                ) {
                  return (
                    <TableRow id="new_row" key={rowIdx}>
                      {columns.map((col) => {
                        return createInputField(col);
                      })}
                    </TableRow>
                  );
                }
                else {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row[headingName.replace(" ", "")]}
                    >
                      {columns.map((col) => {
                        if (!col.id) return null;
                        if (col.id === "actions") {
                          return (
                            <TableCell key={col.id}>
                              <div className="attachmentContainer">
                                {headingName === Modules.CLIENT_ADMIN || headingName === Modules.PROJECT_ADMIN ? (
                                  (headingName === Modules.CLIENT_ADMIN &&
                                    row.msaDocLink) ||
                                    (headingName === Modules.PROJECT_ADMIN &&
                                      row.sowAttachmentLink) ? (
                                    <a
                                      href={
                                        headingName === Modules.PROJECT_ADMIN
                                          ? row.sowAttachmentLink
                                          : row.msaDocLink
                                      }
                                    >
                                      <img
                                        src={downloadIcon}
                                        className="editDeleteIcon"
                                        alt=""
                                      />
                                    </a>
                                  ) : (
                                    <IconButton
                                      color="primary"
                                      aria-label="upload picture"
                                      component="label"
                                    >
                                      {headingName === Modules.CLIENT_ADMIN && (
                                        <input
                                          hidden
                                          accept="*"
                                          type="file"
                                          onChange={(e) =>
                                            fileHandler(
                                              e.target.files[0],
                                              row.clientId,
                                              row.clientName,
                                              headingName
                                            )
                                          }
                                        />
                                      )}
                                      {headingName === Modules.PROJECT_ADMIN && (
                                        <input
                                          hidden
                                          accept="*"
                                          type="file"
                                          onChange={(e) =>
                                            fileHandler(
                                              e.target.files[0],
                                              row.projectId,
                                              row.projectName,
                                              headingName
                                            )
                                          }
                                        />
                                      )}
                                      <Tooltip title="Attachment">
                                        <AttachFileIcon />
                                      </Tooltip>
                                    </IconButton>
                                  )
                                ) : null}
                                {tabName !== 'PENDING APPROVAL' &&
                                  tabName !== 'REPORTEES' &&
                                  row.status !== 'Approved' &&
                                  row.status !== 'Submitted' &&
                                  // row.status !== 'Rejected' && 
                                  <Tooltip title="Edit">
                                    <button
                                      onClick={() =>
                                        editButtonClicked(row[UniqueIds[headingName.replace(" ", "")]])
                                      }
                                      className="buttonBackgroundBorder cursorPointer"
                                      disabled={isAddButtonClicked}
                                    >
                                      <img src={editIcon} className="editDeleteIcon" alt="" />
                                    </button>
                                  </Tooltip>
                                }
                                {headingName !== Modules.PROJECT_ALLOCATION &&
                                  headingName !== Modules.PROJECT_MANAGEMENT &&
                                  row.status !== 'Approved' &&
                                  row.status !== 'Submitted' &&
                                  // row.status !== 'Rejected' && 
                                  tabName !== 'PENDING APPROVAL' && tabName !== 'REPORTEES' && (
                                    <Tooltip title="Delete">
                                      <img
                                        src={deleteIcon}
                                        className="editDeleteIcon cursorPointer"
                                        onClick={() =>
                                          dialogBoxHandler(
                                            row[
                                            UniqueIds[
                                            headingName.replace(" ", "")
                                            ]
                                            ]
                                          )
                                        }
                                        alt=""
                                      />
                                    </Tooltip>
                                  )}
                                {tabName === 'PENDING APPROVAL' && (
                                  <>
                                    <Tooltip title="Approve">
                                      <img
                                        src={approveIcon}
                                        className="approveRejectIcon"
                                        onClick={() =>
                                          dispatch(updateTimeSheetStatus({
                                            timesheetDetailID: row[UniqueIds[headingName.replace(" ", "")]],
                                            timesheetStatus: 'Approved'
                                          }))
                                        }
                                        alt=""
                                      />
                                    </Tooltip>
                                    <Tooltip title="Reject">
                                      <img
                                        src={rejectIcon}
                                        className="approveRejectIcon"
                                        onClick={() =>
                                          dispatch(updateTimeSheetStatus({
                                            timesheetDetailID: row[UniqueIds[headingName.replace(" ", "")]],
                                            timesheetStatus: 'Rejected'
                                          }))
                                        }
                                        alt=""
                                      />
                                    </Tooltip>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          );
                        }
                        else if (col.id?.includes("Date")) {
                          return (
                            <TableCell key={col.id} style={{ maxWidth: col.maxWidth ? col.maxWidth : 'auto' }}>
                              {convertDateToDDMYYYY(row[col.id])}
                            </TableCell>
                          );
                        }
                        else if (tabName === "PENDING APPROVAL" && tabName === "REPORTEES" && col.id === 'status') {
                          return null;
                        }
                        return col.id !==
                          UniqueIds[headingName.replace(" ", "")] ? (
                          <TableCell
                            key={col.id}
                            style={{
                              textAlign: col.isDate || col.id === 'totalHrs' ? "left" : "auto",
                              maxWidth: col.maxWidth ? col.maxWidth : 'auto',
                              whiteSpace: col.maxWidth ? 'nowrap' : 'normal',
                            }}
                          >
                            {col.id === "employeeName" ? (
                              getEmployeeName(row["employeeId"])
                            ) : col.id.toLowerCase().includes("allocation") && row[col.id] ? (
                              <div className="allocation">
                                <div>
                                  <CircularProgress
                                    className="allocationProgress"
                                    variant="determinate"
                                    value={row[col.id]}
                                  />
                                </div>
                                <div>{row[col.id]}%</div>
                              </div>
                            ) : col.id === 'approvers' ?
                              (
                                <HtmlTooltip title={getApproversWithIds(row[col.id])}>
                                  <div
                                    style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                                  >
                                    {getApprovers(row[col.id])}
                                  </div>
                                </HtmlTooltip>
                              ) :
                              col.id === 'viewDetails' ? (<IconButton color="primary" onClick={() => handleViewDetails(row['employeeId'])} ><VisibilityIcon /></IconButton>) : (
                                row[col.id]
                              )}
                          </TableCell>
                        ) : null;
                      })}
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {headingName !== Modules.TIMESHEET &&
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={totalRecord}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        }
      </Paper>
    </>
  );
};
