'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary:{
        main:'rgba(0,0,0,0.88)',
        light:'rgba(0,0,0,0.78)'
      },
      secondary:{
        main:'#e91e63',
        dark:'#c2185b',
        light:'#f06292',
      },
      error:{
        main:"#ff540a"
      }
    },
    components: {
      /*MuiListItemButton: {
        styleOverrides:{
         root:{'fontWeight':'bold'}
        }
   }*/
  }
  });

  export default theme;