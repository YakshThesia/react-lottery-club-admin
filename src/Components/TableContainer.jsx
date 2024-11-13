import { Box, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { styled } from "@mui/system";
import NoDataImg from "../Assets/nodata.svg"; // Assuming you have the SVG file correctly imported
import CustomPagination from "../Components/Pagnination/Pagnination";

const NoDataOverlay = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    }}
  >
    <img src={NoDataImg} alt="No Data" style={{ width: "200px" }} />
  </Box>
);

const LeftAlignedCell = styled("div")(({ theme }) => ({
  textAlign: "left",
}));

const TableContainer = ({
  rows,
  columns,
  pageSize,
  loading,
  page,
  handlePageChange,
  totalCount,
  sx = {},
  pagination,
}) => {
  const centeredColumns = columns?.map((column) => ({
    ...column,
    headerClassName: column.headerClassName || "centered-cell",
    cellClassName: column.cellClassName || "centered-cell",
  }));

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "10px 10px",
        boxShadow: " rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        overflow: "auto",
      }}
    >
      <Grid container justifyContent="center">
        <Grid
          item
          xs={12}
          sx={{
            height: "500px",
            ...sx,
          }}
        >
          <DataGrid
            rows={rows}
            columns={centeredColumns}
            pageSize={pageSize}
            pagination
            getRowId={(e) => e.rowid}
            paginationMode="server"
            onPageChange={(newPage) => handlePageChange(newPage)}
            rowsPerPageOptions={[10]}
            rowCount={totalCount}
            loading={loading}
            disableColumnResize
            disableColumnFilter
            disableColumnSorting
            disableColumnMenu
            hideFooter
            slots={{ noRowsOverlay: NoDataOverlay }}
            disableRowSelectionOnClick
            sx={{
              "& .MuiDataGrid-columnHeader": {
                background: "#EBA834",
                borderRadius: "0",
                borderLeft: "0px solid #292D3280",
                fontFamily: "Outfit",
                color: "white",
                "&:first-of-type": {
                  borderLeft: "0px",
                },
                "&:last-of-type": {
                  borderRight: "0px",
                },
                textAlign: "center",
              },
              "& .MuiDataGrid-cell": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "0px",
                border: "1px solid #0000003D",
                fontFamily: "Outfit",
              },
              "& .MuiDataGrid-row": {
                cursor: "pointer",
              },
              "& .leftAlign": {
                textAlign: "left !important",
                justifyContent: "flex-start",
              },
              "& .leftAlignHeader": {
                textAlign: "left !important",
              },
              ".MuiDataGrid-cell:focus": { outline: "none" },
              ".MuiDataGrid-columnHeader:focus": { outline: "none" },
            }}
          />
        </Grid>
        {pagination === false ? false : true && (
          <Grid item xs={12}>
            <CustomPagination
              page={page}
              pageSize={pageSize}
              handlePageChange={handlePageChange}
              totalCount={totalCount}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default TableContainer;

