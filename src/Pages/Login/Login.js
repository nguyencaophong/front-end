
import './Login.scss';
import classnames from 'classnames';
import { useState, useReducer } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
const initId = {
    id: ''
}

const ID_SIGN_UP = 'id';

const setId = payload => {
    return {
        type: ID_SIGN_UP,
        payload
    }
}

const reducerId = (state, action) => {
    switch (action.type) {
        case ID_SIGN_UP:
            return {
                id: action.payload
            }
    }
    return state;
}

const initName = {
    name: ''
}

const NAME_SIGN_UP = 'name';

const setName = payload => {
    return {
        type: NAME_SIGN_UP,
        payload
    }
}

const reducerName = (state, action) => {
    switch (action.type) {
        case NAME_SIGN_UP:
            return {
                name: action.payload
            }
    }
    return state;
}


const initPass = {
    pass: ''
}

const PASS_SIGN_UP = 'pass';

const setPass = payload => {
    return {
        type: PASS_SIGN_UP,
        payload
    }
}

const reducerPass = (state, action) => {
    switch (action.type) {
        case PASS_SIGN_UP:
            return {
                pass: action.payload
            }
    }
    return state;
}


const initEmail = {
    email: ''
}

const EMAIL_SIGN_UP = 'pass';

const setEmail = payload => {
    return {
        type: EMAIL_SIGN_UP,
        payload
    }
}

const reducerEmail = (state, action) => {
    switch (action.type) {
        case EMAIL_SIGN_UP:
            return {
                email: action.payload
            }
    }
    return state;
}


const ID_LOG_IN = 'id';
const initIdLogIn = {
    id: ''
}

const setIdLogIn = payload => { 
    return{
        type: ID_LOG_IN,
        payload
    }
}

const reducerIdLogIn = (state, action) => {
    switch(action.type){
        case ID_LOG_IN:
            return{
                id: action.payload
            }
    }
    return state;
}


const PASS_LOG_IN ='pass'

const initPassLogIn = {
    pass: ''
}

const setPassLogIn = payload => { 
    return{
        type: PASS_LOG_IN,
        payload
    }
}

const reducerPassLogIn = (state, action) => {
    switch(action.type){
        case PASS_LOG_IN:
            return{
                pass: action.payload
            }
    }
    return state;
}



