"use client"

import { useState } from "react";
import { useRouter } from "next/router";




const AddPost = () => {
    const router = useRouter();
    const [formData,setFormData] = useState({
        title: "",
        body: ""
      })
     const [btnLabel,setBtnLabel] = useState("Add Post");
      const handleChanges = (event: any) => {
      setFormData({...formData,[event.target.name]:event.target.value})
      }
      const submitHandler = async(e: any) => {
        e.preventDefault();
      setBtnLabel("Adding Post...")
      try{
      await fetch("https://moeexposts.netlify.app/.netlify/functions/api/Addpost",{
        method: "POST",
        body: JSON.stringify(formData)
      })
      setBtnLabel("Add Post");
      router.replace(router.asPath,undefined,{scroll:false});
      setFormData({
        title: "",
        body:""
      })
      }
      catch(error: any) {
      console.log(error.message);
      }
      }
return(
    <div className='flex flex-col w-fit h-fit p-4 border-4 border-indigo-400 rounded-md justify-start'>
    <form onSubmit={(e) => submitHandler(e)} className='flex flex-col w-fit h-fit gap-5'>
      <label className='text-center text-indigo-400 font-extrabold'>Add Post Form</label>
      <div className='flex flex-col gap-1'>
        <label className='text-indigo-400 font-bold'>Enter Post Tile</label>
      <input value={formData.title} className='outline-1 outline-indigo-400 p-2 text-black outline focus:outline-2 focus:outline-indigo-600' type='text' name='title' onChange={(e) => handleChanges(e)} required placeholder='Enter Title'/>
      </div>
      <div className='flex flex-col gap-1'>
        <label className='text-indigo-400 font-bold'>Write Post</label>
      <textarea name='body' className='outline-1 outline-indigo-400 p-2 text-black outline focus:outline-2 focus:outline-indigo-600' cols={4} rows={5} autoFocus value={formData.body} maxLength={80} onChange={(e) => handleChanges(e)} placeholder='Enter Post Detail' required></textarea>
      </div>
      <div>
      <button type='submit' className='w-fit h-fit p-2 text-slate-100 bg-indigo-400 disabled:bg-indigo-200 disabled:pointer-events-none' disabled={btnLabel === "Adding Post..."}>{btnLabel}</button>
      </div>
      </form>
    </div>
)
}

export default AddPost;