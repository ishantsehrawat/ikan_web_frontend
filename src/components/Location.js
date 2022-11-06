import React, { useState } from "react";
// import { Container } from "react-bootstrap";
import { country, state, city } from "../Data/Location";

function Countrystatecity({ uLocation, setLocationName, setuLocation }) {
  const [countryid, setcountryid] = useState("101");
  const [stateid, setstateid] = useState("10");
  const [countryname, setcountryname] = useState("India");
  const [statename, setstatename] = useState("Delhi");
  const [cityname, setcityname] = useState("New Delhi");

  const st = state.filter((st) => st.country_id === countryid);
  const ct = city.filter((ct) => ct.state_id === stateid);

  //   const handleClick = () => {
  //     setLocationName(countryname + ", " + statename + ", " + cityname);
  //     setuLocation(false);
  //   };

  return (
    <div
      className={
        uLocation
          ? "absolute z-20 w-[704px] h-[319px] bg-white rounded-xl shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          : "hidden bg-red-500"
      }
    >
      {/* <Container className="content"> */}
      <div className="p-10 text-lg">
        <div className="">
          <form className="">
            <div className="flex flex-col">
              <div className="flex justify-between ">
                <div className="flex flex-col w-2/5 pb-10">
                  <label className="font-bold">Country </label>
                  <select
                    name="country"
                    className=""
                    onChange={(e) => {
                      setcountryid(e.target.value);
                      setcountryname(
                        e.target.options[e.target.selectedIndex].text
                      );
                    }}
                  >
                    <option value="">India</option>
                    {country.map((getcon, index) => (
                      <option key={index} value={getcon.country_id}>
                        {getcon.country_name}{" "}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col w-2/5 pb-10">
                  <label className="font-bold">State</label>
                  <select
                    className=""
                    name="state"
                    onChange={(e) => {
                      setstateid(e.target.value);
                      setstatename(
                        e.target.options[e.target.selectedIndex].text
                      );
                    }}
                  >
                    <option value="">Delhi</option>
                    {st.map((getst, index) => (
                      <option key={index} value={getst.state_id}>
                        {getst.state_name}{" "}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col w-2/5 pb-10">
                <label className="font-bold">City</label>
                <select
                  className=""
                  name="city"
                  onChange={(e) => {
                    setcityname(e.target.options[e.target.selectedIndex].text);
                  }}
                >
                  <option value="">New Delhi</option>
                  {ct.map((gcity, index) => (
                    <option key={index} value={gcity.city_id}>
                      {" "}
                      {gcity.city_name}{" "}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <button
                type="button"
                className="bg-saffron text-white rounded-lg w-40 h-12"
                onClick={() => {
                  setLocationName(
                    cityname + ", " + statename + ", " + countryname
                  );
                  setuLocation(false);
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* </Container> */}
    </div>
  );
}

export default Countrystatecity;
