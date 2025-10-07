import React from "react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import { useForm, usePage } from "@inertiajs/react";
import axios from "axios";

export default function FormTA() {
    const user = usePage().props.auth.user;

    const { data, setData } = useForm({
        title: "",
        topik: "",
        excerpt: "",
        penulis: "",
        nim: user.nim,
        dospem: user.dospem,
        jurusan: "",
        tahunajaran: "",
        laporan: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();

        axios
        .post(route("tugasakhir.store"), data) // Mengirim data formulir ke rute tugasakhir.store
        .then((response) => {
            console.log(response.data); // Lakukan penanganan respons yang sesuai
        })
        .catch((error) => {
            console.error(error); // Lakukan penanganan kesalahan yang sesuai
        });
    };

    return (
        <form
            onSubmit={submit}
            className="flex flex-col w-[950px]"
            encType="multipart/form-data"
        >
            <InputLabel htmlFor="title" value="title" />
            <TextInput
                id="title"
                type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
                className="mt-1 block w-[950px]"
                isFocused={true}
            />
            <InputLabel htmlFor="topik" value="Topik" />
            <TextInput
                id="topik"
                type="text"
                name="topik"
                value={data.topik}
                onChange={handleChange}
                className="mt-1 block w-[950px]"
            />
            <InputLabel htmlFor="excerpt" value="Excerpt" />
            <TextInput
                id="excerpt"
                type="text"
                name="excerpt"
                value={data.excerpt}
                onChange={handleChange}
                className="mt-1 block w-[950px]"
            />
            <InputLabel htmlFor="nim" value="Nim" />
            <TextInput
                id="nim"
                type="text"
                name="nim"
                value={data.nim}
                onChange={handleChange}
                className="mt-1 block w-[950px]"
                disabled
                readOnly
            />
            <InputLabel htmlFor="dospem" value="Dosen Pembimbing" />
            <TextInput
                id="dospem"
                type="text"
                name="dospem"
                value={data.dospem}
                onChange={handleChange}
                className="mt-1 block w-[950px]"
                disabled
                readOnly
            />
            <InputLabel htmlFor="jurusan" value="Jurusan" />
            <TextInput
                id="jurusan"
                type="text"
                name="jurusan"
                value={data.jurusan}
                onChange={handleChange}
                className="mt-1 block w-[950px]"
            />
            <InputLabel htmlFor="tahunajaran" value="Tahun Ajaran" />
            <TextInput
                id="tahunajaran"
                type="text"
                name="tahunajaran"
                value={data.tahunajaran}
                onChange={handleChange}
                className="mt-1 block w-[950px]"
            />
            <InputLabel htmlFor="laporan" value="File" />
            <TextInput
                type="file"
                id="laporan"
                name="laporan"
                value={data.laporan}
                onChange={handleChange}
                className="file-input file-input-sm file-input-secondary
                        file-input-bordered w-full max-w-xs pl-0"
            />
            <button
                type="submit"
                className="mt-5 bg-secondary py-3 px-10 text-white rounded-lg self-end"
            >
                Submit
            </button>
        </form>
    );
}
