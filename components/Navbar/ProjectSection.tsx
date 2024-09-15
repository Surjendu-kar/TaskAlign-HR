import { Box, styled, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ProjectHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#202020",
}));

const ProjectSection = () => (
  <Box>
    <ProjectHeader>
      <Typography variant="subtitle2">My Projects</Typography>
      <ExpandMoreIcon fontSize="small" />
    </ProjectHeader>
  </Box>
);

export default ProjectSection;
