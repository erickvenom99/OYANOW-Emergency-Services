import "./AboutUs.css";
import network from "../../assets/network.png";

const AboutUs = () => {
  return (
    <>
      <section id="about-us">
        <div className="container">
          <h1 className="title text-center">Why choose us?</h1>
          <div className="row">
            <div className="col-md-6 about-us">
              <p className="about-title">Why we are different</p>
              <ul>
                <li>ipsum noreem ipsumnoremipsum</li>
                <li>ipsum noreem ipsumnoremipsum</li>
                <li>ipsum noreem ipsumnoremipsum</li>
                <li>ipsum noreem ipsumnoremipsum</li>
                <li>ipsum noreem ipsumnoremipsum</li>
                <li>ipsum noreem ipsumnoremipsum</li>
              </ul>
            </div>
            <div className="col-md-6">
              <img src={network} className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default AboutUs;
