import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router';

import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../Features/Login/UserSlice';
import { loginAPI } from '../../Features/Login/LoginApi';



type LoginInputs = {
    email: string;
    password: string;
};

const schema = yup.object({
    email: yup.string().email('Invalid email').max(100, 'Max 100 characters').required('Email is required'),
    password: yup.string().min(6, 'Min 6 characters').max(255, 'Max 255 characters').required('Password is required'),
});

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const emailFromState = location.state?.email || ''

    const [loginUser, { isLoading }] = loginAPI.useLoginUserMutation()


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: emailFromState,
        }
    });


    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        console.log('Login data:', data);

        try {
            const response = await loginUser(data).unwrap()
            dispatch(loginSuccess(response))

            console.log("Login response:", response);
            toast.success("Login successful!");

            if (response.user.role === 'admin') {
                navigate('/admin/dashboard');
            } else if (response.user.role === 'user') {
                navigate('/user/dashboard');
            }

        } catch (error) {
            console.log("Login error:", error);
            toast.error("Login failed. Please check your credentials and try again.");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-zinc-900 via-amber-800 to-yellow-900 font-mono">
            <div className="w-full max-w-lg p-8 rounded-xl shadow-2xl bg-zinc-800/70 backdrop-blur-sm border border-yellow-700 text-yellow-100">
                <h1 className="text-3xl font-extrabold mb-6 text-center text-amber-300 drop-shadow">
                    Login to Your Account
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <input
                        type="email"
                        {...register('email')}
                        placeholder="Email"
                        className='input w-full p-2 bg-zinc-900 text-yellow-100 border border-yellow-700 focus:ring-2 focus:ring-amber-400 rounded shadow'
                    />
                    {errors.email && (
                        <span className="text-sm text-red-500">{errors.email.message}</span>
                    )}

                    <input
                        type="password"
                        {...register('password')}
                        placeholder="Password"
                        className='input w-full p-2 bg-zinc-900 text-yellow-100 border border-yellow-700 focus:ring-2 focus:ring-amber-400 rounded shadow'
                    />
                    {errors.password && (
                        <span className="text-sm text-red-500">{errors.password.message}</span>
                    )}


                    <button type="submit" className="btn bg-amber-700 hover:bg-amber-600 text-white font-bold w-full mt-4" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <span className="loading loading-spinner text-primary" /> Logining...
                            </>
                        ) : "Login"}
                    </button>
                </form>

                <div className="mt-6 flex flex-col items-center space-y-2 text-yellow-200">
                    <p>
                        Don't have an account?{' '}
                        <a href="/register" className="text-amber-400 hover:underline">
                            Register
                        </a>
                    </p>
                    <p>
                        <a href="/" className="text-amber-400 hover:underline">
                            Back to Home
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
