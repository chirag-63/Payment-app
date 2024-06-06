export function InputBox({ placeholder, label }) {
    return (
        <div className="pb-3">
            <div className="text-sm font-semibold pb-1">
                {label}
            </div>
            <div className="border-[0.8px] border-gray-300 rounded-md">
                <input className="text-base px-2 w-[100%] rounded-md h-9 outline-none"
                    type="text" placeholder={placeholder} />
            </div>

        </div>
    )
}