import React, { useEffect, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  StepConnector,
  stepConnectorClasses,
} from "@mui/material";
import { Circle, CircleOutlined } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);

  const user = auth.currentUser;

  useEffect(() => {
    const colRef = doc(db, "users", String(user?.email));
    const getUser = async () => {
      const snapshots = await getDoc(colRef);
      console.log(snapshots.data());
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="flex h-full">
      <div className="w-[40%] h-screen relative">
        <Link to="/">
          <img
            src={logo}
            alt=""
            className="h-12 w-auto left-16 top-12 absolute"
          />
        </Link>
        <div className="flex flex-col w-full h-full justify-around items-center pt-28">
          {/* stepper */}
          <Stepper
            activeStep={activeStep}
            connector={<QontoConnector className="-top-4 -bottom-4" />}
            orientation="vertical"
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
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
        </div>
      </div>
      <div className="w-[60%] bg-black h-full text-white px-20 overflow-y-scroll">
        <div className="text-4xl font-bold fixed bg-black py-10">
          You're one step closer to setting up your organisation with us!
        </div>

        {/* Form */}
        <div className="w-full mt-32 py-10">
          <BasicInfoForm activeStep={activeStep} />
          <MemberDetailsForm activeStep={activeStep} />
          <VerifcationDetailsForm activeStep={activeStep} />
          <ContactDetailForm activeStep={activeStep} />
          <POCDetailForm activeStep={activeStep} user={userData} />
          {activeStep === 5 && (
            <div className="w-auto min-h-[40vh] flex flex-col m-20 bg-white text-black rounded-lg justify-center items-center">
              <p className="text-2xl font-semibold">
                All steps completed - you&apos;re finished
              </p>
              <button
                className="h-8 md:h-10 mt-5 w-max px-10  text-sm bg-black hover:bg-white text-white hover:text-black transition duration-500 rounded flex justify-center items-center border-2 border-black"
                onClick={handleReset}
              >
                Reset Form
              </button>
            </div>
          )}
        </div>

        {/* Form Navigation Button */}
        <div className="w-full flex justify-around py-10">
          {activeStep === 0 ? (
            <a
              className="h-8 md:h-8 w-max px-16  text-sm bg-black text-white rounded flex justify-center items-center border-2 border-white"
              href="/"
            >
              Back to Home
            </a>
          ) : (
            <button
              className="h-8 md:h-8 w-max px-16  text-sm bg-black text-white rounded flex justify-center items-center border-2 border-white"
              onClick={handleBack}
            >
              Back
            </button>
          )}
          <button
            className={
              "h-8 md:h-8 w-max px-16  text-sm bg-saffron text-white rounded flex justify-center items-center"
            }
            onClick={handleNext}
          >
            {activeStep === 5 ? "Finish" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrganisationJoin;
