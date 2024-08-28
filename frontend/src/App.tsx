import "./index.css";
import Banner from "./components/Banner/Banner";
import Navbar from "./components/Navbar/Navbar";
import Services from "./components/Services/Services";
import AboutUs from "./components/AboutUs/AboutUs";
import Testimonials from "./components/Testimonials/Testimonials";
import Socials from "./components/Socials/Socials";
import Footer from "./components/Footer/Footer";

const App = () => {
  const navItems = [
    { id: "1", title: "Home", url: "/" },
    { id: "2", title: "Electrical", url: "/features" },
    { id: "3", title: "Mechanical", url: "/pricing" },
    { id: "4", title: "Plumbering", url: "/testimonial" },
    { id: "5", title: "Pricing", url: "/pricing" },
    { id: "6", title: "Sign-in", url: "/sign-in" },
  ];
  return (
    <div>
      <Navbar navItems={navItems} />
      <Banner />
      <Services />
      <AboutUs />
      <Testimonials />
      <Socials />
      <Footer />
    </div>
  );
};

export default App;
