import "./Testimonials.css";
import user1 from "../../assets/user1.jpg";
import user2 from "../../assets/user2.jpg";

const Testimonials = () => {
  return (
    <>
      <section id="testimonial">
        <div className="container">
          <h1 className="title text-center">Why choose us?</h1>
          <div className="row offset-1 ">
            <div className="col-md-5 testimonials">
              <p>
                noremipsum norem ipsum norem ipsum noreem ipsum noreem
                ipsumnoremipsum norem ipsum norem ipsum noreem
              </p>
              <img src={user1} />
              <p className="user-detials">
                <b>norem</b>
                <br />
                ipsum noreem
              </p>
            </div>
            <div className="col-md-5 testimonials">
              <p>
                noremipsum norem ipsum norem ipsum noreem ipsum noreem
                ipsumnoremipsum norem ipsum norem ipsum noreem
              </p>
              <img src={user2} />
              <p className="user-detials">
                <b>norem</b>
                <br />
                ipsum noreem
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
