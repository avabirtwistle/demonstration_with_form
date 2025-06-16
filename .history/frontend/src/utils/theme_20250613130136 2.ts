import { Link } from "@/components/link";
import { createTheme } from "@mui/material";

const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        // 👇 Sets pink as the full background color
        background: {
          default: "#ff69b4", // 💖 hot pink full-screen background
          paper: "#ffc0cb",   // soft pink for Paper components (cards, content blocks)
        },
        // 👇 Optional: tweak text so it stays readable on pink
        text: {
          primary: "#000000",   // black text
          secondary: "#4b4b4b", // dark gray for subtitles, etc.
        },
        // 👇 Primary color for buttons, links, etc. (can be the same or a contrast color)
        primary: {
          main: "#c2185b", // darker pink for contrast
        },
      },
    },
  },

  components: {
    MuiLink: {
      defaultProps: {
        component: Link,
      },
    },
    MuiTextField: {
      defaultProps: {
        slotProps: {
          inputLabel: {
            shrink: true,
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: Link,
      },
    },
  },
});

export { theme };
