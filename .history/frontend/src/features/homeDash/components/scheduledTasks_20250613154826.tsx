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
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

interface Item {
  id: number;
  text: string;
  category: string;
}

const ScrollableList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const dummyData: Item[] = [
      { id: 1, text: 'Start seeds',    category: 'Planting'    },
      { id: 2, text: 'Transfer trays', category: 'Transferring'},
      { id: 3, text: 'Harvest basil',  category: 'Harvesting'  },
      { id: 4, text: 'Check pH level', category: 'Maintenance' },
      { id: 5, text: 'Clean reservoir',category: 'Maintenance' },
      { id: 6, text: 'Final rinse',    category: 'Cleaning'    },
    ];
    setItems(dummyData);
    // Initialize toggles to show all categories by default
    setSelectedCategories(Array.from(new Set(dummyData.map(i => i.category))));
  }, []);

  const handleComplete = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // all unique categories
  const allCategories = Array.from(new Set(items.map(i => i.category)));

  // group filtered items by category
  const groups = items
    .filter(i => selectedCategories.includes(i.category))
    .reduce((map, item) => {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
      return map;
    }, {} as Record<string, Item[]>);

  return (
    <Box
      sx={{
        height: 350,
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
          zIndex: 2,
        }}
      >
        <Typography variant="subtitle1" gutterBottom>
          Tasks by Category
        </Typography>

        {/* Category toggles */}
        <ToggleButtonGroup
          size="small"
          value={selectedCategories}
          onChange={(_, newCats) => setSelectedCategories(newCats)}
          aria-label="filter categories"
          
        >
          {allCategories.map(cat => (
            <ToggleButton key={cat} value={cat} aria-label={cat}>
              {cat} 
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* Scrollable list area */}
      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
        <List disablePadding>
          {Object.entries(groups).map(([category, itemsInCategory]) => (
            <li key={category}>
              <ul>
                <ListSubheader sx={{ 
                    bgcolor: 'background.paper',
                    textTransform: 'none' }}>
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

          {items.filter(i => selectedCategories.includes(i.category)).length === 0 && (
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2, px: 2 }}
            >
              No tasks in selected categories.
            </Typography>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default ScrollableList;
