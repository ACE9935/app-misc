import { ReactNode } from "react";

function SignInBtnBasicFilled({disabled,children,handleClick,style,type}:{children:ReactNode,handleClick?:()=>any,style?:Object,disabled?:boolean,type?:"submit" | "reset" | "button" | undefined}) {
    return ( 
        <button type={type} disabled={disabled} style={style} onClick={handleClick} className='bg-main w-fit h-fit transition font-bold rounded-full p-2 px-5 text-white border-2 border-main'>{children}</button>
     );
}

export default SignInBtnBasicFilled;