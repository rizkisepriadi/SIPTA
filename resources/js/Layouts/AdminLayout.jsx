import React from "react";
import AdminNavbar from "@/Components/AdminNavbar";
import Search from "@/Components/Search";
import PrimaryButton from "@/Components/PrimaryButton";

export default function AdminDashboard({ children }) {
    return (
        <div>
            <AdminNavbar />
            {<div className="flex flex-row mx-16 gap-5 justify-end">
                <p className="text-justify text-lg mt-3">List Mahasiswa</p>
                <Search />
                <a className="btn btn-primary" href={route("admin.create")}>Create</a>
            </div>}
            <div className="mx-16">{children}</div>
        </div>
    );
}
