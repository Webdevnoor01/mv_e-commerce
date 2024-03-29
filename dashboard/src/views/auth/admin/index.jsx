import { useEffect } from "react";
// react-router-dom
import { useNavigate } from "react-router-dom";

// react-redux
import { useDispatch, useSelector } from "react-redux";

// react-hook-form
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// eslint-disable-next-line quotes
import * as yup from "yup";

// actions
import { adminLogin, getUserInfo, resetMessages } from "../../../store/Reducers/authSlice";

// UI components
import Button from "../../../components/ui/button";

// Shared Components
import InputGroup from "../../../components/shared/Input-group";

// Admin Login form data
// import adminLoginObj from './adminLogin.json';

// libraries
import { toast } from "react-hot-toast";
import { BeatLoader } from "react-spinners";

const AdminLogin = () => {
  const { loading, errorMessage, successMessage, token } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("please enter valid email")
      .required("email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password cannot be longer than 32 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
  });
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(formValidationSchema),
    reValidateMode: "onChange",
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")
    if(accessToken){
      navigate("/admin/dashboard")
    }
  },[])
  const onValid = (data) => {
    console.log(data);
    dispatch(adminLogin(data));
  };

  const onInvalid = (errors) => {
    console.log("errors: ", errors);
  };

  useEffect(() => {
    console.log(errorMessage, successMessage);
    if (errorMessage) {
      toast.error(errorMessage);
    }
    if (successMessage) {
      toast.success(successMessage);
      navigate("/");
    }

    return () => {
      dispatch(resetMessages());
    };
  }, [successMessage, errorMessage]);



  return (
    <div>
      <div className="min-w-screen min-h-screen bg-[#161d31] flex justify-center items-center">
        <div className="w-[350px] text-[#d0d2d6] p-2">
          <div className="bg-[#283046] p-4 rounded-md">
            <div className="flex justify-center items-center">
              <svg
                width="10rem"
                height="92.16228407988484"
                viewBox="0 0 369.9130434782609 76.08695652173914"
                className="css-1j8o68f"
              >
                <defs id="SvgjsDefs1344"></defs>
                <g
                  id="SvgjsG1345"
                  transform="matrix(1.5217391304347827,0,0,1.5217391304347827,-7.608695652173914,-7.608695652173914)"
                  fill="#a6acec"
                >
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    d="M55,30.2099609c0,5.6300049-4.5700073,10.1999512-10.1799927,10.1999512h-1.5900269  c-0.4199829-0.3199463-0.8899536-0.5899658-1.3899536-0.7800293l4.3099976-8.3498535  c0.4799805-0.9300537,0.4400024-2.0200195-0.1000366-2.9300537c-0.539978-0.8900146-1.5199585-1.4500732-2.5700073-1.4500732  H22.7600098L22.5,25.2299805c-0.210022-1.4699707-1.4799805-2.5700684-2.9699707-2.5700684h-3.0100098c-1.6500244,0-3,1.3500977-3,3  c0,1.6500244,1.3499756,3,3,3h0.4499512l0.2300415,1.5100098v0.0400391l1.5800171,10.1999512h-3.2900391  C9.710022,40.4099121,5,35.6999512,5,29.9099121c0-5.3898926,4.1300049-9.8798828,9.3900146-10.4299316  C14.9899902,11.4099121,21.8099976,5,30,5c8.4299927,0,15.3300171,6.6999512,15.6400146,15.0599365  C50.8699951,20.4799805,55,24.8798828,55,30.2099609z"
                  ></path>
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    d="M39.4199829,51.869873c0,1.7200928-1.3999634,3.130127-3.1199951,3.130127  c-1.7299805,0-3.1300049-1.4100342-3.1300049-3.130127c0-1.7199707,1.4000244-3.119873,3.1300049-3.119873  C38.0200195,48.75,39.4199829,50.1499023,39.4199829,51.869873z"
                  ></path>
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    d="M44.3699951,30.3599854l-5.6300049,10.9200439h1.210022c1.8399658,0,3.3399658,1.5,3.3399658,3.3498535  c0,1.8400879-1.5,3.3400879-3.3399658,3.3400879H22.0999756c-0.5499878,0-1-0.4499512-1-1s0.4500122-1,1-1h17.8500366  c0.7399902,0,1.3399658-0.6000977,1.3399658-1.3400879s-0.5999756-1.3498535-1.3399658-1.3498535H22.0999756  c-0.4299927,0-0.7999878-0.2800293-0.9400024-0.6700439c-0.0299683-0.0600586-0.039978-0.1099854-0.0499878-0.1700439  l-1.4599609-9.4499512l-0.4500122-2.9300537v-0.039917l-0.5200195-3.3601074h-2.1599731c-0.5500488,0-1-0.4399414-1-1  c0-0.5499268,0.4499512-1,1-1h3.0100098c0.5,0,0.9199829,0.3601074,0.9899902,0.8500977l0.5199585,3.3898926h22.4400024  c0.3500366,0,0.6700439,0.1800537,0.8500366,0.4799805C44.5100098,29.6799316,44.5300293,30.0499268,44.3699951,30.3599854z"
                  ></path>
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    d="M28.7399902,51.869873c0,1.7200928-1.4099731,3.130127-3.1300049,3.130127  c-1.7199707,0-3.1199951-1.4100342-3.1199951-3.130127c0-1.7199707,1.4000244-3.119873,3.1199951-3.119873  C27.3300171,48.75,28.7399902,50.1499023,28.7399902,51.869873z"
                  ></path>
                </g>
                <g
                  id="SvgjsG1346"
                  transform="matrix(1.5648594962796947,0,0,1.5648594962796947,93.12065847461254,-8.526427552225627)"
                  fill="#a56cc1"
                >
                  <path d="M1.84 33.519999999999996 l2.44 0 c0.76 3.56 2.6 4.88 6.2 4.88 c3.48 0 5.12 -1.84 5.12 -3.84 c0 -6 -13.28 -1.76 -13.28 -9.92 c0 -3.44 2.68 -5.92 7.28 -5.92 c4.48 0 7.4 1.84 8 6.52 l-2.44 0 c-0.44 -3.2 -2.6 -4.36 -5.6 -4.36 c-3.04 0 -4.68 1.44 -4.68 3.56 c0 5.64 13.28 2.12 13.28 10.08 c0 3.96 -3.56 6.04 -8.44 6.04 s-7.68 -3.12 -7.88 -7.04 z M25.28 40 l-2.4 0 l0 -28.8 l2.4 0 l0 10.96 c1.92 -2.04 3.8 -3.44 6.68 -3.44 c2.52 0 4.84 0.8 6.32 2.96 c1 1.48 1.04 3.04 1.04 4.76 l0 13.56 l-2.4 0 l0 -13.52 c0 -3.72 -1.52 -5.6 -5.36 -5.6 c-2.96 0 -5 1.92 -5.76 4.04 c-0.48 1.32 -0.52 2.48 -0.52 3.92 l0 11.16 z M53.36 40.56 c-5.28 -0.08 -9.6 -3.68 -9.6 -10.92 c0 -6.04 3.2 -10.92 9.6 -10.92 c6.48 0 9.6 4.84 9.6 10.92 c0 6.56 -3.8 10.92 -9.6 10.92 z M60.400000000000006 29.64 c-0.04 -4.88 -1.96 -8.76 -7.04 -8.76 c-5.04 0 -7.04 4.28 -7.04 8.76 c0 5.16 2.44 8.76 7.04 8.76 c5.04 0 7.04 -4.32 7.04 -8.76 z M70.04 29.72 c0 4.68 2.64 8.68 7 8.68 c4.96 0 7.28 -4.2 7.08 -9.4 c-0.04 -5.2 -3.04 -8.12 -7.08 -8.12 c-4.52 0 -7 3.84 -7 8.84 z M70.04 36.68 l0 11.48 l-2.4 0 l0 -28.88 l2.4 0 l0 3.64 l0.08 0 c1.4 -2.72 4.56 -4.2 7.2 -4.2 c6.68 0 9.36 4.76 9.36 10.88 c0 5.8 -2.92 10.96 -9.24 10.96 c-2.92 0 -5.88 -1.36 -7.4 -3.88 z M91.64 47.88 l0 -2.24 c0.64 0.12 1.32 0.24 2 0.24 c2.72 0 3.12 -3.92 4.04 -5.72 l-8.04 -20.88 l2.68 0 l6.64 17.8 l6.64 -17.8 l2.6 0 l-7.72 20.44 c-1.96 5.2 -3.24 8.44 -6.56 8.44 c-0.84 0 -1.64 -0.12 -2.28 -0.28 z M128.92000000000002 25.8 l-2.44 0 c-0.84 -3.08 -2.96 -4.92 -6.16 -4.92 c-4.92 0 -6.96 4.48 -6.96 8.8 c0 4.36 2 8.72 6.96 8.72 c3.56 0 5.8 -2.12 6.36 -5.56 l2.56 0 c-0.84 4.6 -3.72 7.72 -8.92 7.72 c-6.6 0 -9.52 -4.76 -9.52 -10.88 c0 -5.76 3.32 -10.96 9.52 -10.96 c4.76 0 7.88 2.28 8.6 7.08 z M147.6 32.36 l0 -3.24 c-2.04 0.84 -4.12 1 -6.2 1.16 c-3.64 0.28 -5.84 1.6 -5.84 4.4 c0 2.52 2.2 3.72 4.48 3.72 c3.8 0 7.56 -1.84 7.56 -6.04 z M140.24 28.36 l3.32 -0.44 c0.88 -0.08 2.36 -0.32 3.16 -0.68 s0.88 -1.44 0.88 -2.16 c0 -2.44 -1.44 -4.2 -5.16 -4.2 c-3.32 0 -5.6 1.08 -6.04 4.68 l-2.44 0 c0.36 -4.88 4 -6.84 8.52 -6.84 c4.2 0 7.52 1.64 7.52 6.44 l0 11.28 c0 1.88 0.48 2.32 2.52 1.6 l0 1.88 c-0.36 0.12 -1.2 0.4 -1.88 0.4 c-0.4 0 -0.72 -0.04 -1.08 -0.12 c-1.6 -0.24 -1.88 -1.64 -1.92 -3.08 c-2 2.24 -4.72 3.44 -7.72 3.44 c-3.64 0 -6.92 -1.96 -6.92 -5.96 c0 -3.48 2.4 -5.6 7.24 -6.24 z M158.8 29.84 l0 10.16 l-2.4 0 l0 -20.72 l2.4 0 l0 3.88 l0.08 0 c1.32 -3.32 3.28 -4.44 6.76 -4.44 l0 2.6 c-5.4 -0.12 -6.84 3.88 -6.84 8.52 z M176.88 38.12 l0 1.96 c-0.56 0.12 -1.6 0.48 -2.76 0.48 c-2.36 0 -3.68 -1.04 -3.68 -4.12 l0 -15.16 l-2.92 0 l0 -2 l2.92 0 l0 -5.76 l2.4 0 l0 5.76 l3.88 0 l0 2 l-3.88 0 l0 14.2 c0 2.04 0.08 2.92 2.08 2.92 c0.64 0 1.32 -0.12 1.96 -0.28 z"></path>
                </g>
              </svg>
            </div>

            <form onSubmit={handleSubmit(onValid, onInvalid)}>
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputGroup
                    htmlFor="email"
                    lable="Email"
                    type="email"
                    placeholder="example123@gmail.com"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={errors.email?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputGroup
                    htmlFor="password"
                    lable="Password"
                    type="password"
                    placeholder="Abcd@1234"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={errors.password?.message}
                  />
                )}
              />
              <Button
                btnTxt={"Sign Up"}
                type={"submit"}
                isLoading={loading}
                IconLoading={<BeatLoader color="#ffffff" size="1.25rem" />}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
