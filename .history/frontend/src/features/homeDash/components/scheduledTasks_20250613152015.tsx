import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const ScrollableList: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    // Simulate fetching from a database
    const dummyData = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);
    setItems(dummyData);
  }, []);

  return (
    <Box
      sx={{
        height: 300,               // fixed height
        overflowY: 'auto',         // vertical scroll
        border: '1px solid #ccc',  // optional styling
        borderRadius: 1,
        p: 1,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Scrollable List
      </Typography>
      <List disablePadding>
        {items.map((item) => (
          <ListItem key={item} divider>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ScrollableList;
