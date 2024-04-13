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
      <div className="w-full pt-[5rem] sm:h-[100vh] h-max flex flex-col sm:flex-col py-3 justify-around items-center bg-slate-600 sm:px-10">
        <div className="w-full h-full sm:h-[50%]  flex flex-col sm:flex-row justify-around items-center">
          <div className="flex justify-around  sm:w-[50%]  items-center overflow-hidden">
            <Image
              alt="event-photo"
              height={1000}
              width={1000}
              src={"/samplePhoto.avif"}
              className="h-[40vh] px-8 sm:w-[80%] object-cover "
            />
          </div>
          <div className="px-8 sm:w-[50%] h-full flex flex-col sm:justify-start items-center sm:items-start">
            <div className="h-[20%] text-2xl pt-2">Event Name</div>
            <div className="h-max pt-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
              atque et ipsam cumque praesentium, ut provident quasi voluptatum
              impedit sint, a corporis blanditiis optio facere consectetur sequi
              amet consequuntur nam ab? Commodi corrupti libero quaerat
              aspernatur voluptates ut fuga dolores? Nulla iure nam temporibus
              excepturi beatae hic nihil mollitia eaque?
            </div>
          </div>
        </div>
        <div className="w-full px-8 h-[70%] sm:h-[50%] flex sm:flex-row flex-col justify-around items-center">
          <div className="w-full sm:w-[50%] h-full">
            <div className="text-2xl pt-3">Moderator :</div>
            <div className="pt-3">Name:</div>
            <div>Designation:</div>
            <div className="pt-3">Likes | Comments</div>
          </div>
          <div className="w-full sm:w-[50%] h-full">
            <div className="pt-2 sm:pt-4 text-2xl">Date: </div>
            <div className="pt-3 text-2xl">Time: </div>
            <div className="flex pt-4 justify-center sm:justify-start items-start">
              <JoinButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPage;
