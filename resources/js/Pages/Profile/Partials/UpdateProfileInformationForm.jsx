import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function UpdateProfileInformation({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            nim: user.nim,
            dospem: user.dospem,
            alamat: user.alamat,
            telp: user.telp,
            tempatlahir: user.tempatlahir,
            tanggallahir: user.tanggallahir,
            jeniskelamin: user.jeniskelamin,
            kewarganegaraan: user.kewarganegaraan,
            agama: user.agama,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };
    

    return (
        <div className="flex flex-col ml-16 bg-base-100 shadow-lg px-8 py-3 mt-0 rounded-lg">
            <h1 className="text-secondary text-xl font-bold mb-3 ">
                Data Pribadi Mahasiswa
            </h1>
            <form onSubmit={submit} className="flex flex-col">
                <InputLabel htmlfor="nim" value="No. Induk Mahasiswa" />
                <TextInput
                    id="nim"
                    value={data.nim}
                    disabled
                    readOnly
                    className="mt-1 block w-[650px]"
                />
                <InputError className="mt-2" message={errors.nim} />

                <InputLabel htmlFor="name" value="Name" />
                <TextInput
                    id="name"
                    value={data.name}
                    disabled
                    readOnly
                    className="mt-1 block w-[650px]"
                />
                <InputError className="mt-2" message={errors.name} />

                <InputLabel
                    htmlfor="dospem"
                    value="Dosen Pembimbing Akademik"
                />
                <TextInput
                    id="dospem"
                    value={data.dospem}
                    disabled
                    readOnly
                    autoComplete="dospem"
                    className="mt-1 block w-[650px]"
                />
                <InputError className="mt-2" message={errors.dospem} />

                <InputLabel htmlfor="alamat" value="Alamat Mahasiswa" />
                <TextInput
                    id="alamat"
                    value={data.alamat}
                    onChange={(e) => setData("alamat", e.target.value)}
                    required
                    autoComplete="alamat"
                    className="mt-1 block w-[650px]"
                />
                <InputError className="mt-2" message={errors.alamat} />

                <InputLabel htmlfor="telp" value="Nomor Telepon" />
                <TextInput
                    id="telp"
                    value={data.telp}
                    onChange={(e) => setData("telp", e.target.value)}
                    required
                    autoComplete="telp"
                    className="mt-1 block w-[650px]"
                />
                <InputError className="mt-2" message={errors.telp} />

                <InputLabel htmlfor="tempatlahir" value="Tempat Lahir" />
                <TextInput
                    id="tempatlahir"
                    value={data.tempatlahir}
                    onChange={(e) => setData("tempatlahir", e.target.value)}
                    required
                    autoComplete="tempatlahir"
                    className="mt-1 block w-[650px]"
                />
                <InputError className="mt-2" message={errors.tempatlahir} />

                <InputLabel htmlfor="tanggallahir" value="Tanggal lahir" />
                <TextInput
                    id="tanggallahir"
                    value={data.tanggallahir}
                    onChange={(e) => setData("tanggallahir", e.target.value)}
                    required
                    autoComplete="tanggallahir"
                    className="mt-1 block w-[650px]"
                />
                <InputError className="mt-2" message={errors.tanggallahir} />

                <InputLabel htmlfor="jeniskelamin" value="Jenis Kelamin" />
                <TextInput
                    id="jeniskelamin"
                    value={data.jeniskelamin}
                    onChange={(e) => setData("jeniskelamin", e.target.value)}
                    required
                    autoComplete="jeniskelamin"
                    className="mt-1 block w-[650px]"
                />
                <InputError className="mt-2" message={errors.jeniskelamin} />

                <InputLabel htmlfor="kewarganegaraan" value="Kewarganegaraan" />
                <TextInput
                    id="kewarganegaraan"
                    value={data.kewarganegaraan}
                    onChange={(e) => setData("kewarganegaraan", e.target.value)}
                    required
                    autoComplete="kewarganegaraan"
                    className="mt-1 block w-[650px]"
                />
                <InputError className="mt-2" message={errors.kewarganegaraan} />

                <InputLabel htmlfor="agama" value="Agama" />
                <TextInput
                    id="agama"
                    value={data.agama}
                    onChange={(e) => setData("agama", e.target.value)}
                    required
                    autoComplete="agama"
                    className="mt-1 block w-[650px]"
                />
                <InputError className="mt-2" message={errors.agama} />

                <InputLabel
                    htmlFor="email"
                    value="Email"
                    className="text-secondary"
                />

                <TextInput
                    id="email"
                    type="email"
                    className="mt-1 block w-full"
                    value={data.email}
                    isFocused
                    disabled
                    readOnly
                    autoComplete="username"
                />

                <InputError className="mt-2" message={errors.email} />

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 mt-5">
                    <PrimaryButton disabled={processing}>Simpan</PrimaryButton>
                </div>
            </form>
        </div>
    );
}
