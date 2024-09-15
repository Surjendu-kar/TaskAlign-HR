import { Box } from "@mui/material";

function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Not found</h1>
      <p>Unfortunately, we could not find the requested page or resource.</p>
    </Box>
  );
}

export default NotFound;
