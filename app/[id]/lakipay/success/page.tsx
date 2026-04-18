

export default function LakipaySuccess() {
    return (
                <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">

            {/* CARD */}
            <div className="w-full max-w-md rounded-3xl shadow-2xl p-8 text-center border border-white/20" style={{background:"#ff7101"}}>

         <>
                        <div className="flex justify-center mb-6">
                            <div className="bg-black/20 p-5 rounded-full backdrop-blur-md border-transparent">
                                <svg
                                    className="w-12 h-12 text-[#00e900]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                    <path
                                        d="M7 12l3 3 7-7"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900">
                            Payment Successful
                        </h1>

                        <p className="text-gray-700 mt-2">
                            Your payment is confirmed.
                        </p>

                        {/* DARK GLASS BOX */}
                        <div className="mt-6 bg-black/30 backdrop-blur-md rounded-xl p-4 border-transparent">
                            <p className="text-sm text-white">
                               Take your order from the vending machine
                            </p>
                        </div>

                         <div className="mt-6 text-xs " color="#D9D9D9">
                            <span className=" font-semibold">
                                SATEV
                            </span>{" "}
                            Group
                        </div>
                    </>
            </div>
        </div>
    )
}