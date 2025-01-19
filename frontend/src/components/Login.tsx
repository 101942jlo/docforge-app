import { TiWeatherCloudy } from "react-icons/ti"
import { useAuth } from "./AuthProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { handleLogin } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSumbitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin({email, password})
    navigate('/dashboard')
  }

  return (
    <div className="h-screen w-full bg-slate-50 flex justify-center items-center">
      <div className="h-5/6 max-h-[800px] w-4/6 max-w-[1200px] overflow-hidden rounded-3xl flex shadow-2xl">
        <div className="bg-slate-900 text-white w-full flex items-center justify-center">
        <TiWeatherCloudy className="text-8xl mr-4" />
        <h1 className="font-sans font-bold text-5xl"> DocForge</h1>
        </div>
        <div className="bg-white flex flex-col w-full justify-center items-center">
          <h1 className="font-sans text-4xl mb-2 font-semibold">Sign In</h1>
          <form action="" onSubmit={handleSumbitLogin} className="h-96 w-96 mt-5 border rounded-xl p-10">
            <label htmlFor="email" className="block mb-2 text-sm text-slate-600">
              Email
            </label>
            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="email" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"/>
            <label htmlFor="pass" className="block mt-4 mb-2 text-sm text-slate-600">
              Password
            </label>
            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" id="pass" className="w-full mb-5 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"/>
            <button type="submit" className="w-full mt-5 rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Sign in</button>
            <p className="flex justify-center mt-10 text-sm text-slate-600">
              Don&apos;t have an account?
              <a href="/register" className="ml-1 text-sm font-semibold text-slate-700 underline">
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
      
    </div>
  )
}

export default Login