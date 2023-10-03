"use client";
import { Menu } from "lucide-react";
import { useState } from "react";
import LandingNavMobile from "./LandingNavMobile";

const Hamburger = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleToggle = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="h-full">
      <Menu width={30} height={30} onClick={handleToggle} />
      {isVisible && <LandingNavMobile onClose={handleToggle} />}
    </div>
  );
};

export default Hamburger;
