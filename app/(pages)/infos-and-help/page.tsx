import MiscTitle from "@/components/MiscTitle";

function InfosPage() {
    return ( 
        <main className="p-3 flex flex-col gap-6">
         <section className="flex flex-col gap-2">
            <MiscTitle>About Us:</MiscTitle>
            <div>
            Welcome to Misc, where we believe in the power of music to inspire, connect, and enrich lives. Our mission is to provide music lovers around the world with a seamless and immersive listening experience, tailored to their unique tastes and preferences. Whether you're discovering new artists, creating playlists for every mood, or connecting with fellow music enthusiasts, our app is designed to be your ultimate companion on your musical journey.
            </div>
         </section>

         <section className="flex flex-col gap-2">
            <MiscTitle>Contact Information:</MiscTitle>
            <div>
            Feel free to contact me in my email adress:<br/>
            <ul>
            <li className="text-main underline">anaselmouden99@gmail.com</li>
            </ul>
            </div>
         </section>
        </main>
     );
}

export default InfosPage;