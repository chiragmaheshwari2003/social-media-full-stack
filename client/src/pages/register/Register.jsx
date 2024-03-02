import { useState } from 'react';
import './register.scss';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Register = () => {
  const [inputs, setInputs] = useState({
    username :"",
    email :"",
    password :"",
    name :"",
  });
  
  const [err, setErr] = useState(null);


  const handleChange = (e) =>{
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    // console.log(inputs);
  }
  const handleClick = (e) =>{
    e.preventDefault();

    axios.post("http://localhost:8800/api/auth/register",inputs)
    .then((res) =>{})
    .catch(err =>{
      setErr(err.response.data);
    })
  }
    return (
      <div className='register'>
        <div className="card">
          <div className="left">
            <h1>Lama Social.</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Illo aliquam voluptatibus blanditiis reprehenderit est qui maxime, 
              vel aspernatur sunt quasi enim! Id facere doloremque, 
              sint excepturi cumque molestias! Voluptates, repudiandae.
            </p>
            <span>Already Have an account?</span>
            <Link to='/login'>
              <button>Login</button>
            </Link>
          </div>
          <div className="right">
            <h1>Register</h1>
            <form >
              <input type="text" placeholder="Username" name='username' onChange={handleChange}/>
              <input type="email" placeholder="Email" name='email' onChange={handleChange}/>
              <input type="password" placeholder="password" name='password' onChange={handleChange}/>
              <input type="text" placeholder="Name" name='name' onChange={handleChange}/>
              {err && err}
              <button onClick={handleClick}>Register</button>
            </form>
          </div>
        </div>
    </div>
  );
}

export default Register