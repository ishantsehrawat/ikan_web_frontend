import React from 'react'

import {insta, linkedin} from "../images/icons";
import {logoOrange} from "../images";

function Footer() {
  return (
    <div className="mt-20">
    <div className="bg-lightsaffron h-32 flex justify-center items-center">
        <p className="mr-10 font-bold text-white text-xl">No act of kindness, no matter how small, is ever wasted. Support our organizations and their causes.</p>
        <a href="/donate" className="h-12 mr-12 w-44 bg-black text-white rounded-md flex justify-center items-center border-2 border-black">Donate Now</a>
    </div>
    <div className="bg-black h-[35vh] w-full text-white flex px-10 pt-5">
        <div className="w-[35vw]">
            <img className="w-48 h-32" src={logoOrange} alt="ikan" />
            <div className="flex">
                <img className="w-5 h-6 mr-4" src={insta} alt="ig" />
                <img className="w-5 h-5 mr-4" src={linkedin} alt="in" />
            </div>
        </div>
        <div className="flex w-full justify-between pt-2">
            <div className="flex flex-col gap-4 text-white-400"><p className="text-saffron underline">Useful Links</p>
                <a>Where to register ?</a>
                <a>How to verify ?</a>
                <a>Who can Donate ?</a>
            </div>
            <div className="flex flex-col gap-4 text-white-400"><p className="text-saffron underline">For Individuals</p>
                <a>Register Here</a>
                <a>Events</a>
                <a>Organisations</a>
            </div>
            <div className="flex flex-col gap-4 text-white-400"><p className="text-saffron underline">For Organisations</p>
                <a>Register Here</a>
                <a>Volunteers</a>
                <a>How to join us ?</a>
            </div>
            <div className="flex flex-col gap-4 text-white-400"><p className="text-saffron underline">News</p>
                <p>Coming Soon...</p>
            </div>
            <div className="flex flex-col gap-4 text-white-400"><p className="text-saffron underline">Contact Us</p>
                <a><p>projectikan@gmail.com</p></a>
                <a><p>+91 12345 67890</p></a>
                <a><p>Rohini, Delhi</p></a>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Footer