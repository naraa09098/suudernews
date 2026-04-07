import SunEditorImport from "suneditor-react"
import "suneditor/dist/css/suneditor.min.css"
import { useRef, useState, useEffect } from "react"
import plugins from "suneditor/src/plugins"

const SunEditor = SunEditorImport.default || SunEditorImport

export default function Editor({ value, onChange }) {
    const editorRef = useRef(null)
    const [isReady, setIsReady] = useState(false)
    const pendingValue = useRef(value)

    const uploadImage = async (file) => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "suudernews")

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dkrrwqptv/image/upload",
            { method: "POST", body: formData }
        )
        const data = await res.json()
        return data.secure_url
    }

    // Editor бэлэн болсны дараа л setContents дуудна
    useEffect(() => {
        if (!isReady || !editorRef.current) return
        if (value !== undefined) {
            editorRef.current.setContents(value || "")
        }
    }, [value, isReady])

    const handleChange = (content) => {
        onChange && onChange(content || "")
        localStorage.setItem("news_draft", content || "")
    }

    return (
        <SunEditor
            getSunEditorInstance={(sunEditor) => {
                editorRef.current = sunEditor
                setIsReady(true)
            }}
            defaultValue={
                value ||
                localStorage.getItem("news_draft") ||
                ""
            }
            onChange={handleChange}
            setOptions={{
                iframe: false,        // ← гол засвар: iframe унтраана
                height: 500,
                plugins: plugins,
                buttonList: [
                    ["undo", "redo"],
                    ["font", "fontSize", "formatBlock"],
                    ["bold", "underline", "italic", "strike"],
                    ["fontColor", "hiliteColor"],
                    ["align", "list", "lineHeight"],
                    ["outdent", "indent"],
                    ["table", "link", "image", "video"],
                    ["removeFormat"],
                    ["preview", "codeView", "fullScreen"]
                ]
            }}
            onImageUploadBefore={async (files, info, uploadHandler) => {
                const file = files[0]
                const url = await uploadImage(file)
                uploadHandler({
                    result: [{ url, name: file.name }]
                })
                return false
            }}
        />
    )
}