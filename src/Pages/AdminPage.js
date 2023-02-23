import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {AiFillCaretLeft} from "react-icons/ai";

import {onValue, ref, set, remove, update} from "firebase/database";
import {refDb} from "../service/firebase-config";
import {db} from "../service/firebase-config";
import {isNew, notNewAnymore, soonNotNew} from "../Utility/functions";

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
    const [imgURLToModify, setImgURLToModify] = useState("")
    const [creationDateToModify, setCreationDateToModify] = useState("")
    const [title, setTitle] = useState("")
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [type, setType] = useState([])
    const [selectedButton, setSelectedButton] = useState([])


    // FONCTION POUR AJOUTER UN TYPE
    const addType = (e) => {
        e.preventDefault()
        setType([...type, e.target.value])
        setSelectedButton([...selectedButton, e.target.value])
    }

    // CALL BASE POUR LISTING
    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                // eslint-disable-next-line
                Object.values([data.images]).map((item) => {
                    setArtworks(Object.values(item).sort((a, b) => a.id - b.id)); // TRI PAR ID
                    setId(Object.values(item).length + 1);
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
        setPicPreview("");
        setImageUpload("");
        setTitle("");
        setImgURL("")
        setTitleToModify("")
        setIDToModify("")
        setType([])
        setSelectedButton([])
    }


    // FONCTION POUR ÉCRIRE UN NOUVEL ARTWORK SUR FIREBASE
    const writeUserData = () => {
        set(refDb(db, `images/${title}`), {
            id,
            imgURL,
            title,
            creationDate,
            type,
        });
        reset()
    };

    // FONCTION POUR MODIFIER UN NOUVEL ARTWORK SUR FIREBASE
    const handleUpdate = () => {
        set(refDb(db, `images/${titleToModify}`), {
            creationDate: creationDateToModify,
            id: id,
            imgURL: imgURLToModify,
            title: titleToModify,
        });
        console.log("Update done !")
        reset();
    }

    const popUpChangeTitle = () => {
        const areYouSure = window.confirm("Voulez-vous vraiment modifier " + titleToModify + " en " + title + " ?")
        if (areYouSure) {
            handleUpdateTitle()
            removeUserData(titleToModify)
            alert("Le titre " + titleToModify + " a bien été remplacé par " + title + " !");
            reset();
        } else {
            console.log("Annulation de la modification du titre")
        }
    }
    const handleUpdateTitle = () => {
        const newTitle = {
            creationDate: creationDateToModify,
            id: IDToModify,
            title: title,
            imgURL: imgURLToModify
        };
        const updates = {};
        updates[`/images/${title}`] = newTitle;

        return update(ref(db), updates);
    }

    const handleSelect = (selectedId, selectedTitle, selectedImgURL, selectedCreationDate) => {
        setIDToModify(selectedId)
        setTitleToModify(selectedTitle)
        setImgURLToModify(selectedImgURL)
        setCreationDateToModify(selectedCreationDate === undefined ? 0 : selectedCreationDate)
        setSelectedRowId(selectedId)
        console.log(selectedId, selectedTitle);
        console.log("URL de l'image : " + selectedImgURL)
        console.log("Date création : " + selectedCreationDate)
    }
    // FONCTION POUR SUPPRIMER UN ARTWORK SUR FIREBASE
    const removeUserData = (titleToRemove) => {
        remove(refDb(db, `images/${titleToRemove}`), {
            id,
            title,
            imgURL,
            creationDate
        })
    };
    const handleRemove = (titleToRemove) => {
        removeUserData(titleToRemove)
        console.log(titleToRemove + " a bien été supprimé !");
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
                Ajouter/Modifier un Artwork
            </h1>
            <form>
                <TextField
                    id="id"
                    label="ID"
                    // disabled={true}
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
                {/*SELECTION DES TYPES/STYLES*/}
                <div className="flex w-full font-[Alexandria]">
                    <button
                        className={`${selectedButton.includes("portrait") ? "bg-yellow-500" : ""} bg-gray-500 w-1/5 mr-1 border text-white text-lg cursor-pointer rounded-xl px-5 py-2 flex justify-center items-center my-5`}
                        value={"portrait"}
                        onClick={(e) => addType(e)}>
                        Portrait
                    </button>
                    <button
                        className={`${selectedButton.includes("paysages") ? "bg-red-500" : ""} bg-gray-500 w-1/5 mr-1 border text-white text-lg cursor-pointer rounded-xl px-5 py-2 flex justify-center items-center my-5`}
                        value={"paysages"}
                        onClick={(e) => addType(e)}>
                        Paysages
                    </button>
                    <button
                        className={`${selectedButton.includes("dessin") ? "bg-green-500" : ""} bg-gray-500 w-1/5 mr-1 border text-white text-lg cursor-pointer rounded-xl px-5 py-2 flex justify-center items-center my-5`}
                        value={"dessin"}
                        onClick={(e) => addType(e)}>
                        Dessin
                    </button>
                    <button
                        className={`${selectedButton.includes("realPeople") ? "bg-green-500" : ""} bg-gray-500 w-1/5 mr-1 border text-white text-lg cursor-pointer rounded-xl px-5 py-2 flex justify-center items-center my-5`}
                        value={"realPeople"}
                        onClick={(e) => addType(e)}>
                        Real People
                    </button>
                    <button
                        className={`${selectedButton.includes("concept") ? "bg-green-500" : ""} bg-gray-500 w-1/5 mr-1 border text-white text-lg cursor-pointer rounded-xl px-5 py-2 flex justify-center items-center my-5`}
                        value={"concept"}
                        onClick={(e) => addType(e)}>
                        Concept
                    </button>
                    <button
                        className={`${selectedButton.includes("animal") ? "bg-green-500" : ""} bg-gray-500 w-1/5 mr-1 border text-white text-lg cursor-pointer rounded-xl px-5 py-2 flex justify-center items-center my-5`}
                        value={"animal"}
                        onClick={(e) => addType(e)}>
                        Animal
                    </button>
                    <button
                        className={`${selectedButton.includes("funny") ? "bg-green-500" : ""} bg-gray-500 w-1/5 mr-1 border text-white text-lg cursor-pointer rounded-xl px-5 py-2 flex justify-center items-center my-5`}
                        value={"funny"}
                        onClick={(e) => addType(e)}>
                        Funny
                    </button>
                </div>

            </form>


            {/*PARTIE PHOTO*/}
            <h1 className="mt-10 text-gray-700 text-2xl font-bold mb-3">
                Ajouter une photo
            </h1>

            <div className="h-[100px] w-1/2 flex flex-col justify-evenly items-center bg-gray-700 rounded-xl p-5 mb-5">
                <input
                    id="inputTag"
                    type="file"
                    onChange={(event) => {
                        setImageUpload(event.target.files[0]);
                    }}
                />
            </div>

            <div className="flex flex-col w-1/2 justify-between items-center">
                <button
                    className={`${imgURL ? "hidden" : "bg-gray-700"} w-1/5 border text-white text-xl cursor-pointer rounded-xl px-5 py-2 flex justify-center my-5`}
                    onClick={handleSubmit}>
                    Valider URL
                </button>
                <div className="mb-5">
                    {IDToModify
                        ? <button
                            className={`border bg-gray-500 text-white text-xl cursor-pointer rounded px-5 py-2 flex justify-center my-5`}
                            onClick={handleUpdate}>
                            Updater Artwork
                        </button>
                        : ""}
                </div>

                <span
                    className={`${titleToModify ? "block" : "hidden"} text-center bg-green-600 p-3 rounded-xl text-xl mb-10`}>
                    Artwork à modifier sélectionné : <br/>
                    <strong>
                    {titleToModify}
                </strong>
                </span>
            </div>

            {title
                ? <button
                    className="border bg-[crimson] text-white text-xl cursor-pointer rounded px-5 py-2 flex justify-center my-5"
                    onClick={writeUserData}>
                    Ajouter Artwork
                </button>
                : ""}

            {picPreview}

            {/*APERCU DE LA LISTE DES ARTWORKS*/}
            <div className="hidden md:block w-5/6">
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
                        <div className="inline-block min-w-full h-screen py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900 sm:pl-6 cursor-pointer">
                                            ID
                                        </th>
                                        <th scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900 sm:pl-6 cursor-pointer">
                                            Date création
                                        </th>
                                        <th scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900 sm:pl-6 cursor-pointer">
                                            New
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-base font-semibold text-gray-900 cursor-pointer">
                                            Titre
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-base font-semibold text-gray-900 cursor-pointer">
                                            Types
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-base font-semibold text-gray-900 cursor-pointer">
                                            URL Image
                                        </th>

                                    </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                    {artworks
                                        .sort((a, b) => b.id - a.id)
                                        .map((artwork, index) => (
                                            <tr key={index} className={`
                                            ${index % 2 === 0 ? undefined : 'bg-[#CEEAF3]'}`}>
                                                <td className={`${selectedRowId === artwork.id ? "bg-green-600 text-[#FFFFFF]" : ""} whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6`}>
                                                    {/*{artwork.id.length > 5 ? artwork.id.substring(0, 5) + "..." : artwork.id}*/}
                                                    {artwork.id}
                                                </td>
                                                <td className={`${selectedRowId === artwork.id ? "bg-green-600 text-[#FFFFFF]" : ""} whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6`}>
                                                    {/*{artwork.id.length > 5 ? artwork.id.substring(0, 5) + "..." : artwork.id}*/}
                                                    {artwork.creationDate === undefined || artwork.creationDate === 0
                                                        ? (<div className="w-4 h-4 rounded-full bg-red-600"></div>)
                                                        : new Date(artwork.creationDate).toLocaleDateString('fr-FR', {
                                                            year: 'numeric',
                                                            month: 'numeric',
                                                            day: 'numeric'
                                                        })}
                                                </td>

                                                {/*soonNotNew = fonction pour créer un effet d'urgence à moins de 30min de la fin du statut "new"*/}
                                                <td className={`${soonNotNew(artwork?.creationDate) ? "" : "text-red-600 animate-pulse font-bold"} ${selectedRowId === artwork.id ? "bg-green-600 text-[#FFFFFF]" : ""} whitespace-nowrap px-3 py-4 text-sm text-gray-500 overflow-hidden`}>
                                                    {isNew(artwork?.creationDate)
                                                        ? notNewAnymore(
                                                            (artwork?.creationDate),
                                                        )
                                                        : "Pas new"}
                                                </td>

                                                <td className={`${selectedRowId === artwork.id ? "bg-green-600 text-[#FFFFFF] underline" : ""} whitespace-nowrap px-3 py-4 text-sm text-gray-500 overflow-hidden cursor-pointer`}
                                                    onClick={popUpChangeTitle}>
                                                    {artwork.title}
                                                </td>
                                                <td className={`${selectedRowId === artwork.id ? "bg-green-600 text-[#FFFFFF] underline" : ""} whitespace-nowrap px-3 py-4 text-sm text-gray-500 overflow-hidden cursor-pointer`}>
                                                    {artwork.type.map((type, index) =>
                                                            (type === "portrait"
                                                                ? <span key={index} className="bg-yellow-500 px-1 py-1 text-white font-bold rounded-xl">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                                                                : type !== "paysages"
                                                                    ? <span key={index} className="px-1">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                                                            :<span key={index} className="bg-red-500 px-1 py-1 text-white font-bold rounded-xl">{type.charAt(0).toUpperCase() + type.slice(1)}</span>)
                                                    )}
                                                </td>
                                                <td className={`${selectedRowId === artwork.id ? "bg-green-600 text-[#FFFFFF]" : ""} whitespace-nowrap px-3 py-4 text-sm text-gray-500 overflow-hidden`}>
                                                    {/*{artwork.imgURL.length > 40 ? artwork.imgURL.substring(0, 40) + "..." : artwork.imgURL}*/}
                                                    {artwork.imgURL}
                                                </td>
                                                <td className={`${selectedRowId === artwork.id ? "bg-green-600 text-[#FFFFFF]" : ""} relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6`}>
                                                    <div
                                                        className={`${selectedRowId === artwork.id ? "bg-green-600 text-[#FFFFFF]" : ""} text-green-700 hover:text-[#FFC2C4] cursor-pointer`}
                                                        onClick={() => handleSelect(artwork.id, artwork.title, artwork.imgURL, artwork?.creationDate)}>
                                                        Select
                                                    </div>
                                                </td>
                                                <td className={`${selectedRowId === artwork.id ? "bg-green-600 text-[#FFFFFF]" : ""} relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6`}>
                                                    <div
                                                        className={`${selectedRowId === artwork.id ? "bg-green-600 text-[#FFFFFF]" : ""} text-[#FF585D] hover:text-[#FFC2C4] cursor-pointer`}
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
