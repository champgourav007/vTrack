import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import "./DataTable.css";
import {
  TableArrows,
  editIcon,
  deleteIcon,
  AddDisableIcon,
  AddEnableIcon,
  crossIcon,
  downloadIcon,
} from "../../common/icons";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { dropDownMockData, initialData } from "../../mock-data/TableData";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteClientAdminData,
  getClientAdminData,
  saveClientAdminData,
  updateClientAdminData,
} from "../../redux/actions/client-admin";
import { useState } from "react";
import Loader from "../Loader";
import {
  convertDateToDDMYYYY,
  fileHandler,
  getFullName,
  getLabel,
  getTypeofColumn,
  initialSort,
  UniqueIds,
} from "../../common/utils/datatable";
import { Modules } from "../../common/constants/sidebar";
import {
  deleteProjectAdminData,
  getProjectAdminData,
  getProjectAllocationData,
  saveProjectAdminData,
  updateProjectAdminData,
} from "../../redux/actions";
import CircularProgress from "@mui/material/CircularProgress";
import DialogBox from "../DialogBox/dialogBox";
import { getProjectManagementData, saveProjectManagementData, updateProjectManagementData } from "../../redux/actions/project-management";
import { getTimeSheetData, saveTimeSheetData } from "../../redux/actions/timesheet";
import moment from "moment";

