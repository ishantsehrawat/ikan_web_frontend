import React from 'react'
import { Navbar,Footer } from '../components';
const Verification = () => {
    return (
    <div className="bg-cgrey">
    <div className=" bg-aboutHeader h-[50vh] w-full p-10">
      <Navbar Page="verification" />
      <div className="mt-40 text-white ml-5">
        <h1 className="text-4xl font-bold mb-3">How To Verify your account?</h1>
      </div>
    </div>
    <div className="mx-36 pt-16">
      <div>
        <h1 className="text-4xl font-semibold mt-24 mb-4">Lorem Ipsum</h1>
        <p>
          Nulla nulla id enim deserunt nostrud magna eu reprehenderit labore anim laboris. Quis excepteur laborum aliquip tempor sit est excepteur reprehenderit quis exercitation ullamco. Irure laboris ex non proident dolor Lorem id dolore duis adipisicing nostrud eu. Incididunt cillum culpa quis ea sit.
          <ul className="flex flex-col gap-2 mt-4">
            <li>Amet ut qui tempor ut sint nulla veniam aliquip.</li>
          </ul>
        </p>
      </div>
    </div>
    <Footer/>
  </div>
);
}

export default Verification
