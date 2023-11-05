"use client"

import { useState } from 'react'
import FileDrop from '@/app/ui/FileDrop'
import { createClassCalendar } from '@/app/lib/createCalendar'
// import { uploadFile } from '@/app/lib/uploadFile'

export default function Upload() {
    const [files, setFiles] = useState<File[]>([])
    const [message, setMessage] = useState<String>('')
    const [isUploading, setIsUploading] = useState<Boolean>(false)
    const [userEmail, setUserEmail] = useState<string>('')

    function handleUpload() {
        if (isUploading) {
            setMessage("Already uploading!");
            return;
        }

        setIsUploading(true)

        if (files?.length == 0) {
            setMessage("No files!");
            setIsUploading(false)
            return;
        }

        files.forEach(async (file: File) => { //FIXME: this async is bad-- need to await promise.all i think
            console.log(file.name)

            const formData = new FormData()
            formData.append("file", file as File)
            console.log("sending to server");

            // Response is the JSON we get back from ChatGPT
            const response = await fetch("http://localhost:8000/upload", {
                method: 'POST',
                body: formData
            });

            console.log("got response");

            const data = await response.json();
            if (data.syllabus_text) {
                console.log(`got text: ${data.syllabus_text}`)

                // call Google Calendar API function
                createClassCalendar(data.syllabus_text, userEmail);               

            } else {
                console.log('got NOTHING');
            }
        });
    }


    return (
        <div className="h-screen flex justify-center bg-white text-black relative">
            <div className="flex w-[50%] h-fit">
                <div className="flex flex-col gap-4 w-full mt-40">
                    {/* <button onClick={() => setIsUploading(!isUploading)} className='bg-red-400 w-fit p-4 rounded-xl'>IsUploading: {isUploading && "true"}</button> */}
                    {!isUploading && 
                        <>
                            <h1 className="text-4xl text-black">Upload a syllabus to get started!</h1>
                            
                            <FileDrop setFiles={setFiles} />

                            <input
                                type="text"
                                name="userFirstName"
                                id="userFirstName"
                                placeholder="Enter your email"
                                onBlur={(e) => setUserEmail(e.target.value)}
                            />

                            <button onClick={() => { handleUpload() }} className="p-4 text-black rounded-xl bg-slate-300 w-40">
                                Upload!
                            </button>
                            <p>{message}</p>
                        </>
                    }
                    {isUploading &&
                        <>
                            <h1 className="text-4xl text-black">Uploading...</h1>

                            <div className='w-full flex justify-center mt-10'>
                                <div className='w-12 h-12'>
                                    <img src="/loading.gif" className='object-fit'></img>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className='flex flex-col gap-4 absolute right-10 h-screen justify-center'>
                {files.map((file, index) => (
                    <div className='flex gap-2'>
                        <svg className="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 221.25V416a48 48 0 01-48 48H144a48 48 0 01-48-48V96a48 48 0 0148-48h98.75a32 32 0 0122.62 9.37l141.26 141.26a32 32 0 019.37 22.62z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><path d="M256 56v120a32 32 0 0032 32h120" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
                        <p key={index}>{file.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}