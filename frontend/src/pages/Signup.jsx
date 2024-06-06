import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { BottomWarning } from "../components/BottomWarning";


export default function Signup() {
    return (
        <div className="flex justify-center bg-neutral-400 items-center h-screen">
            <div className="flex flex-col rounded-md p-4 bg-white">
                <Heading label={"Sign Up"} />
                <SubHeading text={`Enter your information to create an account`} />
                <InputBox placeholder={"John"} label={"First Name"} />
                <InputBox placeholder={"Doe"} label={"Last Name"} />
                <InputBox placeholder={"example@xyz.com"} label={"Email"} />
                <InputBox placeholder={""} label={"Password"} />
                <div className="pt-4">
                    <Button title={"Sign Up"} ></Button>
                </div>
                <BottomWarning text={"Already have account? "} link={"Signin"} to={"/signin"} />
            </div>
        </div>
    )
}