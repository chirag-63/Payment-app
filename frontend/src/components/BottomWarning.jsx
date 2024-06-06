import { Link } from "react-router-dom"

export function BottomWarning({ text, link, to }) {
    return (
        <div className="text-black font-normal text-normal flex justify-center items-center pt-4" >
            {text}
            <Link className="pl-1 hover:cursor-pointer hover:underline select-none" to={to}>
                {link}
            </Link>
        </div>
    )
}