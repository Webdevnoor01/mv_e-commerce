import { useState } from "react";
import { Link } from "react-router-dom";

// React icons
import { AiOutlineGooglePlus, AiOutlineGithub } from "react-icons/ai";
import { CiTwitter } from "react-icons/ci";
import { FiFacebook } from "react-icons/fi";

// Shared Components
import SignupOption from "../../../components/shared/signup-option";
import InputGroup from "../../../components/shared/Input-group";
import Button from "../../../components/ui/button";

// Custome hooks
import useForm from "../../../hooks/useForm";

// signup form data
import signupFormObj from "./signup.json";

const Register = () => {
  const { formState, handleChange, handleSubmit } = useForm({
    formState: signupFormObj,
  });

  return (
    <div className="min-w-screen min-h-screen bg-[#161d31] flex justify-center items-center">
      <div className="w-[350px] text-[#d0d2d6] p-2">
        <div className="bg-[#283046] p-4 rounded-md">
          <h2 className="text-xl mb-3">Welcome to e-commerce</h2>
          <p className="text-sm mb-3">
            Please signin to your account and start your bussiness
          </p>

          <form onSubmit={handleSubmit}>
            <InputGroup
              htmlFor="name"
              lable="Name"
              type="text"
              placeholder="Jon Doo"
              onChange={handleChange}
              value={formState.name.value}
            />
            <InputGroup
              htmlFor="email"
              lable="Email"
              type="email"
              placeholder="example123@gmail.com"
              onChange={handleChange}
              value={formState.email.value}
            />
            <InputGroup
              htmlFor="password"
              lable="Password"
              type="password"
              placeholder="Abcd@1234"
              onChange={handleChange}
              value={formState.password.value}
            />
            <Button btnTxt={"SIGN UP"} type={"submit"} />
            <div className="flex item-center mb-3 gap-3 justify-center">
              <p>
                Already have an account ? <Link to="/login">Login here</Link>
              </p>
            </div>
            <div className="w-full flex justify-center items-center mb-3">
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
              <div className="w-[10%] flex justify-center items-center ">
                <span className="pb-1">Or</span>
              </div>
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
            </div>

            <div className="flex justify-center items-center gap-3">
              <SignupOption
                bgColor={"bg-orange-700"}
                Icon={AiOutlineGooglePlus}
              />
              <SignupOption bgColor={"bg-indigo-700"} Icon={FiFacebook} />
              <SignupOption bgColor={"bg-cyan-700"} Icon={CiTwitter} />
              <SignupOption bgColor={"bg-purple-700"} Icon={AiOutlineGithub} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
