// import React,{useState} from 'react';
// import { useNavigate } from 'react-router';
// import axios from 'axios';
// import './ForgotPassword.css';


// function ChangePassword(props) {
//     const [password, setpassword] = useState('');
//     const navigate = useNavigate();

//     const handlePasswordChange = (event) => {
//       setpassword(event.target.value);
//     };
//     const handleSubmit = async(event) => {
//       event.preventDefault();
//       try{
//         const response = await axios.post('http://localhost:8000/change_forget_password',{
//             email: props.email,
//             password:password
//         });
//         if(response.status===200){
//             alert(response.data);
//             navigate('/');
//         }
//       }catch(error){
//         console.error(error);
//       }
//     };
  
//     return (
//       <div className="page-container">
//         <img src={require("./login.gif")} alt="ForgotPassword GIF" className="forgotpassword-gif" />
//       <div className="forgot-password-box">
//         <h1>Enter your email and new Password</h1>
//         <form onSubmit={handleSubmit}>
//             <label>
//             Email:
//             <input type="email" value={email} onChange={handleEmailChange} />
//             </label>
//             <label>
//             Password:
//             <input type="password" value={password} onChange={handlePasswordChange} />
//             </label>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
  
  
// }

// export default ChangePassword;