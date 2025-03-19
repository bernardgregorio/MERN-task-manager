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
      header: "Task",
      size: 400,
      cell: (row) => (
        <Box sx={{ width: "200px", textWrap: "wrap", textAlign: "center" }}>
          {row.getValue()}
        </Box>
      ),
    },
    {
      accessorKey: "priorityName",
      header: "Priority",
      size: 100,
      cell: (row) => (
        <Box sx={{ width: "80px", textWrap: "wrap", textAlign: "center" }}>
          <PriorityColor priority={row.getValue()} />
        </Box>
      ),
    },
    {
      accessorKey: "statusName",
      header: "Status",
      size: 80,
      cell: (row) => (
        <Box sx={{ width: "100px", textWrap: "wrap", textAlign: "center" }}>
          <Chip label={row.getValue()} color="primary" />
        </Box>
      ),
    },
    {
      accessorKey: "todoCount",
      header: "Todo",
      size: 100,
      cell: (row) => (
        <Box sx={{ width: "20px", textWrap: "wrap", textAlign: "center" }}>
          {row.getValue()}
        </Box>
      ),
    },
    {
      accessorKey: "assignedUsers",
      header: "Team",
      size: 100,
      cell: (row) => <UserInfo users={row.getValue()} />,
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      size: 120,
      cell: (row) => {
        return formatDate(row.getValue(), "YYYY-MM-DD");
      },
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      size: 120,
      cell: (row) => {
        return formatDate(row.getValue(), "YYYY-MM-DD");
      },
    },
    {
      accessorKey: "createAt",
      header: "Create At",
      size: 120,
      cell: (row) => {
        return formatDate(row.getValue());
      },
    },
    {
      accessorKey: "_id",
      header: "Action",
      size: 300,
      cell: (data) => {
        return (
          <Box className="text-center">
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
                    "Are you sure you want to delete this task?",
                    () => context.handleDelete(data.row.original._id)
                  );
                }}
              />
            </Stack>
          </Box>
        );
      },
      enableSorting: false,
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
