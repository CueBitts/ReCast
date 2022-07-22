import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import './SignUp.css'


function SignUp() {
    const recastAPI = 'http://localhost:8000'
    const navigate = useNavigate()

    const [newForm, setNewForm] = useState({
        name: '',
        password: ''
    })
    
    const handleChange = (e) => {
        e.preventDefault()

        setNewForm({ ...newForm, [e.target.name]: e.target.value })
        console.log(newForm)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await fetch(`${recastAPI}/users/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newForm)
        })
        .then(response => response.json())
        .then(result => {
            if(!result) {
                console.log('sign up unsuccessful')
            } else {
                console.log('sign up successful')
                navigate('/sign-in')
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    return (
        <div className='signUp'>
            <h2>Sign Up</h2>
            <form onSubmit = {handleSubmit}>    
                <input
                    className='input'
                    type='text'
                    name='name'

                    placeholder='Username'

                    onChange={handleChange}
                />
                <input
                    className='input'
                    type='password'
                    name='password'

                    placeholder='Password'

                    onChange={handleChange}
                />
                <button
                    className='button'
                    type='submit'
                    name='submit'>
                    Submit
                </button>
            </form>
            <p>Already have an account? <Link to='/sign-in'>Sign in</Link></p>
        </div>
    )
}

export default SignUp;