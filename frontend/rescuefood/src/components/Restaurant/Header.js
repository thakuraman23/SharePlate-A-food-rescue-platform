import React from "react";

const Header = (props) => {
  return (
    <header className="flex items-center justify-between p-6 bg-[#ECE852] shadow-md">
      <h1 className="text-xl font-bold">{props.title}</h1>
      <div className="flex items-center space-x-4">
        <h1>{localStorage.name||"NuLL"}</h1>
        <img src="https://plus.unsplash.com/premium_photo-1687686676820-7426dfefb68d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" className="w-10 h-10 rounded-full" />
      </div>
    </header>
  );
};

export default Header;