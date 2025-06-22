import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type LoginInputs = {
    email: string;
    password: string;
};

const schema = yup.object({
    email: yup.string().email('Invalid email').max(100, 'Max 100 characters').required('Email is required'),
    password: yup.string().min(6, 'Min 6 characters').max(255, 'Max 255 characters').required('Password is required'),
});

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<LoginInputs> = (data) => {
        console.log('Login data:', data);
        // TO API
    };

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

                    <button type="submit" className="btn bg-amber-700 hover:bg-amber-600 text-white font-bold w-full mt-4">
                        Login
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
