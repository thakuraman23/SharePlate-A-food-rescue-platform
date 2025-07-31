import React from "react";

const Header = (props) => {
  return (
    <header className="flex items-center justify-between p-6 bg-[#ECE852] shadow-md">
      <h1 className="text-xl font-bold">{props.title}</h1>
      <div className="flex items-center space-x-4">
        <h1>{localStorage.name||"NuLL"}</h1>
        <img src="https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dm9sdW50ZWVyfGVufDB8fDB8fHww" alt="Profile" className="w-10 h-10 rounded-full" />
      </div>
    </header>
  );
};

export default Header;