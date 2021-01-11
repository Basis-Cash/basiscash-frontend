import { black, purple, teal, grey, red, white, gold } from './colors'

const theme = {
  borderRadius: 12,
  color: {
    black,
    grey,
    purple,
    gold,
    primary: {
      // light: red[200],
      main: gold,
    },
    secondary: {
      main: teal[200],
    },
    white,
    teal,
  },
  siteWidth: 1200,
  spacing: {
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    7: 64,
  },
  topBarSize: 72
}

export default theme
