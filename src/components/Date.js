import React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";

function Date({ uDate, setDate, setuDate }) {
  //   console.log(uDate);
  const handleDateChange = (date) => {
    const formatteddate = dayjs(date).format("YYYY-MM-DD");
    setDate(formatteddate);
    setuDate(false);
  };

  return (
    <div
      className={
        uDate
          ? "absolute z-20 bg-white rounded-xl shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          : "hidden bg-red-500"
      }
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CalendarPicker
          onChange={(newDate) => handleDateChange(newDate)}
          minDate={dayjs()}
        />
      </LocalizationProvider>
    </div>
  );
}

export default Date;
