import React from "react";

import { IoSettingsOutline } from "react-icons/io5";

import { FaUserFriends } from "react-icons/fa";

import { CgProfile } from "react-icons/cg";

import logo from "../images/my_stoic_logo.png";

import { Text } from "@chakra-ui/react";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 w-full h-16 absolute">
      <ul className="flex flex-row justify-between items-center">
        <li className="flex flex-row items-center">
          <Link to="/">
            <img className="w-8 rounded-full mr-4" src={logo} />
          </Link>

          <Text> My Stoic Circle</Text>
        </li>
        <div className="flex flex-row space-x-12 mr-24">
          <li>
            <a href="/dashboard">
              <FaUserFriends className="text-xl hover:scale-150" />
            </a>
          </li>

          <li>
            <a href="/dashboard">
              <CgProfile className="text-xl hover:scale-150" />
            </a>
          </li>
          <li>
            <a href="/dashboard">
              <IoSettingsOutline className="text-xl hover:scale-150" />
            </a>
          </li>
        </div>
      </ul>
    </nav>
  );
}
