
import Typography from '@mui/material/Typography';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { Theme,Box } from '@mui/material';
import { useTheme } from '@mui/material';
import Link from 'next/link';

export const Logo=({interactive,link,className,textColor}:{interactive?:boolean,link?:boolean,className?:string,textColor?:string})=>{
    const themex=useTheme()

return (<Box 
  component={link ? Link : 'div'}
  className={className}
  href={link ? '/' : undefined} sx={{display:'flex',alignItems:'center',flexGrow:1}}>
<AudiotrackIcon sx={{fontSize:"2.2em"}}/>
            <Typography sx={{
                color:textColor || themex.palette.secondary.main,
                '&:hover:after':{
                    width:'95%'
                 },
                 ...(!interactive ? {} : {
                    '&:after': {
                      content: '""',
                      transition: themex.transitions.create(['width'], {
                        duration: themex.transitions.duration.standard,
                      }),
                      display: 'block',
                      position: 'absolute',
                      bottom: '6%',
                      width: '40%',
                      height: '4px',
                      background: 'black',
                    }
                  })
                }} variant="h6" component="div" className='relative cursor-pointer !text-[2em] !font-bold'>
              Misc
            </Typography>
</Box>)
}
