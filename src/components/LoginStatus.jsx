import { useState } from "react";

// const LoginStatus = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const handleLogin = () => {
//         setIsLoggedIn(true);
//     };

//     const handleLogout = () => {
//         setIsLoggedIn(false);
//     };

//     return (
//         <div>
//             {isLoggedIn ? (
//                 <>
//                     <h2>Welcome back!</h2>
//                     <button onClick={handleLogout}>Logout</button>
//                 </>
//             ) : (
//                 <>
//                     <h2>Please log in</h2>
//                     <button onClick={handleLogin}>Login</button>
//                 </>
//             )}
//         </div>
//     );
// };

// export default LoginStatus;


const OnlineStatus = () => {
    const [isOnline, setIsOnline] = useState(false);

    const handleLogin = () => {
        setIsOnline(true);
    };

    const handleLogout = () => {
        setIsOnline(false);
    };

    return (
        <div>
            {isOnline ? (
                <>
                    <h2>You are online!</h2>
                    <button onClick={handleLogout}>Go Offline</button>
                </>
            ) : (
                <>
                    <h2>You are offline</h2>
                    <button onClick={handleLogin}>Go Online</button>
                </>
            )}
        </div>
    );
};

export default OnlineStatus;