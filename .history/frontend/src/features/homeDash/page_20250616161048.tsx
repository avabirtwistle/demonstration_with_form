// src/features/homeDash/page.tsx
import React from 'react'
import { Typography, Paper, Box, Container } from "@mui/material"
import Grid from "@mui/material/Grid2"
import ScrollableList from "@/features/homeDash/components/scheduledTasks"
import NutrientLevels from "@/features/homeDash/components/nutrientLevel"  // Import your nutrient levels component

const Page = () => {
  // Sample values for nutrient levels; replace with real data or hooks as needed
  const levelA = 68  
  const levelB = 42  

  return (
    // Change Container background via sx
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        bgcolor: '#E0E0E0',       // lighter background for the entire page
        minHeight: '100vh',       // ensure full height
      }}
    >
      <Grid container spacing={10}>
        {/* Scheduled Tasks */}
                  <Paper
            elevation={4}
            sx={{
              p: 2,
              bgcolor: '#B9B9B9',    // matching card background
              borderRadius: 2,
            }}
          >
        <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom sx={{ color: '#0E1304' }}>
              Scheduled Tasks
            </Typography>
              <ScrollableList />
        </Grid>
</Paper>
        {/* Nutrient Levels Card */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              bgcolor: '#FFFFFF',    // matching card background
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ color: '#0E1304' }}>
                        Nutrient Levels Remaining
            </Typography>
            <Box>
              <NutrientLevels levelA={levelA} levelB={levelB} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export { Page as HomeDash }
