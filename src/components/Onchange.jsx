import { useState } from "react";

function Onchange() {
    const [name, setName] = useState("Guest");

    function handleChange(event) {
        setName(event.target.value);
    }

    return (
        <div>
            <input value={name} onChange={handleChange} />
            <p>Name: {name}</p>
        </div>
    )
}

export default Onchange;