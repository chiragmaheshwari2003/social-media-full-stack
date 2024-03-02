import { useNavigate } from 'react-router-dom'
import Posts from '../../components/posts/Posts'
import Stories from '../../components/stories/stories'
import './home.scss'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import Share from '../../components/share/Share'

const Home = () => {

  const {currentUser} = useContext(AuthContext);
  // console.log(currentUser);
  const navigate = useNavigate();
  if(currentUser === null){
    navigate('/login');
    return <div />
  }
  else {
    return (
      <div className='home'>
        <Stories />
        <Share />
        <Posts />
      </div>
    )
  }
  
}

export default Home