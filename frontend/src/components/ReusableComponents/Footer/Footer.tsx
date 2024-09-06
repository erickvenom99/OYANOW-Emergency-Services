import "./Footer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import wave2 from "../../../assets/wave2.png";
import demoLogo from "../../../assets/demo-logo.png";

const Footer = () => {
  return (
    <>
      <section id="footer">
        <img src={wave2} className="footer-img" />
        <div className="container">
          <div className="row">
            <div className="col-md-4 footer-box">
              <img src={demoLogo} />
              <p>
                noremipsum norem ipsum norem ipsum noreem ipsum noreem
                ipsumnoremipsum norem ipsum norem ipsum noreem.press the bell
                icon to get nofitication
              </p>
            </div>
            <div className="col-md-4 footer-box">
              <p>
                <b>CONTACT US</b>
              </p>
              <p>
                <i className="fas fa-map-marker-alt"></i> Wold Trade Center,
                Nigeria
              </p>
              <p>
                <i className="fas fa-phone-alt"></i> +234 705 9966 007
              </p>
              <p>
                <i className="fas fa-envelope"></i> noye.eric@gmail.com
              </p>
            </div>
            <div className="col-md-4 footer-box">
              <p>
                <b>Subscribe Newsletter</b>
              </p>
              <input
                type="email"
                className="form-control"
                placeholder="Your email"
              />
              <button type="button" className="btn btn-primary">
                Subscribe
              </button>
            </div>
          </div>
          <hr />
          <p className="copyright">Webiste crafted by Noye and Chrix</p>
        </div>
      </section>
    </>
  );
};

export default Footer;
