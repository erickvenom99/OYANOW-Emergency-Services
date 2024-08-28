import "./Service.css";
import service1 from "../../assets/service1.png";
import service2 from "../../assets/service2.png";
import service3 from "../../assets/service3.png";

const Services = () => {
  return (
    <>
      <section id="services">
        <div className="container text-center">
          <h1 className="title">OUR SERVICES</h1>
          <div className="row text-center">
            <div className="col-md-4 services">
              <img src={service1} className="services-img" />
              <h4>MECHANICAL SERIVICE</h4>
              <p>
                noremipsum norem ipsum norem ipsum noreem ipsum noreem
                ipsumnoremipsum norem ipsum norem ipsum noreem{" "}
              </p>
            </div>
            <div className="col-md-4 services">
              <img src={service2} className="services-img" />
              <h4>Electrical</h4>
              <p>
                noremipsum norem ipsum norem ipsum noreem ipsum noreem
                ipsumnoremipsum norem ipsum norem ipsum noreem{" "}
              </p>
            </div>
            <div className="col-md-4 services">
              <img src={service3} className="services-img" />
              <h4>Plumbering</h4>
              <p>
                noremipsum norem ipsum norem ipsum noreem ipsum noreem
                ipsumnoremipsum norem ipsum norem ipsum noreem{" "}
              </p>
            </div>
          </div>
          <button type="button" className="btn btn-primary">
            ALL SERVICES
          </button>
        </div>
      </section>
    </>
  );
};

export default Services;
