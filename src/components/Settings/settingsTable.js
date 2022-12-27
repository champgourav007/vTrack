import { FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TABLE_HEADERS } from '../../common/constants/setting-table-header'
import { AddEnableIcon, crossIcon, deleteIcon, editIcon, TableArrows } from '../../common/icons';
import { deleteSettingTableData, updateSettingTableData } from '../../redux/actions';
import './settingTable.css';

export const SettingsTable = ({ rolesData }) => {
    const usersData = useSelector(({ MODULES }) => MODULES.settingTableData);
    const [editUserRole, setEditUserRole] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const dispatch = useDispatch();
    const handleUserDelete = (userId) => {
        dispatch(deleteSettingTableData(userId));
    }
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
    return (
        <>
            <TableContainer sx={{ maxHeight: "48rem", overflowX: "inherit" }}>
                <Table aria-label="sticky table" size="small">
                    <TableHead>
                        <TableRow className='settingTableHeader'>
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
                                        <img
                                            src={TableArrows}
                                            alt=""
                                            className="tableArrows"

                                        />
                                    </TableCell>
                            )
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody className='settingTableBody'>
                        {usersData && usersData.map((user) =>
                            <TableRow key={user.userId} className='settingTableHeader'>
                                <TableCell align="left">{user.userId}</TableCell>
                                <TableCell align="left">{`${user.firstName} ${user.lastName}`}</TableCell>
                                {editUserRole === user.userId ?
                                    (<TableCell align="left">
                                        <FormControl sx={{ m: 1, width: "80%", margin: 0 }}>
                                            <InputLabel id="demo-multiple-checkbox-label">Role</InputLabel>
                                            <Select
                                                defaultValue={user.roleID}
                                                labelId="demo-multiple-checkbox-label"
                                                id="demo-multiple-checkbox"
                                                onChange={(e) => setSelectedRole(e.target.value)}
                                                input={<OutlinedInput label="Select Role" />}
                                            >
                                                {rolesData.map((roles) => (
                                                    <MenuItem key={roles.roleID} value={roles.roleID}>
                                                        <ListItemText primary={roles.roleName} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>)

                                    : <TableCell align="left">{user.roleName}</TableCell>}
                                <TableCell align="left">
                                    {editUserRole === user.userId ?
                                        <div className='actions'>
                                            <img
                                                src={AddEnableIcon}
                                                className="editDeleteIcon cursorPointer"
                                                onClick={() => handleUpdate(selectedRole, user.userId)}
                                                alt=""
                                            />
                                            <img src={crossIcon} className="editDeleteIcon" alt=""
                                                onClick={() =>
                                                    handleCancelIcon()
                                                }
                                            />

                                        </div>
                                        :
                                        <div className='actions'>
                                            <img
                                                src={deleteIcon}
                                                className="editDeleteIcon cursorPointer"
                                                onClick={() => handleUserDelete(user.userId)}
                                                alt=""
                                            />
                                            <button
                                                onClick={() =>
                                                    handleUserUpdate(user.userId)
                                                }
                                                className="buttonBackgroundBorder cursorPointer"
                                            >
                                                <img src={editIcon} className="editDeleteIcon" alt="" />
                                            </button>
                                        </div>
                                    }
                                </TableCell>
                            </TableRow>)}


                    </TableBody>

                </Table>
            </TableContainer>

        </>
    )
}
