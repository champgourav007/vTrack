import { Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notificationColumns } from "../../common/utils/settings";
import { updateNotification } from "../../redux/actions";
import Loader from "../Loaders/Loader";
import TableLoader from "../Loaders/TableLoader";
import './notificationTable.css'

export const NotificationTable = () => {
  const { notificationsList } = useSelector(({ USER }) => USER);
  const { vTrackLoader, tableLoader } = useSelector(({ APP_STATE }) => APP_STATE);
  const [notificationData, setNotificationData] = useState([]);
  const [changeNotificationId, setChangeNotificationId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if(notificationsList){
      setNotificationData(notificationsList);
      setChangeNotificationId("");
    }
  }, [notificationsList])

  const handleChange = (event) => {;
    let id = event.target.value
    setChangeNotificationId(id);
    dispatch(
      updateNotification({
        id: event.target.value
      })
      )
  }

  return(
    <>
    {/* {vTrackLoader && <Loader />} */}
    <div className="settingsWrapper">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "48rem"}}>
          <Table  style={{marginTop: '1rem'}} aria-label="sticky table" size="small">
            <TableHead style={{position:"sticky", top:"0", zIndex: 1}}>
              <TableRow style={{backgroundColor:"white"}} className='settingTableHeader manageNotifications'>
              {notificationColumns['MANAGE NOTIFICATIONS'].map(
                (column) =>
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{
                        backgroundColor: "#1773bc0d",
                        color: "#1773bc",
                        fontWeight: 700,
                    }}
                  >
                    {column.label}
                  {/* <img
                      src={TableArrows}
                      alt=""
                      className="tableArrows"

                  /> */}
                  </TableCell>)}
              </TableRow>
            </TableHead>
            {tableLoader && <TableLoader />}
            {notificationData && <TableBody className='settingTableBody manageNotifications'>
                        {notificationData.map((data) =>
                            <TableRow key={data.notificationId} className='settingTableHeader'>
                                <TableCell align="left">{data.notificationName}</TableCell>
                                <TableCell align="left">
                                  <Switch 
                                    checked={data.enabled} 
                                    onChange={handleChange} 
                                    disabled={changeNotificationId == data.notificationId}
                                    value={data.notificationId}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </TableCell>
                                {/* <TableCell align="left">
                                  <Switch 
                                    checked={data.enabled} 
                                    onChange={handleChange} 
                                    disabled={changeNotification}
                                    value={data.notificationId}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </TableCell> */}
                            </TableRow>)}
                    </TableBody>}
          </Table>
        </TableContainer>
      </Paper>
    </div>
    </>
  )
}