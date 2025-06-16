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

  {/* Spacer column */}
  <Grid item xs={false} md={3} />

  {/* List column */}
  <Grid item xs={12} md={6}>
    <ScrollableList />
  </Grid>
      </Grid>
    </>
    
  );
};

export { Page as HomeDash };
