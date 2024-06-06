import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { BottomWarning } from "../components/BottomWarning";


export default function Signin() {
    return (
        <div className="flex justify-center bg-neutral-400 items-center h-screen">
            <div className="flex flex-col rounded-md p-4 bg-white">
                <Heading label={"Sign In"} />
                <SubHeading text={"Enter your credentials to access your account"} />
                <InputBox placeholder={"example@xyz.com"} label={"Email"} />
                <InputBox placeholder={""} label={"Password"} />
                <div className="pt-4">
                    <Button title={"Sign In"} ></Button>
                </div>
                <BottomWarning text={"Don't have an account? "} link={"Signup"} to={"/signup"}/>
            </div>
        </div>
    )
}