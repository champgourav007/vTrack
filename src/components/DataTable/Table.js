import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { rows, columns } from "../../mock-data/TableData";
import "./Table.css";
import { TableArrows } from "../../common/icons";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { getClientAdminData } from "../../redux/actions/client-admin";

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedRows, setSelectedRows] = React.useState([]);
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
                    {columns.map((col) => {
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
