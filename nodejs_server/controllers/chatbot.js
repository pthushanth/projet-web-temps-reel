const appointment = require('../models/appointment.service');
import io from "socket.io-client";
const appointmentService = require("../src/http/appointment/appointment.service");

async function getDates() {
    let currentWeekAppointments =
        await appointmentService.getCurrentWeekAppointments(1);
    let freeDates = {
        "Tout-Terrain": getNextWeekDays(1),
        Sportif: getNextWeekDays(1),
        Routier: getNextWeekDays(1),
        Entretien: getNextWeekDays(1),
    };
    freeDates = removeTakenSlots(currentWeekAppointments, freeDates);
    let emptySlots = false;
    Object.keys(freeDates).forEach((key) => {
        if (freeDates[key].length === 0) {
        emptySlots = true;
        freeDates[key] = getNextWeekDays(2);
        }
    });
    if (emptySlots) {
        console.log("there is empty Date for current week")
        currentWeekAppointments =
        await appointmentService.getCurrentWeekAppointments(2);
        freeDates = removeTakenSlots(currentWeekAppointments, freeDates);
    }
    return freeDates;
    }

module.exports = (io, socket) => {
    const initQuestion = ()=>{
        socket.emit('chatbot', {
            message: 'what is your question?',
            type: 'text'
        });
    };
    const responseQuestions = (id) => {
        if (id === 1) {
            socket.emit("chatbot:questions", [
            { id: 11, text: "Date du dernier entretien de la moto" },
            ]);
        } else if (id === 12) {
            getDates().then((slots) => {
            const propositions = slots["Entretien"].map((date) => {
                return {
                id: "overhaul_apt_" + date,
                text: date,
                };
            });
            socket.emit("chatbot:questions", propositions);
            });
        } else if (id === 13) {
            socket.emit("chatbot:questions", [
            {
                id: 1300,
                text: "le nombre de kilomètres parcourus depuis le dernier entretien",
            },
            ]);
        } else if (id === 132) {
            socket.emit("chatbot:questions", [
            {
                id: 12,
                text: "réviser le véhicule",
            },
            {
                id: 1320,
                text: "ne pas réviser le véhicule",
            },
            ]);
        } else if (id === 2) {
            socket.emit("chatbot:questions", types_usage);
        } else if (id === 21 || id === 22 || id === 23) {
            getfreeDates().then((slots) => {
            let type = "";
            switch (id) {
                case 21:
                type = "Routier";
                break;
                case 22:
                    type = "Tout-Terrain";
                    break;
                case 23:
                    type = "Sportif";
                    break;
            }
            const propositions = slots[type].map((date) => {
                return {
                id: "information_apt_" + type + "_" + date,
                text: date,
                };
            });
            socket.emit("chatbot:questions", propositions);
            });
        } else if (id === 3) {
            socket.emit("chatbot:questions", infos_contact);
        } else if (id === 31) {
            setTimeout(() => {
            socket.emit("chatbot:reponses:contact", {
                resp: resp_contact[0],
                text: types_aide.slice(-1),
            });
            }, 1000);
        } else if (id === 32) {
            setTimeout(() => {
            socket.emit("chatbot:reponses:contact", {
                resp: resp_contact[1],
                text: types_aide.slice(-1),
            });
            }, 1000);
        }
        else if (id && typeof(id) == "string" && id.includes("information_apt")) {
            appointment.create({
            type: id.split("_")[2],
            date: id.split("_")[3],
            });
            socket.emit("chatbot:close", {
            id: 01,
            text: "Votre rendez-vous a bien été pris.",
            });
        } else if (id && typeof(id) == "string" &&id.includes("overhaul_apt")) {
            appointment.create({
            type: "Entretien",
            date: id.split("_")[2],
            });
            socket.emit("chatbot:close", {
            id: 01,
            text: "Votre rendez-vous a bien été pris.",
            });
        } else {
            socket.emit("chatbot:close", {
            id: 01,
            text: "Merci et au revoir !",
            });
        }
        };
        socket.on("chatbot:questions", initQuestions);
        socket.on("chatbot:reponses", responseQuestions);
    };
    
    const types_aide = [
        { id: 1, text: "Vérifier l’entretien de son véhicule" },
        { id: 2, text: "Informations sur les véhicules" },
        { id: 3, text: "Informations de contact" },
        { id: 0, text: "Arrêter le workflow" },
    ];
    
    const types_usage = [
        { id: 21, text: "Usage routier" },
        { id: 22, text: "Usage tout-terrain" },
        { id: 23, text: "Usage sportif" },
    ];
    
    const infos_contact = [
        { id: 31, text: "Par Email" },
        { id: 32, text: "Par Téléphone" },
    ];
    
    const resp_contact = [
        { id: 41, text: "contact-test@gmail.com" },
        { id: 42, text: "+33 (0) 1 12 23 34 45" },
    ];
