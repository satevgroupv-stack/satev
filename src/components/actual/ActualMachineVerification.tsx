"use client";

interface ActualMachineVerificationProps {
  id: string;
  name: string;
  address: string;
}

export function ActualMachineVerification({
  id,
  name,
  address,
}: ActualMachineVerificationProps) {
  const handleVerify = () => {
    window.location.replace(`/${id}/shop`);
  };

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#0f172a] p-6 text-center">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <p className="text-sm font-semibold tracking-widest text-[#2563eb]">
            SECURITY VERIFICATION
          </p>
          <h1 className="mt-3 text-4xl font-bold text-[#D9D9D9]">
            Verify Machine Location
          </h1>
        </div>

        <div className="mb-8 rounded-3xl p-6 shadow-lg">
          <img
            src="https://i.imgur.com/mDVbeBY.jpeg"
            alt="REVOV vending machine"
            className="mx-auto mb-1 rounded-2xl object-contain"
            style={{ height: "30vh", maxHeight: "300px" }}
          />
          <p className="text-sm text-[#D9D9D9]/60">
            REVOV Machine by SATEV Group
          </p>
        </div>

        <div className="mb-8 space-y-4 text-left text-[#D9D9D9]">
          <p>
            <strong>Machine:</strong> Revov Machine
          </p>
          <p>
            <strong>Location:</strong> {address}
          </p>
          <p className="break-all text-sm text-[#D9D9D9]/70">ID: {name}</p>
        </div>

        <div className="mb-8 rounded-2xl border border-[#ff7101] bg-[#ff7101]/10 p-4 text-sm text-[#ff7101]">
          Confirm this matches the physical machine in front of you.
        </div>

        <button
          type="button"
          onClick={handleVerify}
          className="w-full cursor-pointer rounded-3xl bg-[#D9D9D9] py-5 text-xl font-bold text-black"
        >
          YES, THIS IS CORRECT
        </button>
      </div>
    </div>
  );
}
