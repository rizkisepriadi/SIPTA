import React, { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import axios from "axios";
import Alert from "@/Components/Alert";

export default function UploadAvatar() {
    const [imagePreview, setImagePreview] = useState(""); 
    const [imagedata, setImagedata] = useState(""); 
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const selectedImage = e.target.files[0];
        setImagedata(selectedImage); 
        setImagePreview(URL.createObjectURL(selectedImage));
    };
    
    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", imagedata);
        
        axios
        .post(route("avatar.store"), formData)
        .then((response) => {
            setSuccessMessage("Berhasil di upload");
            window.location.reload();
        })
        .catch((error) => {
            console.log(error)
        });
    };
    
    const handleCloseSuccess = () => {
        setSuccessMessage("");
    };
    
    return (
        <div className="flex flex-col items-center justify-center bg-base-100 relative shadow-lg px-24 pt-0 pb-9 mt-7 ml-24 gap-5 rounded-lg w-[590px] h-[400px] mb-52">
            {successMessage && <Alert message={successMessage} onClose={handleCloseSuccess}  />}
            <h1 className="text-center font-bold text-xl">Ganti Profil</h1>
            <form
                onSubmit={submit}
                encType="multipart/form-data"
                className="flex flex-col gap-3"
            >
                <div className="flex">
                    <InputLabel htmlFor="image" className="avatar flex items-center justify-center">
                        <div className="w-32 rounded-full overflow-hidden">
                            <img
                                src={imagePreview || "/images/guest.png"} 
                                alt="Guest"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </InputLabel>
                    <TextInput
                        type="file"
                        id="image"
                        name="image"
                        value={imagedata.image}
                        onChange={handleChange}
                        className="file-input file-input-sm file-input-secondary file-input-bordered w-full mt-10 ml-2 max-w-xs pl-0"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-3 bg-primary py-2 px-2 active:bg-white text-white rounded-lg self-end"
                >
                    Simpan
                </button>
            </form>
        </div>
    );
}
