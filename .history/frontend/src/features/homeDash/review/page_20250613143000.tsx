import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Page = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Welcome to the Home Dashboard
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export { Page as HomeDash };
