import { useState } from "react"

function ColorPicker() {
    const [color, setColour] = useState("#FFFFFF")

    const handleColourChange = (e) => {
        setColour(e.target.value)
    }
    return (
        <div className="colour-pic-con">
            <h1>Color Picker</h1>
            <div className="colour-dis" style={{ backgroundColor: color }}>
                <p>Selected Color: {color}</p>
            </div>
            <lebel>Select a Color</lebel>
            <input className="inpect" type="color" value={color} onChange={handleColourChange} />
        </div>
    )
}

export default ColorPicker