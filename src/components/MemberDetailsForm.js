import React from "react";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";

function MemberDetailsForm({
  activeStep,
  organisationData,
  setOrganisationData,
  user,
  memberNo,
  setMemberNo,
  members,
  setMembers,
}) {
  // useState(() => {
  //   console.log("triggered");
  //   if (organisationData?.MemberInfo?.newMembers?.length > 0) {
  //     setMembers([...organisationData?.MemberInfo?.newMembers]);
  //     setMemberNo([...organisationData?.MemberInfo?.newMembers]);
  //   }
  // }, [organisationData]);
  return (
    <div
      className={activeStep === 1 ? "w-full flex flex-col relative" : "hidden"}
    >
      {memberNo.map((member, id) => (
        <div className="w-full my-3" key={id}>
          <label htmlFor="name" className="font-bold text-lg">
            {id + 1}
            {id % 10 === 0 && id !== 10
              ? "st"
              : id % 10 === 1 && id !== 11
              ? "nd"
              : id % 10 === 2
              ? "rd"
              : "th"}{" "}
            Member Email
          </label>
          <input
            type="email"
            name="member"
            id="name"
            placeholder="Member Email should be registered with us"
            className="w-full h-12 border-2 border-bluegrey bg-bluegrey px-2 mt-1 focus:outline-none"
            value={members[id] !== undefined ? members[id] : ""}
            onChange={(e) => {
              const newMembers = [...members];
              newMembers[id] = e.target.value;
              setMembers([...newMembers]);
              var newOrganisationData = { ...organisationData };
              newOrganisationData.MemberInfo = {
                ...newOrganisationData.MemberInfo,
                newMembers,
              };
              setOrganisationData({ ...newOrganisationData });
            }}
          />
        </div>
      ))}

      <div className="fixed bottom-32 right-10 md:right-20">
        <Fab
          sx={{ bgcolor: "#FE9D66" }}
          aria-label="add"
          onClick={() => {
            setMemberNo([...memberNo, memberNo.length + 1]);
            setMembers([...members, ""]);
          }}
        >
          <Add />
        </Fab>
      </div>
    </div>
  );
}

export default MemberDetailsForm;
