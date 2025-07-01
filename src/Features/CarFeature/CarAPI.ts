// Next I have a folder named Features where I will have a file called CarAPI.ts . In this file I will have the codes performing the RTK queries using redux and rootstate. 
// The queries will involve getting the cars, getting car by id, updating car by id, and deleting car by id. 
// Now here is the kicker, since in my dashboard


// In my Admin Dashboard folder, I have a folder named cars and inside cars a file named CreateCars.tsx. Inside I want to perform a CRUD functionality. I want to create a new car, based on the schema I provided. I am using react hook form, yupResolvers, yup, 

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { RootState } from "../../app/store";
import { ApiDomain } from "../../Utils/ApiDomain";

// Car type definition 
export type TCar = {
  carId: number;
  carModel: string;
  manufacturer: string;
  year: number;
  color: string;
  rentalRate: number;
  availability: boolean;
  isCompleted: boolean;
};

// RTK Query setup
export const carApi = createApi({
  reducerPath: 'carApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token; // get the token from the user slice of the state
            if (token) {
                headers.set('Authorization', `Bearer ${token}`); // set the Authorization header with the token
            }
            headers.set('Content-Type', 'application/json'); // set the Content-Type header to application/json
            return headers; // return the headers to be used in the request
        }
  }),

  tagTypes: ['Car'],
  endpoints: (builder) => ({

    // Create new car
    createCar: builder.mutation<TCar, Partial<TCar>>({
      query: (newCar) => ({
        url: '/car',
        method: 'POST',
        body: newCar,
      }),
      invalidatesTags: ['Car'], // invalidates the cache for the Cars tag when a new todo is created
    }),

    // Get all cars
    getCars: builder.query<TCar[], void>({//void means no parameters are needed to fetch the cars
      query: () => '/car',
      providesTags: ['Car'],// this tells RTK Query that this endpoint provides the Todos tag, so it can be used to invalidate the cache when a new todo is created
    }),

    // Get car by ID
    getCarByCarId: builder.query<TCar, number>({
      query: (id) => `/car/${id}`,
      providesTags: ['Car'],
    }),

    // Update car by ID
    updateCarById: builder.mutation<TCar, Partial<TCar> & { carId: number }>({
      query: ({ carId, ...updates }) => ({
        url: `/car/${carId}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['Car'], // invalidates the cache for the Car tag when a todo is updated
    }),

    // Delete car by ID
    deleteCarById: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/car/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Car'] // invalidates the cache for the Car tag when a todo is deleted,
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetCarsQuery,
  useGetCarByCarIdQuery,
  useCreateCarMutation,
  useUpdateCarByIdMutation,
  useDeleteCarByIdMutation,
} = carApi;