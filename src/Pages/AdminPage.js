import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {AiFillCaretLeft} from "react-icons/ai";

import {onValue, ref, set} from "firebase/database";
import {refDb} from "../service/firebase-config";
import {db} from "../service/firebase-config";

const AdminPage = ({artworks, setArtworks, totalArtwork}) => {
    /// UPLOAD IMAGES
    const [imageUpload, setImageUpload] = useState(null);
    const [picPreview, setPicPreview] = useState();

    // STATES
    const creationDate = new Date().getTime()
    const [id, setId] = useState("")
    const [imgURL, setImgURL] = useState("");
    const [IDToModify, setIDToModify] = useState("")
    const [titleToModify, setTitleToModify] = useState("")
    const [title, setTitle] = useState("")


    // CALL BASE POUR LISTING
    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                // eslint-disable-next-line
                Object.values([data]).map((item) => {
                    setArtworks(Object.values(item));
                    setId(Object.values(item).length);
                    console.log("🔥🔥🔥🔥 Firebase is called 🔥🔥🔥🔥");
                });
            } else {
                throw new Error("Il y a un souci");
            }
        });
        // eslint-disable-next-line
    }, []);


    // HANDLES
    const handleImgURLChange = (event) => {
        setImgURL(event.target.value);
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };


    const reset = () => {
        setPicPreview(null);
        setImageUpload(null);
        setTitle("");
        setImgURL("")
    }


    // FONCTION POUR ÉCRIRE UN NOUVEL ARTWORK SUR FIREBASE
    const writeUserData = () => {
        set(refDb(db, `/${title}`), {
            id,
            imgURL,
            title,
            creationDate
        });
        reset()
    };

    // FONCTION POUR MODIFIER UN NOUVEL ARTWORK SUR FIREBASE
    const handleUpdate = () => {
        set(refDb(db, `/${titleToModify}`), {
            id: IDToModify,
            imgURL: imgURL,
            title: titleToModify,
        });
        console.log("Update done !")
        reset();
    }

    const handleSelect = (selectedId, selectedTitle) => {
        console.log(selectedId, selectedTitle);
        setIDToModify(selectedId)
        setTitleToModify(selectedTitle)
    }
    // FONCTION POUR SUPPRIMER UN ARTWORK SUR FIREBASE
    const handleRemove = (idToRemove) => {
        console.log(idToRemove);
    }

    // POUR ENREGISTRER LES DONNEES AVANT SOUMISSION
    const handleSubmit = (event) => {
        event.preventDefault();
        setImgURL("/uploads/" + imageUpload.name)
        setPicPreview(
            <div className="artwork-preview">
                <img className="rounded-xl" src={"/uploads/" + imageUpload.name} alt="artwork"/>
            </div>
        );
        console.log(title + " a bien été ajouté !")
    };


    return (
        <div className="admin" id="top">
            <Link to="/" className="fixed top-4 left-4 border border-black rounded-xl">
                <Button>
                    <AiFillCaretLeft color="black"/>
                    <span className="text-xl text-black pl-2">
                        Accueil
                    </span>
                </Button>
            </Link>

            {/*PARTIE AJOUT GLOBAL*/}
            <h1 className="text-gray-700 text-2xl font-bold mt-10">
                Ajouter un Artwork
            </h1>
            <form>
                <TextField
                    id="id"
                    label="ID"
                    disabled={true}
                    multiline
                    maxRows={1}
                    value={id}
                    className="search"
                    margin="normal"
                    type="text"
                    fullWidth={true}
                />
                <TextField
                    id="date"
                    label="Creation date"
                    disabled={true}
                    multiline
                    maxRows={1}
                    value={creationDate}
                    className="search"
                    margin="normal"
                    type="text"
                    fullWidth={true}
                />
                <TextField
                    id="title"
                    label="Nom"
                    multiline
                    maxRows={1}
                    value={title}
                    className="search"
                    margin="normal"
                    type="search"
                    fullWidth={true}
                    onChange={handleTitleChange}
                />

                <TextField
                    id="imgURL"
                    label="Image URL"
                    multiline
                    maxRows={4}
                    value={imgURL}
                    className="search"
                    margin="normal"
                    type="search"
                    fullWidth={true}
                    onChange={handleImgURLChange}
                />
            </form>


            {/*PARTIE PHOTO*/}
            <h1 className="mt-10 text-gray-700 text-2xl font-bold mb-3">
                Ajouter une photo
            </h1>

            <div className="h-[200px] flex flex-col justify-evenly items-center bg-gray-700 rounded-xl p-5 mb-5">
                <input
                    id="inputTag"
                    type="file"
                    onChange={(event) => {
                        setImageUpload(event.target.files[0]);
                    }}
                />
            </div>

            <div className="flex w-1/6 justify-between">
                <button
                    className="border bg-gray-700 text-white text-xl cursor-pointer rounded px-5 py-2 flex justify-center my-5"
                    onClick={handleSubmit}>
                    Ajouter
                </button>
                <button
                    className="border bg-gray-500 text-white text-xl cursor-pointer rounded px-5 py-2 flex justify-center my-5"
                    onClick={handleUpdate}>
                    Updater
                </button>
            </div>

            <button
                className="border bg-[crimson] text-white text-xl cursor-pointer rounded px-5 py-2 flex justify-center my-5"
                onClick={writeUserData}>
                Envoyer
            </button>

            {picPreview}

            {/*APERCU DE LA LISTE DES ARTWORKS*/}
            <div className="hidden md:block w-1/2">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl md:text-2xl font-semibold text-[#174A5B]">Artworks DB</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            Ici, tu retrouves la liste de tous les artworks.
                        </p>
                    </div>
                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900 sm:pl-6 cursor-pointer">
                                            ID
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-base font-semibold text-gray-900 cursor-pointer">
                                            Titre
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-base font-semibold text-gray-900 cursor-pointer">
                                            URL Image
                                        </th>

                                    </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                    {artworks
                                        .map((artwork, index) => (
                                            <tr key={index} className={index % 2 === 0 ? undefined : 'bg-[#CEEAF3]'}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {artwork.id.length > 5 ? artwork.id.substring(0, 5) + "..." : artwork.id}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 overflow-hidden">
                                                    {artwork.title}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 overflow-hidden">
                                                    {artwork.imgURL.length > 40 ? artwork.imgURL.substring(0, 40) + "..." : artwork.imgURL}
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <div className="text-green-700 hover:text-[#FFC2C4] cursor-pointer"
                                                         onClick={() => handleSelect(artwork.id, artwork.title)}>
                                                        Select
                                                    </div>
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <div className="text-[#FF585D] hover:text-[#FFC2C4] cursor-pointer"
                                                         onClick={() => handleRemove(artwork.title)}>
                                                        Supprimer
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
