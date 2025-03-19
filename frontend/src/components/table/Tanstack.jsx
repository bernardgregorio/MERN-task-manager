import { useState } from "react";
import PropsType from "prop-types";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  [`&.${tableCellClasses.footer}`]: {
    fontWeight: "bold",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Tanstack = ({
  data,
  columns,
  page,
  setPage,
  totalData,
  totalPage,
  pageLimit,
  setPageLimit,
  setSearch,
  showSearch = true,
  showPagination = true,
  customBtn,
}) => {
  const [sorting, setSorting] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const table = useReactTable({
    data,
    columns,
    rowCount: totalData,

    //core
    getCoreRowModel: getCoreRowModel(),

    //filtering
    getFilteredRowModel: getFilteredRowModel(),

    //sorting
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,

    //pagination
    manualPagination: true,

    //column resize
    columnResizeMode: "onChange",
    state: { sorting, page },
  });

  const handlePageChange = (event, value) => {
    setPage(value);
    table.setPageIndex(value - 1);
  };

  return (
    <Box className="bg-white py-6 px-4 w-full" component={Paper}>
      {/**global filter */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "flex-end", alignItems: "center" }}
      >
        <Box>{customBtn}</Box>
        {showSearch && (
          <Box>
            <TextField
              id="search"
              variant="outlined"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setSearch(e.target.value);
                }
              }}
              size="small"
              className=" bg-white w-100"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
        )}
      </Stack>

      <TableContainer
        sx={{
          maxWidth: "100%",
          width: "100%",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <Table>
          {/** header */}
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={
                  headerGroup?.id
                    ? headerGroup.id
                    : headerGroup?.name
                      ? headerGroup?.name
                      : headerGroup?.title
                }
              >
                {headerGroup.headers.map((header) => (
                  <StyledTableCell
                    component="th"
                    key={header.id}
                    className="relative cursor-pointer"
                    style={{ width: header.getSize() }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.column.columnDef.header}
                    {
                      { asc: " 🔼", desc: " 🔽" }[
                        header.column.getIsSorted() ?? null
                      ]
                    }
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className="absolute top-0 right-0 w-[5px] h-full bg-[#e0e0e0] opacity-0 cursor-ew-resize hover:opacity-100 "
                    />
                  </StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          {/** body */}
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <StyledTableRow
                key={row?.id ? row.id : row?.name ? row?.name : row?.title}
                hover
              >
                {row.getVisibleCells().map((cell) => (
                  <StyledTableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>

        {/** pagination */}
        {showPagination && (
          <Stack
            direction="row"
            sx={{
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <Typography variant="subtitle2" sx={{ padding: 2 }}>
              Rows per page
            </Typography>
            <select
              value={pageLimit}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
                setPage(1);
                setPageLimit(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>

            <Pagination
              count={totalPage}
              page={page}
              onChange={handlePageChange}
              size="large"
              showFirstButton
              showLastButton
            />
          </Stack>
        )}
      </TableContainer>
    </Box>
  );
};

export default Tanstack;

Tanstack.propTypes = {
  data: PropsType.array.isRequired,
  columns: PropsType.array.isRequired,

  page: PropsType.number,
  setPage: PropsType.func,
  totalData: PropsType.number,
  totalPage: PropsType.number,
  pageLimit: PropsType.number,
  setPageLimit: PropsType.func,
  setSearch: PropsType.func,
  showSearch: PropsType.bool,
  showPagination: PropsType.bool,
  customBtn: PropsType.node,
};
