import React from "react";

export default function AdminNavbar() {
    return (
        <div className="flex flex-col relative">
            {/* Foto */}
            <img
                className="absolute top-0 right-0 z-10"
                src="/images/logo-admin.png"
                alt="Logo"
            />
            {/* Navbar */}
            <div className="navbar bg-base-100 mt-[114px] z-0">
                {" "}
                {/* Atur margin atas sesuai dengan tinggi foto */}
                <ul className="menu menu-horizontal py-3 mx-14 w-full shadow-xl rounded-xl">
                    <li>
                        <a>Dosen</a>
                    </li>
                    <li>
                        <a>Mahasiswa</a>
                    </li>
                    <li>
                        <a>Tugas Akhir</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}