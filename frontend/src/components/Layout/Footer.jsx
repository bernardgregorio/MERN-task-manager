import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        textAlign: "center",
        padding: "16px",
        backgroundColor: "#FFFFFF",
        color: "#000000",
        borderTop: "1px solid #ddd",
        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 1200,
      }}
    >
      <Typography variant="body2">
        Task Manager <strong>created by</strong>{" "}
        <strong style={{ color: "#1976d2" }}>ISKRIPT</strong>. All Rights
        Reserved. © {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
