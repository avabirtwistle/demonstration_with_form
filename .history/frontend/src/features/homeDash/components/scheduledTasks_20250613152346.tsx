// src/features/homeDash/components/ScrollableList.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Typography,
} from '@mui/material';

const ScrollableList: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    // Simulate fetching from a database
    const dummyData = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);
    setItems(dummyData);
  }, []);

  const handleComplete = (itemToRemove: string) => {
    setItems((prev) => prev.filter((item) => item !== itemToRemove));
  };

  return (
    <Box
      sx={{
        height: 300,
        overflowY: 'auto',
        border: '1px solid #ccc',
        borderRadius: 1,
        p: 1,
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        Scrollable List
      </Typography>
      <List disablePadding>
        {items.map((item) => (
          <ListItem
            key={item}
            divider
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={() => handleComplete(item)}
                inputProps={{ 'aria-label': `complete ${item}` }}
              />
            }
          >
            <ListItemText primary={item} />
          </ListItem>
        ))}
        {items.length === 0 && (
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            All items completed!
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default ScrollableList;
