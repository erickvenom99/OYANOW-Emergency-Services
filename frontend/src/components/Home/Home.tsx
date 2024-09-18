import Services from "../ReusableComponents/Services/Services";
{/*import AboutUs from "../AboutUs/AboutUs"; */}
{/* import Testimonials from "../ReusableComponents/Testimonials/Testimonials"; */}
{/* import Socials from "../ReusableComponents/Socials/Socials"; */}
{/* import Banner from "../ReusableComponents/Banner/Banner"; */}
import Hero from "../ReusableComponents/Hero/Hero";
import Banner2 from "../ReusableComponents/Banner/Banner2";
import Banner3 from "../ReusableComponents/Banner/Banner3";
import Subscribe from "../ReusableComponents/Subscribe/Subscribe";

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <Banner2 />
      <Subscribe />
      <Banner3 />
    </>
  );
};

export default Home;
