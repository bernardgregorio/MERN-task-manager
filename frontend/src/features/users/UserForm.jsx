import { useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUser, createUser } from "../../validations/user";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { GlobalContext } from "../../hooks/useContext";
import { formatDate } from "../../utils/helper";

const UserForm = () => {
  const context = useContext(GlobalContext);

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(context.cat == "update" ? updateUser : createUser),
  });

  useEffect(() => {
    if (context.record && context.openForm) {
      reset({
        fullname: context.record?.fullname || "",
        username: context.record?.username || "",
        status: context.record?.status || 0,
        role: context.record?.role || 0,
        title: context.record?.title || 0,
        password: "",
        confirmPassword: "",
        email: context.record?.email || "",
        expirationDate:
          formatDate(context.record.expirationDate, "YYYY-MM-DD") || "",
      });
    }
  }, [context.record, context.openForm, reset]);

  const onSubmit = async (data) => {
    data = {
      ...data,
      expirationDate: formatDate(data.expirationDate, "YYYY-MM-DD"),
    };

    if (data.password === null || data.password === "") {
      delete data.password;
    }

    if (context.cat === "update") {
      await context.openDialog(
        "warning",
        "Are you sure you want to update this user?",
        () => context.handleUpdate(data)
      );
    } else {
      await context.openDialog(
        "warning",
        "Are you sure you want to create this user?",
        () => {
          context.handleCreate(data);
          reset({
            fullname: "",
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
            expirationDate: "",
            status: 0,
            role: 0,
            title: 0,
          });
        }
      );
    }
  };

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={context.openForm}
        onClose={context.handleCloseForm}
        id="user-form"
        className="font-roboto"
      >
        <DialogTitle id="alert-dialog-title">
          {context.cat === "create" ? "Create User" : "Update User"}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {context.cat === "update" && (
              <Alert severity="info" className="mb-6">
                Leave password blank if you don&apos;t want to change it.
              </Alert>
            )}

            {Object.keys(errors).length > 0 && (
              <Alert severity="error" className="mb-6">
                {Object.values(errors).map((error, index) => (
                  <div key={index}>{error.message}</div>
                ))}
              </Alert>
            )}
            <Grid container spacing={2}>
              <Grid size={12}>
                <Divider>
                  <Typography variant="subtitle2">User Credentials</Typography>
                </Divider>
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Username"
                  placeholder="Enter username"
                  variant="outlined"
                  type="text"
                  margin="dense"
                  autoFocus
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  {...register("username")}
                  error={!!errors?.username}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Password"
                  placeholder="Enter password"
                  variant="outlined"
                  type="password"
                  margin="dense"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  {...register("password")}
                  error={!!errors?.password}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  placeholder="Confirm password"
                  variant="outlined"
                  type="password"
                  margin="dense"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  {...register("confirmPassword")}
                  error={!!errors?.confirmPassword}
                />
              </Grid>
              <Grid size={12}>
                <Divider>
                  <Typography variant="subtitle2">User Details</Typography>
                </Divider>
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Fullname"
                  placeholder="Enter fullname"
                  variant="outlined"
                  type="text"
                  margin="dense"
                  autoFocus
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  {...register("fullname")}
                  error={!!errors?.fullname}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  placeholder="Enter email address"
                  variant="outlined"
                  type="email"
                  margin="dense"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  {...register("email")}
                  error={!!errors?.email}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="title-label">Title</InputLabel>
                      <Select
                        labelId="title-label"
                        id="title"
                        fullWidth
                        value={field.value || 0}
                        label="title"
                        onChange={(event) => {
                          field.onChange(event.target.value);
                        }}
                        inputRef={register("title").ref}
                        error={!!errors?.title}
                      >
                        <MenuItem value="0">Select a Title</MenuItem>
                        {context.titles?.length > 0 &&
                          context.titles.map((status) => (
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
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="role-label">Role</InputLabel>
                      <Select
                        labelId="role-label"
                        id="role"
                        fullWidth
                        value={field.value || 0}
                        label="role"
                        onChange={(event) => {
                          field.onChange(event.target.value);
                        }}
                        inputRef={register("role").ref}
                        error={!!errors?.role}
                      >
                        <MenuItem value="0">Select a Role</MenuItem>
                        {context.roles?.length > 0 &&
                          context.roles.map((status) => (
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
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="status-label">Status</InputLabel>
                      <Select
                        labelId="status-label"
                        id="status"
                        fullWidth
                        value={field.value || 0}
                        label="status"
                        onChange={(event) => {
                          field.onChange(event.target.value);
                        }}
                        inputRef={register("status").ref}
                        error={!!errors?.status}
                      >
                        <MenuItem value="0">Select a Status</MenuItem>
                        {context.statuses?.length > 0 &&
                          context.statuses.map((status) => (
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
                    name="expirationDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Expiration Date"
                        format="YYYY-MM-DD"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => {
                          const formattedDate =
                            dayjs(date).format("YYYY-MM-DD");
                          field.onChange(formattedDate);
                        }}
                        inputRef={register("expirationDate").ref}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                          },
                        }}
                        error={!!errors?.expirationDate}
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
    </>
  );
};

export default UserForm;
