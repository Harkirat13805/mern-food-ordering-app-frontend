import { useGetMyUser, useUpdateMyuser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-from/UserProfileForm"

const UserProfilePage = () => { 
  const {currentUser,isLoading :isGetLoading}=useGetMyUser();
  const{updateUser,isLoading :isUpdateLoading}= useUpdateMyuser();  
  
  if(isGetLoading){
    return <span>Loading....</span>;
  }
  if(!currentUser){
    return <span>Unable to Load User Profile</span>
  }

  return <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading}/>;
  
};

export default UserProfilePage
