"use client"

import { DragEvent, useState } from 'react';
 
type FileDropProps = {
  setFiles: (files: File[]) => void;
}

export default function FileDrop({ setFiles }: FileDropProps) {
  const [isOver, setIsOver] = useState(false);
 
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(true);
  };
 
  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
  };
 
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
 
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);
 
    droppedFiles.forEach((file) => {
      const reader = new FileReader();
 
      reader.onloadend = () => {
        console.log(reader.result);
      };
 
      reader.onerror = () => {
        console.error('There was an issue reading the file.');
      };
 
      reader.readAsDataURL(file);
      return reader;
    });
  };
 
  return (
    <div
      className={`flex justify-center items-center w-full text-black h-full p-16 border-black border-2 border-dashed rounded-lg ${isOver ? "bg-blue-200" : "bg-transparent"}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      Drag and drop some files here
    </div>
  );
}