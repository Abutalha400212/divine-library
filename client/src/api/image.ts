export const imageUpload = async (obj: FormData) => {
  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImgBB_Url}`,
    {
      method: 'POST',
      body: obj,
    }
  );
  const data = await res.json();
  return data;
};
