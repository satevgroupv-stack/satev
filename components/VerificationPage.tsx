interface Props {
  onVerify: () => void;
  id: string | null;
  name: string | null;
  address: string | null;
}

export default function VerificationPage({ onVerify,id,address,name }: Props) {
  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-center p-6">

      <div className="max-w-md w-full">

        <div className="mb-6">
          <p className="text-[#2563eb] tracking-widest text-sm font-semibold">
            SECURITY VERIFICATION
          </p>
          <h1 className="text-4xl font-bold text-[#D9D9D9] mt-3">
            Verify Machine Location
          </h1>
        </div>

        <div className=" rounded-3xl p-6 mb-8 shadow-lg" style={{
          borderRadius:25
        }}>
          <img
            src="https://i.imgur.com/mDVbeBY.jpeg"
            className="rounded-2xl mx-auto mb-1  object-contain"
            style={{
              height:"30vh",
              maxHeight:"300px"
            }}
          />
          <p className="text-sm text-[#D9D9D9]/60">REVOV Machine by SATEV Group</p>
        </div>

        <div className="text-left space-y-4 text-[#D9D9D9] mb-8">
          <p><strong>Machine:</strong> Revov Machine</p>
          <p><strong>Location:</strong> {address}</p>
          <p className="text-sm text-[#D9D9D9]/70 break-all">
            ID: {name}
          </p>
        </div>

        <div className="bg-[#ff7101]/10 border border-[#ff7101] text-[#ff7101] p-4 rounded-2xl text-sm mb-8">
          Confirm this matches the physical machine in front of you.
        </div>

        <button
          onClick={onVerify}
          className="w-full bg-[#D9D9D9] text-black py-5 rounded-3xl text-xl font-bold"
        >
          YES, THIS IS CORRECT
        </button>
      </div>
    </div>
  );
}