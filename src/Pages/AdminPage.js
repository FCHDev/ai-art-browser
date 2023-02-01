import React, {useState} from "react";
import {Link} from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {AiFillCaretLeft} from "react-icons/ai";

import {set} from "firebase/database";
import {refDb} from "../service/firebase-config";
import {db} from "../service/firebase-config";

const AdminPage = ({artworks, totalArtwork}) => {
    /// UPLOAD IMAGES
    const [imageUpload, setImageUpload] = useState(null);
    const [picPreview, setPicPreview] = useState();

    // const uploadImage = () => {
    //     if (imageUpload == null) return;
    //     const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    //     uploadBytes(imageRef, imageUpload)
    //         .then((snapshot) => {
    //             getDownloadURL(snapshot.ref).then((url) => {
    //                 setImgURL(url);
    //                 setPicPreview(
    //                     <div className="artwork-preview">
    //                         <img className="rounded-xl" src={url} alt="artwork"/>
    //                     </div>
    //                 );
    //             });
    //             // alert("Image uploaded");
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // };


    // STATES
    const creationDate = new Date().getTime()
    const id = imgCount()
    const [imgURL, setImgURL] = useState("");
    const [title, setTitle] = useState("")


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

    function imgCount() {
        const storedImg = JSON.parse(localStorage.getItem('localArtworks'));
        return storedImg.length
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
    const idItem = 112
    const path = "A futuristic knight"
    const handleUpdate = () => {
        set(refDb(db, `/${path}`), {
            id: idItem,
            imgURL: "/uploads/FuturisticKnight.jpg",
            title: path
        });
        console.log("Update done !")
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
                {/*<label className="border bg-white text-gray-700 cursor-pointer rounded px-3 py-1 flex justify-center"*/}
                {/*       htmlFor="inputButtonTag">*/}
                {/*    Upload Image*/}
                {/*    <input id="inputButtonTag" type="button" onClick={uploadImage}/>{" "}*/}
                {/*</label>*/}
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

        </div>
    );
};

export default AdminPage;
