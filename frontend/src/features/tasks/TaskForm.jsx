import { useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import {
  createTaskValidation,
  updateTaskValidation,
} from "../../validations/task";

import { GlobalContext } from "../../hooks/useContext";
import { formatDate } from "../../utils/helper";

const TaskForm = () => {
  const context = useContext(GlobalContext);

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      context.cat == "update" ? updateTaskValidation : createTaskValidation
    ),
  });

  useEffect(() => {
    if (context.record && context.openForm) {
      reset({
        title: context.record?.title || "",
        description: context.record?.description || "",
        priority: context.record?.priority || 0,
        status: context.record?.status || 0,
        startDate: context.record?.startDate || dayjs().format("YYYY-MM-DD"),
        endDate: context.record?.endDate || dayjs().format("YYYY-MM-DD"),
      });
    }
  }, [context.record, context.openForm, reset]);

  const onSubmit = (data) => {
    data = {
      ...data,
      startDate: formatDate(data.startDate, "YYYY-MM-DD"),
      endDate: formatDate(data.endDate, "YYYY-MM-DD"),
    };

    if (context.cat === "update") {
      context.openDialog(
        "warning",
        "Are you sure you want to update this task?",
        () => context.handleUpdate(data)
      );
    } else {
      context.openDialog(
        "warning",
        "Are you sure you want to create this task?",
        () => {
          context.handleCreate(data);
          reset({
            title: "",
            description: "",
            priority: 0,
            status: 0,
            startDate: dayjs().format("YYYY-MM-DD"),
            endDate: dayjs().format("YYYY-MM-DD"),
          });
        }
      );
    }
  };

  return (
    <Box>
      <Dialog
        open={context.openForm}
        onClose={context.handleCloseForm}
        maxWidth="sm"
      >
        <DialogTitle>
          {context.cat == "update" ? "Update Task" : "Create Task"}
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
                <TextField
                  label="Title"
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  autoFocus
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
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  margin="dense"
                  autoFocus
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
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="priority-label">Priority</InputLabel>
                      <Select
                        labelId="priority-label"
                        id="priority"
                        value={field.value || status}
                        label="priority"
                        onChange={(event) => {
                          field.onChange(event.target.value);
                        }}
                        inputRef={register("priority").ref}
                      >
                        <MenuItem value="0">Select Priority</MenuItem>
                        {context.priorities.map((priority) => (
                          <MenuItem key={priority._id} value={priority._id}>
                            {priority.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
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
                        value={field.value || status}
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
            <Button onClick={context.handleCloseForm} variant="outlined">
              Close
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

export default TaskForm;
