import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white px-4">
      <div className="bg-slate-800/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-slate-700">
        <img
          src="https://cdn.auth0.com/quantum-assets/dist/latest/logos/auth0/auth0-lockup-en-ondark.png"
          alt="Auth0 Logo"
          className="w-40 mx-auto mb-6 opacity-90 hover:opacity-100 transition"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />

        <h1 className="text-3xl font-bold mb-6 tracking-wide uppercase text-gray-300">
          Ops! Error...
        </h1>

        <div className="bg-slate-700/50 rounded-xl p-6 shadow-inner space-y-5">
          <p className="text-gray-300 text-lg">Error 404 - Not Found</p>

          <Link
            to={!isAuthenticated ? "/" : "/app"}
            className="btn bg-blue-700 hover:bg-blue-600 w-full py-2 rounded-lg font-bold uppercase transition-colors hover:shadow-lg text-white"
          >
            Return
          </Link>
        </div>
      </div>
    </div>
  );
}
