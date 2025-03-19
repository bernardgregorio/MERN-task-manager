import { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { Typography } from "@mui/material";
import { useFetchUsersQuery } from "../users/userApiSlice";
import { formatDate } from "../../utils/helper";
import Tanstack from "../../components/table/Tanstack";

const User = () => {
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { data, error, isLoading, isSuccess } = useFetchUsersQuery({
    page,
    limit: pageLimit,
    search,
  });

  const columns = [
    {
      accessorKey: "fullname",
      header: "Name",
      size: 100,
      accessorFn: (row) => (
        <Box>
          <Typography variant="body2">{row.fullname}</Typography>
          <Typography color="text.secondary" sx={{ fontSize: 12 }}>
            {row.titleName}
          </Typography>
        </Box>
      ),
      cell: (row) => row.getValue(),
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
    );
  }

  return content;
};

export default User;
