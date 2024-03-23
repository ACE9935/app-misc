"use client";
import { Drawer, DrawerProps,useTheme } from "@mui/material";
export interface Props {
    openDrawer?:boolean
    handleCloseDrawer?:()=>void
    children?:React.ReactElement
  }

export function MyDrawer({openDrawer,handleCloseDrawer,children}:Props) {
    const theme=useTheme()
    return ( 
        <Drawer className="lg:hidden" open={openDrawer} onClose={handleCloseDrawer} sx={{'.MuiDrawer-paper':{background:"white"}}}>{children}</Drawer>
     );
}
