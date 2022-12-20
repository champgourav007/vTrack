import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { columns, paymentTerms } from "../../mock-data/TableData";
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
import {
  locations,
  deliveryOfficers,
  businessOwners,
  initialData,
  currencies,
} from "../../mock-data/TableData";
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
import { useEffect, useState } from "react";
import Loader from "../Loader";

export const DataTable = ({
  isAddButtonClicked,
  setIsAddButtonClicked,
  isEditButtonClicked,
  setIsEditButtonClicked,
  searchData,
}) => {
  const { clientAdminData } = useSelector(({ CLIENT_ADMIN }) => CLIENT_ADMIN);
  const { vTrackLoader } = useSelector(({ APP_STATE }) => APP_STATE);
  const dispatch = useDispatch();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [newRowAdded, setNewRowAdded] = useState(initialData);
  const [columnsData, setColumnsData] = React.useState([]);
  const [rows, setRows] = useState([]);
  const [sortBy, setSortBy] = useState("clientName");
  const [rowToBeUpdated, setRowToBeUpdated] = useState({});
  const [fillHeading, setFillHeading] = useState(true);

  const getLabel = (col) => {
    for (let column of columns) {
      if (column.id === col) {
        return column.label;
      }
    }
  };
  const getMinWidth = (col) => {
    for (let column of columns) {
      if (column.id === col) {
        return column.minWidth;
      }
    }
  };

  const saveDataHandler = () => {
    if (!isEditButtonClicked) {
      dispatch(saveClientAdminData(newRowAdded));
    } else {
      dispatch(updateClientAdminData(newRowAdded));
      setIsEditButtonClicked(false);
    }
    setIsAddButtonClicked(false);
    setRowToBeUpdated({});
    setNewRowAdded(initialData);
  };

  const closeButtonHandler = () => {
    if (!isEditButtonClicked) {
      setIsAddButtonClicked(false);
    } else {
      setIsEditButtonClicked(false);
    }
    setRowToBeUpdated({});
    setNewRowAdded(initialData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(
      getClientAdminData({
        pageNo: newPage + 1,
        pageSize: rowsPerPage,
        sortBy: sortBy,
        sortDir: "ASC",
        searchData: searchData,
      })
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    dispatch(
      getClientAdminData({
        pageNo: page + 1,
        pageSize: event.target.value,
        sortBy: sortBy,
        sortDir: "ASC",
        searchData: searchData,
      })
    );
  };

  const handleCurrencyChange = (event) => {
    setNewRowAdded({ ...newRowAdded, currency: event.target.value });
  };

  const handleLocationChange = (event) => {
    setNewRowAdded({ ...newRowAdded, location: event.target.value });
  };

  const handleDeliveryOfficerChange = (event) => {
    setNewRowAdded({ ...newRowAdded, deliveryOfficer: event.target.value });
  };

  const handleBusinessOwnerChange = (event) => {
    setNewRowAdded({ ...newRowAdded, businessOwner: event.target.value });
  };

  const handlepaymentTermsChange = (event) => {
    setNewRowAdded({ ...newRowAdded, paymentTerms: event.target.value });
  };

  const clientNameHandler = (event) => {
    setNewRowAdded({ ...newRowAdded, clientName: event.target.value });
  };

  const handleSortBy = (colName) => {
    setSortBy(colName);
    let sortDirection;
    let tempColumnsData = JSON.parse(JSON.stringify([...columnsData]));
    let idx = tempColumnsData.findIndex((col) => col.id === colName);
    if (tempColumnsData[idx].sortDir === "ASC") {
      tempColumnsData[idx].sortDir = "DESC";
      sortDirection = "DESC";
    } else {
      tempColumnsData[idx].sortDir = "ASC";
      sortDirection = "ASC";
    }
    setColumnsData([...tempColumnsData]);
    dispatch(
      getClientAdminData({
        pageNo: page + 1,
        pageSize: rowsPerPage,
        sortBy: colName,
        sortDir: sortDirection,
        searchData: searchData,
      })
    );
  };

  const createInputField = (col) => {
    switch (col) {
      case "clientName":
        return (
          <TableCell key={col}>
            <TextField
              id="outlined-required"
              label="Name"
              placeholder=""
              value={newRowAdded.clientName}
              onChange={(e) => clientNameHandler(e)}
            />
          </TableCell>
        );

      case "location":
        return (
          <TableCell key={col}>
            <TextField
              id="outlined-select-currency"
              select
              label="Location"
              value={newRowAdded.location}
              onChange={handleLocationChange}
              style={{ width: 100 }}
            >
              {locations.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </TableCell>
        );

      case "msaStartDate":
        return (
          <TableCell key={col}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label=""
                value={newRowAdded.msaStartDate}
                onChange={(newValue) => {
                  setNewRowAdded({ ...newRowAdded, msaStartDate: newValue });
                }}
                placeholder="Date"
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </TableCell>
        );

      case "currency":
        return (
          <TableCell key={col}>
            <TextField
              id="outlined-select-currency"
              select
              label="Currency"
              value={newRowAdded.currency}
              onChange={handleCurrencyChange}
            >
              {currencies.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </TableCell>
        );

      case "msaEndDate":
        return (
          <TableCell key={col}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label=""
                value={newRowAdded.msaEndDate}
                onChange={(newValue) => {
                  setNewRowAdded({ ...newRowAdded, msaEndDate: newValue });
                }}
                placeholder="Date"
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </TableCell>
        );

      case "businessOwner":
        return (
          <TableCell key={col}>
            <TextField
              id="outlined-select-currency"
              select
              label="Veersa Business Owner"
              value={newRowAdded.businessOwner}
              onChange={handleBusinessOwnerChange}
              style={{ width: 100 }}
            >
              {businessOwners.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </TableCell>
        );

      case "paymentTerms":
        return (
          <TableCell key={col}>
            <TextField
              id="outlined-select-currency"
              select
              label="Payment Terms"
              value={newRowAdded.paymentTerms}
              onChange={handlepaymentTermsChange}
              style={{ width: 100 }}
            >
              {paymentTerms.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </TableCell>
        );

      case "deliveryOfficer":
        return (
          <TableCell key={col}>
            <TextField
              id="outlined-select-currency"
              select
              label="Veersa Delivery Officer"
              value={newRowAdded.deliveryOfficer}
              onChange={handleDeliveryOfficerChange}
              style={{ width: 100 }}
            >
              {deliveryOfficers.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </TableCell>
        );

      case "actions":
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
                />
              ) : (
                <button disable className="buttonBackgroundBorder">
                  <img src={AddDisableIcon} className="editDeleteIcon" />
                </button>
              )}
              <img
                src={crossIcon}
                className="cursorPointer editDeleteIcon"
                onClick={closeButtonHandler}
              />
            </div>
          </TableCell>
        );

      default:
        break;
    }
    if (col === "clientName") {
      return (
        <TableCell key={col}>
          <TextField
            required
            id="outlined-required"
            label="Required"
            defaultValue="Hello World"
          />
        </TableCell>
      );
    }
  };

  const editButtonClicked = (id) => {
    let idx = rows.findIndex((row) => row.clientId === id);
    setRowToBeUpdated(rows[idx]);
    setNewRowAdded(rows[idx]);
    setIsEditButtonClicked(true);
  };

  const deleteButtonClicked = (id) => {
    dispatch(deleteClientAdminData(id));
  };

  useEffect(() => {
    if (
      clientAdminData &&
      clientAdminData.clients &&
      clientAdminData.clients.length
    ) {
      const temp = [];
      Object.keys(clientAdminData.clients[0]).forEach((col) => {
        temp.push({
          id: col,
          label: getLabel(col),
          minWidth: getMinWidth(col),
          sortDir: "DESC",
          align: "left",
        });
      });
      setColumnsData([
        ...temp,
        {
          id: "actions",
          label: "Actions",
          minWidth: 100,
          sortDir: "",
          align: "left",
        },
      ]);
      setFillHeading(false);
      setRows(clientAdminData.clients);
    } else if (clientAdminData && clientAdminData.clients.length === 0) {
      setColumnsData([]);
      setRows([]);
    }
  }, [clientAdminData]);

  React.useEffect(() => {
    dispatch(
      getClientAdminData({
        pageNo: page + 1,
        pageSize: rowsPerPage,
        sortBy: sortBy,
        sortDir: "ASC",
        searchData: searchData,
      })
    );
  }, []);

  return (
    <>
      {vTrackLoader && <Loader />}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "48rem" }}>
          <Table aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                {columnsData.map((column) =>
                  column.id !== "clientId" ? (
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
                        onClick={() => handleSortBy(column.id)}
                      />
                    </TableCell>
                  ) : null
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {isAddButtonClicked && (
                <TableRow id="new_row">
                  {columnsData.map((col) => {
                    return createInputField(col.id);
                  })}
                </TableRow>
              )}
              {rows.map((row, rowIdx) => {
                if (rowToBeUpdated.clientId === row.clientId) {
                  return (
                    <TableRow id="new_row">
                      {columnsData.map((col) => {
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
                      key={row.clientId}
                    >
                      {columnsData.map((col) => {
                        if (col.id === "actions") {
                          return (
                            <TableCell key={col.id} class="attachmentContainer">
                              <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="label"
                              >
                                <input hidden accept="*" type="file" />
                                <Tooltip title="Attackment">
                                  <AttachFileIcon />
                                </Tooltip>
                              </IconButton>
                              <Tooltip title="Edit">
                                <button
                                  onClick={() =>
                                    editButtonClicked(row.clientId)
                                  }
                                  className="buttonBackgroundBorder cursorPointer"
                                  disabled={isAddButtonClicked}
                                >
                                  <img
                                    src={editIcon}
                                    className="editDeleteIcon"
                                  />
                                </button>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <img
                                  src={deleteIcon}
                                  className="editDeleteIcon cursorPointer"
                                  onClick={() =>
                                    deleteButtonClicked(row.clientId)
                                  }
                                  alt=""
                                />
                              </Tooltip>
                            </TableCell>
                          );
                        } else if (
                          col.id === "msaStartDate" ||
                          col.id === "msaEndDate"
                        ) {
                          return (
                            <TableCell key={col.id}>
                              {row[col.id].split("T")[0]}
                            </TableCell>
                          );
                        }
                        return col.id !== "clientId" ? (
                          <TableCell key={col.id}>{row[col.id]}</TableCell>
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
          count={rows.length > 0 ? clientAdminData.totalCount : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};
