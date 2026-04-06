import SunEditorImport from "suneditor-react"
import "suneditor/dist/css/suneditor.min.css"

const SunEditor = SunEditorImport.default

export default function Editor({ value, onChange }) {

    const uploadImage = async (file) => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "suudernews")

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dkrrwqptv/image/upload",
            {
                method: "POST",
                body: formData
            }
        )

        const data = await res.json()
        return data.secure_url
    }

    // AUTO SAVE DRAFT
    const handleChange = (content) => {
        onChange(content)
        localStorage.setItem("news_draft", content)
    }

    return (
        <SunEditor
            setContents={
                value ||
                localStorage.getItem("news_draft") ||
                ""
            }
            onChange={handleChange}
            height="500px"
            setOptions={{
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

            // IMAGE UPLOAD
            onImageUploadBefore={async (files, info, uploadHandler) => {
                const file = files[0]
                const url = await uploadImage(file)

                uploadHandler({
                    result: [
                        {
                            url: url,
                            name: file.name
                        }
                    ]
                })

                return false
            }}
        />
    )
}