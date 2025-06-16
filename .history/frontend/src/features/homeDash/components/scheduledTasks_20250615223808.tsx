--- a/src/features/homeDash/components/ScrollableList.tsx
+++ b/src/features/homeDash/components/ScrollableList.tsx
@@ return (
     <Box
       sx={{
         height: 350,
         border: '1px solid #ccc',
         borderRadius: 1,
         display: 'flex',
         flexDirection: 'column',
         overflow: 'hidden',
         bgcolor: '#B2D2A4',
+        width: '100%',             // ensure full width
+        boxSizing: 'border-box',   // include padding in width
       }}
     >
       {/* header + toggles */}
       <Box
         sx={{
-          p: 1,
+          p: 1,
+          width: '100%',             // match parent
+          boxSizing: 'border-box',   // include padding
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

       {/* list area */}
-      <Box sx={{ overflowY: 'auto', flexGrow: 1, px: 1 }}>
+      <Box
+        sx={{
+          overflowY: 'auto',
+          flexGrow: 1,
+          px: 1,                    // same horizontal padding
+          width: '100%',            // match parent
+          boxSizing: 'border-box',  // include padding in width
+        }}
+      >
         <List disablePadding>
           {Object.entries(groups).map(([category, itemsInCategory]) => (
             <li key={category}>
               <ul style={{ margin: 0, padding: 0 }}>
                 <ListSubheader
                   sx={{
                     bgcolor: 'background.paper',
                     textTransform: 'none',
                   }}
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
                         inputProps={{
                           'aria-label': `complete ${item.text}`,
                         }}
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
