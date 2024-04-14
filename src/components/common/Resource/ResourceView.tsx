import React, { useEffect, useState } from "react";
import { ResourceBucket, ResourceFile } from "@/types";
import getHandler from "@/handlers/get_handler";
import { RESOURCE_URL } from "@/config/routes";
import { useSelector } from "react-redux";
import Toaster from "@/utils/toaster";
import { SERVER_ERROR } from "@/config/errors";
import NewResourceFile from "./NewResourceFile";
import Loader from "@/components/common/loader";
import Mascot from "@/components/fillers/mascot";
import moment from "moment";
import patchHandler from "@/handlers/patch_handler";
import deleteHandler from "@/handlers/delete_handler";
import { resourceBucket, resourceFile } from "@/types/initials";
import ConfirmDelete from "@/components/common/confirm_delete";
import Link from "next/link";
import ResourceFileView from "./ResoureFileView";
import { userSelector } from "@/slices/userSlice";
import {
  ArrowUpRight,
  Check,
  PencilSimple,
  Plus,
  TrashSimple,
  UserCircle,
  UserCircleGear,
  X,
} from "@phosphor-icons/react";

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  resourceBucket: ResourceBucket;
  setResources?: React.Dispatch<React.SetStateAction<ResourceBucket[]>>;
  setClickedResourceBucket?: React.Dispatch<
    React.SetStateAction<ResourceBucket>
  >;
  setClickedOnResourceBucket?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResourceView = ({
  setShow,
  resourceBucket,
  setResources,
  setClickedResourceBucket,
  setClickedOnResourceBucket,
}: Props) => {
  const [title, setTitle] = useState(resourceBucket.title);
  const [description, setDescription] = useState(resourceBucket.description);
  const [onlyAdminViewAccess, setOnlyAdminViewAccess] = useState(
    resourceBucket.onlyAdminViewAccess
  );
  const [onlyAdminEditAccess, setOnlyAdminEditAccess] = useState(
    resourceBucket.onlyAdminEditAccess
  );

  const [resourceFiles, setResourceFiles] = useState<ResourceFile[]>([]);
  const [loading, setLoading] = useState(true);

  const [clickedOnUploadFile, setClickedOnUploadFile] = useState(false);
  const [clickedOnEdit, setClickedOnEdit] = useState(false);
  const [clickedOnDelete, setClickedOnDelete] = useState(false);

  const [clickedOnFile, setClickedOnFile] = useState(false);
  const [clickedFile, setClickedFile] = useState(resourceFile);

  const getResourceBucketFiles = () => {
    const URL = `/resource/${resourceBucket.id}`;
    getHandler(URL)
      .then((res) => {
        if (res.statusCode === 200) {
          const resourceFiles = res.data.resourceFiles || [];
          setResourceFiles(resourceFiles);
          setLoading(false);
        }
        console.log(res);
      })
      .catch((err) => {
        Toaster.error(SERVER_ERROR, "error_toaster");
      });
  };

  const handleEdit = async () => {
    if (title.trim().length == 0) {
      Toaster.error("Title cannot be empty");
      return;
    }

    const toaster = Toaster.startLoad("Editing Bucket Details");

    const URL = `resource/${resourceBucket.id}`;

    const formData = {
      title,
      description,
      onlyAdminViewAccess,
      onlyAdminEditAccess,
    };

    const res = await patchHandler(URL, formData);
    if (res.statusCode === 200) {
      const bucket: ResourceBucket = res.data.resourceBucket;
      if (setResources)
        setResources((prev) =>
          prev.map((r) => {
            if (r.id == resourceBucket.id) return bucket;
            else return r;
          })
        );
      if (setClickedResourceBucket) setClickedResourceBucket(resourceBucket);
      setClickedOnEdit(false);
      Toaster.stopLoad(toaster, "Resource Bucket Edited", 1);
    } else {
      if (res.data.message) Toaster.stopLoad(toaster, res.data.message, 0);
      else {
        Toaster.stopLoad(toaster, SERVER_ERROR, 0);
      }
    }
  };

  const handleDelete = async () => {
    const toaster = Toaster.startLoad("Deleting Bucket");

    const URL = `/resource/${resourceBucket.id}`;

    const res = await deleteHandler(URL);
    if (res.statusCode === 204) {
      if (setResources)
        setResources((prev) => prev.filter((r) => r.id != resourceBucket.id));
      if (setClickedOnResourceBucket) setClickedOnResourceBucket(false);
      if (setClickedResourceBucket) setClickedResourceBucket(resourceBucket);
      Toaster.stopLoad(toaster, "Resource Bucket Deleted", 1);
    } else {
      if (res.data.message) Toaster.stopLoad(toaster, res.data.message, 0);
      else {
        Toaster.stopLoad(toaster, SERVER_ERROR, 0);
      }
    }
  };

  useEffect(() => getResourceBucketFiles(), [resourceBucket]);

  const user = useSelector(userSelector);

  return (
    <>
      <div className="w-[70%] aspect-[5/3] font-primary bg-white rounded-xl fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[100] shadow-lg p-4 animate-fade_third">
        {clickedOnUploadFile && (
          <NewResourceFile
            setShow={setClickedOnUploadFile}
            resourceBucketID={resourceBucket.id}
            setResourceFiles={setResourceFiles}
            resourceFiles={resourceFiles}
            setResourceBuckets={setResources}
            setClickedResourceBucket={setClickedResourceBucket}
          />
        )}
        {clickedOnDelete && (
          <ConfirmDelete
            setShow={setClickedOnDelete}
            handleDelete={handleDelete}
          />
        )}
        {clickedOnFile && (
          <ResourceFileView
            resourceFile={clickedFile}
            setShow={setClickedOnFile}
            setResourceFiles={setResourceFiles}
            setClickedResourceFile={setClickedFile}
            setClickedOnResourceFile={setClickedOnFile}
            setResourceBuckets={setResources}
            setClickedResourceBucket={setClickedResourceBucket}
          />
        )}

        {loading ? (
          <Loader />
        ) : (
          <div className="w-full font-poppins h-full flex gap-4">
            <div className="w-1/3 h-full flex flex-col items-center gap-4 border-r-[1px] border-dashed p-2 ">
              {clickedOnEdit ? (
                <div className="w-full flex justify-end items-center gap-1">
                  <X
                    size={42}
                    className="flex-center rounded-full hover:bg-slate-100 p-2 transition-ease-300 cursor-pointer"
                    weight="regular"
                    onClick={() => setClickedOnEdit(false)}
                  />

                  <Check
                    size={42}
                    className="flex-center rounded-full hover:bg-slate-100 p-2 transition-ease-300 cursor-pointer"
                    weight="regular"
                    onClick={handleEdit}
                  />
                </div>
              ) : (
                <div className="w-full flex justify-end items-center gap-1">
                  {((resourceBucket.onlyAdminEditAccess && user.isModerator) ||
                    !resourceBucket.onlyAdminEditAccess) && (
                    <div className="relative">
                      <Plus
                        size={40}
                        className="flex-center rounded-full hover:bg-slate-100 p-2 transition-ease-300 cursor-pointer"
                        weight="regular"
                        onClick={() => setClickedOnUploadFile(true)}
                      />
                    </div>
                  )}

                  {user.isModerator && (
                    <div className="relative">
                      <PencilSimple
                        size={40}
                        className="flex-center rounded-full hover:bg-slate-100 p-2 transition-ease-300 cursor-pointer"
                        weight="regular"
                        onClick={() => setClickedOnEdit(true)}
                      />
                    </div>
                  )}

                  {user.isModerator && (
                    <div className="relative">
                      <TrashSimple
                        size={40}
                        className="flex-center rounded-full hover:bg-slate-100 p-2 transition-ease-300 cursor-pointer"
                        weight="regular"
                        onClick={() => setClickedOnDelete(true)}
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="w-36 h-36 flex-center flex-col items-center gap-1 border-dark_primary_btn border-[8px] rounded-full">
                <div className="text-7xl font-bold text-gradient">
                  {resourceBucket.noFiles}
                </div>
                <div className="w-40 text-center">
                  File{resourceBucket.noFiles != 1 ? "s" : ""}
                </div>
              </div>

              {clickedOnEdit ? (
                <>
                  <div className="w-full h-fit flex flex-col gap-4">
                    <div className="w-full flex flex-col gap-4">
                      <input
                        type="text"
                        className="w-full bg-transparent px-4 py-2 focus:outline-none text-xl font-medium"
                        placeholder="Resource Bucket Title (50 characters)"
                        maxLength={50}
                        value={title}
                        onChange={(el) => setTitle(el.target.value)}
                      />

                      <textarea
                        className="w-full min-h-[64px] max-h-56 px-4 py-2 bg-primary_comp dark:bg-dark_primary_comp rounded-lg focus:outline-none"
                        placeholder="Resource Description (500 characters)"
                        maxLength={500}
                        value={description}
                        onChange={(el) => setDescription(el.target.value)}
                      ></textarea>
                    </div>
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
              ) : (
                <>
                  <div className="flex flex-col gap-1 text-center">
                    <div className="text-3xl font-semibold">
                      {resourceBucket.title}
                    </div>
                    <div className="text-gray-500">
                      {resourceBucket.description}
                    </div>
                  </div>
                  <div className="flex items-center gap-10">
                    <div className="flex flex-col items-center gap-1">
                      {resourceBucket.onlyAdminViewAccess ? (
                        <UserCircleGear size={42} />
                      ) : (
                        <UserCircle size={42} />
                      )}
                      <div className="flex-center flex-col text-xs">
                        <div className="font-semibold">
                          {resourceBucket.onlyAdminViewAccess
                            ? "Admins"
                            : "Members"}
                        </div>{" "}
                        can view files
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      {resourceBucket.onlyAdminEditAccess ? (
                        <UserCircleGear size={42} />
                      ) : (
                        <UserCircle size={42} />
                      )}
                      <div className="flex-center flex-col text-xs">
                        <div className="font-semibold">
                          {resourceBucket.onlyAdminEditAccess
                            ? "Admins"
                            : "Members"}
                        </div>{" "}
                        can add files
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="text-xs font-medium text-gray-400 mt-2">
                Created {moment(resourceBucket.createdAt).fromNow()}
              </div>
            </div>
            <div className="file-content w-2/3 h-full">
              {resourceFiles && resourceFiles.length > 0 ? (
                <table className="file-table w-full mt-4 rounded-xl overflow-hidden">
                  <thead className="bg-primary_text text-white h-10">
                    <th>Title</th>
                    <th>Type</th>
                    <th>Uploaded On</th>
                    <th>View</th>
                  </thead>
                  {resourceFiles.map((file: ResourceFile, i) => (
                    <tr
                      key={i}
                      onClick={() => {
                        setClickedFile(file);
                        setClickedOnFile(true);
                      }}
                      className="hover:bg-gray-100 transition-ease-200 cursor-pointer"
                    >
                      <td className="font-medium">{file.title}</td>
                      <td className="line-clamp-1 uppercase">
                        {file.type != "" ? file.type : "-"}
                      </td>
                      <td>{moment(file.createdAt).format("DD MMM, YY")}</td>
                      <td>
                        <Link
                          target="_blank"
                          href={
                            file.isFileUploaded
                              ? `/resources/${file.id}`
                              : file.path
                          }
                          className="flex-center h-full"
                        >
                          <ArrowUpRight />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </table>
              ) : (
                <Mascot
                  message={
                    '"Currently, this bucket is empty. Please check back later for updates.'
                  }
                />
              )}
            </div>
          </div>
        )}
      </div>
      <div
        className="overlay bg-backdrop w-full h-full fixed top-0 left-0 z-[80] animate-fade_third"
        onClick={() => setShow(false)}
      ></div>
    </>
  );
};

export default ResourceView;
