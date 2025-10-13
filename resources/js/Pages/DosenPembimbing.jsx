import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import FilterDosen from "@/Components/FilterDosen";
import DosenCard from "@/Components/DosenCard";
import { Head, useForm, usePage } from "@inertiajs/react";

export default function DosenPembimbing({auth}) {
    // console.log(usePage().props);
    const { dosens } = usePage().props; // Akses 'dosens' dari properti halaman
    const bidangArray = dosens.map((dosen) => dosen.bidang.split(",").map((item) => item.trim()));

    // Jika Anda ingin menggunakan useForm, Anda mungkin ingin membuatnya lebih dinamis
    // untuk menangani setiap dosen secara individual. Namun, untuk sekarang, saya akan biarkan seperti ini.

    return (
        <Authenticated
        auth={auth}
        >
            <Head title="Dosen Pembimbing" />
            <div className="mx-4">
                <div className="flex flex-col">
                    <div className="">
                        <FilterDosen />
                    </div>
                    <div className="flex flex-wrap flex-auto justify-center overflow-hidden gap-5">
                        {/* Gunakan map untuk menampilkan setiap dosen */}
                        {dosens.map((dosen, index) => (
                            <DosenCard
                                key={dosen.id}
                                nama={dosen.name}
                                bidang={bidangArray[index].map((item, index) => (
                                    <div key={index}>{item}</div>
                                ))}
                                wa={dosen.telp}
                                foto={dosen.foto}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
