import React from 'react'
import { Navbar, VolunteerTile, Footer } from "../components";
import { volunteer1 } from "../images";

const Volunteers = () => {
    const works=["Hosting","Hunger Drive","Animal Welfare"]
    return (
        <div className="bg-cgrey">
          <div className=" bg-eventHeader  h-1/2 w-full p-4 md:p-10">
            <Navbar Page="organisations" />
            <div className="mt-20 text-white md:mt-28 ml-5 mb-10">
              <h1 className="text-4xl font-bold mb-3">Volunteers</h1>
              <p>
              Here are the volunteers present in this organisation
              </p>
            </div>
          </div>
          <div className="pt-12 flex flex-col items-center">
          <VolunteerTile
              image={volunteer1}
              name="xyz"
              works={works}
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
              organisation="drishti"
            />
            <VolunteerTile
              image={volunteer1}
              name="xyz"
              works={works}
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
              organisation="drishti"
            />
            <VolunteerTile
              image={volunteer1}
              name="xyz"
              works={works}
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
              organisation="drishti"
            />
            <VolunteerTile
              image={volunteer1}
              name="xyz"
              works={works}
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
              organisation="drishti"
            />
            <VolunteerTile
              image={volunteer1}
              name="xyz"
              works={works}
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
              organisation="drishti"
            />
          </div>
          <Footer />
        </div>
      );
}

export default Volunteers
