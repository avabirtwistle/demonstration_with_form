import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ScrollableList from "@/features/homeDash/components/scheduledTasks";

const Page = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Welcome to the Home Dashboard
          </Typography>
        </Grid>

<Grid container spacing={2} justifyContent="flex-end">
  <Grid item xs={12}>
    <Typography variant="h5">Welcome to the Home Dashboard</Typography>
  </Grid>

  {/* Right-aligned */}
  <Grid item xs={12} md={4}>
    <ScrollableList />
  </Grid>
</Grid>

      </Grid>
    </>
  );
};

export { Page as HomeDash };
