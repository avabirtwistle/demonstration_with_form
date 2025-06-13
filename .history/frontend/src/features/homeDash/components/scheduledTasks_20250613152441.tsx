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
    const dummyData = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);
    setItems(dummyData);
  }, []);

  const handleComplete = (itemToRemove: string) => {
    setItems(prev => prev.filter(item => item !== itemToRemove));
  };

  return (
    <Box
      sx={{
        height: 300,
        border: '1px solid #ccc',
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden', // hide scrollbars on the wrapper
      }}
    >
      {/* Sticky header */}
      <Box
        sx={{
          p: 1,
          borderBottom: '1px solid #ddd',
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          zIndex: 1,
        }}
      >
        <Typography variant="subtitle1">Scrollable List</Typography>
      </Box>

      {/* Scrollable list area */}
      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
        <List disablePadding>
          {items.map(item => (
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
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2, px: 2 }}
            >
              All items completed!
            </Typography>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default ScrollableList;
