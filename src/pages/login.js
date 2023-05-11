import Head from "next/head";
import styles from "@/styles/Login.module.css";
import Navbar from "@/components/Navbar";
import { login } from "@/api/auth-api";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getCookies } from "cookies-next";
import { toast } from "react-hot-toast";

export default function Login() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const requestBody = JSON.stringify({
      username: username,
      password: password,
    });
    login(requestBody)
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main className={styles.main}>
        <Navbar />
        <div className="block m-auto flex flex-col justify-center overflow-hidden rounded-lg">
          <div className="w-full p-6 m-auto bg-white rounded-lg lg:max-w-xl">
            <h1 className="font-semibold text-center uppercase">Login</h1>
            <form onSubmit={handleLogin} className="mt-6">
              <div className="mb-2">
                <label
                  className="block font-semibold"
                >
                  Username
                </label>
                <input
                  value={username}
                  onChange={handleChangeUsername}
                  required
                  type="text"
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-lg focus:border-green3 focus:ring-green3 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                  className="block font-semibold"
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={handleChangePassword}
                  required
                  type="password"
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-lg focus:border-green3 focus:ring-green3 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div className="mt-6">
                <input
                  type={"submit"}
                  value={isLoading ? "Loading..." : "Login"}
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 cursor-pointer transform bg-green rounded-lg hover:bg-green2 hover:shadow-lg focus:outline-none focus:bg-green-600"
                />
              </div>
            </form>

            {/* <p className="mt-8 text-sm font-light text-center text-gray-700">
              {" "}
              Don't have an account?{" "}
              <a href="#" className="font-medium text-green hover:underline">
                Sign up
              </a>
            </p> */}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  if (getCookies({ req, res })?.auth) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
}
