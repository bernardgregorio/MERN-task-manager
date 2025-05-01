import { useEffect, useContext } from "react";
import { GlobalContext } from "../../hooks/useContext";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { createTodo, updateTodo } from "../../validations/todo";
import { formatDate } from "../../utils/helper";

const TodoForm = () => {
  const context = useContext(GlobalContext);

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(context.cat === "create" ? createTodo : updateTodo),
  });

  useEffect(() => {
    if (context.record && context.openForm) {
      reset({
        task: context.record.taskName != "N/A" ? context.record.task : 0,
        title: context.record.title || "",
        description: context.record.description || "",
        status: context.record.status || 0,
        assignTo: context.record.assignTo?._id || 0,
        startDate: formatDate(context.record.startDate, "YYYY-MM-DD") || "",
        endDate: formatDate(context.record.endDate, "YYYY-MM-DD") || "",
      });
    }
  }, [context.record, context.openForm, reset]);

  const onSubmit = async (data) => {
    data = {
      ...data,
      startDate: formatDate(data.startDate, "YYYY-MM-DD"),
      endDate: formatDate(data.endDate, "YYYY-MM-DD"),
    };

    if (context.cat === "create") {
      context.openDialog(
        "warning",
        "Are you sure you want to create this todos?",
        () => {
          context.handleCreate(data);
          reset({
            task: 0,
            title: "",
            description: "",
            status: 0,
            assignTo: 0,
            startDate: "",
            endDate: "",
          });
        }
      );
    } else {
      context.openDialog(
        "warning",
        "Are you sure you want to update this todos?",
        () => context.handleUpdate(data)
      );
    }
  };

  return (
    <Box>
      <Dialog
        open={context.openForm}
        onClose={context.handleCloseForm}
        maxWidth="lg"
      >
        <DialogTitle>
          {context.cat === "create" ? "Create Todo" : "Update Todo"}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {Object.keys(errors).length > 0 && (
              <Alert severity="error" className="mb-6">
                {Object.values(errors).map((error, index) => (
                  <div key={index}>{error.message}</div>
                ))}
              </Alert>
            )}
            <Grid container spacing={2}>
              <Grid size={12}>
                <Controller
                  name="task"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="task-label">Task</InputLabel>
                      <Select
                        labelId="task-label"
                        id="task"
                        value={field.value || status}
                        label="task"
                        autoFocus
                        onChange={(event) => {
                          field.onChange(event.target.value);
                        }}
                        inputRef={register("task").ref}
                      >
                        <MenuItem value="0">Select Task</MenuItem>
                        {context.tasks.map((task) => (
                          <MenuItem key={task._id} value={task._id}>
                            {task.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  margin="dense"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  {...register("title")}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  margin="dense"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  {...register("description")}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="status-label">Status</InputLabel>
                      <Select
                        labelId="status-label"
                        id="status"
                        value={field.value || 0}
                        label="status"
                        onChange={(event) => {
                          field.onChange(event.target.value);
                        }}
                        inputRef={register("status").ref}
                      >
                        <MenuItem value="0">Select Status</MenuItem>
                        {context.todoStatuses.map((status) => (
                          <MenuItem key={status._id} value={status._id}>
                            {status.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="assignTo"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="assignTo-label">Assign To</InputLabel>
                      <Select
                        labelId="assignTo-label"
                        id="assignTo"
                        value={field.value || 0}
                        label="assignTo"
                        onChange={(event) => {
                          field.onChange(event.target.value);
                        }}
                        inputRef={register("assignTo").ref}
                      >
                        <MenuItem value="0">Select Developer</MenuItem>
                        {context.users.map((user) => (
                          <MenuItem key={user._id} value={user._id}>
                            <Stack direction="column" spacing={1}>
                              <Typography variant="subtitle1">
                                {user.fullname}
                              </Typography>
                              <Typography variant="subtitle2">
                                {user.title.name} / {user.role.name}
                              </Typography>
                            </Stack>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid size={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Start Date"
                        format="YYYY-MM-DD"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => {
                          const formattedDate = formatDate(date, "YYYY-MM-DD");
                          field.onChange(formattedDate);
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                          },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid size={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Start Date"
                        format="YYYY-MM-DD"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => {
                          const formattedDate = formatDate(date, "YYYY-MM-DD");
                          field.onChange(formattedDate);
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                          },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={context.handleCloseForm} variant="outLined">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default TodoForm;