export const DataTable = ({
  headingName,
  rows,
  columns,
  setColumns,
  totalRecord,
  isAddButtonClicked,
  setIsAddButtonClicked,
  isEditButtonClicked,
  setIsEditButtonClicked,
  searchData,
  projectStatus,
  selectedPeriodWeek,
  projectId
}) => {
  const { clientsData, projectManagers, allTasks, listItems, allUsers, allProjectsData } =
    useSelector(({ MODULES }) => MODULES);
  const { allUserDetails } = useSelector(({ USER }) => USER);
  const { vTrackLoader } = useSelector(({ APP_STATE }) => APP_STATE);
  const dispatch = useDispatch();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [newRowAdded, setNewRowAdded] = useState(initialData(headingName,selectedPeriodWeek));
  const [sortBy, setSortBy] = useState(initialSort[headingName]);

  const [rowToBeUpdated, setRowToBeUpdated] = useState({});
  const [fileState, setFileState] = useState("");
  const [showDialogBox, setShowDialogBox] = useState(false);
  const [deleteRow, setDeleteRow] = useState({});
  const [dialogDeleteButtonClicked, setDialogDeleteButtonClicked] =
    useState(false);

  const saveDataHandler = () => {
    if (!isEditButtonClicked) {
      if (headingName === Modules.CLIENT_ADMIN) {
        dispatch(saveClientAdminData(newRowAdded));
      } else if (headingName === Modules.PROJECT_ADMIN) {
        dispatch(saveProjectAdminData(newRowAdded));
      } else if (headingName === Modules.PROJECT_MANAGEMENT) {
        dispatch(saveProjectManagementData(newRowAdded));
      } else if (headingName === Modules.TIMESHEET){
        const dateHours = [];
        const restProps = {};
        let totalHours = 0;
        Object.keys(newRowAdded).forEach(key=>{
          if(moment(key).isValid()){
            dateHours.push({
              date: key,
              hours: newRowAdded[key]
            });
            if(newRowAdded[key] !== "") totalHours += parseInt(newRowAdded[key]);
          }
          else{
            restProps[key] = newRowAdded[key];
          }
        });
        restProps['dateHours'] = [...dateHours];
        restProps['totalHours'] = totalHours.toString();
        dispatch(saveTimeSheetData(restProps));
      }
    } else {
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
        dispatch(updateProjectAdminData(newRowAdded));
      } else if (headingName === Modules.PROJECT_MANAGEMENT) {
        dispatch(updateProjectManagementData(newRowAdded));
      }
      setIsEditButtonClicked(false);
    }
    setIsAddButtonClicked(false);
    setRowToBeUpdated({});
    setNewRowAdded(initialData(headingName,selectedPeriodWeek));
  };

  const closeButtonHandler = () => {
    if (!isEditButtonClicked) {
      setIsAddButtonClicked(false);
    } else {
      setIsEditButtonClicked(false);
    }
    setRowToBeUpdated({});
    setNewRowAdded(initialData(headingName,selectedPeriodWeek));
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
    } else if (headingName === Modules.PROJECT_ALLOCATION) {
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
    else if (headingName === Modules.TIMESHEET) {
      dispatch(
        getTimeSheetData({
          periodWeek: selectedPeriodWeek.startDate.format('DD MMM') + ' - ' + selectedPeriodWeek.endDate.format('DD MMM'),
          pageNo: newPage + 1,
          sortDir: "ASC",
        })
      );
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    if (headingName === Modules.CLIENT_ADMIN) {
      dispatch(
        getClientAdminData({
          pageNo: page + 1,
          pageSize: event.target.value,
          sortBy: sortBy,
          sortDir: "ASC",
          searchData: searchData,
        })
      );
    } else if (headingName === Modules.PROJECT_ADMIN) {
      dispatch(
        getProjectAdminData({
          pageNo: page + 1,
          pageSize: event.target.value,
          sortBy: sortBy,
          sortDir: "ASC",
          searchData: searchData,
        })
      );
    } else if (headingName === Modules.PROJECT_ALLOCATION) {
      dispatch(
        getProjectAllocationData({
          pageNo: page + 1,
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
          pageNo: page + 1,
          pageSize: event.target.value,
          sortBy: sortBy,
          sortDir: "ASC",
          searchData: searchData,
        })
      );
    } else if (headingName === Modules.TIMESHEET) {
      dispatch(
        getTimeSheetData({
          periodWeek: selectedPeriodWeek.startDate.format('DD MMM') + ' - ' + selectedPeriodWeek.endDate.format('DD MMM'),
          pageNo: page + 1,
          sortDir: "ASC",
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
    } else if (headingName === Modules.PROJECT_ALLOCATION) {
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
    } else if (headingName === Modules.TIMESHEET) {
      dispatch(
        getTimeSheetData({
          periodWeek: selectedPeriodWeek.startDate.format('DD MMM') + ' - ' + selectedPeriodWeek.endDate.format('DD MMM'),
          pageNo: page + 1,
          sortDir: "ASC",
        })
      );
    }
  };

  const displayMenuItem = (col) => {
    if (col === "clientName") {
      return clientsData.map((option) => (
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
    } else if(col === "currency" || col === "paymentTerms" || col === 'location') {
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
            value={option.longCodeValue}
            onClick={() =>
              setNewRowAdded({
                ...newRowAdded,
                [col]: option.longCodeValue,
                typeId: option.id,
              })
            }
          >
            {option.longCodeValue}
          </MenuItem>
        ))
      );
    } else if (col === "projectManagerName" || col === "businessOwner" || col === "deliveryOfficer") {
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
            value={`${option.firstName} ${option.lastName}`}
            onClick={() =>
              setNewRowAdded({
                ...newRowAdded,
                [col]: `${option.firstName} ${option.lastName}`,
                employeeId: option.id,
              })
            }
          >
            {`${option.firstName} ${option.lastName}`}
          </MenuItem>
        ))
      );
    } else if (col === "projectName") {
      return allProjectsData && allProjectsData.map((option) => (
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
              taskId: option.taskId,
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
    if(col.id === "paymentTerms"){
      return (
        <TableCell key={col.id}>
          <TextField
          className="numberInput"
            type="number"
            id="outlined-required"
            label={getLabel(col.id, headingName)}
            placeholder=""
            value={newRowAdded[col.id]}
            onChange={(e) => inputFieldHandler(e, col.id)}
          />
        </TableCell>
      );
    }
    else if (getTypeofColumn(col.id, headingName) === "textfield") {
      return (
        <TableCell key={col.id}>
          <TextField
            id="outlined-required"
            label={getLabel(col.id, headingName)}
            placeholder=""
            value={newRowAdded[col.id]}
            onChange={(e) => inputFieldHandler(e, col.id)}
          />
        </TableCell>
      );
    } else if (getTypeofColumn(col.id, headingName) === "select") {
      return (
        <TableCell key={col.id}>
          <TextField
            id="outlined-select-currency"
            select
            label={getLabel(col.id, headingName)}
            value={newRowAdded[col.id]}
            // onChange={(e) => inputFieldHandler(e, col.id)}
            style={{ width: "80%" }}
          >
            {displayMenuItem(col.id)}
          </TextField>
        </TableCell>
      );
    } else if (getTypeofColumn(col.id, headingName) === "date") {
      return (
        <TableCell key={col.id}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label=""
              value={newRowAdded[col.id]}
              onChange={(newValue) => {
                setNewRowAdded({ ...newRowAdded, [col.id]: newValue });
              }}
              placeholder="Date"
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </TableCell>
      );
    } else if (col.id === "actions") {
      return (
        <TableCell key={col.id}>
          <div className="attachmentContainer">
            {headingName !== Modules.TIMESHEET && 
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
              />
              <AttachFileIcon />
            </IconButton>
            }
            {newRowAdded.clientName !== "" ? (
              <img
                src={AddEnableIcon}
                onClick={saveDataHandler}
                className="cursorPointer editDeleteIcon"
                alt=""
              />
            ) : (
              <button disable className="buttonBackgroundBorder">
                <img src={AddDisableIcon} className="editDeleteIcon" alt="" />
              </button>
            )}
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
      console.log(col)
      return (
        <TableCell key={col.id}>
          <TextField
            label={"Time"}
            type="number"
            value={newRowAdded[col.id]}
            style={{maxWidth:'80%'}}
            onChange={(e) => inputFieldHandler(e, col.date)}
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
    setRowToBeUpdated(rows[idx]);
    setNewRowAdded(rows[idx]);
    setIsEditButtonClicked(true);
  };

  const deleteButtonClicked = (id) => {
    if (headingName === Modules.CLIENT_ADMIN) {
      dispatch(deleteClientAdminData(id));
    } else if (headingName === Modules.PROJECT_ADMIN) {
      dispatch(deleteProjectAdminData(id));
    }
  };

  const getEmployeeName = (id) => {
    console.log(id);
    let employeeName = "";
    allUserDetails &&
      allUserDetails.data.length &&
      allUserDetails.data.forEach((user) => {
        if (user.id === id) {
          employeeName = `${user.firstName} ${user.lastName}`;
        }
      });
    return employeeName;
  };

  const dialogBoxHandler = (rowData) => { 
    setDeleteRow(rowData);
    setShowDialogBox(true);
  };

  React.useEffect(() => {
    setRowToBeUpdated({});
    setNewRowAdded(initialData(headingName,selectedPeriodWeek));
    setSortBy(initialSort[headingName]);
    setPage(0);
    setRowsPerPage(10);
  }, [headingName]);

  React.useEffect(() => {
    if (dialogDeleteButtonClicked) {
      deleteButtonClicked(deleteRow);
    }
  }, [dialogDeleteButtonClicked]);

  return (
    <>
      {vTrackLoader && <Loader />}
      {showDialogBox && (
        <DialogBox
          setShowDialogBox={setShowDialogBox}
          setDialogDeleteButtonClicked={setDialogDeleteButtonClicked}
        />
      )}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "48rem" }}>
          <Table aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                {columns.map(
                  (column) =>
                    column.id !== UniqueIds[headingName.replace(" ", "")] && (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, position: 'relative' }}
                        sx={{
                          backgroundColor: "#1773bc0d",
                          color: "#1773bc",
                          fontWeight: 700,
                        }}
                      >
                        {column.label}
                        {!column.isDate && 
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
                      </TableCell>
                    )
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
                  } else {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row[headingName.replace(" ", "")]}
                      >
                        {columns.map((col) => {
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
                                {headingName !== Modules.PROJECT_ALLOCATION && headingName !== Modules.PROJECT_MANAGEMENT && (
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
                              </div>
                            </TableCell>
                          );
                        } 
                        else if (col.id.includes("Date")) {
                          return (
                            <TableCell key={col.id}>
                              {convertDateToDDMYYYY(row[col.id])}
                            </TableCell>
                          );
                        }
                        return col.id !==
                          UniqueIds[headingName.replace(" ", "")] ? (
                          <TableCell key={col.id} style={{textAlign: col.isDate || col.id === 'totalHours' ? "center" : "auto"}}>
                            {col.id === "employeeName" ? (
                              getEmployeeName(row["employeeId"])
                            ) : col.id === "allocation" && row[col.id] ? (
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
                            ) : (
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
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={totalRecord}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};
