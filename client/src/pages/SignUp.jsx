import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function SignUp() {

   const [formsData,setFormsdata] = useState({});
   const [loading,setloading] = useState(false);
   const [error,setError] = useState(false);
   const navigate = useNavigate();
   const handleChange = (e)=>{
   setFormsdata({...formsData,[e.target.id]:e.target.value})
   }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setloading(true)
      const res = await fetch('/api/auth/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formsData)
      })
      const data = await res.json();
      
      setloading(false)
      setError(false)

      if (data.Success === false) {
        setError(true)
      }
      navigate('/')
    } catch (error) {
      setloading(true)
    }
  }

   return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="UserName" id="userName" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} />
        <input type="text" placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
        <input type="password" placeholder="Password" id="password" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
         {loading ? "Loading...":'Sign Up'}
          </button>
        <button className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>Continue with Google</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to='/signIn'>
        <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
      <p className="text-red-700">{error && 'Error while Signing Into The Page!'}</p>
    </div>
  )
}
