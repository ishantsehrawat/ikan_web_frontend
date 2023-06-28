import React, { useEffect, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  StepConnector,
  stepConnectorClasses,
} from "@mui/material";
import { CheckCircle, Circle, CircleOutlined } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { doc, getDoc, collection, setDoc, updateDoc } from "firebase/firestore";

import {
  BasicInfoForm,
  MemberDetailsForm,
  VerifcationDetailsForm,
  POCDetailForm,
  ContactDetailForm,
} from "../components";
import { logo } from "../images";
import { auth, db } from "../firebase-config";

const steps = [
  {
    label: "Basic Information",
  },
  {
    label: "Member Details",
  },
  {
    label: "Verification Details",
  },
  {
    label: "Contact Details",
  },
  {
    label: "Point of Contact Details",
    description: "POC details are taken from your profile",
  },
  {
    label: "Disclaimer",
    description: "Last step",
  },
];

const OrganisationJoin = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userData, setUserData] = useState({});
  const [organisationData, setOrganisationData] = useState({
    BasicInfo: {},
    MemberInfo: {},
    VerificationDetails: {},
    ContactDetails: {},
    POC: {},
    isVerified: undefined,
  });
  const [members, setMembers] = useState([]);
  const [memberNo, setMemberNo] = useState([1]);

  const organisationRef = collection(db, "organisations");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);

  const user = auth.currentUser;

  useEffect(() => {
    const orgRef = doc(db, "organisations", String(user?.email));
    const getOrganisation = async () => {
      const snapshots = await getDoc(orgRef);
      const docs = snapshots.data();
      setOrganisationData(docs);
      setMembers([...docs?.MemberInfo?.newMembers]);
      setMemberNo([...docs?.MemberInfo?.newMembers]);
    };

    getOrganisation();
    const colRef = doc(db, "users", String(user?.email));
    const getUser = async () => {
      const snapshots = await getDoc(colRef);
      const docs = snapshots.data();
      setUserData(docs);
    };

    getUser();
  }, [user]);

  const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#FE9D66",
    }),
  }));

  function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {active ? (
          <Circle />
        ) : completed ? (
          <CircleOutlined sx={{ color: "#FE9D66", height: 15 }} />
        ) : (
          <CircleOutlined sx={{ color: "#2A2C38", height: 15 }} />
        )}
      </QontoStepIconRoot>
    );
  }

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.lineVertical}`]: {
        borderColor: "#FE9D66",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.lineVertical}`]: {
        borderColor: "#FE9D66",
      },
    },
    [`& .${stepConnectorClasses.lineVertical}`]: {
      borderColor: "#2A2C38",
    },
  }));

  const QontoConnectorH = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.lineHorizontal}`]: {
        borderColor: "#FE9D66",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.lineHorizontal}`]: {
        borderColor: "#FE9D66",
      },
    },
    [`& .${stepConnectorClasses.lineHorizontal}`]: {
      borderColor: "#2A2C38",
    },
  }));

  const handleNext = async () => {
    const confirmText =
      user?.type === "organisation"
        ? "Are you sure you want to update organisation details?"
        : "Are you sure you want to submit the form?";
    if (activeStep === 5 && window.confirm(confirmText)) {
      await setDoc(doc(organisationRef, String(user?.email)), {
        ...organisationData,
        isVerified: false,
      })
        .then(() => {
          window.alert(
            userData?.type === "organisation"
              ? "Your organisation details have been updated"
              : "We got your application! we'll get back to you soon"
          );
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      if (user?.type === "volunteer") {
        await updateDoc(doc(db, "users", String(user?.email)), {
          type: "unverified organisation",
        });
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setOrganisationData({
      BasicInfo: {},
      MemberInfo: {},
      VerificationDetails: {},
      ContactDetails: {},
      POC: {},
      isVerified: undefined,
    });
    setActiveStep(0);
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-[40%] h-[30vh] md:h-screen relative">
        <Link to="/">
          <img
            src={logo}
            alt=""
            className="h-10 w-auto md:h-12 left-1/2 -translate-x-[50%] ml-2.5 md:left-16 top-5 md:top-12 absolute"
          />
        </Link>
        <div className="flex flex-col w-full h-full justify-end md:justify-center items-center md:mt-6">
          {/* stepper */}
          <Stepper
            activeStep={activeStep}
            className="!hidden md:!block"
            connector={<QontoConnector className="-top-4 -bottom-4" />}
            orientation="vertical"
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel
                  sx={{ paddingTop: 0, paddingBottom: 0 }}
                  StepIconComponent={QontoStepIcon}
                  optional={
                    <Typography variant="caption">
                      {step?.description}
                    </Typography>
                  }
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* mobile stepper */}
          <Stepper
            activeStep={activeStep}
            className=" md:!hidden !-mb-3"
            connector={<QontoConnectorH />}
            alternativeLabel
          >
            {steps.map((label, id) => (
              <Step key={id}>
                <StepLabel StepIconComponent={QontoStepIcon}> </StepLabel>
              </Step>
            ))}
          </Stepper>

          <p className="md:hidden font-semibold mb-4">
            {steps[activeStep]?.label ? steps[activeStep].label : ""}
          </p>
        </div>
      </div>
      <div className="w-full md:w-[60%] bg-black h-full text-white px-10 md:px-20 overflow-y-scroll">
        <div className="w-full md:w-[60%] h-[20vh] flex flex-col justify-center items-center text-xl md:text-4xl font-bold fixed bg-black px-10 md:px-20 -ml-10 md:-ml-20 z-50">
          {userData?.type === "organisation"
            ? "You can update your organisation details here"
            : userData?.type === "volunteer"
            ? "You're one step closer to setting up your organisation with us!</p>"
            : "Please complete this form to register your organisation with us"}
        </div>

        {/* Form */}
        <div className="w-full min-h-[35vh] md:min-h-[60vh] mt-[20vh] py-10">
          <BasicInfoForm
            activeStep={activeStep}
            organisationData={organisationData}
            setOrganisationData={setOrganisationData}
            user={userData}
          />
          <MemberDetailsForm
            activeStep={activeStep}
            organisationData={organisationData}
            setOrganisationData={setOrganisationData}
            user={userData}
            memberNo={memberNo}
            setMemberNo={setMemberNo}
            members={members}
            setMembers={setMembers}
          />
          <VerifcationDetailsForm
            activeStep={activeStep}
            organisationData={organisationData}
            setOrganisationData={setOrganisationData}
            user={userData}
          />
          <ContactDetailForm
            activeStep={activeStep}
            organisationData={organisationData}
            setOrganisationData={setOrganisationData}
            user={userData}
          />
          <POCDetailForm
            activeStep={activeStep}
            user={userData}
            organisationData={organisationData}
            setOrganisationData={setOrganisationData}
          />
          {activeStep === 5 && (
            <div className="w-auto min-h-[20vh] md:min-h-[30vh] flex flex-col md:m-20 p-3 bg-white text-black rounded-lg justify-center items-center">
              <p className="text-2xl font-semibold">
                All steps completed{" "}
                <CheckCircle className="mb-1" sx={{ color: "#25D366" }} />{" "}
                <br />
                <span className="font-normal text-sm leading-3">
                  I, {userData?.name} have reviewed my application and
                  Information provide by me are true to my knowledge.
                </span>
              </p>
              <button
                className="h-8 md:h-10 mt-5 w-max px-10  text-sm bg-black hover:bg-white text-white hover:text-black transition duration-500 rounded flex justify-center items-center border-2 border-black"
                onClick={handleReset}
              >
                Reset Form
              </button>
            </div>
          )}
          {activeStep >= 6 && (
            <div className="w-auto min-h-[25vh] md:min-h-[40vh] flex flex-col md:m-20 p-5 bg-white text-black rounded-lg justify-center items-center">
              <p className="text-lg ">
                {userData?.type === "organisation"
                  ? "Your organisation details have been updated successfully"
                  : "Your details will be verified by our team and you will be notified once your organisation is registered with us"}
              </p>
              <a
                className="h-8 md:h-10 mt-5 w-max px-10  text-sm bg-black hover:bg-white text-white hover:text-black transition duration-500 rounded flex justify-center items-center border-2 border-black"
                href="/"
              >
                Go to Home
              </a>
            </div>
          )}
        </div>

        {/* Form Navigation Button */}
        {activeStep <= 5 && (
          <div className="w-full flex justify-around h-[20vh] items-center">
            {activeStep === 0 ? (
              <a
                className="h-8 w-32 md:w-max md:px-16  text-sm bg-bluegrey md:bg-black text-white rounded-lg md:rounded flex justify-center items-center border-[1px] border-white"
                href="/"
              >
                Back to Home
              </a>
            ) : (
              <button
                className="h-8 w-32 md:w-max md:px-16  text-sm bg-bluegrey md:bg-black text-white rounded-lg md:rounded flex justify-center items-center border-[1px] border-white"
                onClick={handleBack}
              >
                Back
              </button>
            )}
            <button
              className={
                "h-8 w-32 md:w-max md:px-16  text-sm bg-saffron text-white rounded-lg md:rounded flex justify-center items-center"
              }
              onClick={handleNext}
            >
              {activeStep === 5 ? "Finish" : "Continue"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganisationJoin;
