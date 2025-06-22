import story1 from '../../assets/Images/Character 1.jpg';
import story2 from '../../assets/Images/Character 2.jpg';
import story3 from '../../assets/Images/Character 3.jpg';
import story4 from '../../assets/Images/Character 4.jpg';
import story5 from '../../assets/Images/Character 5.jpg';
import story6 from '../../assets/Images/Character 6.jpg';
import story7 from '../../assets/Images/Character 7.jpg';
import story8 from '../../assets/Images/Character 8.jpg';

type Testimonial = {
    id: number;
    name: string;
    role: string;
    image: string;
    content: string;
};

export const testimonialsData: Testimonial[] = [
    {
        id: 1,
        name: 'Axel Burnt',
        role: 'Wasteland Courier',
        image: story1,
        content: 'Never thought I’d find a ride this fast in the Dustlands. Gear Masters let me claim my wheels in under five minutes. Pure grit.',
    },
    {
        id: 2,
        name: 'Vera Blight',
        role: 'Road Broker',
        image: story2,
        content: 'I deal in chaos and wheels. Gear Masters gives me control of bookings like a war rig commander. Clean. Brutal. Efficient.',
    },
    {
        id: 3,
        name: 'Wrench Maddox',
        role: 'Grease Chief',
        image: story3,
        content: 'Maintenance used to be a paper mess. Now, I log repairs, flag breakdowns, and keep the fleet roaring with zero fuss.',
    },
    {
        id: 4,
        name: 'Nyx Void',
        role: 'Risk Tracker',
        image: story4,
        content: 'Out here, insurance is survival. Gear Masters pings us before coverage burns out. No blind spots. No excuses.',
    },
    {
        id: 5,
        name: 'Torque Vane',
        role: 'Fleet Commander',
        image: story5,
        content: 'Full throttle control—drivers, rides, and resource stats. Gear Masters is the dashboard of the new road order.',
    },
    {
        id: 6,
        name: 'Ash Ember',
        role: 'Drifter Client',
        image: story6,
        content: 'No lies, no rust. Gear Masters shows me every scar on a ride before I even touch the wheel. That’s trust.',
    },
    {
        id: 7,
        name: 'Diesel Rakk',
        role: 'Scout Ops Analyst',
        image: story7,
        content: 'Watching wheels across the zone used to be guesswork. Now I pinpoint rigs in seconds. No room for error.',
    },
    {
        id: 8,
        name: 'Chrome Faye',
        role: 'Trade Ledger',
        image: story8,
        content: 'No missing credits. No ghost transactions. Every gear, every coin—it all shows clear. Clean ledgers or no deal.',
    },
];
