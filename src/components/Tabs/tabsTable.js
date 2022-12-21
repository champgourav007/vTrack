import "./tabsTable.css";
import { filterIcon, searchIcon } from "../../common/icons";
import { useEffect, useState } from "react";
import { DataTable } from "../DataTable/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { Modules } from "../../common/constants/sidebar";
import { getAllProjectsData, getAllUserDetails, getAllUsersData, getClientAdminData, getClientsData, getListItems, getProjectAdminData, getProjectAllocationData, getProjectManagersData } from "../../redux/actions";
import { getLabel, getMinWidth, tableColumnsData } from "../../common/utils/datatable";

export const TabsTable = ({ headingName, tabName }) => {
  const { clientAdminData, projectAdminData, projectAllocationData } = useSelector(({ MODULES }) => MODULES);

  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);
  const [ rows, setRows ] = useState([]);
  const [ columns, setColumns ] = useState([]);
  const [ totalRecord, setTotalRecord ] = useState(0);
  const [searchData, setSearchData] = useState("");

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
  };

  useEffect(() => { 
    if (headingName === Modules.CLIENT_ADMIN && clientAdminData && clientAdminData.totalCount) {
      handleSetColumnsData(clientAdminData.data[0]);
      setRows(clientAdminData.data);
      setTotalRecord(clientAdminData.totalCount);
    } else if (headingName === Modules.PROJECT_ADMIN && projectAdminData && projectAdminData.totalCount) {
      handleSetColumnsData(projectAdminData.data[0]);
      setRows(projectAdminData.data);
      setTotalRecord(projectAdminData.totalCount);
    } else if (headingName === Modules.PROJECT_ALLOCATION && projectAllocationData && projectAllocationData.totalCount) {
      handleSetColumnsData(projectAllocationData.data[0]);
      setRows(projectAllocationData.data);
      setTotalRecord(projectAllocationData.totalCount);
    } else{
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
  }, [ clientAdminData, projectAdminData, projectAllocationData, headingName ]);

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
            searchData: searchData
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
    setSearchData('');
  }, [ headingName ]);

  useEffect(() => {
    dispatch(getProjectManagersData());
    dispatch(getClientsData());
    dispatch(getListItems());
    dispatch(getAllUsersData());
    dispatch(getAllUserDetails());
    dispatch(getAllProjectsData());
  }, [ headingName]);

  const searchHandler = (e) => {
    console.log(e.target.value);
    setSearchData(e.target.value);
    if (e.target.value.length > 2 || e.target.value.length === 0)
      if (headingName === Modules.CLIENT_ADMIN) {
      dispatch(
        getClientAdminData({
          pageNo: 1,
          pageSize: 10,
          sortBy: "ClientName",
          sortDir: "ASC",
          searchData: e.target.value,
        })
      );
    } else if (headingName === Modules.PROJECT_ADMIN) {
      dispatch(
        getProjectAdminData({
          pageNo: 1,
          pageSize: 10,
          sortBy: "ProjectName",
          sortDir: "ASC",
          searchData: e.target.value,
        })
      );
    } else if (headingName === Modules.PROJECT_ALLOCATION) {
      dispatch(
        getProjectAllocationData({
          pageNo: 1,
          pageSize: 10,
          sortBy: "ProjectName",
          sortDir: "ASC",
          searchData: e.target.value,
        })
      );
    }
  };
  return (
    <div className="tableDiv">
      <div className="searchHeader">
        <div className="searchWrapper">
          <img src={searchIcon} className="searchIcon"/>
          <input
            className="searchBox"
            type="search"
            placeholder="Search"
            onChange={(e) => searchHandler(e)}
          />
        </div>
        {/* <button className="filterBtn">
          <img className="filterIcon" src={filterIcon} alt="" />
          <div className="disableBtnText">Filter</div>
        </button> */}
        <button
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
        </button>
      </div>
      <DataTable
        rows={rows}
        columns={columns}
        headingName={headingName}
        setColumns={setColumns}
        totalRecord={totalRecord}
        isAddButtonClicked={isAddButtonClicked}
        setIsAddButtonClicked={setIsAddButtonClicked}
        setIsEdit={setIsEdit}
        isEditButtonClicked={isEditButtonClicked}
        setIsEditButtonClicked={setIsEditButtonClicked}
        searchData={searchData}
      />
    </div>
  );
};
