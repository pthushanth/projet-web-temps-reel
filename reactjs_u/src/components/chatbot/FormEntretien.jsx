import { useState } from "react";

function FormEntretien(props) {
    const [dateEntretien, setDateEntretien] = useState("");

    function handleChangeDate(e) {
    setDateEntretien(e.target.value);
    }

    function OlderOneYear(date) {
        let obj;
        // Calcul date
        const dateNow1yearAgo = 1000 * 60 * 60 * 24 * 365 * 1;
        if (new Date(date).getTime() < new Date().getTime() - dateNow1yearAgo) {
        obj = {
            id: 12,
            text: `${date} - date du dernier entretien est supérieur à un an`,
        };
        } else {
        obj = {
        id: 13,
            text: `${date} - date du dernier entretien est inférieur à un an`,
        };
    }
    return obj;
    }

    function handleSubmitDate(e) {
        e.preventDefault();
        const obj = OlderOneYear(dateEntretien);
        setDateEntretien("");
        props.returnFormObj(obj);
    }
    return (
        <form onSubmit={handleSubmitDate}>
            <input type="date" value={dateEntretien} onChange={handleChangeDate} />
            <input disabled={!dateEntretien} type="submit" value="Submit" />
        </form>
    );
}

export default FormEntretien;