import React from "react";
import Header from "@/components/Header";
import Image from "next/image";
import JoinButton from "@/components/buttons/join_btn";
interface Props {
  slug: string;
}
const EventPage = ({ slug }: Props) => {
  return (
    <>
      <Header />
      <div className=" pt-[5rem] h-[100vh] flex flex-col sm:flex-row justify-around items-center bg-slate-600 sm:px-10">
        <div className="sm:h-[90%] h-full sm:w-[50%]">
          <div className="flex justify-around sm:h-[40vh]  items-center">
            <Image
              alt="event-photo"
              height={1000}
              width={1000}
              src={"/samplePhoto.avif"}
              className="h-full w-[80%] object-cover "
            />
          </div>
          <div className="text-2xl pt-3">Moderator :</div>
          <div>Name:</div>
          <div>Designation:</div>
          <div className="pt-3">Likes | Comments</div>
        </div>
        <div className="h-[90%] w-[50%]">
          <div className="h-[40vh]">
            <div className="h-[20%] text-4xl">Event Name</div>
            <div className="h-max">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
              atque et ipsam cumque praesentium, ut provident quasi voluptatum
              impedit sint, a corporis blanditiis optio facere consectetur sequi
              amet consequuntur nam ab? Commodi corrupti libero quaerat
              aspernatur voluptates ut fuga dolores? Nulla iure nam temporibus
              excepturi beatae hic nihil mollitia eaque?
            </div>
          </div>
          <div className="pt-4 text-2xl">Date: </div>
          <div className="pt-3 text-2xl">Time: </div>
          <div className="flex pt-4 justify-start items-start">
            <JoinButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPage;
