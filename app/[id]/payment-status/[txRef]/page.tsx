import { connectDB } from "@/lib/mongoose";
import verifyChapaTransaction from "@/lib/verifyChapaTransaction";
import Order from "@/models/Order";

// Force dynamic (important for payments)
export const dynamic = "force-dynamic";

// 🔴 Replace with your real Prisma / DB logic
async function verifyTransaction(txRef: string) {
    try {
        console.log("Verifying transaction with txRef:", txRef);
        const isValid = await verifyChapaTransaction(txRef);
        if(isValid) {
            console.log("Transaction is valid. Proceeding to modify order...");
            await modifyOrder(txRef,"sucess");
        } else {
            modifyOrder(txRef,"failed");
            return false;
        }
        return isValid;
    } catch (err) {
        return false;
    }
}
async function modifyOrder(txRef:string,status: string) {
    await connectDB();
    await Order.updateOne(
        { txRef: txRef },
        { $set: { paymentStatus: status } }
    );
}

export default async function PaymentStatusPage({
    params,
}: {
    params: Promise<{ txRef: string }>;
}) {
    const txRef = (await params).txRef;

    const isSuccess = await verifyTransaction(txRef);
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">

            {/* CARD */}
            <div className="w-full max-w-md bg-[#D9D9D9] rounded-3xl shadow-2xl p-8 text-center border border-white/20">

                {/* SUCCESS */}
                {isSuccess && (
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
                                👉 Take your order from the vending machine
                            </p>
                        </div>

                        <div className="mt-6 text-xs text-gray-600">
                            <span className="text-[#ff7101] font-semibold">
                                SATEV
                            </span>{" "}
                            Group
                        </div>
                    </>
                )}

                {/* ERROR */}
                {!isSuccess && (
                    <>
                        <div className="flex justify-center mb-6">
                            <div className="bg-black/20 p-5 rounded-full backdrop-blur-md border-transparent">
                                <svg
                                    className="w-12 h-12 text-red-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                    <path
                                        d="M9 9l6 6M15 9l-6 6"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900">
                            Payment Failed
                        </h1>

                        <p className="text-gray-700 mt-2">
                            We couldn’t verify your payment.
                        </p>

                        {/* DARK GLASS BOX */}
                        <div className="mt-6 bg-black/30 backdrop-blur-md rounded-xl p-4 border-transparent">
                            <p className="text-sm text-white">
                                Please try again or contact support.
                            </p>
                        </div>

                        <div className="mt-6 text-xs text-gray-600">
                            <span className="text-[#ff7101] font-semibold">
                                SATEV
                            </span>{" "}
                            Group
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
