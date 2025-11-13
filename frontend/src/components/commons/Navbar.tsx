import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth0();

  return (
    <>
      <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/app"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
              ToDo App
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft"
            aria-controls="navbar-default"
            aria-expanded={open}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>

          <div
            className={`${open ? "block" : "hidden"} w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col items-center justify-center p-4 md:p-0 mt-4  rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
              <li>
                <Link
                  to="/app"
                  className="block py-2 px-3 text-white bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/app/create-task"
                  className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                >
                  Create Task
                </Link>
              </li>

              <li>
                <button
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                  className="flex items-center bg-red-700 hover:bg-red-600 px-4 py-2 rounded-lg transition text-white"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
