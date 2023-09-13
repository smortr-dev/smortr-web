/* eslint-disable @next/next/no-img-element */
import Slider from "react-slick";
import { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";
// export type CounterProps = { number: number };
export default class Swiper extends Component {
  render() {
    // let number = this.props;
    // console.log(number, "props");
    const settings = {
      //   dots: true,

      className: "center",
      centerMode: true,
      infinite: true,
      // speed: 5000,
      // varibleWidth: true,
      // centerPadding: "60px",
      //   slidesPerRow: 2,.
      // autoplay: true,
      autoplaySpeed: 2000,
      slidesToShow: 3,
      swipeToSlide: true,
      // rows: 1,
      slidesToScroll: 1,
      cssEase: "linear",
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 2000,
          settings: {
            centerMode: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            // dots: true,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            // initialSlide: 2,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
      // pauseOnHover: true,
    };
    return (
      <Slider {...settings} className="w-[100vw] m-0 overflow-hidden">
        <Card
          link="ganesh.smortr.com"
          image="person1.png"
          background="bg1.png"
          name="Ganesh Baby"
          thought="Mapping the cultural richness of Dravidian Urbanism in India and ‘Toekomst' in the Netherlands."
          position="Urbanist"
          place="Rotterdam"
          about="I love cities and their idiosyncrasies. My life’s mission is to work towards understanding and documenting the myriad of complex systems that make cities possible while developing sustainable solutions to fixing the most pressing issues facing them."
          pronouns="he/him"
        />
        <Card
          link="shylesh.smortr.com"
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
          link="saroja.smortr.com"
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
          link="samad.smortr.com"
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
          link="neel.smortr.com"
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
          link="harsh.smortr.com"
          image="person6.png"
          background="bg6.png"
          name="Harsh Varma"
          thought="Open to collaborate with architects and interior designers on furniture design for residential and commercial projects!"
          position="Product Designer"
          place="New Delhi"
          about="I am a product designer specializing in furniture design for the premium residential and commercial sector."
          pronouns="he/him"
        />
        <Card
          link="kumaran.smortr.com"
          image="person7.png"
          background="bg7.png"
          name="Kumaran Parthibhan"
          thought="Let’s talk about the future and how it will manifest."
          position="Speculative Architect/Educator"
          place="Los Angeles"
          about="I’m a visionary architect and educator, navigating the digital frontier, shaping tomorrow’s aesthetics through digital technology and embracing Gen Z zeitgeist! "
          pronouns="he/him"
        />
        {/* <div>
          
          <div className="relative lg:w-[25vw] md:w-[40vw] w-[70vw]  rounded-[18px] lg:h-[70vh] md:h-[45vh] h-[55vh] bg-white md:mx-4 mx-2">
            <div className="overflow-clip rounded-t-[18px] h-[40%] ">
              <img src="/test.png" className="w-full object-contain" alt="" />
            </div>
            <div className="inline-block absolute w-[0.3rem] h-[0.3rem] rounded-full bg-white lg:left-[calc(50%-3rem)]  left-[calc(50%-2.5rem)] lg:translate-y-[-4rem] translate-y-[-2.8rem]"></div>
            <div className="inline-block absolute w-[0.5rem] h-[0.5rem] rounded-full bg-white lg:left-[calc(50%-3.8rem)]  left-[calc(50%-3rem)] lg:translate-y-[-4.5rem] translate-y-[-3.5rem]"></div>
            <div className="inline-block absolute w-[0.67rem] h-[0.67rem] rounded-full bg-white lg:left-[calc(50%-4.5rem)]  left-[calc(50%-3.6rem)] lg:translate-y-[-5.2rem] translate-y-[-4.2rem]"></div>
            <div className="flex justify-center p-4 items-center absolute bg-white min-h-[15%] rounded-[6px] md:w-[16rem] w-[12rem] md:left-[calc(50%-8rem)] left-[calc(50%-6rem)] lg:translate-y-[calc(-85%-5.8rem)] translate-y-[calc(-85%-5rem)] ">
              <div className="md:text-[0.8rem] text-[0.65rem] tracking-[-0.015rem]">
                Let’s talk about the future and how it will manifest.
              </div>
            </div>
            <img
              className="inline-block absolute lg:h-[8rem] lg:w-[8rem] h-[6rem] w-[6rem] rounded-full border-2 border-white lg:left-[calc(50%-4rem)]  left-[calc(50%-3rem)] lg:translate-y-[-4rem] translate-y-[-3rem]"
              src="/test.png"
              alt="img"
            />
            <div className="p-8 lg:h-[calc(70vh-40%)] md:h-[calc(45vh-40%)] h-[calc(55vh-40%)] lg:pt-[4rem] pt-[3rem] flex flex-col justify-between">
              <div className="mt-2 relative">
                <h2 className="lg:text-[2rem] md:text-[1.8rem] text-[1.5rem] text-center font-[800] tracking-tight leading-tight">
                  Jonathan Wick
                </h2>
                <p className="font-[600] md:text-[0.92rem] text-[0.8rem] text-center">
                  Interior Designer in{" "}
                  <span className="text-[#9F9F9F]">Dubai</span>
                </p>
                <p className="text-center mt-2 text-[0.75rem]">(he/him)</p>
              </div>

              <p className="text-center lg:mt-8 mt-2  md:text-[0.8rem] text-[0.7rem] font-[600] leading-tight">
                Multidisciplinary interior designer integrating art, science and
                technology to create immersive natural environments
              </p>
            </div>
          </div>
        </div>
        <div>
          
          <div className="relative lg:w-[25vw] md:w-[40vw] w-[70vw]  rounded-[18px] lg:h-[70vh] md:h-[45vh] h-[55vh] bg-white md:mx-4 mx-2">
            <div className="overflow-clip rounded-t-[18px] h-[40%] ">
              <img src="/test.png" className="w-full object-contain" alt="" />
            </div>
            <div className="inline-block absolute w-[0.3rem] h-[0.3rem] rounded-full bg-white lg:left-[calc(50%-3rem)]  left-[calc(50%-2.5rem)] lg:translate-y-[-4rem] translate-y-[-2.8rem]"></div>
            <div className="inline-block absolute w-[0.5rem] h-[0.5rem] rounded-full bg-white lg:left-[calc(50%-3.8rem)]  left-[calc(50%-3rem)] lg:translate-y-[-4.5rem] translate-y-[-3.5rem]"></div>
            <div className="inline-block absolute w-[0.67rem] h-[0.67rem] rounded-full bg-white lg:left-[calc(50%-4.5rem)]  left-[calc(50%-3.6rem)] lg:translate-y-[-5.2rem] translate-y-[-4.2rem]"></div>
            <div className="flex justify-center p-4 items-center absolute bg-white min-h-[15%] rounded-[6px] md:w-[16rem] w-[12rem] md:left-[calc(50%-8rem)] left-[calc(50%-6rem)] lg:translate-y-[calc(-85%-5.8rem)] translate-y-[calc(-85%-5rem)] ">
              <div className="md:text-[0.8rem] text-[0.65rem] tracking-[-0.015rem]">
                Let’s talk about the future and how it will manifest.
              </div>
            </div>
            <img
              className="inline-block absolute lg:h-[8rem] lg:w-[8rem] h-[6rem] w-[6rem] rounded-full border-2 border-white lg:left-[calc(50%-4rem)]  left-[calc(50%-3rem)] lg:translate-y-[-4rem] translate-y-[-3rem]"
              src="/test.png"
              alt="img"
            />
            <div className="p-8 lg:h-[calc(70vh-40%)] md:h-[calc(45vh-40%)] h-[calc(55vh-40%)] lg:pt-[4rem] pt-[3rem] flex flex-col justify-between">
              <div className="mt-2 relative">
                <h2 className="lg:text-[2rem] md:text-[1.8rem] text-[1.5rem] text-center font-[800] tracking-tight leading-tight">
                  Jonathan Wick
                </h2>
                <p className="font-[600] md:text-[0.92rem] text-[0.8rem] text-center">
                  Interior Designer in{" "}
                  <span className="text-[#9F9F9F]">Dubai</span>
                </p>
                <p className="text-center mt-2 text-[0.75rem]">(he/him)</p>
              </div>

              <p className="text-center lg:mt-8 mt-2  md:text-[0.8rem] text-[0.7rem] font-[600] leading-tight">
                Multidisciplinary interior designer integrating art, science and
                technology to create immersive natural environments
              </p>
            </div>
          </div>
        </div>
        <div>
          
          <div className="relative lg:w-[25vw] md:w-[40vw] w-[70vw]  rounded-[18px] lg:h-[70vh] md:h-[45vh] h-[55vh] bg-white md:mx-4 mx-2">
            <div className="overflow-clip rounded-t-[18px] h-[40%] ">
              <img src="/test.png" className="w-full object-contain" alt="" />
            </div>
            <div className="inline-block absolute w-[0.3rem] h-[0.3rem] rounded-full bg-white lg:left-[calc(50%-3rem)]  left-[calc(50%-2.5rem)] lg:translate-y-[-4rem] translate-y-[-2.8rem]"></div>
            <div className="inline-block absolute w-[0.5rem] h-[0.5rem] rounded-full bg-white lg:left-[calc(50%-3.8rem)]  left-[calc(50%-3rem)] lg:translate-y-[-4.5rem] translate-y-[-3.5rem]"></div>
            <div className="inline-block absolute w-[0.67rem] h-[0.67rem] rounded-full bg-white lg:left-[calc(50%-4.5rem)]  left-[calc(50%-3.6rem)] lg:translate-y-[-5.2rem] translate-y-[-4.2rem]"></div>
            <div className="flex justify-center p-4 items-center absolute bg-white min-h-[15%] rounded-[6px] md:w-[16rem] w-[12rem] md:left-[calc(50%-8rem)] left-[calc(50%-6rem)] lg:translate-y-[calc(-85%-5.8rem)] translate-y-[calc(-85%-5rem)] ">
              <div className="md:text-[0.8rem] text-[0.65rem] tracking-[-0.015rem]">
                Let’s talk about the future and how it will manifest.
              </div>
            </div>
            <img
              className="inline-block absolute lg:h-[8rem] lg:w-[8rem] h-[6rem] w-[6rem] rounded-full border-2 border-white lg:left-[calc(50%-4rem)]  left-[calc(50%-3rem)] lg:translate-y-[-4rem] translate-y-[-3rem]"
              src="/test.png"
              alt="img"
            />
            <div className="p-8 lg:h-[calc(70vh-40%)] md:h-[calc(45vh-40%)] h-[calc(55vh-40%)] lg:pt-[4rem] pt-[3rem] flex flex-col justify-between">
              <div className="mt-2 relative">
                <h2 className="lg:text-[2rem] md:text-[1.8rem] text-[1.5rem] text-center font-[800] tracking-tight leading-tight">
                  Jonathan Wick
                </h2>
                <p className="font-[600] md:text-[0.92rem] text-[0.8rem] text-center">
                  Interior Designer in{" "}
                  <span className="text-[#9F9F9F]">Dubai</span>
                </p>
                <p className="text-center mt-2 text-[0.75rem]">(he/him)</p>
              </div>

              <p className="text-center lg:mt-8 mt-2  md:text-[0.8rem] text-[0.7rem] font-[600] leading-tight">
                Multidisciplinary interior designer integrating art, science and
                technology to create immersive natural environments
              </p>
            </div>
          </div>
        </div>
        <div>
          
          <div className="relative lg:w-[25vw] md:w-[40vw] w-[70vw]  rounded-[18px] lg:h-[70vh] md:h-[45vh] h-[55vh] bg-white md:mx-4 mx-2">
            <div className="overflow-clip rounded-t-[18px] h-[40%] ">
              <img src="/test.png" className="w-full object-contain" alt="" />
            </div>
            <div className="inline-block absolute w-[0.3rem] h-[0.3rem] rounded-full bg-white lg:left-[calc(50%-3rem)]  left-[calc(50%-2.5rem)] lg:translate-y-[-4rem] translate-y-[-2.8rem]"></div>
            <div className="inline-block absolute w-[0.5rem] h-[0.5rem] rounded-full bg-white lg:left-[calc(50%-3.8rem)]  left-[calc(50%-3rem)] lg:translate-y-[-4.5rem] translate-y-[-3.5rem]"></div>
            <div className="inline-block absolute w-[0.67rem] h-[0.67rem] rounded-full bg-white lg:left-[calc(50%-4.5rem)]  left-[calc(50%-3.6rem)] lg:translate-y-[-5.2rem] translate-y-[-4.2rem]"></div>
            <div className="flex justify-center p-4 items-center absolute bg-white min-h-[15%] rounded-[6px] md:w-[16rem] w-[12rem] md:left-[calc(50%-8rem)] left-[calc(50%-6rem)] lg:translate-y-[calc(-85%-5.8rem)] translate-y-[calc(-85%-5rem)] ">
              <div className="md:text-[0.8rem] text-[0.65rem] tracking-[-0.015rem]">
                Let’s talk about the future and how it will manifest.
              </div>
            </div>
            <img
              className="inline-block absolute lg:h-[8rem] lg:w-[8rem] h-[6rem] w-[6rem] rounded-full border-2 border-white lg:left-[calc(50%-4rem)]  left-[calc(50%-3rem)] lg:translate-y-[-4rem] translate-y-[-3rem]"
              src="/test.png"
              alt="img"
            />
            <div className="p-8 lg:h-[calc(70vh-40%)] md:h-[calc(45vh-40%)] h-[calc(55vh-40%)] lg:pt-[4rem] pt-[3rem] flex flex-col justify-between">
              <div className="mt-2 relative">
                <h2 className="lg:text-[2rem] md:text-[1.8rem] text-[1.5rem] text-center font-[800] tracking-tight leading-tight">
                  Jonathan Wick
                </h2>
                <p className="font-[600] md:text-[0.92rem] text-[0.8rem] text-center">
                  Interior Designer in{" "}
                  <span className="text-[#9F9F9F]">Dubai</span>
                </p>
                <p className="text-center mt-2 text-[0.75rem]">(he/him)</p>
              </div>

              <p className="text-center lg:mt-8 mt-2  md:text-[0.8rem] text-[0.7rem] font-[600] leading-tight">
                Multidisciplinary interior designer integrating art, science and
                technology to create immersive natural environments
              </p>
            </div>
          </div>
        </div>
        <div>
          
          <div className="relative lg:w-[25vw] md:w-[40vw] w-[70vw]  rounded-[18px] lg:h-[70vh] md:h-[45vh] h-[55vh] bg-white md:mx-4 mx-2">
            <div className="overflow-clip rounded-t-[18px] h-[40%] ">
              <img src="/test.png" className="w-full object-contain" alt="" />
            </div>
            <div className="inline-block absolute w-[0.3rem] h-[0.3rem] rounded-full bg-white lg:left-[calc(50%-3rem)]  left-[calc(50%-2.5rem)] lg:translate-y-[-4rem] translate-y-[-2.8rem]"></div>
            <div className="inline-block absolute w-[0.5rem] h-[0.5rem] rounded-full bg-white lg:left-[calc(50%-3.8rem)]  left-[calc(50%-3rem)] lg:translate-y-[-4.5rem] translate-y-[-3.5rem]"></div>
            <div className="inline-block absolute w-[0.67rem] h-[0.67rem] rounded-full bg-white lg:left-[calc(50%-4.5rem)]  left-[calc(50%-3.6rem)] lg:translate-y-[-5.2rem] translate-y-[-4.2rem]"></div>
            <div className="flex justify-center p-4 items-center absolute bg-white min-h-[15%] rounded-[6px] md:w-[16rem] w-[12rem] md:left-[calc(50%-8rem)] left-[calc(50%-6rem)] lg:translate-y-[calc(-85%-5.8rem)] translate-y-[calc(-85%-5rem)] ">
              <div className="md:text-[0.8rem] text-[0.65rem] tracking-[-0.015rem]">
                Let’s talk about the future and how it will manifest.
              </div>
            </div>
            <img
              className="inline-block absolute lg:h-[8rem] lg:w-[8rem] h-[6rem] w-[6rem] rounded-full border-2 border-white lg:left-[calc(50%-4rem)]  left-[calc(50%-3rem)] lg:translate-y-[-4rem] translate-y-[-3rem]"
              src="/test.png"
              alt="img"
            />
            <div className="p-8 lg:h-[calc(70vh-40%)] md:h-[calc(45vh-40%)] h-[calc(55vh-40%)] lg:pt-[4rem] pt-[3rem] flex flex-col justify-between">
              <div className="mt-2 relative">
                <h2 className="lg:text-[2rem] md:text-[1.8rem] text-[1.5rem] text-center font-[800] tracking-tight leading-tight">
                  Jonathan Wick
                </h2>
                <p className="font-[600] md:text-[0.92rem] text-[0.8rem] text-center">
                  Interior Designer in{" "}
                  <span className="text-[#9F9F9F]">Dubai</span>
                </p>
                <p className="text-center mt-2 text-[0.75rem]">(he/him)</p>
              </div>

              <p className="text-center lg:mt-8 mt-2  md:text-[0.8rem] text-[0.7rem] font-[600] leading-tight">
                Multidisciplinary interior designer integrating art, science and
                technology to create immersive natural environments
              </p>
            </div>
          </div>
        </div> */}
      </Slider>
    );
  }
}
