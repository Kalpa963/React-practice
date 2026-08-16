// import { useState } from "react";

// const OrderForm = () => {
//     const [name, setName] = useState("Guest");
//     const [quantity, setQuantity] = useState(1);
//     const [instructions, setInstructions] = useState("");
//     const [comment, setComment] = useState("");
//     const [payment, setPayment] = useState("Pick Up");

//     return (
//         <div>
//             {/* Name */}
//             <input
//                 type="text"
//                 value={name}
//                 onChange={(event) => setName(event.target.value)}
//             />

//             <h2>Name: {name}</h2>

//             {/* Quantity */}
//             <input
//                 type="number"
//                 value={quantity}
//                 onChange={(event) => setQuantity(event.target.value)}
//             />

//             <h2>Quantity: {quantity}</h2>

//             {/* Delivery Instructions */}
//             <textarea
//                 value={instructions}
//                 onChange={(event) => setInstructions(event.target.value)}
//                 placeholder="Enter delivery instructions"
//             />

//             {/* Comment */}
//             <h2>Comment:</h2>

//             <select
//                 value={comment}
//                 onChange={(event) => setComment(event.target.value)}
//             >
//                 <option value="">Select an option</option>
//                 <option value="Good">Good</option>
//                 <option value="Average">Average</option>
//                 <option value="Bad">Bad</option>
//             </select>

//             {/* Payment */}
//             <h2>Payment:</h2>

//             <label>
//                 <input
//                     type="radio"
//                     value="Pick Up"
//                     checked={payment === "Pick Up"}
//                     onChange={(event) => setPayment(event.target.value)}
//                 />
//                 Pick Up
//             </label>

//             <br />

//             <label>
//                 <input
//                     type="radio"
//                     value="Delivery"
//                     checked={payment === "Delivery"}
//                     onChange={(event) => setPayment(event.target.value)}
//                 />
//                 Delivery
//             </label>

//             <h2>Shipping: {payment}</h2>
//         </div>
//     );
// };

// export default OrderForm;

import { useState } from "react";

const OrderForm = () => {
    const [name, setName] = useState("Guest");
    const [quantity, setQuantity] = useState(1);
    const [instructions, setInstructions] = useState("");
    const [comment, setComment] = useState("");
    const [payment, setPayment] = useState("Pick Up");

    // NEW
    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Order submitted!");
        console.log({
            name,
            quantity,
            instructions,
            comment,
            payment,
        });
    };

    return (
        <div>
            {/* NEW */}
            <form onSubmit={handleSubmit}>

                {/* Name */}
                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />

                <h2>Name: {name}</h2>

                {/* Quantity */}
                <input
                    type="number"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                />

                <h2>Quantity: {quantity}</h2>

                {/* Delivery Instructions */}
                <textarea
                    value={instructions}
                    onChange={(event) => setInstructions(event.target.value)}
                    placeholder="Enter delivery instructions"
                />

                {/* Comment */}
                <h2>Comment:</h2>

                <select
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                >
                    <option value="">Select an option</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                    <option value="Bad">Bad</option>
                </select>

                {/* Payment */}
                <h2>Payment:</h2>

                <label>
                    <input
                        type="radio"
                        value="Pick Up"
                        checked={payment === "Pick Up"}
                        onChange={(event) => setPayment(event.target.value)}
                    />
                    Pick Up
                </label>

                <br />

                <label>
                    <input
                        type="radio"
                        value="Delivery"
                        checked={payment === "Delivery"}
                        onChange={(event) => setPayment(event.target.value)}
                    />
                    Delivery
                </label>

                <h2>Shipping: {payment}</h2>

                {/* NEW */}
                <button type="submit">Place Order</button>

                {/* NEW */}
            </form>
        </div>
    );
};

export default OrderForm;