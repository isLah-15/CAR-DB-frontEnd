import { useEffect, useState } from 'react';

type Car = {
  carId: number;
  carModel: string;
  manufacturer: string;
  year: number;
  color: string;
  rentalRate: number;
  availability: boolean;
};

const Cars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:8081/car');
      if (!response.ok) throw new Error('Failed to fetch cars');
      const cars = await response.json();
      setCars(cars.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  if (loading) return <p className="text-center text-gray-500 text-lg">Loading cars...</p>;
  if (error) return <p className="text-center text-red-600 text-lg">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Available Cars</h2>
        <ul className="space-y-4">
          {cars.map((car) => (
            <li
              key={car.carId}
              className="border border-gray-200 rounded-md p-4 bg-gray-50 hover:shadow-sm transition"
            >
              <h3 className="text-xl font-semibold text-indigo-600">{car.carModel}</h3>
              <p className="text-gray-700">
                <span className="font-medium">Manufacturer:</span> {car.manufacturer}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Year:</span> {car.year}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Color:</span> {car.color}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Rate:</span> ${car.rentalRate}/day
              </p>
              <p
                className={`text-sm font-semibold mt-2 ${
                  car.availability ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {car.availability ? 'Available' : 'Unavailable'}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cars;
