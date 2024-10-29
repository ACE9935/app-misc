import MiscTitle from "@/components/MiscTitle";
import { Instagram } from "@mui/icons-material";

function InfosPage() {
    return ( 
        <main className="p-3 flex flex-col gap-6">
         <section className="flex flex-col gap-2">
            <MiscTitle>About Us:</MiscTitle>
            <div>
            Welcome to Misc, I made this project for fun!
            </div>
         </section>

         <section className="flex flex-col gap-2">
            <MiscTitle>Contact Information:</MiscTitle>
            <div className="flex flex-col gap-3">
            Feel free to contact me anytime:<br/>
            <ul className="flex flex-col gap-2">
            <li><p className="text-lg font-semibold inline-block">Portfolio:</p> <a className="text-main underline" target="_blank" href="https://anas-elmouden-portfolio.vercel.app/">anas-elmouden-portfolio.vercel.app</a></li>
            <li><p className="text-lg font-semibold inline-block">Email:</p> <span className="text-main underline">anaselmouden99@gmail.com</span></li>
            <li className="text-main"><a target="_blank" href="https://www.instagram.com/anas_elmouden12/"><Instagram sx={{fontSize:30}}/>  <span className="underline">@anas_elmouden12</span></a></li>
            </ul>
            </div>
         </section>
        </main>
     );
}

export default InfosPage;
