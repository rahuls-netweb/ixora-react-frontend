import DataTable from 'react-data-table-component';


const customStyles = {
    headRow: {
        style: {
            minHeight: '50px', // override the row height
            border: '1px solid rgba(0, 0, 0, 0.25) !important',
            marginBottom: 2,
            borderRadius: 5,
        },
    },
    rows: {
        style: {
            minHeight: '50px', // override the row height
            border:'1px solid rgba(0, 0, 0, 0.25) !important',
            marginBottom: 2,
            borderRadius: 5,
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            fontFamily: 'var(--Poppins)',
            fontSize:16
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
            fontFamily: 'var(--Poppins)',
            fontSize: 16,
            color:'3333333'
        },
    },
};



export default function TableGrid({
    columns,
    rows
}) {
    return (
        <DataTable
            columns={columns}
            data={rows}
            customStyles={customStyles}
            selectableRows
        />
    );
};