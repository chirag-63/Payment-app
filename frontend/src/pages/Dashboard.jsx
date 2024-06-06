import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export default function Dashboard() {
    return (
        <div>
            <Appbar />
            <div>
                <Balance balance={"1000"} />
                <Users />
            </div>
        </div>
    )
}