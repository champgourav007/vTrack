import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { rows, columns, paymentTerms } from "../../mock-data/TableData";
import "./Table.css";
import { TableArrows } from "../../common/icons";
import Checkbox from "@mui/material/Checkbox";
import TextField from '@mui/material/TextField';
import { currencies } from "../../mock-data/TableData";
import MenuItem from '@mui/material/MenuItem';
import { locations, deliveryOfficers,  businessOwners} from "../../mock-data/TableData";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { getClientAdminData } from "../../redux/actions/client-admin";

export default function StickyHeadTable({isAddButtonClicked}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [isRowToBeAdded, setRowToBeAdded] = React.useState(true);
  const [currency, setCurrency] = React.useState('EUR');
  const [location, setLocation] = React.useState("US");
  const [businessOwner, setBusinessOwner] = React.useState("Sudeb Mandal");
  const [paymentTerm, setPaymentTerm] = React.useState("consectetur");
  const [deliveryOfficer, setDeliveryOfficer] = React.useState("Rahul Gupta");
  const [msaEndDate, setMsaEndDate] = React.useState();
  const [msaStartDate, setMsaStartDate] = React.useState();

  const addButtonClicked = (event) => {
    setRowToBeAdded(true);
  }
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
      idx = selectedRows.findIndex((selRow) => selRow.Id === row.Id);
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
      idx = selectedRows.findIndex((selRow) => row.Id === selRow.Id);
    }
    if (idx === -1) {
      return false;
    } else {
      return true;
    }
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  }

  const handleDeliveryOfficerChange = (event) => {
    setDeliveryOfficer(event.target.value);
  }

  const handleBusinessOwnerChange = (event) => {
    setBusinessOwner(event.target.value);
  }

  const handlepaymentTermsChange = (event) => {
    setPaymentTerm(event.target.value);
  }

  const createInputField = (col) => {
    
    switch (col) {
      case "ClientName":
        return <TableCell key={col}>
              <TextField
                id="outlined-required"
                label="Name"
                placeholder=""
              />
          </TableCell>;
        break;
        
      case "ClientLocation":
        return <TableCell key={col}><TextField
                    id="outlined-select-currency"
                    select
                    label="Location"
                    value={location}
                    onChange={handleLocationChange}
                    style={{width:100}}
                  >
                    {locations.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                </TextField></TableCell>
        break;

        
        case "MsaStartDate":
          return <TableCell key={col}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label=""
                        value={msaStartDate}
                        onChange={(newValue) => {
                          setMsaStartDate(newValue);
                        }}
                        placeholder="Date"
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                </TableCell>;
        break;

        case "Currency":
          return <TableCell key={col}><TextField
                      id="outlined-select-currency"
                      select
                      label="Currency"
                      value={currency}
                      onChange={handleCurrencyChange}
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                  </TextField></TableCell>
          break;

        case "MsaEndDate":
           return <TableCell key={col}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label=""
                        value={msaEndDate}
                        onChange={(newValue) => {
                          setMsaEndDate(newValue);
                        }}
                        placeholder="Date"
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                </TableCell>;
        break;

        case "VeersaBusinessOwner":
           return <TableCell key={col}><TextField
                    id="outlined-select-currency"
                    select
                    label="Veersa Business Owner"
                    value={businessOwner}
                    onChange={handleBusinessOwnerChange}
                    style={{width:100}}
                  >
                    {businessOwners.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                </TextField></TableCell>
        break;

        case "PaymentTerms":
           return <TableCell key={col}><TextField
                    id="outlined-select-currency"
                    select
                    label="Payment Terms"
                    value={paymentTerm}
                    onChange={handlepaymentTermsChange}
                    style={{width:100}}
                  >
                    {paymentTerms.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                </TextField></TableCell>
        break;

        case "VeersaDeliveryOfficer":
           return <TableCell key={col}><TextField
                    id="outlined-select-currency"
                    select
                    label="Veersa Delivery Officer"
                    value={deliveryOfficer}
                    onChange={handleDeliveryOfficerChange}
                    style={{width:100}}
                  >
                    {deliveryOfficers.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                </TextField></TableCell>
        break;

        case "MsaAttachment":
          return(
                <TableCell key={col}>
                  <div className="attachmentContainer">
                    <IconButton color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="*" type="file" />
                            <AttachFileIcon />
                    </IconButton>
                    <AddIcon />
                  </div>
                </TableCell>
                )
          break;
        
    
      default:
        break;
    }
    if(col == "ClientName"){
      return <TableCell key={col}><TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
        </TableCell>;
    }
  };
  React.useEffect(() => {
    dispatch(getClientAdminData({ pageNo: 1, pageSize: 10 }));
  }, []);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 480 }}>
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
              {columns.map((column) => (
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
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              isAddButtonClicked && ( 
                <TableRow>
                    <TableCell>
                          <Checkbox
                            checked="true"
                            // onClick={() => handleClick(col)}
                          />
                    </TableCell>
                    {
                        columns.map((col) => {
                            return createInputField(col.id);
                        })
                    }
                    {/* <TableCell>
                      
                    </TableCell> */}
                </TableRow>
              )
            }
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
                    {
                    columns.map((col) => {
                      if(col.id === "MsaAttachment")
                      {
                        return <TableCell key={col.id}>
                                  <IconButton color="primary" aria-label="upload picture" component="label">
                                          <input hidden accept="*" type="file" />
                                          <AttachFileIcon />
                                    </IconButton>
                                </TableCell>;
                      }
                      return <TableCell key={col.id}>{row[col.id]}</TableCell>;
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
