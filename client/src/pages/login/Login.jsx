import { Link, useNavigate } from 'react-router-dom'
import './login.scss'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext'



const Login = () => {

  const [inputs, setInputs] = useState({
    username :"",
    password :"",
  });
  const [err, setErr] = useState(null);

  const {login} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleLogin = async(e)=>{
    e.preventDefault();
    try{
      await login(inputs)
      navigate("/")
    }catch(err){
      // console.log(err);
      setErr(err.response.data)
    }
  }


  return (
    <div className='login'>
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
             Illo aliquam voluptatibus blanditiis reprehenderit est qui maxime, 
             vel aspernatur sunt quasi enim! Id facere doloremque, 
             sint excepturi cumque molestias! Voluptates, repudiandae.
            </p>
            <span>Don't have an account?</span>
            <Link to='/register'>
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form >
            <input type="text" placeholder="Username" name='username' onChange={handleChange} required/>
            <input type="password" placeholder="password" name='password'onChange={handleChange} required autoComplete="on"/>
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login