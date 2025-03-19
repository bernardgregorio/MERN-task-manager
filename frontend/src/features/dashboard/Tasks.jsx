import { useState } from "react";
import Tanstack from "../../components/table/Tanstack";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import { useFetchTasksQuery } from "../tasks/taskApiSlice";
import { formatDate } from "../../utils/helper";
import PriorityColor from "../priority/PriorityColor";
import UserInfo from "../users/UserInfo";

const Tasks = () => {
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { data, error, isLoading, isSuccess } = useFetchTasksQuery({
    page,
    limit: pageLimit,
    search,
  });

  const columns = [
    { accessorKey: "title", header: "Task", size: 300 },
    {
      accessorKey: "priorityName",
      header: "Priority",
      size: 100,
      cell: (row) => (
        <Box className="text-center">
          <PriorityColor priority={row.getValue()} />
        </Box>
      ),
    },
    {
      accessorKey: "statusName",
      header: "Status",
      size: 80,
      cell: (row) => (
        <Box className="text-center">
          <Chip label={row.getValue()} color="primary" />
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
      accessorKey: "createAt",
      header: "Create At",
      size: 100,
      cell: (row) => {
        return formatDate(row.getValue());
      },
    },
  ];
  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (error) {
    content = "";
  }

  if (isSuccess) {
    content = (
      <>
        <Tanstack
          data={data.data}
          columns={columns}
          page={page}
          setPage={setPage}
          totalData={data.totalDocuments}
          totalPage={data.totalPages}
          pageLimit={pageLimit}
          setPageLimit={setPageLimit}
          setSearch={setSearch}
          showSearch={false}
          showPagination={false}
        />
      </>
    );
  }

  return content;
};

export default Tasks;
