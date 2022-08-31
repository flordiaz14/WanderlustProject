import React from "react";
import Slider from "react-slick";

const SimpleSlider = ({images, className}) => {

    const settings = {
        customPaging: function(i) {
            return (
                <button>
                    <img src={images[i]?.url} alt={images[i]?.title} style={{textAlign: "center", width:50, height: 50, padding:5 }}/>
                </button>
            );
          },
          dots: true,
          dotsClass: "slick-dots slick-thumb",
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 3000,
          cssEase: "linear"
      };

  return (
    <div id="simple--slider">
        {images && <Slider  className={`simple--slider ${className}`} {...settings}>
        <div style={{textAlign: "center"}}>
            <img src={images[0]?.url} alt={images?.title} style={{width:"auto", height: 500}}/>
            <p>1/5</p>
          </div>
          <div>
            <img src={images[1]?.url} alt={images?.title} style={{width:"auto", height: 500}}/>
            <p >2/5</p>
          </div>
          <div>
            <img src={images[2]?.url} alt={images?.title} style={{width:"auto", height: 500}}/>
            <p >3/5</p>
          </div>
          <div>
            <img src={images[3]?.url} alt={images?.title} style={{width:"auto", height: 500}}/>
            <p >4/5</p>
          </div>
          <div>
            <img src={images[4]?.url} alt={images?.title} style={{width:"auto", height: 500}}/>
            <p >5/5</p>
          </div>
        </Slider>}
      </div>
  )
}

export default SimpleSlider;