// src/features/homeDash/page.tsx
import { Typography, Paper, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ScrollableList from "@/features/homeDash/components/scheduledTasks";

const Page = () => {
  return (
    <Grid container spacing={2}>
      {/* Heading in its own card */}
      <Grid item xs={12}>
        <Paper
          elevation={2}
          sx={{
            p: 2,
            backgroundColor: "background.paper", // usually white
            borderRadius: 2,
          }}
        >
          <Typography variant="h5">
            Welcome to the Home Dashboard
          </Typography>
        </Paper>
      </Grid>

      {/* Scrollable List in its own card */}
      <Grid item xs={12} md={6}>
        <Paper
          elevation={2}
          sx={{
            p: 2,
            backgroundColor: "background.paper",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Scheduled Tasks
          </Typography>
          <Box sx={{ height: 350 }}>
            <ScrollableList />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export { Page as HomeDash };
