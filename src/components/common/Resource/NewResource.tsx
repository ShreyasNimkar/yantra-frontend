import postHandler from "@/handlers/post_handler";
import { ResourceBucket } from "@/types";
import Toaster from "@/utils/toaster";
import React, { useState } from "react";
import { SERVER_ERROR } from "@/config/errors";
import PrimaryButton from "@/components/buttons/primary_btn";
import Input from "@/components/form/input";
import TextArea from "@/components/form/textarea";

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setShowResources?: React.Dispatch<React.SetStateAction<boolean>>;
  setResources?: React.Dispatch<React.SetStateAction<ResourceBucket[]>>;
}

const NewResource = ({ setShow, setShowResources, setResources }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [onlyAdminViewAccess, setOnlyAdminViewAccess] = useState(true);
  const [onlyAdminEditAccess, setOnlyAdminEditAccess] = useState(true);

  const [mutex, setMutex] = useState(false);
  const [tab, setTab] = useState(0);

  const handleSubmit = async () => {
    if (title.trim().length == 0) {
      Toaster.error("Title cannot be empty");
      return;
    }

    if (mutex) return;
    setMutex(true);

    const toaster = Toaster.startLoad("Adding a new resource bucket");

    const URL = `/resource`;
    const formData = {
      title,
      description,
      onlyAdminViewAccess,
      onlyAdminEditAccess,
    };

    const res = await postHandler(URL, formData);
    if (res.statusCode === 201) {
      const resource_bucket = res.data.resourceBucket;
      if (setResources) setResources((prev) => [resource_bucket, ...prev]);
      setShow(false);
      if (setShowResources) setShowResources(true);
      Toaster.stopLoad(toaster, "New Resource Bucket Added!", 1);
    } else {
      if (res.data.message) Toaster.stopLoad(toaster, res.data.message, 0);
      else {
        Toaster.stopLoad(toaster, SERVER_ERROR, 0);
      }
      setMutex(false);
    }
  };

  return (
    <>
      <div className="fixed top-1/2 -translate-y-1/2 w-[640px] max-md:w-5/6 backdrop-blur-2xl bg-white dark:bg-[#ffe1fc22] flex flex-col gap-4 rounded-lg p-10 max-md:p-5 dark:text-white font-primary border-[1px] border-primary_btn  dark:border-dark_primary_btn right-1/2 translate-x-1/2 animate-fade_third z-50">
        {tab === 0 ? (
          <>
            <div className="text-3xl max-md:text-xl font-semibold">
              Resource Bucket Info
            </div>
            <div className="w-full h-fit flex flex-col gap-4">
              <div className="w-full flex flex-col gap-4">
                <Input
                  label="Resource Bucket Title"
                  val={title}
                  setVal={setTitle}
                  maxLength={50}
                  required={true}
                />
                <TextArea
                  label="Resource Bucket Description"
                  val={description}
                  setVal={setDescription}
                  maxLength={500}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-3xl max-md:text-xl font-semibold">
              Manage Access
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full flex justify-between items-center">
                <div>View Access -</div>
                <select
                  onChange={(el) =>
                    setOnlyAdminViewAccess(el.target.value == "Moderator")
                  }
                  value={onlyAdminViewAccess ? "Moderator" : "Member"}
                  className="w-1/2 max-lg:w-full h-12 border-[1px] border-primary_btn  dark:border-dark_primary_btn dark:text-white bg-primary_comp dark:bg-[#10013b30] focus:outline-nonetext-sm rounded-lg block p-2"
                >
                  {["Member", "Moderator"].map((c, i) => {
                    return (
                      <option
                        className="bg-primary_comp_hover dark:bg-[#10013b30]"
                        key={i}
                        value={c}
                      >
                        {c}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="w-full flex justify-between items-center">
                <div>Create Access -</div>
                <select
                  onChange={(el) =>
                    setOnlyAdminEditAccess(el.target.value == "Moderator")
                  }
                  value={onlyAdminEditAccess ? "Moderator" : "Member"}
                  className="w-1/2 max-lg:w-full h-12 border-[1px] border-primary_btn  dark:border-dark_primary_btn dark:text-white bg-primary_comp dark:bg-[#10013b30] focus:outline-nonetext-sm rounded-lg block p-2"
                >
                  {["Member", "Moderator"].map((c, i) => {
                    return (
                      <option
                        className="bg-primary_comp_hover dark:bg-[#10013b30]"
                        key={i}
                        value={c}
                      >
                        {c}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </>
        )}
        <div className="w-full flex justify-between items-center mt-4">
          {tab == 0 ? (
            <div></div>
          ) : (
            <PrimaryButton onClick={() => setTab(0)} label="Back" />
          )}
          <PrimaryButton
            onClick={() => {
              if (tab === 0) setTab(1);
              else if (tab === 1) handleSubmit();
            }}
            label={tab === 0 ? "Next" : "Create"}
            disabled={title.trim() == ""}
          />
        </div>
      </div>

      <div
        onClick={() => setShow(false)}
        className="bg-backdrop w-screen h-screen fixed top-0 left-0 animate-fade_third z-20"
      ></div>
    </>
  );
};

export default NewResource;
