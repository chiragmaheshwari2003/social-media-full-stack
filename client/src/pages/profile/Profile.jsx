import './profile.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import Posts from '../../components/posts/Posts';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useLocation } from 'react-router-dom';
import { useState,useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import Update from '../../components/update/Update';


const Profile = () => {
  
  const { currentUser } = useContext(AuthContext);
  const [openUpdate,setOpenUpdate] = useState(false);
  // console.log(useLocation().pathname.split('/'))
  const userId = parseInt(useLocation().pathname.split('/')[2]);
  // console.log(typeof userId);

  const {isLoading , error, data} = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      makeRequest.get("/users/find/"+userId).then(res =>{
        // console.log(res);
        // console.log(res.data);
        
        return res.data;
      })
  });

  const {isLoading : rIsLoading, data : relationshipData} = useQuery({ // changing name as we have already used them.
    queryKey: ["relationship"],
    queryFn: () =>
      makeRequest.get("/relationships?followedUserId="+userId).then(res =>{
        // console.log(res);
        // console.log(res.data);
        
        return res.data;
      })
  });
  // console.log(relationshipData);

  const queryClient = useQueryClient();

    const mutation = useMutation(
        {
        mutationFn : (following) => {
          // console.log(following);
            if(following){
              // console.log(1);
              return makeRequest.delete("/relationships?userId=" + userId);
            }

            return makeRequest.post("/relationships", { userId });
        },
        
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(["relationship"]);
            },
        });


    const handleFollow = () => {
      // console.log(relationshipData.includes(currentUser.id));
        mutation.mutate(relationshipData.includes(currentUser.id))
    }


  // console.log(data);
  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <img src={"/upload/"+data.coverPic} alt="" className="cover" />
            <img src={"/upload/"+data.profilePic} alt="" className="profilePic" />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <LinkedInIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <PinterestIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>{data.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{data.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{data.website}</span>
                  </div>
                </div>
                {rIsLoading ? (
                  "loading"
                ) : userId === currentUser.id ? (
                  <button onClick={() => setOpenUpdate(true)}>update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertOutlinedIcon />
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;