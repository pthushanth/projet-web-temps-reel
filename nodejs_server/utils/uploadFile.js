import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const filter = (req, file, cb) => {
  console.log("test---------------  ", file);
  const acceptedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (acceptedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
export const upload = multer({ storage: storage, fileFilter: filter });
