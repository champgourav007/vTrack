import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFullName } from "../../common/utils/datatable";
import { getDetailedTimeSheetData } from "../../redux/actions";
import "./timeSheetDetailView.css";

export const TimeSheetDetailView = ({viewDetails, setViewDetails, selectedEmpId, selectedPeriodWeek}) => {
  const { detailedTimeSheetData } = useSelector(({ MODULES }) => MODULES);
  const { allUserDetails } = useSelector(({ USER }) => USER);
  const { vTrackLoader } = useSelector(({ APP_STATE }) => APP_STATE);
  const dispatch = useDispatch();

  const [ rows, setRows ] = useState([]);
  const [ columns, setColumns ] = useState([]);

  const handleClose = () => {
    setViewDetails(false);
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

  useEffect(() => {
    if (detailedTimeSheetData && detailedTimeSheetData.length) {
      let temp = [ { id: 'projectName', label: 'Project Name', align: 'left' } ];
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
      temp.push({ id: 'status', label: 'Status', align: 'left' });
      temp.push({ id: 'approvedBy', label: 'Approved By', align: 'left' });
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
  }, [ selectedEmpId ]);

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
                    return <TableRow
                      hover
                    >
                      { columns.map((col, colIdx) => {
                        return <TableCell key={col.id}>
                          {row[col.id]}
                        </TableCell>
                      })}
                    </TableRow>
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setViewDetails(false)} >Close</Button>
        </DialogActions>
      </Dialog>
      </>
  )
}