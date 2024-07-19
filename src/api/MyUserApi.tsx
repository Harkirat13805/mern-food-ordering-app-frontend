import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";

import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};



export const useGetMyUser =()=>{
  const {getAccessTokenSilently}=useAuth0();

  const getMyuserRequest = async ():Promise<User> => {
    const   accessToken =await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`,{
      method:"Get",
      headers:{
        Authorization:`Bearer ${accessToken}`,
        "Content-Type":"application/json",
    },
    
  });
  if(!response.ok){
    throw new Error("Failed to Fetch user")
  }

  return response.json();
};
  const {data: currentUser,isLoading,error}=useQuery("fetchCurrentUser",getMyuserRequest)

  if(error){
    toast.error(error.toString());
  }

  return {currentUser,isLoading};
};




// Hook that our components can call
export const useCreateMyUser = () => {
  // API request function to create a user

    const {getAccessTokenSilently}=useAuth0();


  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently(); 
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorisation: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  // useMutation to manage loading, error, and success states
  const { 
    mutateAsync: createUser, 
    isLoading, 
    isError, 
    isSuccess 
  } = useMutation(createMyUserRequest);

  // Returning an object containing the mutation function and states
  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};
type UpdateMyuserRequest={
  name:string;
  addressLine1:string;
  city:string;
  country:string;
  
}; 

export const useUpdateMyuser =()=>{
  const {getAccessTokenSilently}= useAuth0();
  
  const UpdateMyuserRequest=async (formData : UpdateMyuserRequest) => {
    const accessToken = await getAccessTokenSilently(); 
    const response= await fetch(`${API_BASE_URL}/api/my/user`,{
      method:"PUT",
      headers:{
        Authorization : `Bearer ${accessToken}`,
        "content-Type":"application/json"
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update  user");
    }


  };

  
    // useMutation to manage loading, error, and success states
    const { 
      mutateAsync: updateUser, 
      isLoading,  
      isSuccess,
      error,
      reset, 
    } = useMutation(UpdateMyuserRequest); 
    if(isSuccess){
      toast.success("user profile updated!");
    }
    if(error){
      toast.error(error.toString());
      reset();
    }

    return{updateUser,isLoading}; 
};
