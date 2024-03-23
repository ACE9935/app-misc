import { ReactNode } from "react";

function SignInBtnBasic({children,handleClick,style,disabled,...props}:{disabled?:boolean,children:ReactNode,handleClick?:()=>any,style?:Object}) {
    return ( 
        <button {...props} disabled={disabled} style={style} onClick={handleClick} className='hover:bg-main hover:text-white w-fit h-fit transition font-bold rounded-full p-2 px-5 border-2 border-main'>{children}</button>
     );
}

export default SignInBtnBasic;