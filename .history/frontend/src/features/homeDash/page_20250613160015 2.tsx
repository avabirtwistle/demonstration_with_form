import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ScrollableList from "@/features/homeDash/components/scheduledTasks";

const Page = () => {
  return (
    <>
      <Grid container spacing={2}>
        {/* Heading row */}
        <Grid item xs={12}>
          <Typography variant="h5">
            Welcome to the Home Dashboard
          </Typography>
        </Grid>

        {/* Scrollable list, visually separated */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              bgcolor: "#f5f5f5", // light gray background
              p: 2,
              borderRadius: 2,
            }}
          >
            <ScrollableList />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export { Page as HomeDash };