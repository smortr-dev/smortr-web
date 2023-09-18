/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Slider from "react-slick";
import { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";

// export type CounterProps = { number: number };
export default class Swiper extends Component {
  slider: any;
  constructor(props: any) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  render() {
    // let number = this.props;
    // console.log(number, "props");
    const settings = {
      //   dots: true,

      className: "center",
      centerMode: true,
      infinite: true,
      // speed: 5000,
      varibleWidth: true,
      // centerPadding: "60px",
      //   slidesPerRow: 2,.
      // autoplay: true,
      autoplaySpeed: 2000,
      slidesToShow: 5,
      // adaptiveHeight: true,
      swipeToSlide: true,
      // rows: 1,
      slidesToScroll: 1,
      cssEase: "linear",
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 2000,
          settings: {
            centerMode: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            // dots: true,
          },
        },
        {
          breakpoint: 1800,
          settings: {
            centerMode: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            // dots: true,
          },
        },
        {
          breakpoint: 1439,
          settings: {
            centerMode: true,
            // centerMode: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            // dots: true,
          },
        },
        {
          breakpoint: 1023,
          settings: {
            centerMode: true,
            // centerMode: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            // dots: true,
          },
        },
        {
          breakpoint: 767,
          settings: {
            centerMode: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            // initialSlide: 2,
          },
        },
        {
          breakpoint: 500,
          settings: {
            centerMode: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          },
        },
      ],
      // pauseOnHover: true,
    };
    // <img
    //       src="/arrow_next.svg"
    //       className="inline-block absolute top-[calc(50%-2rem)] h-[4rem] w-[4rem]"
    //     />
    return (
      <div className="relative">
        <Slider
          ref={(c) => (this.slider = c)}
          {...settings}
          // noflex
          className="flex relative m-0 overflow-x-hidden overflow-y-visible py-16"
        >
          <Card
            link="https://ganesh.smortr.com"
            image="person1.png"
            background="bg1.png"
            name="Ganesh Babu"
            thought="Mapping the cultural richness of Dravidian Urbanism in India and ‘Toekomst' in the Netherlands."
            position="Urbanist"
            place="Rotterdam"
            about="I love cities and their idiosyncrasies. My life’s mission is to work towards understanding and documenting the myriad of complex systems that make cities possible while developing sustainable solutions to fixing the most pressing issues facing them."
            pronouns="he/him"
          />
          <Card
            link="https://shylesh.smortr.com"
            image="person2.png"
            background="bg2.png"
            name="Shylesh Kumar"
            thought="Interested in generative design, computational geometry, machine learning, new media, and game design."
            position="Computational Designer"
            place="Catalonia"
            about="Armed with extensive experience in architectural sustainability, I channel creativity through innovative technologies, seamlessly integrating parametric 3D modeling and simulation tools into the architectural process."
            pronouns="he/him"
          />
          <Card
            link="https://saroja.smortr.com"
            image="person3.png"
            background="bg3.png"
            name="Saroja Arunachalam"
            thought="Looking for local artists to collaborate on Starbucks store designs and experiences."
            position="Store Design Manager"
            place="Seattle"
            about="I use design to create business identities."
            pronouns="she/her"
          />
          <Card
            link="https://samad.smortr.com"
            image="person4.png"
            background="bg4.png"
            name="Samad Vahora"
            thought="Currently designing homes at Robbins Architecture."
            position="Architectural Designer"
            place="Chicago"
            about="I possess the artful prowess to sculpt living spaces into harmonious havens, blending form and function to create residential dreams that transcend mere structures, awakening the essence of home."
            pronouns="he/him"
          />
          <Card
            link="https://neel.smortr.com"
            image="person5.png"
            background="bg5.png"
            name="Neel Shah"
            thought="Building my portfolio at the intersection of engineering, design and interactive experiences."
            position="Product Design Engineer"
            place="Berkeley"
            about="I am a product design engineer who uses empathy and engineering to design products that are intuitive, meaningful, inclusive, and simple. "
            pronouns="he/him"
          />
          <Card
            link="https://harsh.smortr.com"
            image="person6.png"
            background="bg6.png"
            name="Harsh Verma"
            thought="Open to collaborate with architects and interior designers on furniture design for residential and commercial projects!"
            position="Product Designer"
            place="New Delhi"
            about="I am a product designer specializing in furniture design for the premium residential and commercial sector."
            pronouns="he/him"
          />
          <Card
            link="https://kumaran.smortr.com"
            image="person7.png"
            background="bg7.png"
            name="Kumaran Parthiban"
            thought="Let’s talk about the future and how it will manifest."
            position="Speculative Architect/Educator"
            place="Los Angeles"
            about="I’m a visionary architect and educator, navigating the digital frontier, shaping tomorrow’s aesthetics through digital technology and embracing Gen Z zeitgeist! "
            pronouns="he/him"
          />
        </Slider>
        <img
          src="/arrow_prev.svg"
          className="hd:inline-block absolute top-[calc(50%-2rem)] left-2 h-[6rem] w-[6rem] cursor-pointer hidden"
          onClick={this.previous}
        />
        <img
          src="/arrow_next.svg"
          className="hd:inline-block absolute top-[calc(50%-2rem)] right-2 h-[6rem] w-[6rem] cursor-pointer hidden "
          onClick={this.next}
        />
      </div>
    );
  }
}
