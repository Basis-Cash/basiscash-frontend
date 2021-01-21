import {
  black, boardroom, purple, teal, grey,
  mib, mic, mis, red, white, gold, oblack, treasury,
} from './colors'

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
    oblack,
    mib,
    mic,
    mis,
    treasury,
    boardroom,
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
  topBarSize: 72,
  footerSize: 100
}

export default theme
