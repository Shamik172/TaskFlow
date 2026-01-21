import api from "./axios";

export const uploadAvatar = (formData) => {
    return api.patch('/users/avatar', formData, {
        headers: {"Content-Type": "multipart/form-data"}
    })
}