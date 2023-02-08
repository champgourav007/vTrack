import { FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TABLE_HEADERS } from '../../common/constants/setting-table-header'
import { AddEnableIcon, crossIcon, deleteIcon, editIcon, TableArrows } from '../../common/icons';
import { getFullName } from '../../common/utils/datatable';
import { deleteSettingTableData, getSettingTableData, setVtrackLoader, updateSettingTableData } from '../../redux/actions';
import DialogBox from '../DialogBox/dialogBox';
import './settingTable.css';

export const SettingsTable = ({ rolesData, searchData }) => {
    const usersData = useSelector(({ MODULES }) => MODULES.settingTableData);
    const [showDialogBox, setShowDialogBox] = useState(false);
    const [editUserRole, setEditUserRole] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [dialogDeleteButtonClicked, setDialogDeleteButtonClicked] =
        useState(false);
    const [idToDelete, setIdToDelete] = useState();
    const [ filteredData, setFilteredData ] = useState(null);
    const dispatch = useDispatch();

    const handleUserUpdate = (userId) => {
        setEditUserRole(userId);
    }

    const handleCancelIcon = () => {
        setEditUserRole("");
        setSelectedRole("");
    }
    const handleUpdate = (selectedUserRole, userId) => {
        dispatch(updateSettingTableData(selectedUserRole, userId));
        setEditUserRole("");
        setSelectedRole("");

    }

    useEffect(() => {
        if (dialogDeleteButtonClicked) {
            dispatch(deleteSettingTableData(idToDelete));
            setDialogDeleteButtonClicked(false);
        }
    }, [dialogDeleteButtonClicked])

    useEffect(() => {
        if (usersData) {
            if (searchData) {
                let tempData = [ ...usersData ];
                setFilteredData(tempData.filter(data => getFullName(data.firstName, data.lastName).trim().toLowerCase().includes(searchData.trim().toLowerCase())));
            } else {
                setFilteredData(usersData);
            }
        }
    }, [ searchData ])

    useEffect(() => {
        if (usersData) {
            setFilteredData(usersData);
        }
    }, [ usersData ])
    return (
        <>
            {showDialogBox && (
                <DialogBox
                    setShowDialogBox={setShowDialogBox}
                    setDialogDeleteButtonClicked={setDialogDeleteButtonClicked}
                />
            )}
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: "48rem"}}>
                <Table aria-label="sticky table" size="small">
                    <TableHead style={{position:"sticky", top:"0", zIndex: 1}}>
                        <TableRow style={{backgroundColor:"white"}} className='settingTableHeader'>
                            {TABLE_HEADERS.map(
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
                                        {column}
                                        {/* <img
                                            src={TableArrows}
                                            alt=""
                                            className="tableArrows"

                                        /> */}
                                    </TableCell>
                            )
                            }
                        </TableRow>
                    </TableHead>
                    {!usersData && <h1 className="no-data">Fetching Users...</h1>}
                    <TableBody className='settingTableBody'>
                        {filteredData && filteredData.map((user) =>
                            <TableRow key={user.userId} className='settingTableHeader'>
                                <TableCell align="left">{getFullName(user.firstName, user.lastName)}</TableCell>
                                <TableCell align="left">{user.email}</TableCell>
                                {editUserRole === user.userId ?
                                    (<TableCell align="left">
                                        <FormControl sx={{ m: 1, width: "80%", margin: 0 }}>
                                            <InputLabel id="demo-multiple-checkbox-label">Role</InputLabel>
                                            <Select
                                                defaultValue={user.roleId}
                                                labelId="demo-multiple-checkbox-label"
                                                id="demo-multiple-checkbox"
                                                input={<OutlinedInput label="Select Role" />}
                                            >
                                                {rolesData.map((roles) => (
                                                    <MenuItem key={roles.roleID} value={roles.roleID}>
                                                        <ListItemText primary={roles.roleName} onClick={()=>setSelectedRole(roles.roleID)}/>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>)

                                    : <TableCell align="left">{user.roleName}</TableCell>}
                                <TableCell align="left">
                                    {editUserRole === user.userId ?
                                        <div className='actions'>
                                            <Tooltip title="Update">
                                                <img
                                                    src={AddEnableIcon}
                                                    className="editDeleteIcon cursorPointer"
                                                    onClick={() => handleUpdate(selectedRole, user.userId)}
                                                    alt=""
                                                />
                                            </Tooltip>
                                            <Tooltip title="Cancel">
                                                <img src={crossIcon} className="editDeleteIcon" alt=""
                                                    onClick={() =>
                                                        handleCancelIcon()
                                                    }
                                                />
                                            </Tooltip>

                                        </div>
                                        :
                                        <div className='actions'>
                                            <Tooltip title="Edit">
                                                <button
                                                    onClick={() => 
                                                        handleUserUpdate(user.userId)
                                                    }
                                                    className="buttonBackgroundBorder cursorPointer"
                                                >
                                                    <img src={editIcon} className="editDeleteIcon" alt="" />
                                                </button>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <img
                                                    src={deleteIcon}
                                                    className="editDeleteIcon cursorPointer"
                                                    onClick={() => {
                                                        setIdToDelete(user.userId);
                                                        setShowDialogBox(true);
                                                    }}
                                                    alt=""
                                                />
                                            </Tooltip>

                                        </div>
                                    }
                                </TableCell>
                            </TableRow>)}


                    </TableBody>

                </Table>
            </TableContainer>
            </Paper>

        </>
    )
}
