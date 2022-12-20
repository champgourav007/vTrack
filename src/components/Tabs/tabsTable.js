import "./tabsTable.css";
import { filterIcon, searchIcon } from "../../common/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DataTable } from "../DataTable/DataTable";
import { getClientAdminData } from "../../redux/actions";

export const TabsTable = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);
  const [searchData, setSearchData] = useState("");
  const dispatch = useDispatch();

  const addNewRow = (isTrue) => {
    setIsAddButtonClicked(isTrue);
  };

  const searchHandler = (e) => {
    console.log(e.target.value);
    setSearchData(e.target.value);
    if (e.target.value.length > 2 || e.target.value.length === 0)
      dispatch(
        getClientAdminData({
          pageNo: 1,
          pageSize: 10,
          sortBy: "ClientName",
          sortDir: "ASC",
          searchData: e.target.value,
        })
      );
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
