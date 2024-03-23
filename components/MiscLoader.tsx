
import { Logo } from "./Logo";

function MiscLoader() {
    return (
        <div className="grid place-items-center w-full h-[90vh]">
            <div className="misc-loader-logo">
                <Logo className="text-[2rem] sm:text-[3rem]"/>
            </div>
        </div>
    );
}

export default MiscLoader;