import "./Socials.css";
import facebookIcon from "../../../assets/facebook-icon.png";
import instagramIcon from "../../../assets/instagram-icon.png";
import twitterIcon from "../../../assets/twitter-icon.png";
import whatsappIcon from "../../../assets/whatsapp-icon.png";
import linkedinIcon from "../../../assets/linkedin-icon.png";
import SnapchatIcon from "../../../assets/facebook-icon.png";

const Socials = () => {
  return (
    <>
      <section id="social-media">
        <div className="container text-center">
          <p>FIND US ON SOCAIL MEDIA</p>
          <div className="social-icons">
            <a href="#">
              <img src={facebookIcon} />
            </a>
            <a href="#">
              <img src={instagramIcon} />
            </a>
            <a href="#">
              <img src={twitterIcon} />
            </a>
            <a href="#">
              <img src={whatsappIcon} />
            </a>
            <a href="#">
              <img src={linkedinIcon} />
            </a>
            <a href="#">
              <img src={SnapchatIcon} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Socials;
