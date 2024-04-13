import React from "react";
import Header from "@/components/Header";
interface Props {
  slug: string;
}
const EventPage = ({ slug }: Props) => {
  return (
    <>
      <Header />
      <div className=" pt-[4rem] bg-slate-600">ss</div>
    </>
  );
};

export default EventPage;
