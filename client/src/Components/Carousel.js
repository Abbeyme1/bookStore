import React from "react";

const carousel = () => {
  const style = {
    backgroundImage:
      // "url('https://images.unsplash.com/photo-1631891256090-0042b3784a1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=500&q=60')",
      // "url('https://images.unsplash.com/photo-1533669955142-6a73332af4db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHVibGlzaGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80')",
      // "url('https://images.unsplash.com/photo-1525358180237-7399f908a1d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80')",
      // "url('https://images.unsplash.com/photo-1604866830893-c13cafa515d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGRhcmslMjBib29rc3xlbnwwfHwwfHw%3D&w=1000&q=80')",
      // "url('https://images.pexels.com/photos/256453/pexels-photo-256453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      "url('https://images.unsplash.com/photo-1625053376622-e462848c453f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80')",
    height: "35vh",
    marginTop: "-10px",

    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    position: "relative",
  };
  return (
    <div style={style}>
      <div
        style={{
          fontSize: "45px",
          margin: 0,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
        }}
      >
        Explore
      </div>
      <div
        style={{
          fontSize: "20px",
          fontFamily: "cursive",
          margin: 0,
          position: "absolute",
          top: "61%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
        }}
      >
        Aspire to inspire
      </div>
    </div>
  );
};

export default carousel;
