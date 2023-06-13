import React, { useEffect, useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Tooltip, Zoom } from "@mui/material";
import { Info, AddAPhoto } from "@mui/icons-material";

import { country, state, city } from "../Data/Location";

function BasicInfoForm({
  activeStep,
  organisationData,
  setOrganisationData,
  user,
}) {
  const [countryid, setcountryid] = useState("101");
  const [stateid, setstateid] = useState("10");
  const scaleTemp = organisationData.BasicInfo.scale
    ? organisationData?.BasicInfo?.scale
    : "small";
  const [scale, setScale] = useState(scaleTemp);

  const st = state.filter((st) => st.country_id === countryid);
  const ct = city.filter((ct) => ct.state_id === stateid);

  useEffect(() => {
    setScale(organisationData?.BasicInfo?.scale);
    var newOrganisation = { ...organisationData };
    newOrganisation.BasicInfo = {
      ...organisationData.BasicInfo,
      type: "NGO",
      Country: "India",
      State: "Delhi",
      City: "New Delhi",
      scale: scale,
    };
    setOrganisationData({ ...newOrganisation });
  }, [user]);

  // console.log(scale);

  return (
    <div className={activeStep === 0 ? "w-full flex flex-col" : "hidden"}>
      <div className="flex w-full justify-between gap-4">
        <div className="w-full md:w-[45%] my-3">
          <label htmlFor="name" className="font-bold text-lg">
            Organisation Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Organisation Name on PAN Card"
            value={
              organisationData?.BasicInfo?.name
                ? organisationData?.BasicInfo?.name
                : ""
            }
            className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
            onChange={(e) => {
              var newOrganisationData = { ...organisationData };
              newOrganisationData.BasicInfo = {
                ...newOrganisationData.BasicInfo,
                name: e.target.value,
              };
              setOrganisationData({ ...newOrganisationData });
            }}
          />
        </div>
        <div className="md:w-[45%] h-16 mt-11 md:mt-7 ">
          <input
            type="file"
            name="file"
            id="file"
            className="w-[0.1px] h-[0.1px] opacity-0 overflow-hidden absolute z-[-1]"
          />
          <label
            className="text-[white] bg-[black] inline-block cursor-pointer focus:bg-red hover:bg-red"
            htmlFor="file"
          >
            <div className="flex h-full items-center gap-4">
              <div className="bg-bluegrey rounded-full h-12 md:h-16 w-12 md:w-16 flex justify-center items-center">
                <AddAPhoto sx={{ fontSize: 32, color: "#000000" }} />
              </div>{" "}
              <p className="font-bold text-lg hidden md:block">Upload Logo</p>
            </div>
          </label>
        </div>
      </div>
      <div className="w-full my-3">
        <label htmlFor="description" className="font-bold text-lg">
          Mission Statement
        </label>
        <textarea
          type="text"
          name="description"
          id="desc"
          className="w-full h-12 py-2 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
          value={
            organisationData?.BasicInfo?.mission
              ? organisationData?.BasicInfo?.mission
              : ""
          }
          onChange={(e) => {
            var newOrganisationData = { ...organisationData };
            newOrganisationData.BasicInfo = {
              ...newOrganisationData.BasicInfo,
              mission: e.target.value,
            };
            setOrganisationData({ ...newOrganisationData });
          }}
        />
      </div>
      <div className="w-full md:w-[45%] my-3">
        <label htmlFor="Type" className="font-bold text-lg">
          Type
        </label>
        <select
          name="type"
          className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
          value={
            organisationData?.BasicInfo?.type
              ? organisationData?.BasicInfo?.type
              : ""
          }
          onChange={(e) => {
            var newOrganisationData = { ...organisationData };
            newOrganisationData.BasicInfo = {
              ...newOrganisationData.BasicInfo,
              type: e.target.value,
            };
            setOrganisationData({ ...newOrganisationData });
          }}
        >
          <option value="NGO">Non-Government Organisation</option>
          <option value="NPO">Non-Profit Organisation</option>
          <option value="VO">Voluntary Organisation</option>
          <option value="CS">Charitable Society</option>
          <option value="CA">Charitable Association</option>
          <option value="CT">Charitalbe Trust</option>
          <option value="S8">Section 8 companies</option>
        </select>
      </div>
      <div className="w-full my-3">
        <label htmlFor="address" className="font-bold text-lg">
          Address
        </label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Full Address"
          className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
          value={
            organisationData?.BasicInfo?.address
              ? organisationData?.BasicInfo?.address
              : ""
          }
          onChange={(e) => {
            var newOrganisationData = { ...organisationData };
            newOrganisationData.BasicInfo = {
              ...newOrganisationData.BasicInfo,
              address: e.target.value,
            };
            setOrganisationData({ ...newOrganisationData });
          }}
        />
      </div>
      <div className="flex justify-between flex-wrap">
        {/* Country */}
        <div className="w-full md:w-[45%] my-3">
          <label className="font-bold text-lg" htmlFor="country">
            Registered Country
          </label>
          <select
            name="country"
            className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
            onChange={(e) => {
              setcountryid(e.target.value);
              // setEventData((prev) => ({
              //   ...prev,
              //   Country: e.target.options[e.target.selectedIndex].text,
              // }));
              var newOrganisationData = { ...organisationData };
              newOrganisationData.BasicInfo = {
                ...newOrganisationData.BasicInfo,
                Country: e.target.options[e.target.selectedIndex].text,
              };
              setOrganisationData({ ...newOrganisationData });
            }}
          >
            <option value="">
              {organisationData?.BasicInfo?.Country
                ? organisationData?.BasicInfo?.Country
                : "India"}
            </option>
            {country.map((getcon, index) => (
              <option key={index} value={getcon.country_id}>
                {getcon.country_name}{" "}
              </option>
            ))}
          </select>
        </div>
        {/* State */}
        <div className="w-full md:w-[45%] my-3">
          <label className="font-bold text-lg" htmlFor="state">
            Registered State
          </label>
          <select
            className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
            name="state"
            onChange={(e) => {
              setstateid(e.target.value);
              // setEventData((prev) => ({
              //   ...prev,
              //   State: e.target.options[e.target.selectedIndex].text,
              // }));
              var newOrganisationData = { ...organisationData };
              newOrganisationData.BasicInfo = {
                ...newOrganisationData.BasicInfo,
                State: e.target.options[e.target.selectedIndex].text,
              };
              setOrganisationData({ ...newOrganisationData });
            }}
          >
            <option value="">
              {organisationData?.BasicInfo?.State
                ? organisationData?.BasicInfo?.State
                : "Delhi"}
            </option>
            {st.map((getst, index) => (
              <option key={index} value={getst.state_id}>
                {getst.state_name}{" "}
              </option>
            ))}
          </select>
        </div>
        {/* City */}
        <div className="w-full md:w-[45%] my-3">
          <label className="font-bold text-lg" htmlFor="city">
            Registered City
          </label>
          <select
            className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
            name="city"
            onChange={(e) => {
              // setEventData((prev) => ({
              //   ...prev,
              //   City: e.target.options[e.target.selectedIndex].text,
              // }));
              var newOrganisationData = { ...organisationData };
              newOrganisationData.BasicInfo = {
                ...newOrganisationData.BasicInfo,
                City: e.target.options[e.target.selectedIndex].text,
              };
              setOrganisationData({ ...newOrganisationData });
            }}
          >
            <option value="">
              {organisationData?.BasicInfo?.City
                ? organisationData?.BasicInfo?.City
                : "New Delhi"}
            </option>
            {ct.map((gcity, index) => (
              <option key={index} value={gcity.city_id}>
                {" "}
                {gcity.city_name}{" "}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-full my-3 flex flex-col">
        <label htmlFor="scale" className="font-bold text-lg">
          Scale
          <Tooltip
            title={
              <div className="flex flex-col">
                <p className="text-xs">Micro: 1-10 members</p>
                <p className="text-xs">Small: 11-50 members</p>
                <p className="text-xs">Medium: 51-200 members</p>
                <p className="text-xs">Large: 201-500 members</p>
                <p className="text-xs">Mega: 501+ members</p>
              </div>
            }
            placement="top"
            arrow
            TransitionComponent={Zoom}
          >
            <Info className="ml-3" sx={{ color: "#FE9D66" }} id="scaleInfo" />
          </Tooltip>
        </label>
        <ToggleButtonGroup
          className="w-full md:w-max h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none text-white flex justify-center"
          orientation="horizontal"
          size="small"
          value={organisationData?.BasicInfo?.scale}
          exclusive
          onChange={(e, value) => {
            var newOrganisationData = { ...organisationData };
            newOrganisationData.BasicInfo = {
              ...newOrganisationData.BasicInfo,
              scale: value,
            };
            setOrganisationData({ ...newOrganisationData });
            setScale(value);
          }}
          aria-label="scale"
        >
          <ToggleButton
            sx={
              scale === "micro"
                ? {
                    color: "white !important",
                    bgcolor: "#FE9D66 !important",
                  }
                : {
                    color: "white !important",
                  }
            }
            value="micro"
            aria-label="micro"
          >
            Micro
          </ToggleButton>
          <ToggleButton
            sx={
              scale === "small"
                ? {
                    color: "white !important",
                    bgcolor: "#FE9D66 !important",
                  }
                : {
                    color: "white !important",
                  }
            }
            value="small"
            aria-label="small"
          >
            Small
          </ToggleButton>
          <ToggleButton
            sx={
              scale === "medium"
                ? {
                    color: "white !important",
                    bgcolor: "#FE9D66 !important",
                  }
                : {
                    color: "white !important",
                  }
            }
            value="medium"
            aria-label="medium"
          >
            Medium
          </ToggleButton>
          <ToggleButton
            sx={
              scale === "large"
                ? {
                    color: "white !important",
                    bgcolor: "#FE9D66 !important",
                  }
                : {
                    color: "white !important",
                  }
            }
            value="large"
            aria-label="large"
          >
            Large
          </ToggleButton>
          <ToggleButton
            sx={
              scale === "mega"
                ? {
                    color: "white !important",
                    bgcolor: "#FE9D66 !important",
                  }
                : {
                    color: "white !important",
                  }
            }
            value="mega"
            aria-label="mega"
          >
            Mega
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}

export default BasicInfoForm;
