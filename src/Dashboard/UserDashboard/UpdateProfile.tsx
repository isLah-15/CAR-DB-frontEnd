import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { toast } from "sonner";
import { useEffect } from "react";
import { userAPI } from "../../Features/Users/userAPI";

type UpdateProfileInputs = {
    firstName: string;
    lastName: string;
    image_url: string;
};

const schema = yup.object({
    firstName: yup.string().max(50, "Max 50 characters").required("First name is required"),
    lastName: yup.string().max(50, "Max 50 characters").required("Last name is required"),
    image_url: yup.string().url("Invalid URL").required("Image URL is required"),
});

interface User {
    id: string | number;
    firstName?: string;
    lastName?: string;
    image_url?: string;
}

interface UpdateProfileProps {
    user: User;
    refetch?: () => void;
}

const UpdateProfile = ({ user, refetch }: UpdateProfileProps) => {
    const [updateUser, { isLoading }] = userAPI.useUpdateUserMutation(
        { fixedCacheKey: "updateUser" }
    );

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<UpdateProfileInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            image_url: user?.image_url || "",
        },
    });

    // Update form values when user changes
    useEffect(() => {
        if (user) {
            setValue("firstName", user.firstName || "");
            setValue("lastName", user.lastName || "");
            setValue("image_url", user.image_url || "");
        } else {
            reset();
        }
    }, [user, setValue, reset]);

    const onSubmit: SubmitHandler<UpdateProfileInputs> = async (data) => {
        try {
            await updateUser({ id: Number(user.id), ...data })

            toast.success("Profile updated successfully!");
            if (refetch) {
                refetch(); // Call refetch if provided
            }
            reset();
            (document.getElementById('update_profile_modal') as HTMLDialogElement)?.close();
        } catch (error) {
            console.log("Error updating profile:", error);
            toast.error("Failed to update profile. Please try again.");
        }
    };

    return (
        <dialog id="update_profile_modal" className="modal sm:modal-middle">
  <div className="modal-box bg-gradient-to-br from-zinc-900 via-amber-800 to-yellow-900 text-yellow-100 w-full max-w-xs sm:max-w-lg mx-auto rounded-xl shadow-2xl border border-yellow-700 font-mono">
    <h3 className="font-bold text-2xl mb-4 text-amber-300 text-center drop-shadow">Update Profile</h3>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input
        type="text"
        {...register("firstName")}
        placeholder="First Name"
        className="input bg-zinc-800 text-yellow-100 border border-yellow-600 focus:ring-2 focus:ring-amber-400 rounded shadow w-full p-3"
      />
      {errors.firstName && (
        <span className="text-sm text-red-400">{errors.firstName.message}</span>
      )}

      <input
        type="text"
        {...register("lastName")}
        placeholder="Last Name"
        className="input bg-zinc-800 text-yellow-100 border border-yellow-600 focus:ring-2 focus:ring-amber-400 rounded shadow w-full p-3"
      />
      {errors.lastName && (
        <span className="text-sm text-red-400">{errors.lastName.message}</span>
      )}

      <input
        type="text"
        {...register("image_url")}
        placeholder="Image URL"
        className="input bg-zinc-800 text-yellow-100 border border-yellow-600 focus:ring-2 focus:ring-amber-400 rounded shadow w-full p-3"
      />
      {errors.image_url && (
        <span className="text-sm text-red-400">{errors.image_url.message}</span>
      )}

      <div className="modal-action flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          className="btn bg-amber-700 hover:bg-amber-600 text-white font-bold w-full sm:w-auto"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner text-yellow-300" /> Updating...
            </>
          ) : "Update"}
        </button>
        <button
          className="btn bg-zinc-700 hover:bg-zinc-600 text-yellow-200 w-full sm:w-auto border border-yellow-500"
          type="button"
          onClick={() => {
            (document.getElementById('update_profile_modal') as HTMLDialogElement)?.close();
            reset();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</dialog>
    );
};

export default UpdateProfile;