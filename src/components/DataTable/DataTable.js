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
import { TableArrows } from "../../common/icons";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { currencies } from "../../mock-data/TableData";
import MenuItem from "@mui/material/MenuItem";
import {
  locations,
  deliveryOfficers,
  businessOwners,
} from "../../mock-data/TableData";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientAdminData,
  saveClientAdminData,
  updateClientAdminData,
} from "../../redux/actions/client-admin";
import { useEffect } from "react";
import { useState } from "react";

export const DataTable = ({
  isAddButtonClicked,
  setIsAddButtonClicked,
  setIsEdit,
  isEditButtonClicked,
  setIsEditButtonClicked,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const initialData = {
    clientName: "",
    location: "US",
    currency: "INR",
    msaStartDate: "2022-12-12T11:30:39.91",
    msaEndDate: "2022-12-12T11:30:39.91",
    businessOwner: "Sudeb Mandal",
    paymentTerms: "consectetur",
    deliveryOfficer: "Rahul Gupta",
    msaDoc: "",
  };
  const [newRowAdded, setNewRowAdded] = useState(initialData);
  const [columnsData, setColumnsData] = React.useState([]);
  const { clientAdminData } = useSelector(({ CLIENT_ADMIN }) => CLIENT_ADMIN);
  const [rows, setRows] = useState([]);
  const [sortBy, setSortBy] = useState("clientName");
  const [sortDir, setSortDir] = useState("ASC");
  const [rowToBeUpdated, setRowToBeUpdated] = useState({});

  useEffect(() => {
    if (selectedRows.length == 1) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [selectedRows]);

  useEffect(() => {
    if (isEditButtonClicked) {
      setRowToBeUpdated(selectedRows[0]);
      setNewRowAdded(selectedRows[0]);
    }
  }, [isEditButtonClicked]);

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
  useEffect(() => {
    if (clientAdminData && clientAdminData.length) {
      const temp = [];
      Object.keys(clientAdminData[0]).forEach((col) => {
        temp.push({
          id: col,
          label: getLabel(col),
          minWidth: getMinWidth(col),
        });
      });
      console.log(clientAdminData);
      setColumnsData(temp);
      setRows(clientAdminData);
    } else if (clientAdminData && clientAdminData.length === 0) {
      setColumnsData([]);
      setRows([]);
    }
  }, [clientAdminData]);

  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    console.log("pagination clicked ", newPage + 1, " ", rowsPerPage);
    setPage(newPage);
    dispatch(
      getClientAdminData({
        pageNo: newPage + 1,
        pageSize: rowsPerPage,
        sortBy: sortBy,
        sortDir: sortDir,
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
        sortDir: sortDir,
      })
    );
    // setPage(0);
  };

  const handleClick = (row) => {
    let idx = -1;
    if (selectedRows && selectedRows.length) {
      idx = selectedRows.findIndex(
        (selRow) => selRow.clientId === row.clientId
      );
    }
    if (idx === -1) {
      setSelectedRows([...selectedRows, row]);
    } else {
      let selRows = [...selectedRows];
      selRows.splice(idx, 1);
      setSelectedRows(selRows);
    }
  };

  const selectOrDeSelectAll = () => {
    if (selectedRows && selectedRows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...rows]);
    }
  };

  const checkSelectedOrNot = (row) => {
    let idx = -1;
    if (selectedRows && selectedRows.length) {
      idx = selectedRows.findIndex(
        (selRow) => row.clientId === selRow.clientId
      );
    }
    if (idx === -1) {
      return false;
    } else {
      return true;
    }
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
    dispatch(
      getClientAdminData({
        pageNo: page + 1,
        pageSize: rowsPerPage,
        sortBy: colName,
        sortDir: sortDir,
      })
    );
  }
  
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
        break;

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
        break;

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
        break;

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
        break;

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
        break;

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
        break;

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
        break;

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
        break;

      case "msaDoc":
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
              <AddIcon onClick={saveDataHandler} />
            </div>
          </TableCell>
        );
        break;

      default:
        break;
    }
    if (col == "clientName") {
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
  React.useEffect(() => {
    dispatch(
      getClientAdminData({
        pageNo: page + 1,
        pageSize: rowsPerPage,
        sortBy: sortBy,
        sortDir: sortDir,
      })
    );
  }, []);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "48rem" }}>
        <Table aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "#1773bc0d",
                  color: "#1773bc",
                  fontWeight: 700,
                }}
              >
                <Checkbox
                  checked={selectedRows.length === rows.length}
                  onClick={() => selectOrDeSelectAll()}
                />
              </TableCell>
              {columnsData.map((column) =>
                column.id !== "clientId" && column.id !== "totalCount" ? (
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
                <TableCell>
                  <Checkbox checked="true" />
                </TableCell>
                {columnsData.map((col) => {
                  return createInputField(col.id);
                })}
              </TableRow>
            )}
            {rows.map((row, rowIdx) => {
              if (rowToBeUpdated.clientId === row.clientId) {
                return (
                  <TableRow id="new_row">
                    <TableCell>
                      <Checkbox checked="true" />
                    </TableCell>
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
                    <TableCell>
                      <Checkbox
                        checked={checkSelectedOrNot(row)}
                        onClick={() => handleClick(row)}
                      />
                    </TableCell>
                    {columnsData.map((col) => {
                      if (col.id === "msaDoc") {
                        return (
                          <TableCell key={col.id}>
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="label"
                            >
                              <input hidden accept="*" type="file" />
                              <AttachFileIcon />
                            </IconButton>
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
                      return col.id !== "clientId" &&
                        col.id !== "totalCount" ? (
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
        // count={rows.length}
        count={rows.length > 0 ?  rows[0].totalCount : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
