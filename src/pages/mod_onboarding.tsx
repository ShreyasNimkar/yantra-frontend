import {
  setCoverPic,
  setOnboardingStatus,
  setProfilePic,
  setReduxBio,
  setReduxName,
  setReduxTagline,
  userSelector,
} from "@/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  USER_COVER_PIC_URL,
  USER_PROFILE_PIC_URL,
  USER_URL,
} from "@/config/routes";
import {
  ArrowRight,
  Camera,
  ImageSquare,
  MapPin,
  X,
} from "@phosphor-icons/react";
import Tags from "@/components/utils/edit_tags";
import Links from "@/components/utils/edit_links";
import { SERVER_ERROR } from "@/config/errors";
import patchHandler from "@/handlers/patch_handler";
import Toaster from "@/utils/toaster";
import Head from "next/head";
import { resizeImage } from "@/utils/resize_image";
import { setOnboarding } from "@/slices/feedSlice";
import { ReactSVG } from "react-svg";
import ProgressBar from "@/components/onboarding/progress_bar";
import UserCard from "@/components/onboarding/user_card";
import DummyUserCard from "@/components/onboarding/dummy_user_card";
import postHandler from "@/handlers/post_handler";

const Onboarding = () => {
  const [clickedOnBuild, setClickedOnBuild] = useState(false);
  const user = useSelector(userSelector);
  const [name, setName] = useState(user.name);
  const [tagline, setTagline] = useState("");
  const [bio, setBio] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);

  const [age, setAge] = useState(25);
  const [gender, setGender] = useState("Male");

  const [userPic, setUserPic] = useState<File | null>();
  const [userPicView, setUserPicView] = useState(
    USER_PROFILE_PIC_URL + "/" + user.profilePic
  );
  const [userCoverPic, setUserCoverPic] = useState<File | null>();
  const [userCoverPicView, setUserCoverPicView] = useState(
    USER_COVER_PIC_URL + "/" + user.coverPic
  );

  const [location, setLocation] = useState("Vellore");
  const [groupName, setGroupName] = useState("");
  const [groupLocation, setGroupLocation] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [mutex, setMutex] = useState(false);

  const [step, setStep] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    if (process.env.NODE_ENV != "development") {
      const onboardingRedirect =
        sessionStorage.getItem("onboarding-redirect") || "";
      if (
        !onboardingRedirect.startsWith("signup") &&
        !onboardingRedirect.startsWith("home")
      )
        window.location.replace("/home");
      return () => {
        if (onboardingRedirect)
          sessionStorage.removeItem("onboarding-redirect");
      };
    }
  }, []);

  const handleSubmit = async () => {
    if (location.trim() == "") {
      Toaster.error("Location cannot be empty");
      return;
    }

    if (mutex) return;
    setMutex(true);

    const toaster = Toaster.startLoad("Setting your Profile...");

    const formData = new FormData();
    if (userPic) formData.append("profilePic", userPic);
    if (userCoverPic) formData.append("coverPic", userCoverPic);
    if (name != user.name) formData.append("name", name.trim());
    if (bio != user.bio) formData.append("description", bio.trim());
    if (tagline != user.tagline) formData.append("tagline", tagline.trim());
    tags.forEach((tag) => formData.append("tags", tag));
    links.forEach((link) => formData.append("links", link));
    formData.append("location", location);

    const URL = `${USER_URL}/me?action=onboarding`;

    const res = await patchHandler(URL, formData, "multipart/form-data");

    if (res.statusCode === 200) {
      dispatch(setProfilePic(res.data.user.profilePic));
      dispatch(setCoverPic(res.data.user.coverPic));
      if (name != user.name) dispatch(setReduxName(name));
      if (bio != user.bio) dispatch(setReduxBio(bio));
      if (tagline != user.tagline) dispatch(setReduxTagline(tagline));
      dispatch(setOnboarding(true));
      dispatch(setOnboardingStatus(true));

      await handleCreateGroup();
    } else if (res.statusCode == 413) {
      Toaster.stopLoad(toaster, "Image too large", 0);
    } else {
      if (res.data.message) Toaster.stopLoad(toaster, res.data.message, 0);
      else {
        Toaster.stopLoad(toaster, SERVER_ERROR, 0);
      }
    }
    setMutex(false);
  };

  const handleCreateGroup = async () => {
    const toaster = Toaster.startLoad("Creating the Group");
    const URL = `/group`;
    const res = await postHandler(URL, {
      title: groupName,
      description: groupDescription,
    });

    if (res.statusCode === 201) {
      Toaster.stopLoad(toaster, "Group Created", 1);
      window.location.assign("/home");
    } else if (res.statusCode == 413) {
      Toaster.stopLoad(toaster, "Image too large", 0);
    } else {
      if (res.data.message) Toaster.stopLoad(toaster, res.data.message, 0);
      else {
        Toaster.stopLoad(toaster, SERVER_ERROR, 0);
      }
    }
  };

  const handleIncrementStep = () => {
    switch (step) {
      case 1:
        if (name.trim() == "") Toaster.error("Name cannot be empty");
        else setStep((prev) => prev + 1);
        break;
      case 2:
        if (tagline.trim() == "") Toaster.error("Tagline cannot be empty");
        else setStep((prev) => prev + 1);
        break;
      case 3:
        setStep((prev) => prev + 1);
        break;
      case 4:
        setStep((prev) => prev + 1);
        break;
      case 5:
        setStep((prev) => prev + 1);
        break;
      case 6:
        if (links.length < 1) Toaster.error("Add at least 1 Link");
        else setStep((prev) => prev + 1);
        break;
      case 7:
        // if (clickedOnNewCollege) handleAddCollege();
        setStep((prev) => prev + 1);
        break;
      case 8:
        if (location.trim() == "") Toaster.error("Location cannot be empty");
        else setStep((prev) => prev + 1);
        break;
      default:
    }
  };

  return (
    <>
      <Head>
        <title>Onboarding | Epione</title>
      </Head>
      {/* <div className="w-screen h-screen bg-wavy bg-moving-gradient z-50"></div> */}
      <div
        className={`w-screen h-screen ${
          !clickedOnBuild
            ? "bg-moving-gradient overflow-y-hidden"
            : "overflow-y-auto"
        } transition-ease-500`}
      >
        {!clickedOnBuild && (
          <ReactSVG
            className="w-screen h-screen fixed opacity-25"
            src="/pattern.svg"
          />
        )}
        {!clickedOnBuild ? (
          <div className="glassMorphism font-dmSans animate-fade_1 page w-fit max-md:w-[90%] h-56 max-md:h-72 px-8 py-10 font-primary flex flex-col justify-between rounded-lg shadow-xl hover:shadow-2xl transition-ease-300 absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col gap-2">
              <div className="text-5xl font-bold max-md:leading-tight">
                Welcome to{" "}
                <span className="bg-white px-2 rounded-md">
                  <span className="text-gradient">Epione!</span>
                </span>
              </div>
              <div>Complete your Profile and get yourself discovered!</div>
            </div>

            <div className="w-full flex items-center justify-end gap-4">
              <div
                onClick={() => setClickedOnBuild(true)}
                className={`py-2 font-medium px-4 backdrop-blur-xl shadow-sm hover:pr-8 hover:shadow-lg ${
                  clickedOnBuild ? "cursor-default" : "cursor-pointer"
                } transition-ease-300 group rounded-lg`}
              >
                <div className="w-fit flex gap-1 relative">
                  <div className="text-sm"> Let&apos;s get Started!</div>
                  <ArrowRight
                    className="absolute -right-2 opacity-0 group-hover:-right-5 group-hover:opacity-100 transition-ease-300"
                    weight="bold"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full font-dmSans h-full flex justify-between items-center max-md:px-4 font-primary ">
            <div className="w-3/5 max-lg:w-full h-full p-12 max-md:px-2 font-primary flex flex-col gap-16 items-center border-r-2 max-md:border-r-0 border-primary_comp">
              <div className="w-full flex justify-start items-center gap-1">
                <ReactSVG src="/onboarding_logo.svg" />
                {/* <div className="text-gradient text-xl font-semibold">Onboarding</div> */}
              </div>
              <div className="w-5/6 max-md:w-full">
                <ProgressBar
                  step={step}
                  setStep={setStep}
                  steps={[
                    "Name",
                    "Tagline",
                    "Bio",
                    "Specialities",
                    "Pictures",
                    "Licenses",
                    "Location",
                    "Group",
                  ]}
                />
              </div>
              <div className="w-5/6 max-md:w-full max-md:max-h-full flex flex-col gap-4 backdrop-blur-xl rounded-xl shadow-xl p-8 mt-8 animate-fade_half">
                <div className="w-full flex items-center justify-between flex-wrap">
                  <div
                    className={`${
                      step == 2 ? "text-4xl" : "text-5xl"
                    } max-md:text-3xl font-bold`}
                  >
                    {step == 1
                      ? "What's your name?"
                      : step == 2
                      ? "Describe yourself in one line "
                      : step == 3
                      ? "Tell us about yourself"
                      : step == 4
                      ? "Your Specialities"
                      : step == 5
                      ? "Add a Profile Picture"
                      : step == 6
                      ? "Links to your License"
                      : step == 7
                      ? "Pin Your Spot"
                      : step == 8
                      ? "Create your Support Group"
                      : ""}
                  </div>
                  <div className="text-base max-md:text-base font-medium">
                    {step == 1
                      ? `(${name.trim().length}/25)`
                      : step == 2
                      ? `(${tagline.trim().length}/25)`
                      : step == 3
                      ? `(${bio.trim().length}/1500)`
                      : step == 4
                      ? `(${tags.length}/10)`
                      : step == 5
                      ? ""
                      : step == 6
                      ? `(${links.length}/2)`
                      : step == 7
                      ? `(${location.length}/25)`
                      : step == 8
                      ? ``
                      : ""}
                  </div>
                </div>

                {step == 1 ? (
                  <form
                    className="w-full"
                    onSubmit={(el) => {
                      el.preventDefault();
                      handleIncrementStep();
                    }}
                  >
                    <input
                      className="w-full bg-[#ffffff40] border-[1px] text-lg max-md:text-base border-black rounded-lg p-2 focus:outline-none"
                      type="text"
                      maxLength={25}
                      value={name}
                      onChange={(el) => setName(el.target.value)}
                    />
                  </form>
                ) : step == 2 ? (
                  <form
                    className="w-full"
                    onSubmit={(el) => {
                      el.preventDefault();
                      handleIncrementStep();
                    }}
                  >
                    <input
                      className="w-full bg-[#ffffff40] placeholder:text-[#202020c6] border-[1px] text-lg max-md:text-base border-black rounded-lg p-2 focus:outline-none"
                      type="text"
                      maxLength={25}
                      placeholder="A Professional Tagline"
                      value={tagline}
                      onChange={(el) => setTagline(el.target.value)}
                    />
                  </form>
                ) : step == 3 ? (
                  <>
                    <textarea
                      className="bg-[#ffffff40] h-[96px] min-h-[96px] max-h-64 placeholder:text-[#202020c6] border-[1px] border-black rounded-lg p-2 focus:outline-none"
                      maxLength={1500}
                      placeholder="Write yourself a bio"
                      value={bio}
                      onChange={(el) => setBio(el.target.value)}
                    />
                  </>
                ) : step == 4 ? (
                  <>
                    <div className="font-medium text-sm">
                      Add{" "}
                      <span className="underline underline-offset-2">
                        at least three
                      </span>{" "}
                      and help us build your recommendations!
                    </div>
                    <Tags
                      tags={tags}
                      setTags={setTags}
                      onboardingDesign={true}
                      maxTags={10}
                      suggestions={false}
                    />
                  </>
                ) : step == 5 ? (
                  <>
                    <input
                      type="file"
                      className="hidden"
                      id="userPic"
                      multiple={false}
                      onChange={async ({ target }) => {
                        if (target.files && target.files[0]) {
                          const file = target.files[0];
                          if (file.type.split("/")[0] == "image") {
                            const resizedPic = await resizeImage(
                              file,
                              500,
                              500
                            );
                            setUserPicView(URL.createObjectURL(resizedPic));
                            setUserPic(resizedPic);
                          } else
                            Toaster.error("Only Image Files can be selected");
                        }
                      }}
                    />
                    <input
                      type="file"
                      className="hidden"
                      id="userCoverPic"
                      multiple={false}
                      onChange={async ({ target }) => {
                        if (target.files && target.files[0]) {
                          const file = target.files[0];
                          if (file.type.split("/")[0] == "image") {
                            const resizedPic = await resizeImage(
                              file,
                              900,
                              300
                            );
                            setUserCoverPicView(
                              URL.createObjectURL(resizedPic)
                            );
                            setUserCoverPic(resizedPic);
                          } else
                            Toaster.error("Only Image Files can be selected");
                        }
                      }}
                    />
                    <div className="w-full flex flex-col gap-1">
                      <div className="relative flex items-center gap-2 hover:bg-primary_comp transition-ease-300 p-2 rounded-md">
                        {userPic ? (
                          <div className="w-full flex flex-col gap-4 px-2 py-1">
                            <Image
                              crossOrigin="anonymous"
                              width={500}
                              height={500}
                              alt={"User Pic"}
                              src={userPicView}
                              className={`rounded-full md:hidden max-md:mx-auto w-32 h-32 cursor-default`}
                            />
                            <div className="w-full flex items-center gap-2">
                              <label
                                className="grow cursor-pointer flex items-center gap-1"
                                htmlFor="userPic"
                              >
                                <Camera size={24} />
                                {userPic.name}
                              </label>
                              <X
                                onClick={() => {
                                  setUserPic(null);
                                  setUserPicView(
                                    USER_PROFILE_PIC_URL + "/" + user.profilePic
                                  );
                                }}
                                className="cursor-pointer"
                                size={20}
                              />
                            </div>
                          </div>
                        ) : (
                          <label
                            className="w-full flex items-center gap-2 cursor-pointer"
                            htmlFor="userPic"
                          >
                            <Camera size={24} />
                            <div> Upload Profile Picture</div>
                          </label>
                        )}
                      </div>
                      <div className="relative flex items-center gap-2 hover:bg-primary_comp transition-ease-300 p-2 rounded-md">
                        {userCoverPic ? (
                          <div className="w-full flex flex-col gap-4 px-2 py-1">
                            <Image
                              crossOrigin="anonymous"
                              width={500}
                              height={500}
                              alt={"User Pic"}
                              src={userCoverPicView}
                              className={`rounded-lg md:hidden max-md:mx-auto w-5/6 h-32 cursor-default`}
                            />
                            <div className="w-full flex items-center gap-2">
                              <label
                                className="grow cursor-pointer flex items-center gap-1"
                                htmlFor="userCoverPic"
                              >
                                <ImageSquare size={24} />
                                {userCoverPic.name}
                              </label>
                              <X
                                onClick={() => {
                                  setUserPic(null);
                                  setUserPicView(
                                    USER_PROFILE_PIC_URL + "/" + user.coverPic
                                  );
                                }}
                                className="cursor-pointer"
                                size={20}
                              />
                            </div>
                          </div>
                        ) : (
                          <label
                            className="w-full flex items-center gap-2 cursor-pointer"
                            htmlFor="userCoverPic"
                          >
                            <ImageSquare size={24} />
                            <div> Upload Cover Picture</div>
                          </label>
                        )}
                      </div>
                    </div>
                  </>
                ) : step == 6 ? (
                  <>
                    <div className="font-medium text-sm">
                      Almost Done!, Add
                      {/* <span className="underline underline-offset-2">at least one</span>  */}{" "}
                      links to your medical license / other valid proof.
                    </div>
                    <Links
                      links={links}
                      setLinks={setLinks}
                      maxLinks={3}
                      blackBorder={true}
                    />
                  </>
                ) : step == 7 ? (
                  <>
                    <div className="font-medium text-sm">
                      One Last Step!, Tell us where are are situated to help
                      build your recommendations.
                    </div>
                    <div className="w-full flex items-center gap-2 bg-[#ffffff40] border-[1px] border-black rounded-lg p-2">
                      <MapPin size={24} weight="duotone" />
                      <input
                        className="grow bg-transparent text-lg max-md:text-base focus:outline-none"
                        type="text"
                        maxLength={25}
                        value={location}
                        onChange={(el) => setLocation(el.target.value)}
                      />
                    </div>
                  </>
                ) : step == 8 ? (
                  <>
                    <div className="font-medium text-sm">
                      What support does your group provide ?
                    </div>
                    <div className="w-full flex items-center gap-2 bg-[#ffffff40] border-[1px] border-black rounded-lg p-2">
                      {/* <MapPin size={24} weight="duotone" /> */}
                      <div>Group Name</div>
                      <input
                        className="grow bg-transparent text-lg max-md:text-base focus:outline-none"
                        type="text"
                        maxLength={25}
                        value={groupName}
                        onChange={(el) => setGroupName(el.target.value)}
                      />
                    </div>
                    <div className="w-full flex items-center gap-2 bg-[#ffffff40] border-[1px] border-black rounded-lg p-2">
                      {/* <MapPin size={24} weight="duotone" /> */}
                      <div>
                        Group <br />
                        Description
                      </div>
                      <textarea
                        className="grow bg-transparent text-lg max-md:text-base focus:outline-none"
                        maxLength={1000}
                        value={groupDescription}
                        onChange={(el) => setGroupDescription(el.target.value)}
                      />
                    </div>
                    <div className="w-full flex items-center gap-2 bg-[#ffffff40] border-[1px] border-black rounded-lg p-2">
                      {/* <MapPin size={24} weight="duotone" /> */}
                      <div>Location</div>
                      <input
                        className="grow bg-transparent text-lg max-md:text-base focus:outline-none"
                        type="text"
                        maxLength={25}
                        value={groupLocation}
                        onChange={(el) => setGroupLocation(el.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div className="w-full flex items-center justify-between">
                  {step != 1 ? (
                    <div
                      onClick={() => setStep((prev) => prev - 1)}
                      className="w-fit text-lg py-2 font-medium px-4 shadow-md hover:bg-primary_comp hover:shadow-lg transition-ease-500 rounded-xl cursor-pointer"
                    >
                      prev
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <div className="w-fit flex items-center gap-2">
                    {step == 5 ? (
                      <div
                        onClick={handleIncrementStep}
                        className="w-fit text-lg py-2 font-medium px-4 shadow-md hover:bg-primary_comp hover:shadow-lg transition-ease-500 rounded-xl cursor-pointer"
                      >
                        skip
                      </div>
                    ) : (
                      <div></div>
                    )}

                    {step != 8 ? (
                      <div
                        onClick={handleIncrementStep}
                        className="w-fit text-lg py-2 font-medium px-4 shadow-md hover:bg-primary_comp hover:shadow-lg transition-ease-500 rounded-xl cursor-pointer"
                      >
                        continue
                      </div>
                    ) : (
                      <div
                        onClick={handleSubmit}
                        className="w-fit text-lg py-2 font-medium px-4 shadow-md hover:bg-primary_comp hover:shadow-lg transition-ease-500 rounded-xl cursor-pointer"
                      >
                        complete
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-2/5 h-full max-md:hidden overflow-clip flex-center flex-col gap-8 relative bg-slate-100">
              <div className="w-full h-full absolute -top-32 flex flex-col items-center gap-4 rotate-12 animate-fade_1">
                <div className="w-[250%] flex gap-4 animate-onboarding_dummy_user_card">
                  <DummyUserCard />
                  <DummyUserCard />
                  <DummyUserCard />
                  <DummyUserCard />
                </div>
                <div className="w-[250%] flex gap-4 animate-onboarding_dummy_user_card_backwards">
                  <DummyUserCard />
                  <DummyUserCard />
                  <DummyUserCard />
                  <DummyUserCard />
                </div>
                <div className="w-[250%] flex gap-4 animate-onboarding_dummy_user_card">
                  <DummyUserCard />
                  <DummyUserCard />
                  <DummyUserCard />
                  <DummyUserCard />
                </div>
              </div>

              <div className="w-5/6 z-10">
                <UserCard
                  name={name}
                  username={user.username}
                  tagline={tagline}
                  bio={bio}
                  profilePic={userPicView}
                  coverPic={userCoverPicView}
                  tags={tags}
                  links={links}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Onboarding;
