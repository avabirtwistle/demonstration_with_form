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
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
    setAllCategories(Array.from(new Set(dummyData.map(i => i.category))));
  }, []);

  const handleComplete = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const filtered = selectedCategory
    ? items.filter(i => i.category === selectedCategory)
    : items;

  const groups = filtered.reduce((map, item) => {
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
        bgcolor: '#D1EAFD',
      }}
    >
      {/* header + toggles */}
      <Box
        sx={{
          p: 1,
          borderBottom: '1px solid #ddd',
          position: 'sticky',
          top: 0,
          bgcolor: '#073547',
          zIndex: 2,
        }}
      >

        <ToggleButtonGroup
          size="small"
          exclusive
          value={selectedCategory}
          onChange={(_, cat) => setSelectedCategory(cat)}
          aria-label="filter category"
        >
          {allCategories.map(cat => (
            <ToggleButton
              key={cat}
              value={cat}
              aria-label={cat}
              sx={{ textTransform: 'none' }}
            >
              {cat}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* scrollable list area */}
      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
        {/* apply the same horizontal padding as the header (p=1 => 8px) */}
        <List disablePadding sx={{ px: 0 }}>
          {Object.entries(groups).map(([category, itemsInCategory]) => (
            <li key={category}>
              <ul style={{ margin: 0, padding: 0 }}>
                <ListSubheader
                  sx={{ bgcolor: '#125773'}}
                >
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

          {filtered.length === 0 && (
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              No tasks in selected category.
            </Typography>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default ScrollableList;
