import { useState } from "react"
import { TiWeatherCloudy } from "react-icons/ti"
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { handleRegister } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");


  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    await handleRegister({ email, password, firstName, lastName });
    
    navigate('/sign-in')    
    
  }

  return (
    <div className="h-screen w-full bg-slate-50 flex justify-center items-center">
      <div className="h-5/6 max-h-[800px] w-4/6 max-w-[1200px] overflow-hidden rounded-3xl flex shadow-2xl">
        <div className="bg-slate-900 text-white w-full flex items-center justify-center">
        <TiWeatherCloudy className="text-8xl mr-4" />
        <h1 className="font-sans font-bold text-5xl"> DocForge</h1>
        </div>
        <div className="bg-white flex flex-col w-full justify-center items-center">
          <h1 className="font-sans text-4xl mb-2 font-semibold">Register</h1>
          <form action="" onSubmit={handleSubmitRegister} className="h-96 w-96 mt-5 border rounded-xl p-10">
            <label htmlFor="firstName" className="block mt-4 mb-2 text-sm text-slate-600">
              First Name
            </label>
            <input type="text" id="firstName" onChange={(e) => setFirstName(e.target.value)} placeholder="First name" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"/>
            <label htmlFor="lastName" className="block mt-4 mb-2 text-sm text-slate-600">
              Last Name
            </label>
            <input type="text" id="lastName" onChange={(e) => setLastName(e.target.value)} placeholder="Last name" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"/>            
            <label htmlFor="email" className="block mt-4 mb-2 text-sm text-slate-600">
              Email
            </label>
            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="email" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"/>
            <label htmlFor="password" className="block mt-4 mb-2 text-sm text-slate-600">
              Password
            </label>
            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" id="pass" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"/>
            <button type="submit" className="w-full mt-5 rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Register</button>
            <p className="flex justify-center mt-10 text-sm text-slate-600">
              Already have an account?
              <a href="/sign-in" className="ml-1 text-sm font-semibold text-slate-700 underline">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
      
    </div>
  )
}

export default Register