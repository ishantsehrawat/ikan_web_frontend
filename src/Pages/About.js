import React from "react";

import { Navbar, Footer } from "../components";

function About() {
  return (
    <div className="bg-cgrey">
      <div className=" bg-aboutHeader h-[50vh] w-full p-10">
        <Navbar Page="about" />
        <div className="mt-40 text-white ml-5">
          <h1 className="text-4xl font-bold mb-3">About Us</h1>
        </div>
      </div>
      <div className="mx-36 pt-16">
        <div className="flex justify-between">
          <div>
            <h1 className="text-4xl font-semibold mb-4">Vision</h1>
            <p className="w-[450px]">
            A world where every person has the opportunity to make a positive impact through volunteering would be one in which there are ample opportunities for individuals to get involved in their communities and make a difference.
            </p>
          </div>
          <div>
            <h1 className="text-4xl font-semibold mb-4">Mission</h1>
            <p className="w-[450px]">
            Connecting volunteers with meaningful opportunities to serve their communities involves identifying the specific needs of different organizations and matching them with individuals who have the skills and interests to help meet those needs.
            </p>
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-semibold mt-24 mb-4">Goals</h1>
          <p>
            There is no greater joy nor greater reward than to make a
            fundamental difference in someone's life. The aim behind this
            project is to help individuals and organizations ,working for the
            greater good, come together and connect.
            <ul className="flex flex-col gap-2 mt-4">
              <li><span className="font-semibold">Community:</span> We believe that volunteering is a powerful way to build stronger and more connected communities.</li>
              <li><span className="font-semibold">Empowerment:</span> We empower individuals to take action and make a difference in their communities.</li>
              <li><span className="font-semibold">Inclusion:</span> We strive to create a platform that is inclusive and accessible to all.</li>
              <li><span className="font-semibold">Support:</span> We are committed to providing support and resources to both volunteers and non-profit organizations.</li>
              <li><span className="font-semibold">Impact:</span> We measure our success by the positive impact we make in our communities.</li>
            </ul>
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
      {/* <div className="bg-lightsaffron h-32 mt-20"></div> */}
      <Footer/>
    </div>
  );
}

export default About;
