
import { carApi, type TCar } from "../../../Features/CarFeature/CarAPI";

import { useState } from "react";



const UserCars = () => {
     const { data: carsData, isLoading: carsLoading, error: carsError } = carApi.useGetCarsQuery(
            undefined, // No parameters needed for fetching cars
            {
                refetchOnMountOrArgChange: true, // Refetch when the component mounts or when the query arguments change
                pollingInterval: 60000, // Poll every 60 seconds to keep data fresh - the cars will be refetched every 60 seconds to keep the data fresh
            }
        )
        const [selectedCar, setSelectedCar] = useState<TCar | null>(null);

    const handleEdit = (car: TCar) => {
            setSelectedCar(car);
            (document.getElementById('update_modal') as HTMLDialogElement)?.showModal();
    
        }
        console.log("Cars Data:", carsData);

        
    return (
        <div>
            {/* Display Cars */}
                    {carsLoading && <p className="text-yellow-300 italic">Loading cars...</p>}
                    {carsError && <p className="text-red-500 font-semibold">Error fetching cars</p>}
                    {carsData && carsData.data && carsData.data.length > 0 ? (
                        <div className="md:overflow-x-auto border-2 border-yellow-700 rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-4 shadow-[0_0_20px_rgba(255,255,0,0.1)]">
                            <table className="table table-xs text-yellow-100 w-full">
                                <thead>
                                    <tr className="bg-yellow-800 text-black text-md lg:text-lg uppercase tracking-wide border-b-2 border-yellow-600">
                                        <th className="px-4 py-3">Car Model</th>
                                        <th className="px-4 py-3">Manufacturer</th>
                                        <th className="px-4 py-3">Year</th>
                                        <th className="px-4 py-3">Color</th>
                                        <th className="px-4 py-3">Rental Rate</th>
                                        <th className="px-4 py-3">Availability</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carsData.data.map((car: TCar) => (
                                        <tr key={car.carId} className="hover:bg-yellow-900 border-b border-yellow-700 transition duration-150 ease-in-out">
                                            <td className="px-4 py-2 border-r border-yellow-700 lg:text-base">{car.carModel}</td>
                                            <td className="px-4 py-2 border-r border-yellow-700 lg:text-base">{car.manufacturer}</td>
                                            <td className="px-4 py-2 border-r border-yellow-700 lg:text-base">{car.year}</td>
                                            <td className="px-4 py-2 border-r border-yellow-700 lg:text-base">{car.color}</td>
                                            <td className="px-4 py-2 border-r border-yellow-700 lg:text-base">{car.rentalRate}</td>
                                            <td className="px-4 py-2 border-r border-yellow-700 lg:text-base">
                                                <span className={`badge px-3 py-1 rounded-full text-xs font-bold ${car.availability ? "bg-green-700 text-white" : "bg-yellow-600 text-black"}`}>
                                                    {car.availability ? (
                                                        <span className="lg:text-base">Available</span>
                                                    ) : (
                                                        <span className="lg:text-base">Pending</span>
                                                    )}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-yellow-200 italic">No cars found.</p>
                    )}
                </div>
            );
            
}

export default UserCars;

