import axios from "axios"

export async function fetchAllDocx(setDocx: (docs: any[]) => void) {
    try {
        const res = await axios.get("/api/documents/get")
        const docx = res.data?.docs
        console.log(docx);
        setDocx(docx)
    } catch (e) {
        console.error(e)
    }
}
