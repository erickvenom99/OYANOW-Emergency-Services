import { FaPlay } from "react-icons/fa";
{
  /* import Heroimg from "../.../assets/dumbell.png" */
}

const hero = () => {
  return (
    <>
      <section>
        <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative">
          {/* Brand info*/}
          <div className="flex flex-col justify-center py-14 md:py-0 font-playfair">
            <div className="text-center md:text-left space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-relaxed xl:leading-normal">
                Gymes give u perfect <span className=" text-primary">body</span>
              </h1>
              <p className="text-gray-600 xl:max-w-[500px]">
                it is going to be an amazing journey will you ride with me. it
                is going to be an amazing journey will you ride with me.
              </p>
              {/* button section*/}
              <div className="flex justify-center items-center gap-8 md:justify-start !mt-4">
                <button className="primary-btn items-center gap-2 mt-4">
                  Order Now
                </button>
                <button className="flex justify-center items-center gap-2">
                  <FaPlay />
                  Watch Now
                </button>
              </div>
            </div>
          </div>
          {/* Hero images*/}
          <div className="flex justify-center items-center">
            {/* <img src={} alt="" className="w-[350px} md:w-[550px] xl:w-[700px] drop-shadow"/> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default hero;
