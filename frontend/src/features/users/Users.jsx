import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TableChartIcon from "@mui/icons-material/TableChart";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ButtonGroup from "@mui/material/ButtonGroup";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DownloadIcon from "@mui/icons-material/Download";

import { GlobalContext } from "../../hooks/useContext";
import {
  useFetchUsersQuery,
  usePatchUserMutation,
  useCreateUserMutation,
  useDeleteUserMutation,
} from "./userApiSlice";
import { useFetchStatusQuery } from "../status/statusApiSlice";
import { useFetchTitlesQuery } from "../title/titleApiSlice";
import { useFetchRolesQuery } from "../role/roleApiSlice";
import { errorMsg } from "../../utils/helper";
import useConfirmDialog from "../../hooks/useConfirmDialog";
import CustomBackdrop from "../../components/CustomBackdrop";
import BreadcrumbsNav from "../../components/Layout/BreadcrumbsNav";
import BoardView from "./BoardView";
import ListView from "./ListView";
import UserForm from "./UserForm";
import Upload from "./Upload";
import Download from "./Download";

const Users = () => {
  const [record, setRecord] = useState({});
  const [view, setView] = useState(true);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("create");
  const [openForm, setOpenForm] = useState(false);
  const { openDialog, ConfirmDialogComponent } = useConfirmDialog();
  const [boardList, setBoardList] = useState([]);
  const [openUpload, setOpenUpload] = useState(false);
  const [openDownload, setOpenDownload] = useState(false);

  const { data, isError, error, isLoading, isSuccess } = useFetchUsersQuery({
    page,
    limit: pageLimit,
    search,
  });
  const [createNewUser] = useCreateUserMutation();
  const [patchUser] = usePatchUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const { data: statuses, isSuccess: isStatusSuccess } = useFetchStatusQuery();
  const { data: titles, isSuccess: isTitleSuccess } = useFetchTitlesQuery();
  const { data: roles, isSuccess: isRoleSuccess } = useFetchRolesQuery();

  /** list of function */
  const handleSetView = () => {
    setView(!view);
    setPage(1);
    setPageLimit(10);
    setBoardList(boardList.slice(0, 10));
  };

  const handleUpdate = async (data) => {
    try {
      const updatedUser = await patchUser({
        id: context.record._id,
        ...data,
      }).unwrap();
      openDialog("success", "User updated successfully.");

      /** board view */
      if (view) {
        const updatedUserCopy = { ...updatedUser };
        delete updatedUserCopy.__v;
        delete updatedUserCopy.createAt;
        delete updatedUserCopy.createBy;
        delete updatedUserCopy.googleId;
        delete updatedUserCopy.refreshToken;
        delete updatedUserCopy.password;

        const getRoleName = roles.find(
          (role) => role._id === updatedUserCopy.role
        );

        const getTitleName = titles.find(
          (title) => title._id === updatedUserCopy.title
        );

        const getStatusName = statuses.find(
          (status) => status._id === updatedUserCopy.status
        );

        let newUser = {
          ...data,
          ...updatedUserCopy,
          roleName: getRoleName.name,
          titleName: getTitleName.name,
          statusName: getStatusName.name,
        };

        setBoardList((prev) =>
          prev.map((user) =>
            user._id === newUser._id ? { ...data, ...newUser } : user
          )
        );
      }
    } catch (error) {
      openDialog("error", errorMsg(error));
    }
  };

  const handleCreate = async (data) => {
    try {
      await createNewUser(data).unwrap();
      openDialog("success", "User created successfully.");
    } catch (error) {
      openDialog("error", errorMsg(error));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      openDialog("success", "User successfully deleted.");

      /** board view */
      if (view) {
        setBoardList((prev) => prev.filter((user) => user._id !== id));
      }
    } catch {
      openDialog("error", "Failed to delete user.");
    }
  };

  const context = {
    data: isSuccess ? data : [],
    isSuccess,
    statuses: isStatusSuccess ? statuses : [],
    titles: isTitleSuccess ? titles : [],
    roles: isRoleSuccess ? roles : [],
    handleUpdate,
    handleCreate,
    handleDelete,

    record,
    setRecord,
    view,
    setView,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    search,
    setSearch,
    cat,
    setCat,
    openForm,
    setOpenForm,
    openDialog,
    boardList,
    setBoardList,

    openUpload,
    setOpenUpload,
    openDownload,
    setOpenDownload,
  };

  let content;

  if (isError) {
    content = <Box>Error: {error.message}</Box>;
  } else if (isSuccess) {
    content = (
      <GlobalContext.Provider value={context}>
        <Box>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Box flexGrow={1}>
              <BreadcrumbsNav />
            </Box>
            <Box>
              <TextField
                id="search"
                variant="outlined"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const value = e.target.value.trim();
                    setSearch(value ? value : "");
                    setBoardList([]);
                    setPage(1);
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

            <Box>
              <ButtonGroup
                variant="contained"
                color="inherit"
                aria-label="Basic button group"
              >
                <Button
                  startIcon={<FileUploadIcon />}
                  sx={{
                    borderColor: "!#efefef",
                    backgroundColor: "#ffffff",
                    color: "#000",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenUpload(true);
                  }}
                >
                  Upload
                </Button>
                <Button
                  startIcon={<DownloadIcon />}
                  sx={{
                    borderColor: "!#efefef",
                    backgroundColor: "#ffffff",
                    color: "#000",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenDownload(true);
                  }}
                >
                  Download
                </Button>
              </ButtonGroup>
            </Box>

            <Box>
              <Stack direction="row" spacing={0.5}>
                <Button
                  onClick={() => handleSetView()}
                  variant="contained"
                  color="success"
                  startIcon={<TableChartIcon />}
                  sx={{ textTransform: "none" }}
                >
                  View
                </Button>
              </Stack>
            </Box>

            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenForm(true);
                  setCat("create");
                  setRecord({});
                }}
                sx={{ textTransform: "none" }}
                startIcon={<GroupAddIcon />}
              >
                Create User
              </Button>
            </Box>
          </Stack>
          {view ? <BoardView /> : <ListView />}
          <CustomBackdrop open={isLoading} />
          <ConfirmDialogComponent />
          <UserForm />
          <Upload />
          <Download />
        </Box>
      </GlobalContext.Provider>
    );
  }

  return content;
};

export default Users;
