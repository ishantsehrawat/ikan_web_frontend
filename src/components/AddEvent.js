import React from 'react'

function AddEvent({overlayOpen}) {
  return (
    <div className={
        overlayOpen
          ? "absolute z-20 bg-white rounded-xl shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        //   ? "modal fade fixed top-0 left-0 hidden w-full h-full z-20 bg-white rounded-xl shadow-lg"
          : "hidden bg-red-500"
      }>AddEvent</div>
  )
}

export default AddEvent