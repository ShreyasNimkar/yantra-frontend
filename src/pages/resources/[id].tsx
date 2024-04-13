import { SERVER_ERROR } from "@/config/errors";
import { BACKEND_URL } from "@/config/routes";
import getHandler from "@/handlers/get_handler";
import Toaster from "@/utils/toaster";
import Cookies from "js-cookie";
import { GetServerSidePropsContext } from "next/types";
import React, { useEffect } from "react";

interface Props {
  id: string;
}

const File = ({ id }: Props) => {
  useEffect(() => {
    window.location.assign(
      `${BACKEND_URL}/resources/serve/${id}?token=${Cookies.get("token")}`
    );
  }, []);
  return <div></div>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;

  return {
    props: { id },
  };
}

export default File;
