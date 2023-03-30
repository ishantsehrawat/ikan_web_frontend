import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { insta, linkedin } from "../images/icons";
import { logoOrange } from "../images";

function Footer({ Page }) {
  const logout = async () => {
    await signOut(auth)
      .then(() => {
        console.log("sign out successful");
        localStorage.removeItem("token");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={Page === "notfound" ? "mt-0" : "mt-20"}>
      <div className="bg-donateBG h-32 w-full px-4 flex justify-around gap-2 items-center">
        <p className="ml-3 mr-4 md:mr-10 font-bold text-white md:text-xl">
          <span className="hidden md:block">
            No act of kindness, no matter how small, is ever wasted.{" "}
          </span>{" "}
          Support our organizations and their causes.
        </p>
        <a
          href="/donate"
          className="h-12 w-44 bg-black text-white rounded-md flex justify-center items-center transition duration-500 hover:bg-saffron"
        >
          Donate Now
        </a>
      </div>
      <div className="bg-black h-full md:h-[35vh] w-full text-white flex px-5 md:px-10 pt-5 text-xs md:text-base pb-10">
        <div className="w-[35vw] mr-10">
          <img className="w-full md:w-40 h-auto" src={logoOrange} alt="ikan" />
          <div className="flex mt-1">
            <img
              className="w-3 md:w-5 h-3 md:h-6 mr-2 md:mr-4"
              src={insta}
              alt="ig"
            />
            <img
              className="w-3 md:w-5 h-3 md:h-5 mr-2 md:mr-4"
              src={linkedin}
              alt="in"
            />
          </div>
        </div>
        <div className="flex flex-wrap h-full w-full justify-between pt-2 gap-4">
          <div className="flex flex-col gap-1 md:gap-4 text-white-400">
            <p className="text-saffron underline">Useful Links</p>
            <a onClick={logout} href="/register">
              Where to register ?
            </a>
            <a href="/verification">How to verify ?</a>
            <a href="/donate">Who can Donate ?</a>
          </div>
          <div className="flex flex-col gap-1 md:gap-4 text-white-400">
            <p className="text-saffron underline">For Individuals</p>
            <a onClick={logout} href="/register">
              Register Here
            </a>
            <a href="/Events">Events</a>
            <a href="/Organisations">Organisations</a>
          </div>
          <div className="flex flex-col gap-1 md:gap-4 text-white-400">
            <p className="text-saffron underline">For Organisations</p>
            <a onClick={logout} href="/register">
              Register Here
            </a>
            <a href="/volunteers">Volunteers</a>
            <a href="/organisation-join">How to join us ?</a>
          </div>
          <div className="flex flex-col gap-1 md:gap-4 text-white-400">
            <p className="text-saffron underline">News</p>
            <p>Coming Soon...</p>
          </div>
          <div className="flex flex-col gap-1 md:gap-4 text-white-400">
            <p className="text-saffron underline">Contact Us</p>
            <a href="/mailto:projectikan@gmail.com">
              <p>projectikan@gmail.com</p>
            </a>
            <a href="/tel:9958679035">
              <p>+91 99586 79035</p>
            </a>
            <a href="/">
              <p>Rohini, Delhi</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
