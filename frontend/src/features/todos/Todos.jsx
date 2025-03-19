import { useState } from "react";
import { GlobalContext } from "../../hooks/useContext";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TableChartIcon from "@mui/icons-material/TableChart";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import {
  useFetchTodosQuery,
  useCreateTodosMutation,
  usePatchByIdMutation,
  useDeleteByIdMutation,
} from "./todosApiSlice";

import { useFetchTodoStatusesQuery } from "../todostatus/todoStatusApiSlice";
import { useFetchUserListQuery } from "../users/userApiSlice";
import { useGetAllTaskByStatusQuery } from "../tasks/taskApiSlice";

import { errorMsg } from "../../utils/helper";
import useConfirmDialog from "../../hooks/useConfirmDialog";
import CustomBackdrop from "../../components/CustomBackdrop";
import BreadcrumbsNav from "../../components/Layout/BreadcrumbsNav";
import BoardView from "./BoardView";
import ListView from "./ListView";
import TodoForm from "./TodoForm";

const Todos = () => {
  const [record, setRecord] = useState({});
  const [view, setView] = useState(true);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("create");
  const [openForm, setOpenForm] = useState(false);
  const { openDialog, ConfirmDialogComponent } = useConfirmDialog();
  const [boardList, setBoardList] = useState([]);

  const { data, isError, error, isLoading, isSuccess } = useFetchTodosQuery({
    page,
    limit: pageLimit,
    search,
  });
  const [createNewUser] = useCreateTodosMutation();
  const [patchUser] = usePatchByIdMutation();
  const [deleteUser] = useDeleteByIdMutation();

  const { data: todoStatuses, isSuccess: isTodoStatusSuccess } =
    useFetchTodoStatusesQuery();
  const { data: users, isSuccess: isUsersSuccess } = useFetchUserListQuery();
  const { data: tasks, isSuccess: isTasksSuccess } =
    useGetAllTaskByStatusQuery();

  /** list of function */
  const handleSetView = () => {
    setView(!view);
    setPage(1);
    setPageLimit(10);
    setBoardList(boardList.slice(0, 10));
  };
  const handleCloseForm = () => {
    setOpenForm(false);
    setRecord({});
  };

  const handleUpdate = async (data) => {
    try {
      const updatedTodo = await patchUser({
        id: context.record._id,
        ...data,
      }).unwrap();
      openDialog("success", "Todo updated successfully.");

      /** board view */
      if (view) {
        const getNewUser = users.find((user) => user._id === data.assignTo);
        const getNewTask = tasks.find((task) => task._id === data.task);
        const getNewStatus = todoStatuses.find(
          (status) => status._id === data.status
        );

        data = {
          ...updatedTodo,
          assignTo: getNewUser,
          taskName: getNewTask.title,
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
      openDialog("success", "Todo created successfully.");
    } catch (error) {
      openDialog("error", errorMsg(error));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      openDialog("success", "Todo successfully deleted.");

      /** board view */
      if (view) {
        setBoardList((prev) => prev.filter((todo) => todo._id !== id));
      }
    } catch {
      openDialog("error", "Failed to delete todo.");
    }
  };

  const context = {
    data: isSuccess ? data : [],
    isSuccess,
    todoStatuses: isTodoStatusSuccess ? todoStatuses : [],
    users: isUsersSuccess ? users : [],
    tasks: isTasksSuccess ? tasks : [],
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
    handleCloseForm,
    openDialog,
    boardList,
    setBoardList,
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
                Create Todo
              </Button>
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
          </Stack>
          {view ? <BoardView /> : <ListView />}
          <CustomBackdrop open={isLoading} />
          <ConfirmDialogComponent />
          <TodoForm />
        </Box>
      </GlobalContext.Provider>
    );
  }

  return content;
};

export default Todos;
