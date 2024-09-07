export const getServerURL =() =>{
    return import.meta.env.VITE_Backend_Url || "http://localhost:5000/api/v1"
}