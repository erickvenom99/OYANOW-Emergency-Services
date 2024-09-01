import Services from "../ReusableComponents/Services/Services";
import AboutUs from "../AboutUs/AboutUs";
import Testimonials from "../ReusableComponents/Testimonials/Testimonials";
import Socials from "../ReusableComponents/Socials/Socials";
import Banner from "../ReusableComponents/Banner/Banner";
const Home = () => {
  return (
    <>
      <Banner />
      <Services />
      <AboutUs />
      <Testimonials />
      <Socials />
    </>
  );
};

export default Home;
