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

              {/* put your scrollable list in its own grid cell */}
      <Grid item xs={12} md={6}>
        <ScrollableList />
      </Grid>
    </Grid>
      </Grid>
    </>
  );
};

export { Page as HomeDash };
