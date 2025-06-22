import serviceIMG from '../../assets/Images/download (39).jpg';

const serviceList = [
    {
        name: 'Car Booking',
        description: 'Reserve cars based on availability, schedule, and location.',
        status: 'Active',
    },
    {
        name: 'Payment Processing',
        description: 'Secure and trackable payments for every booking.',
        status: 'Active',
    },
    {
        name: 'Reservation Management',
        description: 'View upcoming and past reservations linked to each user or car.',
        status: 'Active',
    },
    {
        name: 'Car Maintenance Logs',
        description: 'Track car servicing and maintenance schedules.',
        status: 'Active',
    },
    {
        name: 'Insurance Tracking',
        description: 'Monitor car insurance validity and coverage details.',
        status: 'Active',
    },
    {
        name: 'Location Mapping',
        description: 'Assign and view the physical location of each car.',
        status: 'Active',
    },
    {
        name: 'Customer Profiles',
        description: 'Manage customer info, activity, and verification status.',
        status: 'Active',
    },
    {
        name: 'Admin Dashboard',
        description: 'Gain insights into bookings, payments, fleet status, and more.',
        status: 'Active',
    },
];

const Services = () => {
    return (
        <div className="bg-gradient-to-br from-zinc-900 via-amber-800 to-yellow-900 text-yellow-100 font-mono py-10 px-6 md:px-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-fit">
                {/* Image */}
                <div className="w-full md:w-1/2 flex items-center mb-6 md:mb-0">
                    <img
                        src={serviceIMG}
                        alt="Our Services"
                        className="w-full h-48 md:h-full object-cover rounded-lg shadow-[0_0_30px_rgba(255,200,0,0.3)] border border-yellow-700"
                    />
                </div>

                
                <div className="w-full md:w-1/2 flex flex-col gap-6">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-amber-300 drop-shadow">
                        Our Services
                    </h2>
                    <p className="mb-4 text-yellow-100 text-base md:text-lg leading-relaxed">
                        Our car rental system provides a complete suite of services to make managing and booking vehicles effortless for both customers and administrators.
                    </p>

                    <div className="overflow-x-auto rounded-lg border border-yellow-700 shadow-md bg-zinc-800/40 backdrop-blur-sm">
                        <table className="table table-zebra text-yellow-100">
                            <thead className="text-yellow-300 border-b border-yellow-600 bg-zinc-900/70">
                                <tr>
                                    <th>#</th>
                                    <th>Service</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviceList.map((service, index) => (
                                    <tr key={index} className="hover:bg-amber-900/20 transition">
                                        <th>{index + 1}</th>
                                        <td className="font-semibold text-amber-200">{service.name}</td>
                                        <td>{service.description}</td>
                                        <td>
                                            <span className="text-green-400 font-bold">{service.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
