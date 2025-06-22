import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-gradient-to-r from-zinc-900 via-amber-800 to-yellow-900 text-yellow-200 font-mono border-t border-yellow-700 p-10 shadow-inner">
                <nav>
                    <h6 className="footer-title text-yellow-400 uppercase tracking-wider">Services</h6>
                    <a className="link link-hover hover:text-amber-400 transition">Car Booking</a>
                    <a className="link link-hover hover:text-amber-400 transition">Insurance Tracking</a>
                    <a className="link link-hover hover:text-amber-400 transition">Reservation Management</a>
                    <a className="link link-hover hover:text-amber-400 transition">Payment Processing</a>
                </nav>
                <nav>
                    <h6 className="footer-title text-yellow-400 uppercase tracking-wider">Company</h6>
                    <a className="link link-hover hover:text-amber-400 transition">About us</a>
                    <a className="link link-hover hover:text-amber-400 transition">Contacts</a>
                    <a className="link link-hover hover:text-amber-400 transition">Address</a>
                    <a className="link link-hover hover:text-amber-400 transition">Location</a>
                </nav>
                <nav>
                    <h6 className="footer-title text-yellow-400 uppercase tracking-wider">Social Media</h6>
                    <div className="grid grid-flow-col gap-4 mt-2">
                        <a className="hover:text-amber-400 transition">
                            <FaTwitter className="text-2xl cursor-pointer" />
                        </a>
                        <a className="hover:text-amber-400 transition">
                            <FaYoutube className="text-2xl cursor-pointer" />
                        </a>
                        <a className="hover:text-amber-400 transition">
                            <FaFacebook className="text-2xl cursor-pointer" />
                        </a>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;
