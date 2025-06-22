import homeIMG from '../../assets/Images/Mad Max.jpg';

export const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-yellow-900 via-amber-800 to-zinc-800 min-h-screen py-10 px-6 md:px-12 text-stone-200">
      <div className="flex flex-col md:flex-row justify-between gap-8 h-fit">
    
        <div className="w-full md:w-1/2 bg-zinc-900/40 border border-yellow-700 shadow-[0_0_40px_rgba(0,0,0,0.4)] rounded-lg p-6 md:p-8 backdrop-blur-sm">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-amber-300 drop-shadow-md">
            Welcome to Gear Masters!
          </h1>
          <p className="mb-4 text-amber-100 text-base md:text-lg italic tracking-wide">
            <span className="font-semibold text-yellow-400">
              Where the Road Owns You—But You Drive It Anyway
            </span>
          </p>
          <p className="mb-3 text-stone-300 text-base md:text-lg leading-relaxed">
            In a world of rust, dust, and roaring engines, <span className="text-yellow-400 font-bold">Gear Masters</span> is your go-to pit stop for brutal, no-nonsense car rentals. Whether you're a lone rider hunting wheels or a road boss managing the chaos, we’ve got the grit and the gears to get you moving.
          </p>
          <p className="mb-3 text-stone-300 text-base md:text-lg leading-relaxed">
            Customers can scavenge through a fleet of battle-hardened machines, lock in bookings, and pay without a hitch. Admins stay in control—tracking reservations, tuning rides, and managing locations, maintenance, and insurance like a true road warlord.
          </p>
          <p className="mb-2 text-stone-300 text-base md:text-lg font-semibold">
            The ride starts here.
          </p>
          <p className="text-yellow-200 text-base md:text-lg font-bold">
            Fuel up. Gear up. Rule the road.
          </p>
        </div>

        
        <div className="w-full md:w-1/2 flex items-center">
          <img
            src={homeIMG}
            alt="mad-max-themed-vehicle"
            className="w-full h-64 md:h-full object-cover rounded-lg shadow-[0_0_40px_rgba(255,200,0,0.3)] border border-yellow-900"
          />
        </div>
      </div>

      
      <button className="mt-10 bg-yellow-700 hover:bg-yellow-600 text-zinc-900 font-bold py-3 px-6 rounded-full shadow-md transition-all duration-300 mx-auto block">
        Get Started
      </button>
    </div>
  );
};

export default Hero;
