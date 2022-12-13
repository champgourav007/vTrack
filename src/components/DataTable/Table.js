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
import "./Table.css";
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
} from "../../redux/actions/client-admin";
import { useEffect } from "react";
import { useState } from "react";

export default function StickyHeadTable({ isAddButtonClicked, setIsAddButtonClicked }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const initialData = {
    clientName: "",
    location: "IN",
    currency: "INR",
    msaStartDate: "2022-12-12T11:30:39.91",
    msaEndDate: "2022-12-12T11:30:39.91",
    businessOwner: "Sudeb Mandal",
    paymentTerms: "Online",
    deliveryOfficer: "Gaurav Tyagi",
    msaDoc: "",
  };
  const [newRowAdded, setNewRowAdded] = useState(initialData);
  const [columnsData, setColumnsData] = React.useState([]);
  const { clientAdminData } = useSelector(({ CLIENT_ADMIN }) => CLIENT_ADMIN);
  const [rows, setRows] = useState([]);

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
    console.log(newRowAdded);
    dispatch(saveClientAdminData(newRowAdded));
    setIsAddButtonClicked(false);
  };
  useEffect(() => {
    if (clientAdminData) {
      const temp = [];
      Object.keys(clientAdminData[0]).forEach((col) => {
        temp.push({
          id: col,
          label: getLabel(col),
          minWidth: getMinWidth(col),
        });
      });
      setColumnsData(temp);
      setRows(clientAdminData);
    }
  }, [clientAdminData]);

  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (row) => {
    let idx = -1;
    if (selectedRows && selectedRows.length) {
      idx = selectedRows.findIndex((selRow) => selRow.clientId === row.clientId);
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
      idx = selectedRows.findIndex((selRow) => row.clientId === selRow.clientId);
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

  const createInputField = (col) => {
    switch (col) {
      case "clientName":
        return (
          <TableCell key={col}>
            <TextField
              id="outlined-required"
              label="Name"
              placeholder=""
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
    dispatch(getClientAdminData({ pageNo: 1, pageSize: 10 }));
  }, []);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
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
                    <img src={TableArrows} alt="" />
                  </TableCell>
                ) : null
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {isAddButtonClicked && (
              <TableRow id="new_row">
                <TableCell>
                  <Checkbox
                    checked="true"
                    // onClick={() => handleClick(col)}
                  />
                </TableCell>
                {columnsData.map((col) => {
                  return createInputField(col.id);
                })}
              </TableRow>
            )}
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIdx) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.rowIdx}
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
                      return col.id !== "clientId" ? (
                        <TableCell key={col.id}>{row[col.id]}</TableCell>
                      ) : null;
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
