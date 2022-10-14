import { useState } from "react";
import { Children } from "react";
import DataTable from "react-data-table-component";

const customStyles = {
  headRow: {
    style: {
      minHeight: "50px", // override the row height
      border: "1px solid rgba(0, 0, 0, 0.25) !important",
      marginBottom: 2,
      borderRadius: 5,
      paddingLeft: "15px",
      fontWeight: "bold",
      backgroundColor: "var(--table-bg)",
    },
  },
  rows: {
    style: {
      minHeight: "50px", // override the row height
      border: "1px solid rgba(0, 0, 0, 0.25) !important",
      marginBottom: 2,
      borderRadius: 5,
      paddingLeft: "15px",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      fontFamily: "var(--Poppins)",
      fontSize: 16,
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
      fontFamily: "var(--Poppins)",
      fontSize: 16,
      color: "3333333",
    },
  },
};

export default function TableGrid({ columns, rows, perPage = 8 }) {
  let current_rows_perPage = localStorage.getItem("current_rows_perPage");
  if (!current_rows_perPage) {
    localStorage.setItem("current_rows_perPage", 8);
  }
  const [rows_perPage, setRows_perPage] = useState(current_rows_perPage);
  return (
    <DataTable
      columns={columns}
      data={rows}
      customStyles={customStyles}
      pagination={!!perPage}
      paginationPerPage={rows_perPage}
      paginationRowsPerPageOptions={[perPage, perPage * 2, perPage * 3]}
      onChangeRowsPerPage={(e) => {
        // setRows_perPage(e);
        localStorage.setItem("current_rows_perPage", e);
      }}
    />
  );
}
