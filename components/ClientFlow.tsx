"use client";

import VerificationPage from "./VerificationPage";





export default function ClientFlow({ address,id,name }: { address: string; id: string,name:string }) {
 return <VerificationPage id={id} address={address} name={name} onVerify={() => {
  window.location.replace(`/${id}/shop`);
 }} />;
  }


