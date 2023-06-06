import React from "react";

import { Navbar, Footer } from "../components";

function About() {
  return (
    <div className="bg-cgrey">
      <div className=" bg-aboutHeader h-1/2 w-full p-4 md:p-10">
        <Navbar Page="about" />
        <div className="mt-40 text-white ml-5">
          <h1 className="text-4xl md:text-4xl font-bold mb-3">About Us</h1>
        </div>
      </div>
      <div className="px-10 md:px-36 pt-16">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h1 className="text-2xl md:text-4xl font-semibold mb-4">Vision</h1>
            <p className="md:w-[450px]">
              A world where every person has the opportunity to make a positive
              impact through volunteering would be one in which there are ample
              opportunities for individuals to get involved in their communities
              and make a difference.
            </p>
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-semibold mt-24 md:mt-0 mb-4">
              Mission
            </h1>
            <p className="md:w-[450px]">
              Connecting volunteers with meaningful opportunities to serve their
              communities involves identifying the specific needs of different
              organizations and matching them with individuals who have the
              skills and interests to help meet those needs.
            </p>
          </div>
        </div>
        <div>
          <h1 className="text-2xl md:text-4xl font-semibold mt-24 mb-4">
            Goals
          </h1>
          <div>
            There is no greater joy nor greater reward than to make a
            fundamental difference in someone's life. The aim behind this
            project is to help individuals and organizations ,working for the
            greater good, come together and connect.
            <ul className="flex flex-col gap-4 md:gap-2 mt-4">
              <li>
                <span className="font-bold md:font-semibold">Community:</span>{" "}
                We believe that volunteering is a powerful way to build stronger
                and more connected communities.
              </li>
              <li>
                <span className="font-bold md:font-semibold">Empowerment:</span>{" "}
                We empower individuals to take action and make a difference in
                their communities.
              </li>
              <li>
                <span className="font-bold md:font-semibold">Inclusion:</span>{" "}
                We strive to create a platform that is inclusive and accessible
                to all.
              </li>
              <li>
                <span className="font-bold md:font-semibold">Support:</span> We
                are committed to providing support and resources to both
                volunteers and non-profit organizations.
              </li>
              <li>
                <span className="font-bold md:font-semibold">Impact:</span> We
                measure our success by the positive impact we make in our
                communities.
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h1 className="text-2xl md:text-4xl font-semibold mt-24 mb-4">
            Our Team
          </h1>
          <div className="flex flex-wrap gap-10">
            <p>Ishant</p>
            <p>Khushi</p>
            <p>Aayush</p>
            <p>Nidhi</p>
            <p>Cherish</p>
          </div>
        </div>
      </div>
      {/* <div className="bg-lightsaffron h-32 mt-20"></div> */}
      <Footer />
    </div>
  );
}

export default About;
