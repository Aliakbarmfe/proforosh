// api/config.js - واسطه اختصاصی Vercel و ImgBB

const IMGBB_API_KEY = "32b44cf4a92e03d876d7d02104feabfb";

// توابع ارتباط با دیتابیس از طریق واسطه Vercel
const DB = {
  async get(path) {
    try {
      const res = await fetch(`/api/db?path=${encodeURIComponent(path)}`);
      return await res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  async set(path, data) {
    try {
      const res = await fetch(`/api/db?path=${encodeURIComponent(path)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  async push(path, data) {
    try {
      const res = await fetch(`/api/db?path=${encodeURIComponent(path)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  }
};

// تابع آپلود عکس در ImgBB
async function uploadToImgBB(file) {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: formData
    });
    const data = await response.json();
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error("خطا در آپلود");
    }
  } catch (error) {
    alert("خطا در آپلود عکس.");
    return null;
  }
}
