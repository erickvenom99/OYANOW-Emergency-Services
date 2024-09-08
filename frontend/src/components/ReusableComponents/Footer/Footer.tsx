import wave2 from "../../../assets/wave2.png";
import demoLogo from "../../../assets/demo-logo.png";

const Footer = () => {
  return (
    <>
      <section id="footer" className="bg-custom-gradient text-white">
        <img src={wave2} alt="Wave" className="w-full" />
        <div className="container mx-auto py-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="w-full md:w-1/3 mb-4 px-2">
              <img src={demoLogo} alt="Demo Logo" className="mb-2" />
              <p className="text-sm">
                {" "}
                {/* Smaller text size */}
                noremipsum norem ipsum norem ipsum noreem ipsum noreem
                ipsumnoremipsum norem ipsum norem ipsum noreem. Press the bell
                icon to get notifications.
              </p>
            </div>
            {/* Contact Section */}
            <div className="w-full md:w-1/3 mb-4 px-2">
              <p className="font-bold text-sm">CONTACT US</p>{" "}
              {/* Smaller text size */}
              <p className="text-xs">
                {" "}
                {/* Smaller text size */}
                <i className="fas fa-map-marker-alt"></i> Wold Trade Center,
                Nigeria
              </p>
              <p className="text-xs">
                {" "}
                {/* Smaller text size */}
                <i className="fas fa-phone-alt"></i> +234 705 9966 007
              </p>
              <p className="text-xs">
                {" "}
                {/* Smaller text size */}
                <i className="fas fa-envelope"></i> noye.eric@gmail.com
              </p>
            </div>
            <div className="col-md-4 footer-box">
              <p>
                <b>Subscribe Newsletter</b>
              </p>
              <input
                type="email"
                className="mb-1 p-2 w-full rounded border border-white-600 bg-white-700 text-white"
                placeholder="Your email"
              />
              <button
                type="button"
                className="w-full bg-custom-dark-purple text-white px-4 py-2 rounded hover:bg-custom-dark-purple"
              >
                Subscribe
              </button>
            </div>
          </div>
          <hr className="my-4 border-gray-600" /> {/* Reduced margins */}
          <p className="text-center text-xs">
            {" "}
            {/* Smaller text size */}
            Website crafted by Noye and Chrix
          </p>
        </div>
      </section>
    </>
  );
};

export default Footer;
