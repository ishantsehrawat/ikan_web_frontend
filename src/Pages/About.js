import React from "react";

import { Navbar } from "../components";

function About() {
  return (
    <div className="bg-cgrey">
      <div className=" bg-lightsaffron h-[50vh] w-full p-10">
        <Navbar Page="about" />
        <div className="mt-40 ml-5">
          <h1 className="text-4xl font-bold mb-3">About Us</h1>
        </div>
      </div>
      <div className="mx-36 pt-16">
        <div className="flex justify-between">
          <div>
            <h1 className="text-4xl font-semibold mb-4">Vision</h1>
            <p className="w-[450px]">
              Creating a platform for streamlining the interaction between
              volunteers and organisations. And working towards long lasting
              social services.
            </p>
          </div>
          <div>
            <h1 className="text-4xl font-semibold mb-4">Mission</h1>
            <p className="w-[450px]">
              Building credibility for volunteer organisations and encouraging
              more people to volunteer for social services.
            </p>
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-semibold mt-24 mb-4">Goals</h1>
          <p>
            There is no greater joy nor greater reward than to make a
            fundamental difference in someone's life. The aim behind this
            project is to help individuals and organizations ,working for the
            greater good, come together and connect. A lot of young adults and
            college students wish to volunteer for social work but are unable to
            do so due to the lack of information and credibility and a proper
            platform to achieve this. There are several NGOs which cannot afford
            to have a website due to financial reasons, even if someone makes
            one for them it is really difficult to maintain it with all the
            other finances involved. This way the work does not receive adequate
            attention and a lot of people are unaware. <br />
            <br />A lot of these NGOs are also focused towards teaching young
            students. Having volunteered as a teacher ourselves, we agree that
            not everyone is academically well performing but that does not mean
            that they are bound to fail in life. This can be prevented by
            teaching them other life skills and providing them with
            opportunities to explore other avenues in life.
          </p>
        </div>
        <div>
          <h1 className="text-4xl font-semibold mt-24 mb-4">Our Team</h1>
          <div className="flex gap-10">
            <p>Ishant</p>
            <p>Khushi</p>
            <p>Aayush</p>
            <p>Nidhi</p>
          </div>
        </div>
      </div>
      <div className="bg-lightsaffron h-32 mt-20"></div>
    </div>
  );
}

export default About;
