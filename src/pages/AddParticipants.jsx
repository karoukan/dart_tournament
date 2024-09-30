import React, { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddParticipants = ({ addPlayer }) => {
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            addPlayer(name);
            setName("");
            toast.success(`${name} a été ajouté avec succès !`);
        } else {
            toast.error("Veuillez entrer un nom valide.");
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Ajouter un participant</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Nom du participant"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Ajouter un participant
                </button>
            </form>
        </div>
    );
};

export default AddParticipants;
