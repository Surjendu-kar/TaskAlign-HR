"use client";
import React from "react";
import { Stack, styled, Typography } from "@mui/material";

const MainContainer = styled(Stack)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {},
}));

// const AddTaskButtonContainer = styled("div")({
//   display: "flex",
//   justifyContent: "flex-start",
//   width: "100%",
// });

const Heading = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: "bold",
});

export function InboxContent() {
  // const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  // const taskForm = useTaskForm(() => setIsFormOpen(false));

  return (
    <MainContainer>
      <Heading>Inbox</Heading>
      {/* <AddTaskButtonContainer>
        {!isFormOpen ? (
          <AddTaskButton setIsFormOpen={setIsFormOpen} />
        ) : (
          <TaskPopup onClose={() => setIsFormOpen(false)} {...taskForm} />
        )}
      </AddTaskButtonContainer> */}
    </MainContainer>
  );
}
