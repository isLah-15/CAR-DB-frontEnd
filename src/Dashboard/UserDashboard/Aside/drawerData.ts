import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FaUserCheck } from "react-icons/fa6";
import { FaCar } from "react-icons/fa6";


export type DrawerData = {
    id: string;
    name: string;
    icon: React.ComponentType<{ size?: number }>;
    link: string;
}

export const userDrawerData: DrawerData[] = [
    
    {
            id: "cars",
            name: "Cars",
            icon: FaCar,
            link: "cars"
        },
    {
        id: "profile",
        name: "Profile",
        icon: FaUserCheck,
        link: "profile"
    },
    {
        id: "analytics",
        name: "Analytics",
        icon: TbBrandGoogleAnalytics,
        link: "analytics"
    }

]