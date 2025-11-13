import { useAuth0 } from "@auth0/auth0-react";

export default function ErrorMessage() {
  const { error } = useAuth0();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 px-4">
      <div className="bg-red-600/20 border border-red-400 text-center rounded-2xl shadow-2xl p-8 max-w-md w-full text-white">
        <h2 className="text-4xl font-bold mb-4 text-red-400 tracking-wide">
          Oops!
        </h2>
        <p className="text-lg mb-2 font-medium">Something went wrong</p>
        <p className="text-sm text-gray-300 italic break-words">
          {error?.message}
        </p>

        <button
          onClick={() => window.location.href = '/'}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
