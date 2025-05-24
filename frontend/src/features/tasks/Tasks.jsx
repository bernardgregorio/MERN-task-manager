import { useState } from "react";
import { GlobalContext } from "../../hooks/useContext";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TableChartIcon from "@mui/icons-material/TableChart";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import DownloadIcon from "@mui/icons-material/Download";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ButtonGroup from "@mui/material/ButtonGroup";
import TaskIcon from "@mui/icons-material/Assignment";

import {
  useFetchTasksQuery,
  useCreateTaskMutation,
  usePatchTaskByIdMutation,
  useDeleteTaskByIdMutation,
} from "./taskApiSlice";

import { useFetchTodoStatusesQuery } from "../todostatus/todoStatusApiSlice";
import { useFetchPrioritiesQuery } from "../priority/priorityApiSlice";

import { errorMsg } from "../../utils/helper";
import useConfirmDialog from "../../hooks/useConfirmDialog";
import CustomBackdrop from "../../components/CustomBackdrop";
import BreadcrumbsNav from "../../components/Layout/BreadcrumbsNav";
import BoardView from "./BoardView";
import ListView from "./ListView";
import TaskForm from "./TaskForm";
import Upload from "./Upload";

const Tasks = () => {
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

  const { data, isError, error, isLoading, isSuccess } = useFetchTasksQuery({
    page,
    limit: pageLimit,
    search,
  });
  const [createNewUser] = useCreateTaskMutation();
  const [patchUser] = usePatchTaskByIdMutation();
  const [deleteUser] = useDeleteTaskByIdMutation();

  const { data: todoStatuses, isSuccess: isTodoStatusSuccess } =
    useFetchTodoStatusesQuery();
  const { data: priorities, isSuccess: isPrioritySuccess } =
    useFetchPrioritiesQuery();

  /** list of function */
  const handleSetView = () => {
    setView(!view);
    setPage(1);
    setPageLimit(10);
    setBoardList(boardList.slice(0, 10));
  };

  const handleUpdate = async (data) => {
    try {
      const updatedTask = await patchUser({
        id: context.record._id,
        ...data,
      }).unwrap();
      openDialog("success", "Task updated successfully.");

      /** board view */
      if (view) {
        const getNewPriority = priorities.find(
          (priority) => priority._id === data.priority
        );
        const getNewStatus = todoStatuses.find(
          (status) => status._id === data.status
        );

        data = {
          ...updatedTask,
          priorityName: getNewPriority.name,
          statusName: getNewStatus.name,
        };
        setBoardList((prevTodos) =>
          prevTodos.map((t) => (t._id === data._id ? { ...t, ...data } : t))
        );
      }
    } catch (error) {
      openDialog("error", errorMsg(error));
    }
  };

  const handleCreate = async (data) => {
    try {
      await createNewUser(data).unwrap();
      openDialog("success", "Task created successfully.");
    } catch (error) {
      openDialog("error", errorMsg(error));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      openDialog("success", "Task successfully deleted.");

      /** board view */
      if (view) {
        setBoardList((prev) => prev.filter((data) => data._id !== id));
      }
    } catch {
      openDialog("error", "Failed to delete task.");
    }
  };

  const context = {
    data: isSuccess ? data : [],
    isSuccess,
    todoStatuses: isTodoStatusSuccess ? todoStatuses : [],
    priorities: isPrioritySuccess ? priorities : [],
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
              </ButtonGroup>
            </Box>

            <Box>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleSetView()}
                sx={{ textTransform: "none" }}
                startIcon={<TableChartIcon />}
              >
                View
              </Button>
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
                startIcon={<TaskIcon />}
              >
                Create Task
              </Button>
            </Box>
          </Stack>
          {view ? <BoardView /> : <ListView />}
          <CustomBackdrop open={isLoading} />
          <ConfirmDialogComponent />
          <TaskForm />
          <Upload />
          <Download />
        </Box>
      </GlobalContext.Provider>
    );
  }

  return content;
};

export default Tasks;
