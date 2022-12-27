import "./tabsTable.css";
import { searchIcon } from "../../common/icons";
import { useEffect, useState } from "react";
import { DataTable } from "../DataTable/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { Modules } from "../../common/constants/sidebar";
import { getAllProjectsData, getAllUserDetails, getAllUsersData, getClientAdminData, getClientsData, getListItems, getProjectAdminData, getProjectAllocationData, getProjectManagersData } from "../../redux/actions";
import { getLabel, getMinWidth, tableColumnsData } from "../../common/utils/datatable";
import { getProjectManagementData } from "../../redux/actions/project-management";

export const TabsTable = ({ headingName, tabName, status }) => {
  const { clientAdminData, projectAdminData, projectAllocationData, projectManagementData } = useSelector(({ MODULES }) => MODULES);
  const dispatch = useDispatch();

  const [ isAddButtonClicked, setIsAddButtonClicked ] = useState(false);
  const [ isEditButtonClicked, setIsEditButtonClicked ] = useState(false);
  const [ rows, setRows ] = useState([]);
  const [ columns, setColumns ] = useState([]);
  const [ totalRecord, setTotalRecord ] = useState(0);
  const [ searchData, setSearchData ] = useState("");

  const addNewRow = (isTrue) => {
    setIsAddButtonClicked(isTrue);
  };

  const handleSetColumnsData = (data) => {
    const temp = [];
    Object.keys(data).forEach((col) => {
      if (!col.includes('Id') && getLabel(col, headingName) !== '') {
        temp.push({
          id: col,
          label: getLabel(col, headingName),
          minWidth: getMinWidth(col, headingName),
          sortDir: "DESC",
          align: "left",
        });
      } else if (col === 'employeeId') {
        temp.push({
          id: 'employeeName',
          label: getLabel('employeeName', headingName),
          minWidth: getMinWidth('employeeName', headingName),
          sortDir: "DESC",
          align: "left",
        });
      }
    });
    if(headingName === Modules.PROJECT_ALLOCATION) {
      setColumns([ ...temp ]);
    } else {
      setColumns([
        ...temp,
        {
          id: "actions",
          label: "Actions",
          minWidth: 100,
          sortDir: "",
          align: "left",
        },
      ]);
    }
  };

  const setTableData = (tableData) => {
    handleSetColumnsData(tableData.data[0]);
    setRows(tableData.data);
    setTotalRecord(tableData.totalCount);
  };

  useEffect(() => {  
    if (headingName === Modules.CLIENT_ADMIN && clientAdminData && clientAdminData.totalCount) {
      setTableData(clientAdminData);
    } else if (headingName === Modules.PROJECT_ADMIN && projectAdminData && projectAdminData.totalCount) {
      setTableData(projectAdminData);
    } else if (headingName === Modules.PROJECT_ALLOCATION && projectAllocationData && projectAllocationData.totalCount) {
      setTableData(projectAllocationData);
    } else if (headingName === Modules.PROJECT_MANAGEMENT && projectManagementData && projectManagementData.totalCount) {
      setTableData(projectManagementData);
    } else {
      if (tableColumnsData[headingName.replace(' ', '')]) {
        setColumns([
          ...tableColumnsData[headingName.replace(' ', '')],
          {
            id: "actions",
            label: "Actions",
            minWidth: 100,
            sortDir: "",
            align: "left",
          },
        ]);
      }
      else {
        setColumns([]);
      }
      setRows([]);
      setTotalRecord(0);
    }
  }, [ clientAdminData, projectAdminData, projectAllocationData, projectManagementData, headingName ]);

  useEffect(() => {
    switch(headingName) {
      case Modules.CLIENT_ADMIN:
        dispatch(
          getClientAdminData({
            pageNo: 1,
            pageSize: 10,
            sortBy: 'clientName',
            sortDir: "ASC",
            searchData: searchData
          })
        );
        break;
      case Modules.PROJECT_ADMIN:
        dispatch(
          getProjectAdminData({
            pageNo: 1,
            pageSize: 10,
            sortBy: 'projectName',
            sortDir: "ASC",
            searchData: searchData
          })
        );
        break;
      case Modules.PROJECT_ALLOCATION:
        dispatch(
          getProjectAllocationData({
            pageNo: 1,
            pageSize: 10,
            sortBy: 'projectName',
            sortDir: "ASC",
            searchData: searchData,
            status: status
          })
        );
        break;
      case Modules.PROJECT_MANAGEMENT:
        dispatch(
          getProjectManagementData({
            pageNo: 1,
            pageSize: 10,
            sortBy: 'projectName',
            sortDir: "ASC",
            searchData: searchData,
          })
        );
        break;
      default:
        dispatch(
          getClientAdminData({
            pageNo: 1,
            pageSize: 10,
            sortBy: 'clientName',
            sortDir: "ASC",
            searchData: searchData
          })
        );
    }
  }, [ headingName, searchData ]);

  useEffect(() => {
    dispatch(getProjectManagersData());
    dispatch(getClientsData());
    dispatch(getListItems());
    dispatch(getAllUsersData());
    dispatch(getAllUserDetails());
    dispatch(getAllProjectsData());
    setSearchData('')
  }, [ headingName]);

  return (
    <div className="tableDiv">
      <div className="searchHeader">
        <div className="searchWrapper">
          <img src={searchIcon} className="searchIcon" alt="" />
          <input
            className="searchBox"
            type="search"
            placeholder="Search"
            onChange={(e) => e.target.value.length > 2 || e.target.value.length === 0 ? setSearchData(e.target.value) : null}
          />
        </div>
        {headingName !== "Project Allocation" && <button
          disabled={isAddButtonClicked || isEditButtonClicked}
          className={
            isAddButtonClicked || isEditButtonClicked
              ? "disableAddButton"
              : "addBtn"
          }
          onClick={() => addNewRow(true)}
        >
          <div
            className={
              isAddButtonClicked || isEditButtonClicked
                ? "disableAddButtonText"
                : "btnText"
            }
          >
            Add
          </div>
        </button>}
      </div>
      <DataTable
        rows={rows}
        columns={columns}
        headingName={headingName}
        setColumns={setColumns}
        totalRecord={totalRecord}
        isAddButtonClicked={isAddButtonClicked}
        setIsAddButtonClicked={setIsAddButtonClicked}
        isEditButtonClicked={isEditButtonClicked}
        setIsEditButtonClicked={setIsEditButtonClicked}
        searchData={searchData}
        projectStatus={status}
      />
    </div>
  );
};
