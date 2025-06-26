import logo from '../../assets/Images/Ford 3 Window Coupe 1932 _Elvis_ aka _Convoy no_1_.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../Features/Login/UserSlice';
import type { RootState } from '../../app/store';

const Navbar = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="bg-gradient-to-r from-yellow-900 via-amber-800 to-zinc-900 shadow-lg border-b border-yellow-700">
            <div className="navbar h-24 px-4 md:px-10 text-yellow-300 font-mono">

                {/* Start (Logo & Mobile Menu) */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost text-yellow-300 lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-lg rounded-box w-52 bg-zinc-800 text-yellow-300 border border-yellow-700">
                            <li><NavLink to="/" className="hover:text-amber-400">Home</NavLink></li>
                            <li><NavLink to="/about" className="hover:text-amber-400">About</NavLink></li>
                            <li><NavLink to={user?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} className="hover:text-amber-400">Dashboard</NavLink></li>
                            <li><NavLink to="/services" className="hover:text-amber-400">Services</NavLink></li>
                            {!user && (
                                <>
                                    <li><NavLink to="/register" className="hover:text-amber-400">Register</NavLink></li>
                                    <li><NavLink to="/login" className="hover:text-amber-400">Login</NavLink></li>
                                </>
                            )}
                            {user && (
                                <li><button onClick={handleLogout} className="hover:text-red-400">Logout</button></li>
                            )}
                        </ul>
                    </div>

                    <img src={logo} alt="Gear Masters Logo" className="w-20 h-20 ml-4 rounded shadow-lg border border-yellow-700 hidden sm:block" />
                </div>

                {/* Center Nav (Desktop Only) */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-lg gap-4">
                        <li><NavLink to="/" className="hover:text-amber-400">Home</NavLink></li>
                        <li><NavLink to="/about" className="hover:text-amber-400">About</NavLink></li>
                        <li><NavLink to={user?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} className="hover:text-amber-400">Dashboard</NavLink></li>
                        <li><NavLink to="/services" className="hover:text-amber-400">Services</NavLink></li>
                    </ul>
                </div>

                {/* End (Auth Links / Logout) */}
                <div className="navbar-end">
                    <div className="flex gap-4 mr-2 text-lg">
                        {!user ? (
                            <>
                                <li className="list-none">
                                    <NavLink to="/register" className="hover:text-amber-400">Register</NavLink>
                                </li>
                                <li className="list-none">
                                    <NavLink to="/login" className="hover:text-amber-400">Login</NavLink>
                                </li>
                            </>
                        ) : (
                            <li className="list-none">
                                <button onClick={handleLogout} className="hover:text-red-400">Logout</button>
                            </li>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
