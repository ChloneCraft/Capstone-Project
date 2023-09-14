import Navbar from "../../../components/general/Navbar";
import useSWR from "swr";
import Image from "next/image";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import NumberInput from "../../../components/general/NumberInput";
import mongoose from "mongoose";
import { MoneyService } from "@/services/MoneyService";
import { findSeedStackById } from "@/pages/Market/Seeds";
import { sendRequest } from "../../../components/Farm/SelectSeed";
import Storage from "../../../components/Farm/Storage";

export default function StoragePage() {
  return <Storage />;
}

//redirecting if not logged in

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    props: { session },
  };
};
//--------
