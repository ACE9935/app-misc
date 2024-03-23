import { authOptions } from "@/app/api/authOptions";
import SignInTab from "@/components/signIn/SignInTab";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export async function generateMetadata(
    { params, searchParams }: {
      params: { artist: string }
      searchParams: { [key: string]: string | string[] | undefined }
    }
  ) {
   
    return {
      title: `Misc - Signin`,
      icons: {
        icon: '/metax.png',
      },
    }
  }

async function SigninPage() {
    
    return (
        <>
        <div className="p-3 w-full max-w-[40rem] mix-blend-normal relative z-10">
        <SignInTab page/>
    </div>
        <div className="absolute w-full h-full grid place-items-center bg-main mix-blend-multiply">
        </div>
        </> 
     );
}

export default SigninPage;