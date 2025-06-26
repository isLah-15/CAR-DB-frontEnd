import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router';
import { usersAPI } from '../../Features/Users/usersAPI';




type RegisterInputs = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    confirmPassword: string;
};

const schema = yup.object({
    firstName: yup.string().max(50, 'Max 50 characters').required('First name is required'),
    lastName: yup.string().max(50, 'Max 50 characters').required('Last name is required'),
    email: yup.string().email('Invalid email').max(100, 'Max 100 characters').required('Email is required'),
    phone: yup.string().max(50, 'Max 50 characters').required('PhoneNumber is required'),
    address: yup.string().max(50, 'Max 100 characters').required('address is required'),
    password: yup.string().min(6, 'Min 6 characters').max(255, 'Max 255 characters').required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
});

function Register() {
    const navigate = useNavigate();
    const [createUser, { isLoading }] = usersAPI.useCreateUsersMutation(
        { fixedCacheKey: 'createUser' } // Ensures the mutation is not re-fetched unnecessarily
    )

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
        console.log(data);
        try {
            const response = await createUser(data).unwrap()
            console.log("response here...", response);
            toast.success("Registration successful! Please check your email to verify your account.");
            // Redirect to verification page or login page
            setTimeout(() => {
                navigate('/verify', {
                    state: { email: data.email }
                });
            }, 2000);
        } catch (error) {
            console.log("Error", error);

        }

    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-zinc-900 via-amber-800 to-yellow-900 font-mono">
            <div className="w-full max-w-lg p-8 rounded-xl shadow-2xl bg-zinc-800/70 backdrop-blur-sm border border-yellow-700 text-yellow-100">
                <h1 className="text-3xl font-extrabold mb-6 text-center text-amber-300 drop-shadow">
                    Account Registration
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <input
                        type="text"
                        {...register('firstName')}
                        placeholder="First Name"
                        className='input w-full p-2 bg-zinc-900 text-yellow-100 border border-yellow-700 focus:ring-2 focus:ring-amber-400 rounded shadow'
                    />
                    {errors.firstName && (
                        <span className="text-red-500 text-sm">{errors.firstName.message}</span>
                    )}

                    <input
                        type="text"
                        {...register('lastName')}
                        placeholder="Last Name"
                        className='input w-full p-2 bg-zinc-900 text-yellow-100 border border-yellow-700 focus:ring-2 focus:ring-amber-400 rounded shadow'
                    />
                    {errors.lastName && (
                        <span className="text-red-500 text-sm">{errors.lastName.message}</span>
                    )}

                    <input
                        type="email"
                        {...register('email')}
                        placeholder="Email"
                        className='input w-full p-2 bg-zinc-900 text-yellow-100 border border-yellow-700 focus:ring-2 focus:ring-amber-400 rounded shadow'
                    />
                    {errors.email && (
                        <span className="text-red-500 text-sm">{errors.email.message}</span>
                    )}

                    <input
                        type="number"
                        {...register('phone')}
                        placeholder="Phone Number"
                        className='input w-full p-2 bg-zinc-900 text-yellow-100 border border-yellow-700 focus:ring-2 focus:ring-amber-400 rounded shadow'
                    />
                    {errors.phone && (
                        <span className="text-red-500 text-sm">{errors.phone.message}</span>
                    )}

                    <input
                        type="text"
                        {...register('address')}
                        placeholder="Address"
                        className='input w-full p-2 bg-zinc-900 text-yellow-100 border border-yellow-700 focus:ring-2 focus:ring-amber-400 rounded shadow'
                    />
                    {errors.address && (
                        <span className="text-red-500 text-sm">{errors.address.message}</span>
                    )}

                    <input
                        type="password"
                        {...register('password')}
                        placeholder="Password"
                        className='input w-full p-2 bg-zinc-900 text-yellow-100 border border-yellow-700 focus:ring-2 focus:ring-amber-400 rounded shadow'
                    />
                    {errors.password && (
                        <span className="text-red-500 text-sm">{errors.password.message}</span>
                    )}

                    <input
                        type="password"
                        {...register('confirmPassword')}
                        placeholder="Confirm Password"
                        className='input w-full p-2 bg-zinc-900 text-yellow-100 border border-yellow-700 focus:ring-2 focus:ring-amber-400 rounded shadow'
                    />
                    {errors.confirmPassword && (
                        <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
                    )}

                    <button type="submit" className="btn bg-amber-700 hover:bg-amber-600 text-white font-bold w-full mt-4" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <span className="loading loading-spinner text-primary" /> Registering...
                            </>
                        ) : "Register"}
                    </button>

                </form>

                <p className="mt-6 text-center text-yellow-200">
                    Already have an account?{' '}
                    <a href="/login" className="text-amber-400 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Register;
