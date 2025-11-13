import { useAuth0 } from "@auth0/auth0-react";

export default function LoginPage() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="bg-slate-800/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-slate-700">
      <img
        src="https://cdn.auth0.com/quantum-assets/dist/latest/logos/auth0/auth0-lockup-en-ondark.png"
        alt="Auth0 Logo"
        className="w-40 mx-auto mb-6 opacity-90 hover:opacity-100 transition"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />

      <h1 className="text-3xl font-bold mb-6 tracking-wide uppercase text-gray-300">
        Welcome to <span className="text-green-700">ToDo App</span>
      </h1>

      <div className="bg-slate-700/50 rounded-xl p-6 shadow-inner space-y-5">
        <p className="text-gray-300 text-lg">
          Get started by signing in to your account
        </p>

        <button
          onClick={() => loginWithRedirect()}
          className="btn bg-green-700 hover:bg-green-600 w-full py-2 rounded-lg font-bold uppercase transition-colors hover:shadow-lg"
        >
          Log In
        </button>
      </div>
    </div>
  );
}
