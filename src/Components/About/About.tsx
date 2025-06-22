import CarManager from '../../assets/Images/8k car wallpaper.jpg';

const About = () => {
    return (
        <div className="bg-gradient-to-br from-zinc-900 via-amber-800 to-yellow-900 text-yellow-100 font-mono py-10 px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between gap-8 h-fit">
               
                <div className="w-full md:w-1/2 flex items-center">
                    <img
                        src={CarManager}
                        alt="car-booking-management"
                        className="w-full h-48 md:h-full object-cover rounded-lg shadow-[0_0_30px_rgba(255,200,0,0.3)] border border-yellow-700"
                    />
                </div>

                
                <div className="w-full md:w-1/2 border border-yellow-700 bg-zinc-900/50 rounded-lg p-6 md:p-8 shadow-lg backdrop-blur-sm">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-amber-300 drop-shadow">
                        About Gear Masters
                    </h1>
                    <p className="mb-4 text-yellow-100 text-base md:text-lg leading-relaxed">
                        Gear Masters is a rugged, all-terrain car rental system built for those who live life in the fast lane—on and off the grid. Whether you're a road warrior looking to book your next ride or an admin managing your fleet in the dust and heat, Gear Masters makes it seamless.
                    </p>
                    <p className="mb-2 text-yellow-100 text-base md:text-lg leading-relaxed">
                        Users can explore a wide range of vehicles, lock in reservations, and process secure payments with ease. Admins gain full control over bookings, maintenance logs, insurance tracking, and location mapping—all from one powerful dashboard.
                    </p>
                    <p className="text-yellow-100 text-base md:text-lg leading-relaxed">
                        With Gear Masters, renting and managing cars isn’t just efficient—it’s built to survive the wasteland.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About;
