import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { CiCirclePlus } from "react-icons/ci";
import { ResourceBucket } from "@/types";
import { resourceBucket } from "@/types/initials";
import getHandler from "@/handlers/get_handler";
import Toaster from "@/utils/toaster";
import { SERVER_ERROR } from "@/config/errors";
import { useSelector } from "react-redux";
import { userSelector } from "@/slices/userSlice";
import ResourceCard from "@/components/common/Resource/ResourceBucket";
import ResourceView from "@/components/common/Resource/ResourceView";
import Loader from "@/components/common/loader";
import Mascot from "@/components/fillers/mascot";
import NewResource from "@/components/common/Resource/NewResource";
import MainWrapper from "@/wrappers/main";
import Image from "next/image";
const index = () => {
  const [resources, setResources] = useState<ResourceBucket[]>([]);
  const [loading, setLoading] = useState(true);

  const [clickedOnResource, setClickedOnResource] = useState(false);
  const [clickedResource, setClickedResource] =
    useState<ResourceBucket>(resourceBucket);

  const [clickedOnNewResource, setClickedOnNewResource] = useState(false);
  const [clickedOnInfo, setClickedOnInfo] = useState(false);

  const user = useSelector(userSelector);

  const getResourceBuckets = () => {
    const URL = `/resource`;
    getHandler(URL)
      .then((res) => {
        if (res.statusCode === 200) {
          const resourceData = res.data.resourceBuckets || [];
          setResources(resourceData);
          const rid = new URLSearchParams(window.location.search).get("rid");
          if (rid && rid != "") {
            resourceData.forEach((resource: ResourceBucket, i: number) => {
              if (rid == resource.id) setClickedOnResource(true);
            });
          }
          setLoading(false);
        } else {
          if (res.data.message)
            Toaster.error(res.data.message, "error_toaster");
          else {
            Toaster.error(SERVER_ERROR, "error_toaster");
          }
        }
      })
      .catch((err) => {
        Toaster.error(SERVER_ERROR, "error_toaster");
      });
  };

  useEffect(() => {
    getResourceBuckets();
  }, []);

  return (
    <MainWrapper>
      <div className="fixed bottom-0 right-0">
        <Image
          src={"/sharingPeople.svg"}
          width={1000}
          height={1000}
          alt="person"
          className=" h-[15rem] w-auto"
        />
      </div>
      {clickedOnNewResource && (
        <NewResource
          setShow={setClickedOnNewResource}
          setResources={setResources}
        />
      )}
      <div>
        <div className="font-poppins flex w-full h-[10vh] flex-row my-5 justify-between items-center">
          <div className="h-full flex items-center text-6xl font-semibold">
            Resources
          </div>
          {user.isModerator && (
            <div
              onClick={() => {
                setClickedOnNewResource(true);
              }}
              className=" w-[50%] h-full flex items-center justify-end text-center"
            >
              <p className="cursor-pointer">Create Bucket&nbsp;</p>
              <CiCirclePlus size={25} className="cursor-pointer" />
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col gap-6 px-2 pb-2">
        {loading ? (
          <Loader />
        ) : resources.length > 0 ? (
          <div className="flex justify-evenly px-4">
            <div
              className={`w-full flex-wrap max-lg:w-[720px] flex flex-row gap-4`}
            >
              {resources.map((resource) => {
                return (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    setClickedOnResource={setClickedOnResource}
                    setClickedResource={setClickedResource}
                  />
                );
              })}
            </div>
            {clickedOnResource &&
              ((resourceBucket.onlyAdminViewAccess && user.isModerator) ||
                !resourceBucket.onlyAdminViewAccess) && (
                <ResourceView
                  setShow={setClickedOnResource}
                  resourceBucket={clickedResource}
                  setResources={setResources}
                  setClickedResourceBucket={setClickedResource}
                  setClickedOnResourceBucket={setClickedOnResource}
                />
              )}
          </div>
        ) : (
          <Mascot message="There are no resources at the moment" />
        )}
      </div>
    </MainWrapper>
  );
};

export default index;
