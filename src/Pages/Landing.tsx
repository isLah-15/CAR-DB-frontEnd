import Footer from "../Components/Footer/Footer";
import Hero from "../Components/Home/Hero";
import Navbar from "../Components/Nav/Navbar";



const LandingPage = () => {
    return (
        <div>
            <Navbar/>
            <Hero />
            {/* <About /> */}
            {/* <Services /> */}
            {/* <Testimonials /> */}
            <Footer/>

        </div>
    )
}

export default LandingPage;