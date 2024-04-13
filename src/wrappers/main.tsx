import React, { ReactNode } from "react";
import Header from "@/components/Header";

interface WrapperProps {
  children: ReactNode;
}

const MainWrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="pt-16 mx-12">{children}</div>
    </>
  );
};

export default MainWrapper;
