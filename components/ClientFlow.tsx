"use client";

import VerificationPage from "./VerificationPage";





export default function ClientFlow({ address,id }: { address: string; id: string }) {
 return <VerificationPage id={id} address={address} onVerify={() => {
  window.location.replace(`/${id}/shop`);
 }} />;
  }


