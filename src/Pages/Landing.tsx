import About from "../Components/About/About";
import Testimonials from "../Components/About/Testimonials";
import Footer from "../Components/Footer/Footer";
import Hero from "../Components/Home/Hero";
import Navbar from "../Components/Nav/Navbar";
import Services from "../Components/Service/Service";



const LandingPage = () => {
    return (
        <div>
            <Navbar/>
            <Hero />
            <About />
            <Services />
            <Testimonials />
            <Footer/>

        </div>
    )
}

export default LandingPage;