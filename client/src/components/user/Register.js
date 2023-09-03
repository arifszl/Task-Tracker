import React from "react";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/UserSlice";

const Register = () => {
  const [error, setError] = useState(null); // error state for handling errors
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  let sendFormData = async (formData) => {
    let response = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);

    //setting user
    if (!response.ok) {
      setError(data.message);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(setUser(data));
    }

    return response;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(formData);
    let response = await sendFormData(formData);

    if (response.status === 200) {
      alert("Registered successfully");
      navigate("/");
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <section className="text-white body-font ">
        <div className="container px-5 py-15 mx-auto -mt-12">
          <div className="flex flex-col text-center w-full mb-10 mt-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-Red-900">
              Register
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-white font-semibold"
                  >
                    Name
                  </label>
                  <input
                    ref={nameRef}
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-slate-100 bg-opacity-30 rounded-lg shadow-lg shadow-black  focus:border-black focus:bg-slate-50 focus:ring-2 focus:ring-slate-100 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="year"
                    className="leading-7 text-sm text-white font-semibold "
                  >
                    Email
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    name=""
                    id=""
                    className="w-full bg-slate-100 bg-opacity-30 rounded-lg shadow-lg shadow-black  focus:border-black focus:bg-slate-50 focus:ring-2 focus:ring-slate-100 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="year"
                    className="leading-7 text-sm text-white font-semibold "
                  >
                    Password
                  </label>
                  <input
                    ref={passwordRef}
                    type="text"
                    name=""
                    id=""
                    className="w-full bg-slate-100 bg-opacity-30 rounded-lg shadow-lg shadow-black  focus:border-black focus:bg-slate-50 focus:ring-2 focus:ring-slate-100 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-black rounded text-lg">
                  Register
                </button>
              </div>
              {error && (
                <div className="p-2 w-full text-center text-red-500">
                  <h1>{error}</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </form>
  );
};

export default Register;
