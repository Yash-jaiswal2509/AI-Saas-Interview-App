import React from "react";
import Header from "./_components/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="mx-5 my-5 md:mx-20 lg:mx-36">{children}</div>
    </>
  );
};

export default layout;
