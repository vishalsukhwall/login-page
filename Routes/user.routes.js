const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

/* ================= MULTER ================= */
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* ================= LOGIN ================= */
router.get('/login', (req, res) => {
  res.render('login');
});

/* ================= REGISTER ================= */
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { username } = req.body;

  res.redirect(`/user/welcome?user=${encodeURIComponent(username)}`);
});

/* ================= WELCOME ================= */
router.get('/welcome', (req, res) => {
  const user = req.query.user || "Guest";

  res.render('welcome', { user });
});

/* ================= LOGIN POST ================= */
router.post('/login', (req, res) => {
  res.redirect('/user/home');
});

/* ================= HOME (GALLERY DASHBOARD) ================= */
router.get('/home', async (req, res) => {
  try {
    const result = await cloudinary.search
      .expression('folder:uploads')
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();

    res.render('home', {
      images: result.resources || [],
      count: result.resources?.length || 0
    });

  } catch (err) {
    console.log(err);
    res.send("Error loading home");
  }
});

/* ================= UPLOAD IMAGE ================= */
router.post('/upload-file', upload.single('file'), async (req, res) => {
  try {

    if (!req.file) return res.send("❌ No file selected");

    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "uploads"
    });

    // 🔥 direct home redirect (UPDATED)
    res.redirect('/user/home');

  } catch (err) {
    console.log(err);
    res.send("Upload error");
  }
});

/* ================= DELETE IMAGE ================= */
router.post('/delete-image', async (req, res) => {
  try {

    const { publicId } = req.body;

    await cloudinary.uploader.destroy(publicId);

    res.redirect('/user/home');

  } catch (err) {
    console.log(err);
    res.send("Delete error");
  }
});

module.exports = router;

