// "use server";

// export async function uploadFile(formData: FormData) {
//     console.log("in upload");

//     console.log(formData);
//     console.log(formData.get("file") as File)

//     const response = await fetch("http://localhost:8000/upload", {
//         method: 'POST',
//         body: formData
//     });

//     console.log("got response");
    
//     const data = await response.json();
//     if (data.syllabus_text) {
//         console.log(`got text: ${data.syllabus_text}`)
//     } else {
//         console.log('got NOTHING');
//     }
// }