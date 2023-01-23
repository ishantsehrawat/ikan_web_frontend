import React from 'react'
import { Navbar, OrganisationTile, Footer } from "../components";
import { organisation1 } from "../images";
const Organisations = () => {
  const events = ["Food Distribution: Zero Hunger"]
  return (
    <div className="bg-cgrey">
      <div className=" bg-eventHeader  h-1/2 w-full p-4 md:p-10">
        <Navbar Page="organisations" />
        <div className="mt-20 text-white md:mt-28 ml-5 mb-10">
          <h1 className="text-4xl font-bold mb-3">Organisations</h1>
          <p>
          Discover Organisations that you are interested in and make a change.
          </p>
        </div>
      </div>
      <div className="pt-12 flex flex-col items-center">
      <OrganisationTile
          image={organisation1}
          title="Drishti"
          events={events}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
        />
        <OrganisationTile
          image={organisation1}
          title="Drishti"
          events={events}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
        />
        <OrganisationTile
          image={organisation1}
          title="Drishti"
          events={events}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
        />
        <OrganisationTile
          image={organisation1}
          title="Drishti"
          events={events}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
        />
        <OrganisationTile
          image={organisation1}
          title="Drishti"
          events={events}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
        />
      </div>
      <Footer />
    </div>
  );
}

export default Organisations
