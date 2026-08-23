// پیکربندی Firebase Realtime Database
const firebaseConfig = {
  apiKey: "AIzaSyCd_Ct5YY_3XiOjiunPGXNIro41EO3UfPM",
  authDomain: "proforosh.firebaseapp.com",
  databaseURL: "https://proforosh-default-rtdb.firebaseio.com",
  projectId: "proforosh",
  storageBucket: "proforosh.firebasestorage.app",
  messagingSenderId: "646604737860",
  appId: "1:646604737860:web:5eaede6fa3c894b669db11"
};

// مقداردهی اولیه امن فایربیس
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

// کلید API مربوط به ImgBB
const IMGBB_API_KEY = "32b44cf4a92e03d876d7d02104feabfb";

// تابع آپلود عکس به ImgBB
async function uploadToImgBB(file) {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    if (data && data.success) {
      return data.data.url;
    } else {
      throw new Error(data.error ? data.error.message : "خطا در آپلود تصویر");
    }
  } catch (error) {
    console.error("ImgBB Upload Error:", error);
    alert("خطا در آپلود عکس به ImgBB: " + error.message);
    return null;
  }
}
