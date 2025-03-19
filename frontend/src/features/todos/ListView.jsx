import { useContext } from "react";
import { GlobalContext } from "../../hooks/useContext";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import { formatDate } from "../../utils/helper";
import Tanstack from "../../components/table/Tanstack";
import EditBtn from "../../components/action/EditBtn";
import DeleteBtn from "../../components/action/DeleteBtn";
import PriorityColor from "../priority/PriorityColor";
import UserInfo from "../users/UserInfo";

const ListView = () => {
  const context = useContext(GlobalContext);

  const columns = [
    {
      accessorKey: "title",
      header: "Title",
      cell: (row) => (
        <Box sx={{ width: "200px", textWrap: "wrap" }}>
          <Stack direction="column" spacing={2}>
            <span>{row.getValue()}</span>
            {row.getValue() !== "N/A" && (
              <span>
                <PriorityColor priority={row.row.original.priority} />
              </span>
            )}
          </Stack>
        </Box>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: (row) => (
        <Box sx={{ width: "190px", textWrap: "wrap" }}>{row.getValue()}</Box>
      ),
    },

    {
      accessorKey: "statusName",
      header: "Status",
      cell: (row) => (
        <Box sx={{ width: "100px", textWrap: "wrap", textAlign: "center" }}>
          <Chip label={row.getValue()} color="primary" />
        </Box>
      ),
    },
    {
      accessorKey: "assignTo",
      header: "Assign To",
      cell: (row) => (
        <Box sx={{ width: "60px", textWrap: "wrap" }}>
          <UserInfo users={row.getValue()} />
        </Box>
      ),
    },

    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: (row) => (
        <Box sx={{ width: "80px", textWrap: "wrap" }}>
          {formatDate(row.getValue(), "YYYY-MM-DD")}
        </Box>
      ),
    },

    {
      accessorKey: "endDate",
      header: "End Date",
      cell: (row) => {
        return formatDate(row.getValue(), "YYYY-MM-DD");
      },
    },

    {
      accessorKey: "createAt",
      header: "Create At",
      cell: (row) => (
        <Box sx={{ width: "90px", textWrap: "wrap" }}>
          {formatDate(row.getValue())}
        </Box>
      ),
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
                  "Are you sure you want to delete this todo?",
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
