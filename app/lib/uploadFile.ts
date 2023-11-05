export async function uploadFile(file: File) {
    console.log("uploading")
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:8000/api/upload", {
        method: 'POST',
        body: formData
    })
    const data = await response.json();
    if (data.syllabus_text) {
        console.log(`got text: ${data.syllabus_text}`)
    } else {
        console.log('got NOTHING');
    }
}
