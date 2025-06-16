import React from 'react'
import { Card, CardContent, Grid, Typography, LinearProgress, Box } from '@mui/material'

export type NutrientLevelsProps = {
  /** Remaining level of Nutrient A as a percentage (0-100) */
  levelA: number
  /** Remaining level of Nutrient B as a percentage (0-100) */
  levelB: number
}

/**
 * Component to display remaining nutrient levels for A and B
 */
const NutrientLevels: React.FC<NutrientLevelsProps> = ({ levelA, levelB }) => {
  return (
    <Card elevation={2} sx={{ borderRadius: 2, p: 2, maxWidth: 400, mx: 'auto', backgroundColor: '#125773'}}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Nutrient A</Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Box flexGrow={1}>
                <LinearProgress variant="determinate" value={Math.max(0, Math.min(100, levelA))} />
              </Box>
              <Typography variant="body2">{`${Math.round(levelA)}%`}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">Nutrient B</Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Box flexGrow={1}>
                <LinearProgress variant="determinate" value={Math.max(0, Math.min(100, levelB))} />
              </Box>
              <Typography variant="body2">{`${Math.round(levelB)}%`}</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default NutrientLevels
