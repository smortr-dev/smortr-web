import Slider from "react-slick"
import { Component } from "react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Image from "next/image"

export default class Swiper extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <Slider {...settings} className="signup-swiper">
        <div>
          <div className="signup-slide">1</div>
        </div>
        <div>
          <div className="signup-slide"></div>
        </div>
        <div>
          <div className="signup-slide"></div>
        </div>
      </Slider>
    )
  }
}
