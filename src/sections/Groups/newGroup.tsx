import { Group } from "@/types";
import React from "react";
import { useState } from "react";
interface Props {
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
}
const NewGroup = ({ setGroups }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <>
      <div></div>
    </>
  );
};

export default NewGroup;
