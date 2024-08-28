import Navbar from "../ReusableComponents/Navbar/Navbar";
import Services from "../ReusableComponents/Services/Services";
import AboutUs from "../AboutUs/AboutUs";
import Testimonials from "../ReusableComponents/Testimonials/Testimonials";
import Socials from "../ReusableComponents/Socials/Socials";
import Banner from "../ReusableComponents/Banner/Banner";
import Footer from "../ReusableComponents/Footer/Footer";

const Home = () => {
  
  return (
    <>
      <Navbar />
      <Banner />
      <Services />
      <AboutUs />
      <Testimonials />
      <Socials />
      <Footer />
    </>
  );
};

export default Home;
