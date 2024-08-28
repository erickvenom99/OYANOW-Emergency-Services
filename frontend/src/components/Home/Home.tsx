import Navbar from "../ReusableComponents/Navbar/Navbar";
import Services from "../ReusableComponents/Services/Services";
import AboutUs from "../AboutUs/AboutUs";
import Testimonials from "../ReusableComponents/Testimonials/Testimonials";
import Socials from "../ReusableComponents/Socials/Socials";
import Banner from "../ReusableComponents/Banner/Banner";
import Footer from "../ReusableComponents/Footer/Footer";

const Home = () => {
  const navItems = [
    { id: "1", title: "Home", url: "/" },
    { id: "2", title: "Electrical", url: "/features" },
    { id: "3", title: "Mechanical", url: "/pricing" },
    { id: "4", title: "Plumbering", url: "/testimonial" },
    { id: "5", title: "Pricing", url: "/pricing" },
    { id: "6", title: "Sign-in", url: "/sign-up" },
  ];
  return (
    <>
      <Navbar navItems={navItems} />
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
