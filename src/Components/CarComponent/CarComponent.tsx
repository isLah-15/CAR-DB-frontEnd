import React from 'react';

type CarProps = {
  carId: number;
  carModel: string;
  manufacturer: string;
  year: number;
  color: string;
  rentalRate: number;
  availability: boolean;
};

const CarComponent: React.FC<CarProps> = ({
  carModel,
  manufacturer,
  year,
  color,
  rentalRate,
  availability,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 w-full max-w-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{manufacturer} - {carModel}</h2>
      <p className="text-gray-600">Year: <span className="font-medium">{year}</span></p>
      <p className="text-gray-600">Color: <span className="font-medium">{color}</span></p>
      <p className="text-gray-600">Rental Rate: <span className="font-medium text-green-600">Ksh {rentalRate}/day</span></p>
      <p className="text-gray-600">
        Availability:{" "}
        <span className={availability ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
          {availability ? "Available" : "Unavailable"}
        </span>
      </p>
    </div>
  );
};

export default CarComponent;
