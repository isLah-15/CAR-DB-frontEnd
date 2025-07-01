import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { carApi } from "../../../Features/CarFeature/CarAPI";

type CreateCarInputs = {
  carModel: string;
  manufacturer: string;
  year: number;
  color: string;
  rentalRate: number;
  availability: boolean;
};

const schema = yup.object({
    carModel: yup.string().max(75, "Max 75 characters").required("Car model is required"),
    manufacturer: yup.string().max(255, "Max 255 characters").required("Manufacturer is required"),
    year: yup.number().required("Year is required").min(1886, "Year must be after 1885").max(new Date().getFullYear(), "Year must be in the current year"),
    color: yup.string().max(50, "Max 50 characters").required("Color is required"),
    rentalRate: yup.number().required("Rental rate is required").positive("Rental rate must be a positive number"),
    availability: yup.boolean().default(true),
});

const CreateCars = () => {
    const [createCar, { isLoading }] = carApi.useCreateCarMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateCarInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<CreateCarInputs> = async (data) => {
        try {
            await createCar(data).unwrap();
            // console.log("Cars created successfully:", response);
            toast.success("Cars created successfully!");
            reset(); // Clear the form after successful submission
            (document.getElementById('my_modal_5') as HTMLDialogElement)?.close();

        } catch (error) {
            console.error("Error creating cars:", error);
            toast.error("Failed to create cars. Please try again.");

        }
    };

    return (
        <dialog id="my_modal_5" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">

                <h3 className="font-bold text-lg mb-4">Create New Car</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <input
                        type="text"
                        {...register("carModel")}
                        placeholder="Car Model"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.carModel && (
                        <span className="text-sm text-red-700">{errors.carModel?.message}</span>
                    )}

                    <input
                        type="text"
                        {...register("manufacturer")}
                        placeholder="Manufacturer"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.manufacturer && (
                        <span className="text-sm text-red-700">{errors.manufacturer.message}</span>
                    )}

                    <input
                        type="number"
                        {...register("year")}
                        placeholder="Year"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.year && (
                        <span className="text-sm text-red-700">{errors.year.message}</span>
                    )}

                    <input
                        type="text"
                        {...register("color")}
                        placeholder="Color"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.color && (
                        <span className="text-sm text-red-700">{errors.color.message}</span>
                    )}

                    <input
                        type="number"
                        {...register("rentalRate")}
                        placeholder="Rental Rate"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.rentalRate && (
                        <span className="text-sm text-red-700">{errors.rentalRate.message}</span>
                    )}

                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text mr-4 text-white">Available</span>
                            <input
                                type="checkbox"
                                {...register("availability")}
                                className="checkbox checkbox-primary"
                                defaultChecked
                            />
                        </label>
                    </div>
                    {errors.availability && (
                        <span className="text-sm text-red-700">{errors.availability.message}</span>
                    )}

                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner text-primary" /> Creating...
                                </>
                            ) : "Create"}
                        </button>
                        <button
                            className="btn"
                            type="button"
                            onClick={() => {
                                (document.getElementById('my_modal_5') as HTMLDialogElement)?.close();
                            }}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default CreateCars;