import PropTypes from "prop-types";
import { Typography } from "@mui/material";

const PriorityColor = ({ priority }) => {
  let content;

  switch (priority) {
    case "Low":
      content = (
        <Typography variant="subtitle2" color="info">
          {priority}
        </Typography>
      );
      break;
    case "Normal":
      content = (
        <Typography variant="subtitle2" color="success">
          {priority}
        </Typography>
      );
      break;
    case "Medium":
      content = (
        <Typography variant="subtitle2" color="primary">
          {priority}
        </Typography>
      );
      break;
    case "High":
      content = (
        <Typography variant="subtitle2" color="secondary">
          {priority}
        </Typography>
      );
      break;
    case "Urgent":
      content = (
        <Typography variant="subtitle2" color="error">
          {priority}
        </Typography>
      );
      break;
    default:
      content = (
        <Typography variant="subtitle2" color="warning">
          {priority}
        </Typography>
      );
  }

  return content;
};

PriorityColor.propTypes = {
  priority: PropTypes.string.isRequired,
};

export default PriorityColor;
