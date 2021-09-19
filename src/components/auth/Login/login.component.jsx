import "./login.style.css";
import ModalComponent from "../../modal.component";
import * as Yup from "yup";
import { postData } from "../../../Api/fetchData";
import { Field,Form, Formik } from "formik";
import React from "react";
import {useDispatch} from "react-redux"
import { login } from "../../../redux/actions/authAction";

const Login = () => {
  const SchemaValidation = Yup.object().shape({
    username: Yup.string()
      .min(2, "trop court!")
      .max(50, "trop long!")
      .required("Ce champ est requis !"),
    password: Yup.string()
      .min(2, "trop court!")
      .max(50, "trop long!")
      .required("Ce champ est requis !"),
  });


  const dispatch = useDispatch()
  const submitForm = (values) => {
    postData("user/login", values).then((res) => {
      console.log(values);
    });

    // console.log(values);

    dispatch(login(values))


  };

  return (
    <>
      <ModalComponent
        type="login"
        title={"Connexion"}
        content={
          <>
            <Formik
              validationSchema={SchemaValidation}
              onSubmit={(e) => submitForm(e)}
              initialValues={{
                username: "",
                password: "",
              }}
            >
              {({ handleBlur, touched, errors }) => (
                <Form>
                  <div className="inputGroup">
                    <label className="form-label">Login</label>
                    <Field
                      required
                      onBlur={handleBlur}
                      className="form-control form-input"
                      name="username"
                      type="text"
                      placeholder="Saisissez votre pseudo"
                    />
                    {errors.username && touched.username ? (
                      <div className="text-danger">{errors.username}</div>
                    ) : null}
                  </div>

                  <div className="inputGroup">
                    <label className="form-label">Mot de passe</label>
                    <Field
                      required
                      onBlur={handleBlur}
                      className="form-control form-input"
                      name="password"
                      type="password"
                      placeholder="Mot de passe"
                    />
                    {errors.password && touched.password ? (
                      <div className="text-danger">{errors.password}</div>
                    ) : null}
                  </div>

                  <div className="btn-submit-container">
                    <button
                      className="btn-submit form-control form-input"
                      type="submit"
                    >
                      Se connecter
                    </button>
                  </div>
                  <div className="form-footer">
                    Mot de pass oublié ? <a href="#">Cliquez ici</a>
                  </div>
                </Form>
              )}
            </Formik>
          </>
        }
      />
    </>
  );
};

export default Login;























// import "./login.style.css";
// import ModalComponent from "../modal.component";
// import { Button, Form } from "react-bootstrap";
// import React, {useState} from 'react'
// import { useHistory } from "react-router";
// import { useDispatch } from "react-redux";
// import { login } from "../../../redux/actions/authAction";
// import axios from "axios";


// const Login = () => {

//   const history = useHistory()
//   const dispatch = useDispatch()
//   const [userLogin, setUserLogin] = useState({
//     username: '',
//     password: ''
//   })



//   const submit = async(e) =>{
//     e.preventDefault()
//     // dispatch(login(userLogin))

//     console.log("iiiiiiiiii");

//     // console.log("uuuuuuuu", userLogin);
//     const res = await axios.post(`https://babaata.eviltech.org/api/user/login`, userLogin,{
//       headers: {
//         accept: "application/json",
//         "content-type": "application/json",
//       }
//     })

//     console.log(res);

//   }

//   return (
//     <>
//       <ModalComponent
//         type="login"
//         title={"Connexion"}
//         content={
//           <>
//             <Form onSubmit={(e)=> submit(e)}>
//               <Form.Group className="mb-3" controlId="email">
//                 <Form.Label>Pseudo</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Saisissez votre pseudo"
//                   value={userLogin.username}
//                   onChange={(e)=> setUserLogin({...userLogin, username: e.target.value})}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="password">
//                 <Form.Label>Mot de passe</Form.Label>
//                 <Form.Control type="password" placeholder="Mot de passe" value={userLogin.password} onChange={(e)=> setUserLogin({...userLogin, password: e.target.value})}/>
//               </Form.Group>
//               <div className="btn-submit-container">
//                 <Button
//                   className="btn-submit form-control"
//                   variant="primary"
//                   type="submit"
//                 >
//                   Se connecter
//                 </Button>
//               </div>
//             </Form>
//             <div className="form-footer">
//               Mot de pass oublié ? <a href="#">Cliquez ici</a>
//             </div>
//           </>
//         }
//       />
//     </>
//   );
// };

// export default Login;

