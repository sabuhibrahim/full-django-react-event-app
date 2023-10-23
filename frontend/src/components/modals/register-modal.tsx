import { Fragment, useRef, useState } from "react";
import { useAuth } from "../../store/auth-context";
import useAxios from "../../hooks/use-axios";
import { Dialog, Transition } from "@headlessui/react";
import { useAuthModal } from "../../store/auth-modal-context";
import { AxiosError } from "axios";
import ErrorAlert from "../alerts/error-alert";

const REGISTER_URL = "/auth/register";

const RegisterModal = () => {
  const { setToken, updateLogin } = useAuth();

  const { registerOpen, setRegisterOpen } = useAuthModal();

  const axios = useAxios();

  const [email, setEmail] = useState<string>("");
  const [full_name, setFullName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm_password, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const emailRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      setError("Confirm Password should be equal to the password!");
      return null;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ email, full_name, password, confirm_password })
      );

      const token = response.data.token;
      setToken(token);
      setEmail("");
      setFullName("");
      setPassword("");
      setConfirmPassword("");
      updateLogin(true);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err?.response?.data) {
          setError(err.response.data?.detail ?? JSON.stringify(err.response.data));
        } else {
          setError(err?.message);
        }
      }
      console.error(err);
    }
  };

  return (
    <Transition.Root show={registerOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={emailRef}
        onClose={setRegisterOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="flex fixed z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center text-center items-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel
              className={
                "relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              }
            >
              <div className="bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-center p-4 border-b rounded-t dark:border-gray-600">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold text-gray-900 dark:text-white"
                  >
                    Sign Up
                  </Dialog.Title>
                </div>
                {/* <!-- Modal body --> */}
                <div className="p-6 space-y-6">
                  {error && <ErrorAlert message={error} />}
                  <form onSubmit={submit} id="registerForm">
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2 text-left dark:text-white"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className={
                          "w-full rounded-full border-[2px] border-gray-300 py-4 " +
                          "pl-14 pr-12 text-xl font-medium hover:border-red-500 " +
                          "focus:border-red-500 focus:bg-customGray-base " +
                          "focus:outline-none dark:border-gray-400 dark:bg-customGray-dark dark:focus:bg-customGray-light dark:text-white"
                        }
                        id="email"
                        type="email"
                        ref={emailRef}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError(null);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2 text-left dark:text-white"
                        htmlFor="fullName"
                      >
                        Full Name
                      </label>
                      <input
                        className={
                          "w-full rounded-full border-[2px] border-gray-300 py-4 " +
                          "pl-14 pr-12 text-xl font-medium hover:border-red-500 " +
                          "focus:border-red-500 focus:bg-customGray-base " +
                          "focus:outline-none dark:border-gray-400 dark:bg-customGray-dark dark:focus:bg-customGray-light dark:text-white"
                        }
                        id="fullName"
                        type="text"
                        value={full_name}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          setError(null);
                        }}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-sm font-bold mb-2 text-left dark:text-white"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className={
                          "w-full rounded-full border-[2px] border-gray-300 py-4 " +
                          "pl-14 pr-12 text-xl font-medium hover:border-red-500 " +
                          "focus:border-red-500 focus:bg-customGray-base dark:text-white" +
                          "focus:outline-none dark:border-gray-400 dark:bg-customGray-dark dark:focus:bg-customGray-light"
                        }
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError(null);
                        }}
                        id="password"
                        type="password"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-sm font-bold mb-2 text-left dark:text-white"
                        htmlFor="confirm_password"
                      >
                        Confirm Password
                      </label>
                      <input
                        className={
                          "w-full rounded-full border-[2px] border-gray-300 py-4 " +
                          "pl-14 pr-12 text-xl font-medium hover:border-red-500 " +
                          "focus:border-red-500 focus:bg-customGray-base dark:text-white" +
                          "focus:outline-none dark:border-gray-400 dark:bg-customGray-dark dark:focus:bg-customGray-light"
                        }
                        value={confirm_password}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setError(null);
                        }}
                        id="confirm_password"
                        type="password"
                      />
                    </div>
                  </form>
                </div>
                {/* <!-- Modal footer --> */}
                <div
                  className={
                    "flex items-center justify-between p-6 space-x-2 border-t " +
                    "border-gray-200 rounded-b dark:border-gray-600"
                  }
                >
                  <button
                    type="submit"
                    form="registerForm"
                    className={
                      "text-white bg-blue-700 hover:bg-blue-800 " +
                      "focus:ring-4 focus:outline-none " +
                      "focus:ring-blue-300 font-medium rounded-lg " +
                      "text-sm px-5 py-2.5 text-center dark:bg-blue-600 " +
                      "dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    }
                  >
                    Register
                  </button>
                  <button
                    type="button"
                    className={
                      "text-gray-500 bg-white hover:bg-gray-100 " +
                      "focus:ring-4 focus:outline-none focus:ring-blue-300 " +
                      "rounded-lg border border-gray-200 text-sm font-medium " +
                      "px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 " +
                      "dark:text-gray-300 dark:border-gray-500 dark:hover:text-white " +
                      "dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    }
                    onClick={() => setRegisterOpen(!registerOpen)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default RegisterModal;
