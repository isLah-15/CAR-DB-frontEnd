import { Outlet } from "react-router"
import Navbar from "../Components/Nav/Navbar"


const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div>
                <aside>

                </aside>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Dashboard