import moment from "moment";

export const handleSetRows = (tableData, tabName) => {
    let rowsData = [];
    let rowsToShow = [...tableData];
    if(tabName === 'PENDING APPROVAL'){
      rowsToShow = rowsToShow.filter(i => i.status === 'Submitted');
    }
    rowsToShow.forEach((row)=>{
      let rowData = {};
      Object.keys(row).forEach((col) => {
        if (col === "dateHours") {
          row[col].forEach((dateHour) => {
            rowData[moment(dateHour.date).format("ddd DD")] =
              dateHour.hours === 0 ? "-" : dateHour.hours;
          });
        } else if(col === 'totalHrs') {
          let totalHrs = parseFloat(row[col]).toFixed(2);
          if(totalHrs.toString().split(".")[1] === "00"){
            totalHrs = parseInt(totalHrs);
          }
          rowData[col] = totalHrs;
          console.log(totalHrs);
        } else {
          rowData[col] = row[col];
        }
      });
      rowsData.push(rowData);
    });
    return [...rowsData];
    // setRows([...rowsData]);
};