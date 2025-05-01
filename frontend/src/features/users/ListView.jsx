import { useContext } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import { GlobalContext } from "../../hooks/useContext";
import { formatDate } from "../../utils/helper";
import Tanstack from "../../components/table/Tanstack";
import EditBtn from "../../components/action/EditBtn";
import DeleteBtn from "../../components/action/DeleteBtn";

const ListView = () => {
  const context = useContext(GlobalContext);

  const columns = [
    {
      accessorKey: "fullname",
      header: "Name",
      cell: (row) => (
        <Box sx={{ width: "140px", textWrap: "wrap" }}>{row.getValue()}</Box>
      ),
    },
    {
      accessorKey: "titleName",
      header: "Title",
      cell: (row) => (
        <Box sx={{ width: "140px", textWrap: "wrap" }}>{row.getValue()}</Box>
      ),
    },
    {
      accessorKey: "roleName",
      header: "Role",
      size: 80,
      cell: (row) => (
        <Box sx={{ width: "60px", textWrap: "wrap" }}>{row.getValue()}</Box>
      ),
    },
    {
      accessorKey: "statusName",
      header: "Status",
      size: 80,
      cell: (row) => (
        <Box className="text-center">
          <Chip label={row.getValue()} color="success" />
        </Box>
      ),
    },
    {
      accessorKey: "expirationDate",
      header: "Expiration Date",
      footer: "Expiration Date",
      cell: (row) => formatDate(row.getValue(), "YYYY-MM-DD"),
      size: 100,
    },
    {
      accessorKey: "createAt",
      header: "Create At",
      size: 100,
      cell: (row) => {
        return formatDate(row.getValue());
      },
    },
    {
      accessorKey: "_id",
      header: "Action",
      cell: (data) => (
        <Box>
          <Stack direction="row" spacing={2}>
            <EditBtn
              onClick={() => {
                context.setRecord(data.row.original);
                context.setCat("update");
                context.setOpenForm(true);
              }}
            />
            <DeleteBtn
              onClick={() => {
                context.openDialog(
                  "warning",
                  "Are you sure you want to delete this user?",
                  () => context.handleDelete(data.row.original._id)
                );
              }}
            />
          </Stack>
        </Box>
      ),
    },
  ];

  return (
    <Tanstack
      data={context.data.data}
      columns={columns}
      page={context.page}
      setPage={context.setPage}
      totalData={context.data.totalDocuments}
      totalPage={context.data.totalPages}
      pageLimit={context.pageLimit}
      setPageLimit={context.setPageLimit}
      setSearch={context.setSearch}
      showSearch={false}
    />
  );
};

export default ListView;
