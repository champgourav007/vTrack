import "./tabsTable.css";
import { filterIcon, searchIcon } from "../../common/icons";
import { useEffect, useState } from "react";
import { DataTable } from "../DataTable/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { Modules } from "../../common/constants/sidebar";
import { getAllUsersData, getClientAdminData, getClientsData, getListItems, getProjectAdminData, getProjectManagersData } from "../../redux/actions";
import { getLabel, getMinWidth, tableColumnsData } from "../../common/utils/datatable";

export const TabsTable = ({ headingName, tabName }) => {
  const { clientAdminData, projectAdminData } = useSelector(({ MODULES }) => MODULES);

  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);
  const [ rows, setRows ] = useState([]);
  const [ columns, setColumns ] = useState([]);
  const [ totalRecord, setTotalRecord ] = useState(0);
  const addNewRow = (isTrue) => {
    setIsAddButtonClicked(isTrue);
  };

  const handleSetColumnsData = (data) => {
    const temp = [];
    Object.keys(data).forEach((col) => {
      if (!col.includes('Id') && getLabel(col, headingName) !== '')
        temp.push({
          id: col,
          label: getLabel(col, headingName),
          minWidth: getMinWidth(col, headingName),
          sortDir: "DESC",
          align: "left",
        });
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
    }
    else{
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
  }, [ clientAdminData, projectAdminData, headingName ]);

  useEffect(() => {
    switch(headingName) {
      case Modules.CLIENT_ADMIN:
        dispatch(
          getClientAdminData({
            pageNo: 1,
            pageSize: 10,
            sortBy: 'clientName',
            sortDir: "ASC",
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
          })
        );
    }
  }, [ headingName ]);

  useEffect(() => {
    dispatch(getProjectManagersData());
    dispatch(getClientsData());
    dispatch(getListItems());
    dispatch(getAllUsersData());
  }, []);

  return (
    <div className="tableDiv">
      <div className="searchHeader">
        <div className="searchWrapper">
          <img src={searchIcon} alt=""/>
          <input className="searchBox" type="search" placeholder="Search" />
        </div>
        <button className="filterBtn">
          <img className="filterIcon" src={filterIcon} alt="" />
          <div className="disableBtnText">Filter</div>
        </button>
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
      />
    </div>
  );
};
