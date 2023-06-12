import React from "react";

function ContactDetailForm({ activeStep }) {
  return (
    <div
      className={
        activeStep === 3 ? "w-full min-h-[60vh] flex flex-col" : "hidden"
      }
    >
      <div className="w-full my-3">
        <label htmlFor="website" className="font-bold text-lg">
          Website
        </label>
        <input
          type="text"
          name="website"
          id="website"
          placeholder="ikanvolunteer.web.app"
          className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
        />
      </div>
      <div className="w-full my-3">
        <label htmlFor="email" className="font-bold text-lg">
          Support Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="project.ikan2022@gmail.com"
          className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
        />
      </div>
      <div className="w-full my-3">
        <label htmlFor="number" className="font-bold text-lg">
          Contact Number
        </label>
        <input
          type="text"
          name="number"
          id="number"
          placeholder="+91 9876543210"
          className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
        />
      </div>
      <div className="w-full my-3">
        <label htmlFor="igHandle" className="font-bold text-lg">
          Instagram Handle
        </label>
        <input
          type="text"
          name="igHandle"
          id="igHandle"
          placeholder="@project_ikan"
          className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
        />
      </div>
      <div className="w-full my-3">
        <label htmlFor="twHandle" className="font-bold text-lg">
          Twitter Handle
        </label>
        <input
          type="text"
          name="twHandle"
          id="twHandle"
          placeholder="@project.ikan"
          className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
        />
      </div>
      <div className="w-full my-3">
        <label htmlFor="lnHandle" className="font-bold text-lg">
          LinkedIn Handle
        </label>
        <input
          type="text"
          name="lnHandle"
          id="lnHandle"
          placeholder="@project.ikan"
          className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
        />
      </div>
      <div className="w-full my-3">
        <label htmlFor="ytHandle" className="font-bold text-lg">
          YouTube Channel
        </label>
        <input
          type="text"
          name="ytHandle"
          id="ytHandle"
          placeholder="@ikanprojectYT"
          className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
        />
      </div>
    </div>
  );
}

export default ContactDetailForm;
