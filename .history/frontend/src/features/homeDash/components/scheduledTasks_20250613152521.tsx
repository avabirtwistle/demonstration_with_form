// src/features/homeDash/components/ScrollableList.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Typography,
  ListSubheader,
} from '@mui/material';

interface Item {
  id: number;
  text: string;
  category: string;
}

const ScrollableList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    // Dummy data with categories
    const dummyData: Item[] = [
      { id: 1, text: 'Start seeds',      category: 'Planting'   },
      { id: 2, text: 'Transfer trays',    category: 'Transferring' },
      { id: 3, text: 'Harvest basil',     category: 'Harvesting'  },
      { id: 4, text: 'Check pH level',    category: 'Maintenance' },
      { id: 5, text: 'Record weights',    category: 'Maintenance' },
      { id: 6, text: 'Clean reservoir',   category: 'Maintenance' },
      { id: 7, text: 'Final rinse',       category: 'Cleaning'    },
      // ...more
    ];
    setItems(dummyData);
  }, []);

  const handleComplete = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Group items by category
  const groups = items.reduce((map, item) => {
    if (!map[item.category]) map[item.category] = [];
    map[item.category].push(item);
    return map;
  }, {} as Record<string, Item[]>);

  return (
    <Box
      sx={{
        height: 300,
        border: '1px solid #ccc',
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
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
        <Typography variant="subtitle1">Tasks by Category</Typography>
      </Box>

      {/* Scrollable area */}
      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
        <List disablePadding>
          {Object.entries(groups).map(([category, itemsInCategory]) => (
            <li key={category}>
              <ul>
                <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                  {category}
                </ListSubheader>
                {itemsInCategory.map(item => (
                  <ListItem
                    key={item.id}
                    divider
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        onChange={() => handleComplete(item.id)}
                        inputProps={{ 'aria-label': `complete ${item.text}` }}
                      />
                    }
                  >
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </ul>
            </li>
          ))}

          {items.length === 0 && (
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2, px: 2 }}
            >
              All tasks completed!
            </Typography>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default ScrollableList;
