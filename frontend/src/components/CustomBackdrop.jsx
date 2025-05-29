import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const CustomBackdrop = ({ open }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default CustomBackdrop;

CustomBackdrop.propTypes = {
  open: PropTypes.bool.isRequired,
};
