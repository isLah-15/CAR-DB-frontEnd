import { yupResolver } from "@hookform/resolvers/yup";
import { carApi, type TCar } from "../../../Features/CarFeature/CarAPI";
import * as yup from "yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";

type UpdateCarProps = {
    car: TCar | null; //can be null if no car is selected
};

type UpdateCarInputs = {
    carModel: string;
    manufacturer: string;
    year: number;
    color: string;
    rentalRate: number;
    availability: boolean;
    carId?: number; 
};

const schema = yup.object({
    carModel: yup.string().max(75, "Max 75 characters").required("Car model is required"),
    manufacturer: yup.string().max(255, "Max 255 characters").required("Manufacturer is required"),
    year: yup.number().required("Year is required").positive("Year must be a positive number").integer("Year must be an integer"),
    color: yup.string().required("Color is required"),
    rentalRate: yup.number().required("Rental rate is required").positive("Rental rate must be a positive number"),
    availability: yup.boolean().default(false),
});

const UpdateCar = ({ car }: UpdateCarProps) => {
    const [updateCar, { isLoading, }] = carApi.useUpdateCarByIdMutation({ fixedCacheKey: "updateCar", });

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<UpdateCarInputs>({
        resolver: yupResolver(schema),
    });

    // Populate form when car changes
    useEffect(() => {
        if (car) {
            setValue("carModel", car.carModel);
            setValue("manufacturer", car.manufacturer);
            setValue("year", car.year);
            setValue("color", car.color);
            setValue("rentalRate", car.rentalRate);
            setValue("availability", car.availability);
            setValue("carId", car.carId); 
            } else {
            reset();
        }
    }, [car, setValue, reset]);

    const onSubmit: SubmitHandler<UpdateCarInputs> = async (data) => {
        try {
            if (!car) {
                toast.error("No car selected for update.");
                return;
            }

            console.log("Updating car with data:", data);
            console.log("carrrrrrrrrrrrrrr", car.carId)
            console.log("Car ID to update:", data.carId);
            const response = await updateCar({ ...data, id: car.carId })
            console.log("Car updated successfully:", response); 
            toast.success("Car updated successfully!");
            reset(); // Clear the form after successful submission
            (document.getElementById('update_modal') as HTMLDialogElement)?.close();

        } catch (error) {
            console.error("Error updating car:", error);
            toast.error("Failed to update car. Please try again.");

        }
    };

    return (
        <dialog id="update_modal" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">

                <h3 className="font-bold text-lg mb-4">Update Car</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <input
                        type="text"
                        {...register("carModel")}
                        placeholder="Car Model"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.carModel && (
                        <span className="text-sm text-red-700">{errors.carModel.message}</span>
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
                            <span className="label-text mr-4 text-white">Availability</span>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        value="true"
                                        {...register("availability")}
                                        className="radio radio-primary text-green-400"
                                    />
                                    Available
                                </label>
                                <label className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        value="false"
                                        {...register("availability")}
                                        className="radio radio-primary text-yellow-400"
                                    />
                                    Not Available
                                </label>
                            </div>
                        </label>
                    </div>
                    {errors.availability && (
                        <span className="text-sm text-red-700">{errors.availability.message}</span>
                    )}

                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner text-primary" /> Updating...
                                </>
                            ) : "Update"}
                        </button>
                        <button
                            className="btn"
                            type="button"
                            onClick={() => {
                                (document.getElementById('update_modal') as HTMLDialogElement)?.close();
                                reset();
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

export default UpdateCar;