function Login() {

    const [activeModal, setActiveModal] = useState(true);
    const [idSignUp, dispatchId] = useReducer(reducerId, initId);
    const [nameSignUp, dispatchName] = useReducer(reducerName, initName);
    const [passSignUp, dispatchPass] = useReducer(reducerPass, initPass);
    const [emailSignUp, dispatchEmail] = useReducer(reducerEmail, initEmail);
    const [idLogIn, dispatchIdLogIn] = useReducer(reducerIdLogIn, initIdLogIn);
    const [passLogIn, dispatchPassLogIn] = useReducer(reducerPassLogIn, initPassLogIn);
    const [imgSignUp, setImgSignUp] = useState([]);
    const handleActiveModal = () => {
        setActiveModal(!activeModal);
    }

    if (Cookies.get('isLoginIn') != null) {
        window.location = 'https://auth-app34.herokuapp.com/user';
    }


    const [errorLogIn, setErrorLogIn] = useState({
        bool: false,
        message: ''
    });

    const login = () => {
    
        let urlencoded = new Object();
        urlencoded = {
            'id': idLogIn.id,
            'password': passLogIn.pass
        }
        let requestOption = {
            method: 'post',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(urlencoded)
        };
        
        let URL = "https://backend-authapp34.herokuapp.com/login";
        
        fetch(URL,requestOption)
            .then(
                (res) => {
                    if(res.status == 200){
                        return res.json();
                    }
                    if(res.status == 500 || res.status == 404){
                    
                        const check = async () => {
                            const mess = await res.json();
                            setErrorLogIn({
                                bool: true,
                                message: mess.errorMeassage
                            });
                        }
                        check();
                    }
                    
                    throw Error('Invalid');
                }

            )
            .then(
                (result) => { 
                    Cookies.set('isLoginIn', result.isLoggedIn
                    );
                    window.location.reload();
                }
            )
            .catch(err => console.log(err));
    }

    const [errorSigin, setErrorSignin] = useState({
        bool: false,
        message: ''
    });

    const signup = () => { 
        let img = document.querySelector('input[type="file"]').files[0];
        const formdata = new FormData();
        formdata.append('id', idSignUp.id);
        formdata.append('name',nameSignUp.name);
        formdata.append('email', emailSignUp.email);
        formdata.append('password', passSignUp.pass);
        formdata.append('emoji', img);

        const URL = 'https://backend-authapp34.herokuapp.com/signup';

        axios({
            method: 'post',
            url : URL,
            data : formdata,
            validateStatus : (status) => {
              return true; // I'm always returning true, you may want to do it depending on the status received
            }
          })
            .then(
                (res) => { 
                    
                    if(res.status ==200){
                        return res.data;
                    }
                    if(res.status == 500 || res.status == 404){
                        // return res.data.errorMeassage
                        return setErrorSignin({
                            bool: true,
                            message: res.data.errorMeassage
                        });
                    }
                    throw Error("invalid");
                }
            )
            .then(
                (result) => {
                    console.log(result);
                }
            )
            .catch(err => console.log(err));
        
    }


    const handleUpLoadImg = (e) => {
        let img = e.target.files[0];
        setImgSignUp({
            img: URL.createObjectURL(img)
        });
    }


    return (
        <>
            <div className='main' id='main'>
                <div id='login'>
                    <div className={classnames('log-in-error', { 'deactive': !errorLogIn.bool })}>
                            {errorLogIn.message}
                    </div>
                    <div id='log-in-input'>
                        <input value={idLogIn.id} onChange={
                                (e) => {
                                    setErrorLogIn({
                                        bool: false,
                                        message: ''
                                    })
                                    dispatchIdLogIn(setIdLogIn(e.target.value));
                                }
                            } placeholder='id' type='text' name = 'id' className='input-login' id='input-login' />
                    </div>

                    <div id='log-in-input'>
                        <input value={passLogIn.pass} onChange={
                                (e) => {
                                    setErrorLogIn({
                                        bool: false,
                                        message: ''
                                    })
                                    dispatchPassLogIn(setPassLogIn(e.target.value));
                                }
                            } placeholder='password' type='password' name = 'password' className='input-login' id='input-login' />
                    </div>
                    <button className='button-login' id='button-log-in' onClick = {login}>
                        login
                    </button>
                    <button onClick={handleActiveModal} className='button-login' id='button-sign-up'>Sign Up</button>
                </div>
            </div>
            <div className={classnames('modal', { 'deactive': activeModal })} >
                <div className='modal-container'>
                    <div id='sign-up'>
                        <div className={classnames('sign-in-error', { 'deactive': !errorSigin.bool })}>
                                {errorSigin.message}
                        </div>
                        <div id='sign-up-icon' onClick={handleActiveModal}>
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                        <div className='title-sign-up'>
                            <div id='text-title-sign-up'>Sign Up</div>
                        </div>
                        <div className='input-sign-up'>
                            <input value={idSignUp.id} onChange={(e) => {
                                setErrorSignin({
                                    bool: false,
                                    message: ''
                                })
                                dispatchId(setId(e.target.value));
                            }} type='text' placeholder='id' id='id' className='text-sign-up' />
                        </div>

                        <div className='input-sign-up'>
                            <input value={passSignUp.pass} onChange={
                                (e) => {
                                    setErrorSignin({
                                        bool: false,
                                        message: ''
                                    })
                                    dispatchPass(setPass(e.target.value));
                                }
                            } type='password' placeholder='password' id='password' className='text-sign-up' />
                        </div>

                        <div className='input-sign-up'>
                            <input value={nameSignUp.name} onChange={
                                (e) => {
                                    setErrorSignin({
                                        bool: false,
                                        message: ''
                                    })
                                    dispatchName(setName(e.target.value));
                                }
                            } type='text' placeholder='name' name='name' id='name' className='text-sign-up' />
                        </div>

                        <div className='input-sign-up'>
                            <input value={emailSignUp.email} onChange={
                                (e) => {
                                    setErrorSignin({
                                        bool: false,
                                        message: ''
                                    })
                                    dispatchEmail(setEmail(e.target.value));
                                }} type='email' placeholder='email' id='email' className='text-sign-up' />
                        </div>

                        <div className='input-sign-up'>
                            <input type='file' placeholder='email' name='emoji' id='emoji' className='text-sign-up' onChange  = {
                                (e) => {
                                setErrorSignin({
                                    bool: false,
                                    message: ''
                                })
                                handleUpLoadImg(e) } }/>
                        </div>

                        <div className='button-sign-up'>
                            <button id='button-sign-up' onClick={signup}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default Login;
