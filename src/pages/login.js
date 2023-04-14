import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/Navbar";

export default function Login() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className="relative flex flex-col justify-center overflow-hidden rounded-md">
          <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
            <h1 className="font-semibold text-center text-green underline uppercase ">
              Login
            </h1>
            <form className="mt-6">
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Email
                </label>
                <input
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-green bg-white border rounded-md focus:border-green focus:ring-green focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Password
                </label>
                <input
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-green bg-white border rounded-md focus:border-green focus:ring-green focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <a href="#" className="text-xs text-green hover:underline">
                Forget Password?
              </a>
              <div className="mt-6">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green rounded-md hover:bg-green focus:outline-none focus:bg-green">
                  Login
                </button>
              </div>
            </form>

            <p className="mt-8 text-xs font-light text-center text-gray-700">
              {" "}
              Don't have an account?{" "}
              <a href="#" className="font-medium text-green hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
