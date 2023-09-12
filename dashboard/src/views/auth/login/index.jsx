/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react';

// react-router-dom
import { Link, Navigate, useNavigate } from 'react-router-dom';

// react-hook-form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// eslint-disable-next-line quotes
import * as yup from "yup";

// React icons
import { AiOutlineGooglePlus, AiOutlineGithub } from 'react-icons/ai';
import { CiTwitter } from 'react-icons/ci';
import { FiFacebook } from 'react-icons/fi';

// Shared Components
import SignupOption from '../../../components/shared/signup-option';
import InputGroup from '../../../components/shared/Input-group';
import Button from '../../../components/ui/button';

// register form initial state
// import loginFormObj from './login.json';

// libraries
import { toast } from 'react-hot-toast';

// react-spinner
import { BeatLoader, PropagateLoader } from 'react-spinners';

// Utilities
import { useDispatch, useSelector } from 'react-redux';
import { resetMessages, sellerLogin } from '../../../store/Reducers/authSlice';

const Login = () => {
  const { loading, errorMessage, successMessage, role, userInfo } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('please enter valid email')
      .required('email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(32, 'Password cannot be longer than 32 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      )
      .required('Password is required'),
  });
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(formValidationSchema),
    reValidateMode: 'onChange',
  });

  const onValid = (data) => {
    console.log(data);
    dispatch(sellerLogin(data))
  };

  const onInvalid = (errors) => {
    console.log('errors: ', errors);
  };


  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
    if (successMessage) {
      toast.success(successMessage);
      navigate('/');
    }
    dispatch(resetMessages());
  }, [successMessage, errorMessage]);

  if(role ){
    if(role === "admin"){
      console.log("redirecting to admin ")
      return <Navigate to={"/admin/dashboard"} replace />
    }

    if(role === "seller"){
      console.log("redirecting to seller ")

      return <Navigate to={"/seller/dashboard"} replace />
    }
  }
  return (
    <div className="min-w-screen min-h-screen bg-[#161d31] flex justify-center items-center">
      <div className="w-[350px] text-[#d0d2d6] p-2">
        <div className="bg-[#283046] p-4 rounded-md">
          <h2 className="text-xl mb-3">Welcome to e-commerce</h2>
          <p className="text-sm mb-3">
            Please signin to your account and start your bussiness
          </p>

          <form onSubmit={ handleSubmit(onValid, onInvalid)}>
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
              btnTxt={'LOGIN'}
              type={'submit'}
              btnHandler={handleSubmit}
              isLoading={loading}
              IconLoading={<BeatLoader color="#ffffff" size="1.2rem" />}
            />
            <div className="flex item-center mb-3 gap-3 justify-center">
              <p>
                Don't have an account ? <Link to="/register">SignUp here</Link>
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
                bgColor={'bg-orange-700'}
                Icon={AiOutlineGooglePlus}
              />
              <SignupOption bgColor={'bg-indigo-700'} Icon={FiFacebook} />
              <SignupOption bgColor={'bg-cyan-700'} Icon={CiTwitter} />
              <SignupOption bgColor={'bg-purple-700'} Icon={AiOutlineGithub} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
