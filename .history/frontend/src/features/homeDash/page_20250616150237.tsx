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
      <Grid container spacing={2}>
        {/* Scheduled Tasks */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              bgcolor: '#392E30',    // matching card background
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>
              Scheduled Tasks
            </Typography>
            <Box sx={{ height: 350 }}>
              <ScrollableList />
            </Box>
          </Paper>
        </Grid>

        {/* Nutrient Levels Card */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              bgcolor: '#afbab1',    // matching card background
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
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
