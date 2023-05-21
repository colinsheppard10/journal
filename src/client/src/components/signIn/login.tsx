
// import { useContext } from "react";
// import { LoginStatus, UserContext } from "../context/userContext";
// import { getUser } from "../api/user";

// export const GOOGLE_CLIENT_ID ='x'
// export const GOOGLE_CLIENT_SECRET="x";

// export const refreshGoogleToken = async () => {
//   try {
//     const refreshToken = localStorage.getItem("refreshToken");
//     if (refreshToken) {
//       let response = await fetch("https://www.googleapis.com/oauth2/v4/token", {
//         method: "POST",
//         body: JSON.stringify({
//           client_id: GOOGLE_CLIENT_ID,
//           client_secret: GOOGLE_CLIENT_SECRET,
//           refresh_token: refreshToken,
//           grant_type: "refresh_token",
//         }),
//       });
//       let json = await response.json();
//       localStorage.setItem('journalAuthTokenGoogle', json.id_token);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

// const Login = () => {
//   const userContext = useContext(UserContext);

//   const onSuccess = async (response: any) => {
//     const { accessToken, tokenId } = response;
//     // store access token in local storage
//     localStorage.setItem("journalAuthTokenGoogle", tokenId);
//     localStorage.setItem("refreshToken", accessToken);
//     // refresh token every hour
    
//     try {
//       let response = await fetch(
//         `https://www.googleapis.com/oauth2/v4/token?client_id=${GOOGLE_CLIENT_ID}&client_secret=${GOOGLE_CLIENT_SECRET}&refresh_token=${accessToken}&grant_type=refresh_token`
//       );
//       let json = await response.json();
//       localStorage.setItem('journalAuthTokenGoogle', json.id_token);
//       let user = await getUser();
//       if (user?.email) {
//         userContext.updateUserContext({
//           loginStatus: LoginStatus.LOGGED_IN,
//           ...user,
//         });
//       } else {
//         userContext.updateUserContext({
//           loginStatus: LoginStatus.LOGGED_IN,
//         });
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <button onClick={onSuccess}>
//       Login with Google
//     </button>
//   );
// };


const Login = () => <></>
export default Login;