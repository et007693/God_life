import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavTab = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const currentPage = pathSegments[pathSegments.length - 1];
  const navigate = useNavigate();
  return (
    <div className="flex justify-between z-10 w-screen h-12 fixed bottom-0 border-t border-gray-300 bg-white items-center">
      <div className="flex justify-between items-center flex-1">
        <button
          className="w-full flex items-center justify-center"
          onClick={() => {
            navigate("");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-9 w-9 ${
              !currentPage.includes("gallery") &&
              !currentPage.includes("calendar")
                ? "fill-black"
                : "fill-gray-400"
            }`}
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
          </svg>
        </button>
        <button
          className="w-full flex items-center justify-center"
          onClick={() => {
            navigate("gallery");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            className={`h-9 w-9 ${
              currentPage === "gallery" ? "fill-black" : "fill-gray-400"
            }`}
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path d="M360-400h400L622-580l-92 120-62-80-108 140Zm-40 160q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z" />
          </svg>
        </button>
        <button
          className="w-full flex items-center justify-center"
          onClick={() => {
            navigate("calendar");
          }}
        >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-9 w-9 ${
                currentPage === "calendar" ? "fill-black" : "fill-gray-400"
              }`}
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
            >
              <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
            </svg>
        </button>
      </div>
    </div>
  );
};

export default NavTab;
