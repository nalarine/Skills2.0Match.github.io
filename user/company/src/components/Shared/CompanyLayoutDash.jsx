import React from "react";
import { Outlet } from "react-router-dom";
import CompanySidebar from "./CompanySidebar";
import CompanyHeader from "./CompanyHeader";

export default function CompanyLayout() {
  return (
    <div className="fixed inset-0 flex flex-row h-screen w-screen bg-[#e7e8ea]">
      <div className="fixed inset-0 flex flex-row w-screen h-screen">
        <CompanySidebar />
        <div className="flex flex-col flex-1">
          <CompanyHeader />
          <div className="flex-1 min-h-0 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
