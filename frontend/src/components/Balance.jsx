export function Balance({balance}) {
    return (
        <div className="flex h-16 items-center px-6 text-lg font-bold">
            Your Balance : ₹{balance}
        </div>
    )
}