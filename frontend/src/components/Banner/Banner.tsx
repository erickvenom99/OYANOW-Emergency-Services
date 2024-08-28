import "./banner.css";
import play from "../../assets/play.png";
import home2 from "../../assets/home2.png";
import wave1 from "../../assets/wave1.png";

const Banner = () => {
  return (
    <>
      <section id="banner">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="promo-title">EMERGENCY SERVICES</p>
              <p>
                noremipsum norem ipsum norem ipsum noreem ipsum noreem ipsum
                noremipsum norem ipsum norem ipsum noreem ipsum noreem ipsum
                noremipsum norem ipsum norem ipsum noreem ipsum noreem ipsum
              </p>
              <a href="#">
                <img src={play} className="play-btn" />
                Watch Videos
              </a>
            </div>
            <div className="col-md-6 text-center">
              <img src={home2} className="img-fluid" />
            </div>
          </div>
        </div>
        <img src={wave1} className="bottom-img" />
      </section>
    </>
  );
};

export default Banner;
