import Meeting from "@/components/uncommon/meet";
import { DyteProvider, useDyteClient } from "@dytesdk/react-web-core";
import { GetServerSidePropsContext } from "next";
import { useEffect } from "react";

interface Props {
  token: string;
}

export default function App({ token }: Props) {
  const [meeting, initMeeting] = useDyteClient();

  useEffect(() => {
    initMeeting({
      authToken: token,
      defaults: {
        audio: false,
        video: false,
      },
    });
  }, []);

  return (
    <DyteProvider value={meeting}>
      <Meeting />
    </DyteProvider>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { token } = context.query;

  return {
    props: { token },
  };
}
