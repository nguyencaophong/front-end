

import Cookies from 'js-cookie';
import { useState, useReducer } from 'react';
import './User.scss';
import axios from 'axios';
import classnames from 'classnames';

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

function User() {

    const [nameUser, dispatchName] = useReducer(reducerName, initName);
    const [passUser, dispatchPass] = useReducer(reducerPass, initPass);
    const [emailUser, dispatchEmail] = useReducer(reducerEmail, initEmail);
    const [imgSignUp, setImgSignUp] = useState([]);

    const [errorUser, errorUserForm] = useState({
        bool: false,
        message: ''
    });

    const changeInfor = () => { 
        let img = document.querySelector('input[type="file"]').files[0];
        const formdata = new FormData();
        formdata.append('id','peter123');
        formdata.append('name',nameUser.name);
        formdata.append('email', emailUser.email);
        formdata.append('password', passUser.pass);
        formdata.append('emoji', img);



        const URL = 'http://localhost:5000/account';

        axios({
            method: 'PUT',
            mode: 'cors',
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
                        return ({
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

    const handleLogOut = () => {
        Cookies.remove('isLoginIn');
        window.location = 'http://localhost:3000/login';
    }


    return (
        <div className='container-fluid' id='user'>
            <div id='infor-user' className=''>
                        <div className={classnames('infor-user-error', { 'deactive': !errorUser.bool })}>
                                {errorUser.message}
                        </div>
                        <div className='title-sign-up'>
                            <div id='text-title-sign-up'>Sign Up</div>
                        </div>
                        <div className='input-sign-up'>
                            <span>ID</span>
                        </div>

                        <div className='input-sign-up'>
                            <input value={passUser.pass} onChange={
                                (e) => {
                                    errorUserForm({
                                        bool: false,
                                        message: ''
                                    })
                                    dispatchPass(setPass(e.target.value));
                                }
                            } type='password' placeholder='password' id='password' className='text-sign-up' />
                        </div>

                        <div className='input-sign-up'>
                            <input value={nameUser.name} onChange={
                                (e) => {
                                    errorUserForm({
                                        bool: false,
                                        message: ''
                                    })
                                    dispatchName(setName(e.target.value));
                                }
                            } type='text' placeholder='name' name='name' id='name' className='text-sign-up' />
                        </div>

                        <div className='input-sign-up'>
                            <input value={emailUser.email} onChange={
                                (e) => {
                                    errorUserForm({
                                        bool: false,
                                        message: ''
                                    })
                                    dispatchEmail(setEmail(e.target.value));
                                }} type='email' placeholder='email' id='email' className='text-sign-up' />
                        </div>

                        <div className='input-sign-up'>
                            <input type='file' placeholder='email' name='emoji' id='emoji' className='text-sign-up' onChange  = {
                                (e) => {
                                errorUserForm({
                                    bool: false,
                                    message: ''
                                })
                                handleUpLoadImg(e) } }/>
                        </div>

                        <div className='conotainer w-12' id='button-user-information'>
                            <button id='button-save' onClick={changeInfor}>Lưu thay đổi </button>
                            <button id='button-delete' > Xóa tài khoản</button>
                            <button id='button-log-out' onClick={handleLogOut}>Đăng xuất</button>
                        </div>
                    </div>
            </div>
    )
}

export default User; 