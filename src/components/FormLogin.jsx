import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
const API_KEY = process.env.REACT_APP_API_KEY


export default function FormLogin() {

    const [log, setlog] = useState(false)
    const [err, seterr] = useState(false)

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


    const handleLogin = (data) => {
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    setlog(true)
                } else if (!response.ok) {
                    seterr(true)
                }
            })
            .catch(error => console.log(error))
        reset()
    }

    return (
        <div className="wrapper__content">
            {
                log ? <h2 className='wrapper__content-log'>You are logged in</h2> : null
            }
            {
                err ? <h2 className='wrapper__content-error'>Unable to find user</h2> : null
            }
            <form className='form' id='form1' onSubmit={handleSubmit(handleLogin)}>
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
                    <button className="form__button-login"
                        onSubmit={handleLogin}
                    >Login</button>
                    <Link to="/formregister" className='form__register-link'>Create new account</Link>
                </div>
            </form>
        </div>
    )
}
