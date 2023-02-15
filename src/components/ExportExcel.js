import React, { useEffect, useState } from 'react'
import { exportToExcel } from "react-json-to-excel";
import { useDispatch, useSelector } from 'react-redux';
import { Modules } from '../common/constants/sidebar';
import { getProjectManagementData } from '../redux/actions/project-management';
import { getFullName, tableColumnsData } from '../common/utils/datatable';
import Button from "@mui/material/Button";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { excelIcon } from '../common/icons';
import { Tooltip } from '@mui/material';

export default function ExportExcel({ data, headingName, projectId }) {
    const { projectManagementData } = useSelector(({ MODULES }) => MODULES);
    const { allUserDetails } = useSelector(({ USER }) => USER);
    const [flag, setFlag]=useState(false);
    const dispatch = useDispatch();
    let count=data?.totalCount;
    let columnData = tableColumnsData[headingName.replace(" ", "")];
    const handleClick = () => {
        setFlag(true);
        if(headingName===Modules.PROJECT_MANAGEMENT) {
            dispatch(
                getProjectManagementData({
                  projectId: projectId,
                  pageNo: 1,
                  pageSize: count,
                  sortBy: "projectName",
                  sortDir: "ASC",
                  searchData: "",
                })
            );
        }
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
        if(flag && projectManagementData && projectManagementData.totalCount) {
            let arr = projectManagementData.data, res=[];
            arr.forEach((ele) => {
                let tmp={};
                Object.keys(ele).forEach((key) => {
                    columnData.forEach((col) => {
                        if(col.id===key) tmp[col.label]=ele[key]
                        else if(col.id==="employeeName") tmp[col.label]=getEmployeeName(ele["employeeId"])
                    })
                })
                res.push(tmp)
            })
            exportToExcel(res, arr[0].projectName + "-" + headingName);
        }
        setFlag(false);
    }, [projectManagementData])
  return (
    <Tooltip title='Export xls'>
      <a onClick={() => handleClick()} style={{cursor: "pointer"}}>      
        <img src={excelIcon} />
      </a>
    </Tooltip>
  )
}
