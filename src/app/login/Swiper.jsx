import Slider from "react-slick"
import { Component } from "react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Image from "next/image"

export default class Swiper extends Component {
  render() {
    const settings = {
      accessibility: false,

      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      adaptiveHeight: true,
      centerPadding: 0,

      slidesToScroll: 1,
    }
    return (
      <Slider {...settings} className="login-swiper">
        <div className="">
          <div className="login-slide">1</div>
        </div>
        <div>
          <div className="login-slide">2</div>
        </div>
      </Slider>
    )
  }
}
