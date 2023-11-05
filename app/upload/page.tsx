"use client"

import { useState } from 'react'
import FileDrop from '@/app/ui/FileDrop'
import { uploadFile } from '@/app/lib/uploadFile'

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

        files.forEach((file: File) => { //FIXME: this async is bad-- need to await promise.all i think
            console.log(file.name)

            uploadFile(file).then(() => console.log("done uploading"))
        });

        setIsUploading(false)
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