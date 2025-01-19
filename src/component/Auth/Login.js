import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-wrap p-5 bg-gray-100">
      {/* Form Title */}
      <div className="max-w-md mr-12 text-left">
        <h1 className="hidden xs:block text-5xl font-semibold text-red-600 mb-2 font-mono">Sunday4</h1>
        <p className="hidden sm:block text-xl text-pink-500 leading-relaxed font-playwrite">
          Sunday helps you connect and share with the people in your life.
        </p>
      </div>

      {/* Form Login */}
      <div className="max-w-md bg-white p-5 rounded-lg shadow-md">
        <form>
          <input
            type="text"
            placeholder="Email or Phone"
            className="w-full p-3 mb-4 border border-gray-500 rounded-md text-lg"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-500 rounded-md text-lg"
          />
          <button
            type="submit"
            className="w-full bg-steel text-white p-3 text-base font-mono rounded-md transition hover:bg-blue-600"
          >
            Log In
          </button>
        </form>
        <a
          href="#!"
          onClick={(e) => e.preventDefault()}
          className="block text-center mt-4 text-sm text-steel hover:underline font-mono"
        >
          Forgotten password?
        </a>
        <div className="my-6 border-t border-gray-300"></div>
        <button className="w-full bg-pinkred text-white p-3 text-base font-mono rounded-md transition hover:bg-green-500">
          Create New Account
        </button>
      </div>
    </div>
  );
};

export default Login;
