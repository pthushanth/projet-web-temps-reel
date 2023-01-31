import { useState } from "react";

function FormNombrekm(props) {
    const [nombreKm, setnombreKm] = useState(0);

    function handleChangeNumber(e) {
    setnombreKm(e.target.value);
    }

    function GreatherThanTenThousand(number) {
        let obj;
        const numberCompare = 10000;
        if (number >= numberCompare) {
        obj = {
            id: 12,
            text: `${nombreKm} - nombre de kilometre est supérieur ou égale à 10 000KM`,
        };
        } else {
            obj = {
            id: 1302,
            text: `${nombreKm} - nombre de kilometre est inférieur à 10 000KM`,
        };
        }
    return obj;
    }

    function handleSubmitNumber(e) {
        e.preventDefault();
        const obj = GreatherThanTenThousand(nombreKm);
        setnombreKm(0);
        props.returnFormObj(obj);
    } 

  return (
    <form onSubmit={handleSubmitNumber}>
        <input type="number" value={nombreKm} onChange={handleChangeNumber} />
        <input disabled={!nombreKm} type="submit" value="Submit" />
    </form>
  );
}

export default FormNombrekm;