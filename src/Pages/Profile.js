import React from "react";

import { Navbar } from "../components";
import { profile } from "../images";

function Profile() {
  return (
    <div className="bg-cgrey">
      <div className=" bg-lightsaffron h-[50vh] w-full p-10">
        <Navbar Page="profile" />
        <div className="mt-28 ml-5"></div>
      </div>
      <div className="flex">
        <img
          src={profile}
          alt="profile"
          className="w-48 h-48 rounded-full border-4 border-black object-cover  ml-20 -translate-y-1/2"
        />
        <p className="text-5xl font-semibold ml-10 mt-5">Eva Sansteve</p>
      </div>
      <div className="flex flex-col items-center">
        <form className="flex flex-col w-[900px]">
          <label className="mt-5 w-full flex justify-end items-center">
            <span className="pl-4 mr-40 text-lg pb-1 w-[200px] flex justify-end">
              NAME
            </span>
            <input
              className="border-2 rounded-lg border-transparent px-4 w-[600px] h-10"
              type="text"
              value="Eva Sansteve"
              // onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </label>
          <label className="mt-5 w-full flex justify-end items-center">
            <span className="pl-4 mr-40 text-lg pb-1 w-[200px] flex justify-end">
              EMAIL
            </span>
            <input
              className="border-2 rounded-lg border-transparent px-4 w-[600px] h-10"
              type="text"
              value="evasanssteve@gmail.com"
              // onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </label>
          <label className="mt-5 w-full flex justify-end items-center">
            <span className="pl-4 mr-40 text-lg pb-1 w-[200px] flex justify-end">
              PHONE NO.
            </span>
            <input
              className="border-2 rounded-lg border-transparent px-4 w-[600px] h-10"
              type="text"
              value="evasanssteve@gmail.com"
              // onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </label>
          <label className="mt-5 w-full flex justify-end items-center">
            <span className="pl-4 mr-40 text-lg pb-1 w-[200px] flex justify-end">
              INSTAGRAM
            </span>
            <input
              className="border-2 rounded-lg border-transparent px-4 w-[600px] h-10"
              type="text"
              value="@evansanssteve"
              // onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </label>
          <label className="mt-5 w-full flex justify-end items-center">
            <span className="pl-4 mr-40 text-lg pb-1 w-[200px] flex justify-end">
              TWITTER
            </span>
            <input
              className="border-2 rounded-lg border-transparent px-4 w-[600px] h-10"
              type="text"
              value="@evan_sanssteve"
              // onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </label>
          <label className="mt-5 w-full flex justify-end items-start">
            <span className="pl-4 mr-40 text-lg pb-1 w-[200px] flex justify-end">
              ABOUT
            </span>
            {/* <input
              className="border-2 rounded-lg border-transparent px-4 w-[600px] h-10"
              type="text"
              value="evasanssteve@gmail.com"
              // onChange={(e) => setData({ ...data, name: e.target.value })}
            /> */}
            <textarea
              className="border-2 rounded-lg border-transparent px-4 w-[600px] h-52"
              name="message"
            >
              Aliquam dis vulputate vulputate integer sagittis. Faucibus dolor
              ornare faucibus vel sed et eleifend habitasse amet. Montes, mauris
              varius ac est bibendum. Scelerisque a, risus ac ante. Velit
              consectetur neque, elit, aliquet. Non varius proin sed urna,
              egestas consequat laoreet diam tincidunt. Magna eget faucibus cras
              justo, tortor sed donec tempus. Imperdiet consequat, quis diam
              arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate
              nunc nec. Dui, massa viverr .
            </textarea>
          </label>
        </form>
      </div>
      <div className="bg-lightsaffron h-28 mt-20"></div>
    </div>
  );
}

export default Profile;
