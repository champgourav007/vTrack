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
  getLabel,
  getTypeofColumn,
  UniqueIds,
} from "../../common/utils/datatable";
import { Modules } from "../../common/constants/sidebar";
import {
  deleteProjectAdminData,
  deleteProjectAllocationData,
  getProjectAdminData,
  getProjectAllocationData,
  saveProjectAdminData,
  saveProjectAllocationData,
  updateProjectAdminData,
  updateProjectAllocationData,
} from "../../redux/actions";
import CircularProgress from "@mui/material/CircularProgress";

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
}) => {
  const { clientsData, projectManagers, listItems, allUsers, allProjectsData } =
    useSelector(({ MODULES }) => MODULES);
  const { allUserDetails } = useSelector(({ USER }) => USER);
  const { vTrackLoader } = useSelector(({ APP_STATE }) => APP_STATE);
  const dispatch = useDispatch();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [newRowAdded, setNewRowAdded] = useState(initialData[headingName]);
  const [sortBy, setSortBy] = useState("clientName");
  const [rowToBeUpdated, setRowToBeUpdated] = useState({});

  React.useEffect(() => {
    setRowToBeUpdated({});
    setNewRowAdded(initialData[headingName]);
    setPage(0);
    setRowsPerPage(10);
  }, [headingName]);

  const saveDataHandler = () => {
    if (!isEditButtonClicked) {
      if (headingName === Modules.CLIENT_ADMIN) {
        dispatch(saveClientAdminData(newRowAdded));
      } else if (headingName === Modules.PROJECT_ADMIN) {
        dispatch(saveProjectAdminData(newRowAdded));
      } else if (headingName === Modules.PROJECT_ALLOCATION) {
        dispatch(saveProjectAllocationData(newRowAdded));
      }
    } else {
      if (headingName === Modules.CLIENT_ADMIN) {
        dispatch(updateClientAdminData(newRowAdded));
      } else if (headingName === Modules.PROJECT_ADMIN) {
        dispatch(updateProjectAdminData(newRowAdded));
      } else if (headingName === Modules.PROJECT_ALLOCATION) {
        dispatch(updateProjectAllocationData(newRowAdded));
      }
      setIsEditButtonClicked(false);
    }
    setIsAddButtonClicked(false);
    setRowToBeUpdated({});
    setNewRowAdded(initialData[headingName]);
  };

  const closeButtonHandler = () => {
    if (!isEditButtonClicked) {
      setIsAddButtonClicked(false);
    } else {
      setIsEditButtonClicked(false);
    }
    setRowToBeUpdated({});
    setNewRowAdded(initialData[headingName]);
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
        })
      );
    }
  };

  const createInputField = (col) => {
    if (getTypeofColumn(col, headingName) === "textfield") {
      return (
        <TableCell key={col}>
          <TextField
            id="outlined-required"
            label={getLabel(col, headingName)}
            placeholder=""
            value={newRowAdded[col]}
            onChange={(e) => inputFieldHandler(e, col)}
          />
        </TableCell>
      );
    } else if (getTypeofColumn(col, headingName) === "select") {
      return (
        <TableCell key={col}>
          <TextField
            id="outlined-select-currency"
            select
            label={getLabel(col, headingName)}
            value={newRowAdded[col]}
            // onChange={(e) => inputFieldHandler(e, col)}
            style={{ width: '80%' }}
          >
            {col === "clientName"
              ? clientsData.map((option) => (
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
                ))
              : col === "projectManagerName"
              ? projectManagers.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.name}
                    onClick={() =>
                      setNewRowAdded({
                        ...newRowAdded,
                        [col]: option.name,
                        projectManagerId: option.id,
                      })
                    }
                  >
                    {option.name}
                  </MenuItem>
                ))
              : col === "currency"
              ? listItems &&
                listItems.currency.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.shortCodeValue}
                    onClick={() =>
                      setNewRowAdded({
                        ...newRowAdded,
                        [col]: option.shortCodeValue,
                        currencyId: option.id,
                      })
                    }
                  >
                    {option.shortCodeValue}
                  </MenuItem>
                ))
              : col === "paymentTerms"
              ? listItems &&
                listItems.paymentTerms.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.shortCodeValue}
                    onClick={() =>
                      setNewRowAdded({
                        ...newRowAdded,
                        [col]: option.shortCodeValue,
                        paymentTermsId: option.id,
                      })
                    }
                  >
                    {option.shortCodeValue}
                  </MenuItem>
                ))
              : col === "location"
              ? listItems &&
                listItems.location.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.shortCodeValue}
                    onClick={() =>
                      setNewRowAdded({
                        ...newRowAdded,
                        [col]: option.shortCodeValue,
                        locationId: option.id,
                      })
                    }
                  >
                    {option.shortCodeValue}
                  </MenuItem>
                ))
              : col === "type"
              ? listItems &&
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
              : col === "businessOwner"
              ? allUsers &&
                allUsers.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.name}
                    onClick={() =>
                      setNewRowAdded({
                        ...newRowAdded,
                        [col]: option.name,
                        businessOwnerId: option.id,
                      })
                    }
                  >
                    {option.name}
                  </MenuItem>
                ))
              : col === "deliveryOfficer"
              ? allUsers &&
                allUsers.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.name}
                    onClick={() =>
                      setNewRowAdded({
                        ...newRowAdded,
                        [col]: option.name,
                        deliveryOfficerId: option.id,
                      })
                    }
                  >
                    {option.name}
                  </MenuItem>
                ))
              : col === "employeeName"
              ? allUserDetails &&
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
              : col === "projectName"
              ? allProjectsData &&
                allProjectsData.map((option) => (
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
              : dropDownMockData[col].map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    onClick={() =>
                      setNewRowAdded({ ...newRowAdded, [col]: option })
                    }
                  >
                    {option}
                  </MenuItem>
                ))}
          </TextField>
        </TableCell>
      );
    } else if (getTypeofColumn(col, headingName) === "date") {
      return (
        <TableCell key={col}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label=""
              value={newRowAdded[col]}
              onChange={(newValue) => {
                setNewRowAdded({ ...newRowAdded, [col]: newValue });
              }}
              placeholder="Date"
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </TableCell>
      );
    } else if (col === "actions") {
      return (
        <TableCell key={col}>
          <div className="attachmentContainer">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input hidden accept="*" type="file" />
              <AttachFileIcon />
            </IconButton>
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
      console.log(id);
      debugger;
      dispatch(deleteProjectAdminData(id));
    } else if (headingName === Modules.PROJECT_ALLOCATION) {
      dispatch(deleteProjectAllocationData(id));
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

  return (
    <>
      {vTrackLoader && <Loader />}
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
                        style={{ minWidth: column.minWidth }}
                        sx={{
                          backgroundColor: "#1773bc0d",
                          color: "#1773bc",
                          fontWeight: 700,
                        }}
                      >
                        {column.label}
                        <img
                          src={TableArrows}
                          alt=""
                          className="tableArrows"
                          onClick={() => handleSortBy(column.id)}
                        />
                      </TableCell>
                    )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {isAddButtonClicked && (
                <TableRow id="new_row">
                  {columns.map((col) => {
                    return createInputField(col.id);
                  })}
                </TableRow>
              )}
              {rows.map((row, rowIdx) => {
                if (
                  rowToBeUpdated[UniqueIds[headingName.replace(" ", "")]] ===
                  row[UniqueIds[headingName.replace(" ", "")]]
                ) {
                  return (
                    <TableRow id="new_row">
                      {columns.map((col) => {
                        return createInputField(col.id);
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
                            <TableCell key={col.id} class="attachmentContainer">
                              {headingName !== Modules.PROJECT_ALLOCATION && (
                                <IconButton
                                  color="primary"
                                  aria-label="upload picture"
                                  component="label"
                                >
                                  <input hidden accept="*" type="file" />
                                  <Tooltip title="Attachment">
                                    <AttachFileIcon />
                                  </Tooltip>
                                </IconButton>
                              )}
                              <Tooltip title="Edit">
                                <button
                                  onClick={() =>
                                    editButtonClicked(
                                      row[
                                        UniqueIds[headingName.replace(" ", "")]
                                      ]
                                    )
                                  }
                                  className="buttonBackgroundBorder cursorPointer"
                                  disabled={isAddButtonClicked}
                                >
                                  <img
                                    src={editIcon}
                                    className="editDeleteIcon"
                                    alt=""
                                  />
                                </button>
                              </Tooltip>
                              {headingName !== Modules.PROJECT_ALLOCATION && (
                                <Tooltip title="Delete">
                                  <img
                                    src={deleteIcon}
                                    className="editDeleteIcon cursorPointer"
                                    onClick={() =>
                                      deleteButtonClicked(
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
                            </TableCell>
                          );
                        } else if (col.id.includes("Date")) {
                          return (
                            <TableCell key={col.id}>
                              {row[col.id].split("T")[0]}
                            </TableCell>
                          );
                        }
                        return col.id !==
                          UniqueIds[headingName.replace(" ", "")] ? (
                          <TableCell key={col.id}>
                            {col.id === "employeeName" ? (
                              getEmployeeName(row["employeeId"])
                            ) : col.id === "allocation" ? (
                              <div className="allocation">
                                <div>
                                <CircularProgress className="allocationProgress" variant="determinate" value={row[col.id]} />
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
