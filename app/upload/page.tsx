"use client"

import { useState } from 'react'
import FileDrop from '@/app/ui/FileDrop'
import { createClassCalendar } from '@/app/lib/createCalendar'

export default function Upload() {
    const [files, setFiles] = useState<File[]>([])
    const [message, setMessage] = useState<String>('')
    const [isUploading, setIsUploading] = useState<Boolean>(false)
    const [isDone, setIsDone] = useState<Boolean>(false)
    const [userEmail, setUserEmail] = useState<string>('')

    function refreshPage() {
        setIsUploading(false)
        setIsDone(false)
        setFiles([])
        setMessage('')
        setUserEmail('')
    }

    function handleUpload() {
        if (isUploading) {
            setMessage("Already uploading!");
            return;
        }

        if (userEmail == '') {
            setMessage("Enter your email!");
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
                createClassCalendar(data.syllabus_text, userEmail).then(() => {
                    setIsDone(true)
                })

            } else {
                console.log('got NOTHING');
            }
        });
    }


    return (
        <div className="h-screen flex justify-center bg-white text-black relative">
            <div className="flex w-[50%] h-fit">
                <div className="flex flex-col gap-4 w-full mt-20">
                    {!isUploading && !isDone && 
                        <>
                            <h1 className="text-2xl text-black font-semibold">Upload a syllabus to get started!</h1>
                            
                            <FileDrop setFiles={setFiles} />

                            <input
                                type="text"
                                name="userFirstName"
                                id="userFirstName"
                                placeholder="Enter your email"
                                onBlur={(e) => setUserEmail(e.target.value)}
                            />

                            <button onClick={() => { handleUpload() }} className="p-4 font-bold text-white rounded-xl bg-blue-500 w-40">
                                Upload!
                            </button>
                            <p className='font-semibold text-red-400 underline w-fit rounded-lg'>{message}</p>
                        </>
                    }
                    {isUploading && !isDone &&
                        <>
                            <h1 className="text-2xl font-semibold text-black">Uploading...</h1>

                            <div className='w-full flex justify-center mt-10'>
                                <div className='w-60 h-60'>
                                    <img src="/salamander_thick.png" className='animate-spin object-fit'></img>
                                </div>
                            </div>
                        </>
                    }
                    {isDone &&
                        <>
                            <div className='flex justify-between h-20'>
                                <div>
                                    <h1 className="text-2xl font-semibold text-black">Done!</h1>

                                    <div className='w-full flex mt-5'>
                                        <p>Check your inbox for a calendar invite!</p>
                                    </div>
                                </div>
                                <div className='w-24 h-24'>
                                    <img src="/salamander_thumbs.png" className='object-contain'></img>
                                </div>
                            </div>
                            
                            <div className='flex justify-center'>
                                <button className="px-8 py-2 bg-blue-500 text-white rounded-lg font-bold mt-20 w-fit" onClick={() => {refreshPage()}}>Another one!</button>
                            </div>
                        </>
                    }
                </div>
            </div>
                {!isUploading && !isDone && files.length > 0 &&
                    <div className='flex flex-col gap-4 absolute right-20 h-screen self-start mt-40'>
                        <div className='flex flex-col gap-4'>
                            <p className='font-bold'>Documents:</p>
                            { files.map((file, index) => (
                                <div className='flex gap-2'>
                                    <svg className="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 221.25V416a48 48 0 01-48 48H144a48 48 0 01-48-48V96a48 48 0 0148-48h98.75a32 32 0 0122.62 9.37l141.26 141.26a32 32 0 019.37 22.62z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><path d="M256 56v120a32 32 0 0032 32h120" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
                                    <p key={index}>{file.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                }
        </div>
    )
}