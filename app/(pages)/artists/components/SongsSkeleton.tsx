import { Box, Skeleton } from "@mui/material";

function SongsSkeleton() {
    return ( 
        <div className='flex flex-col gap-6 pt-6 p-3'>{
            Array.from({ length: 5 }, (_, index) => (
          <Box className='flex gap-3 items-center' key={index}>
            <Skeleton width='4rem' height="4rem" variant='circular'/>
            <Box className='flex flex-col gap-2'>
            <Skeleton width='15rem' variant='rectangular'/>
            <Skeleton width='10rem' variant='rectangular'/>
            </Box>
          </Box>
        ))
            }
        </div>
     );
}

export default SongsSkeleton;