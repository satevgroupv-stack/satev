interface Props {
  onReset: () => void;
}

export default function SuccessPage({ onReset }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-400 to-teal-400 p-6 text-center">

      <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl">

        <div className="w-24 h-24 mx-auto bg-emerald-500 rounded-full flex items-center justify-center text-4xl text-white mb-6">
          ✓
        </div>

        <h1 className="text-3xl font-bold text-black mb-2">
          Payment Successful!
        </h1>

        <p className="text-emerald-700 mb-6">
          ✦ SATEV Magics...
        </p>

        <p className="text-black mb-6">
          Your product is being dispensed!
        </p>

        <p className="text-gray-600 mb-8 text-sm">
          Please check the machine bin in a moment.
          Thank you for using SATEV!
        </p>

        <button
          onClick={onReset}
          className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold"
        >
          ← Back to Machine
        </button>

        <p className="text-xs text-gray-500 mt-6">
          POWERED BY SATEV SYSTEM
        </p>

      </div>
    </div>
  );
}