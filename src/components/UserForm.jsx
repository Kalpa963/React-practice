// import { useState } from "react";

// const UserForm = () => {
//     const [name, setName] = useState("");

//     const handleChange = (event) => {
//         setName(event.target.value);
//     };

//     return (
//         <div>
//             <h2>Name: {name}</h2>

//             <input
//                 type="text"
//                 value={name}
//                 onChange={handleChange}
//                 placeholder="Enter your name"
//             />
//         </div>
//     );
// };

// export default UserForm;


import { useState } from "react";

const UserForm = () => {
    const [input, setInput] = useState("");
    const [name, setName] = useState("");

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            setName(input);
        }
    };

    return (
        <div>
            <h2>Name: {name}</h2>

            <input
                type="text"
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter your name"
            />
        </div>
    );
};

export default UserForm;