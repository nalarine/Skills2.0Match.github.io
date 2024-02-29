import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="fixed inset-0 flex flex-row h-screen w-screen bg-[#e7e8ea]">
      <div className="fixed inset-0 flex flex-row w-screen h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <div className="flex-1 min-h-0 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
