import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
const API_KEY = process.env.REACT_APP_API_KEY


export default function FormRegister() {
    const [regist, setregist] = useState(false)
    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        reset
    } = useForm({
        mode: 'onBlur'
    })

    const handleRegister = (data) => {
        const copy = { ...data, returnSecureToken: true }
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
            method: "POST",
            body: JSON.stringify(copy)
        })
            .then(response => {
                console.log(response)
                if(response.ok){
                    setregist(true)
                }
                    }
            )
            .catch(error => console.log(error))
        reset()

    }


    return (
        <div className="wrapper__content">
            {
                regist ? <h2 className='wrapper__content-regist'>You have registered in the application</h2> : null
            }
            <form className='form' id='form2' onSubmit={handleSubmit(handleRegister)}>
                <div className="form__email">
                    <input {
                        ...register('email', {
                            required: true,
                            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        })}
                        type="text"
                        placeholder='Email'
                        className={errors?.email ? "red" : null}
                    />
                </div>
                <div className="form__password">
                    <input
                        {...register('password', {
                            required: true,
                            minLength: 4
                        })}
                        type="password"
                        placeholder='Password'
                        className={errors?.password ? "red" : null}
                    />
                </div>
                <div className="form__buttons">
                    <button className="form__button-register"
                        onSubmit={handleRegister}
                    >Register</button>
                    <Link to="/" className='form__login-link'>Log In</Link>
                </div>
            </form>
        </div>
    )
}
