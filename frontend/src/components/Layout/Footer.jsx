import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#FFFFFF",
        color: "#000000",
        borderTop: "1px solid #dddddd78",
        // position: "fixed",
        // bottom: 0,
        // left: 0,
        // zIndex: 1200,
      }}
    >
      <Typography variant="body2">
        Task Management System <strong>created by </strong>
        <strong style={{ color: "#545454" }}>BERNAR</strong>
        <strong style={{ color: "#004aad" }}>DEV</strong>. All Rights Reserved.
        © {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
