"use client"

import { useState } from 'react'
import FileDrop from '@/app/ui/FileDrop'
// import { uploadFile } from '@/app/lib/uploadFile'

export default function Upload() {
    const [files, setFiles] = useState<File[]>([])
    const [message, setMessage] = useState<String>('')
    const [isUploading, setIsUploading] = useState<Boolean>(false)

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

            const response = await fetch("http://localhost:8000/upload", {
                method: 'POST',
                body: formData
            });

            console.log("got response");

            const data = await response.json();
            if (data.syllabus_text) {
                console.log(`got text: ${data.syllabus_text}`)
            } else {
                console.log('got NOTHING');
            }
        });
    }


    return (
        <div className="flex justify-center h-screen items-center bg-white text-black">
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl text-black">Upload a syllabus to get started!</h1>

                <div className='flex gap-4'>
                    {files.map((file, index) => (
                        <p key={index}>{file.name}</p>
                    ))}
                </div>

                <FileDrop setFiles={setFiles} />

                <button onClick={() => { handleUpload() }} className="p-4 text-black rounded-xl bg-slate-300">
                    Upload!
                </button>
                <p>{message}</p>
            </div>
        </div>
    )
}