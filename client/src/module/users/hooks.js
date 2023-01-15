import { useMutation,useQuery } from "@tanstack/react-query";
import { 
  getUserDetails,
  getAllEditors,
  logoutUser,
  registerUser,
  updateProfileImage,
  verifyToken } from "./api";

export const useAddUser = (payload) => {
  return useMutation(() => registerUser(payload));
};

export const useUpdateProfilePicture = (fileUploaded,userData) => {
   return useMutation(() => updateProfileImage(fileUploaded,userData));
};

export const useLoginUser = (payload) => {
  return useQuery({ queryKey: ['login'], queryFn: () => getUserDetails(payload), enabled: false, retry: false });
};

export const useLogoutUser = () => {
  return useQuery({ queryKey: ['logout'], queryFn: () => logoutUser(), enabled: false, retry: true });
};

export const useGetEditors = (payload) => {
  return useQuery({ queryKey: ['getEditors'], queryFn: () => getAllEditors(),retry: false});
};

export const useVerifyToken = () => {
  return useQuery({ queryKey: ['verifyToken'], queryFn: () => verifyToken(), enabled: false, retry: false });
};


