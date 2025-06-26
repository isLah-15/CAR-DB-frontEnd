import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { userAPI } from '../../Features/Users/userAPI';


type VerifyInputs = {
    email: string;
    code: string;
};

const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    code: yup
        .string()
        .matches(/^\d{6}$/, 'Code must be a 6 digit number')
        .required('Verification code is required'),
});

const VerifyUser = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const emailFromState = location.state?.email || '';

    const [verifyUser, { isLoading }] = userAPI.useVerifyUserMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<VerifyInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: emailFromState,
        },
    });

    const onSubmit: SubmitHandler<VerifyInputs> = async (data) => {
        try {
            const response = await verifyUser(data).unwrap();
            console.log("Verification response:", response);

            toast.success("Account verified successfully!");
            // Redirect or show success
            setTimeout(() => {
                navigate('/login', {
                    state: { email: data.email }
                });
            }, 2000);
        } catch (error) {
            console.error("Verification error:", error);
            toast.error(`Verification failed. Please check your code and try again`);
            // Error handling
        }
    };

       return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-zinc-900 via-amber-800 to-yellow-900 font-mono">
        <div className="w-full max-w-md p-8 rounded-xl shadow-xl bg-zinc-800/90 border border-yellow-700 text-yellow-100">
            <h1 className="text-3xl font-extrabold mb-6 text-center text-amber-300 tracking-wider uppercase">
                Verify Your Account
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                    type="email"
                    {...register('email')}
                    placeholder="Email"
                    className="input w-full p-3 bg-zinc-900 text-yellow-100 border border-yellow-600 rounded shadow focus:ring-2 focus:ring-amber-400"
                    readOnly={!!emailFromState}
                />
                {errors.email && (
                    <span className="text-sm text-red-400">{errors.email.message}</span>
                )}

                <input
                    type="text"
                    {...register('code')}
                    placeholder="6 Digit Code"
                    maxLength={6}
                    className="input w-full p-3 bg-zinc-900 text-yellow-100 border border-yellow-600 rounded shadow focus:ring-2 focus:ring-amber-400"
                />
                {errors.code && (
                    <span className="text-sm text-red-400">{errors.code.message}</span>
                )}

                <button
                    type="submit"
                    className="btn w-full mt-4 bg-amber-700 hover:bg-amber-600 text-white font-bold border-amber-800 tracking-wide"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <span className="loading loading-spinner text-amber-300" /> Verifying...
                        </>
                    ) : "Verify"}
                </button>
            </form>
        </div>
    </div>
);
}
export default VerifyUser;
