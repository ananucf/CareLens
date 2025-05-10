// import multer from 'multer';
// import { v4 as uuidv4 } from 'uuid';
// import { AppError } from "../utils/appError.js";
// import fs from 'fs';
// import path from 'path';

// // create the folder if it is not exist
// const ensureFolderExists = (folderPath) => {
//   if (!fs.existsSync(folderPath)) {
//     fs.mkdirSync(folderPath, { recursive: true });
//   }
// };

// const fileUpload = (folderName) => {
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       const uploadPath = path.join('uploads', folderName);
      
//       // ensure that folder is exist
//       ensureFolderExists(uploadPath);
      
//       cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//       cb(null, uuidv4() + "_" + file.originalname);
//     }
//   });

//   function fileFilter(req, file, cb) {
//     if (file.mimetype.startsWith('image')) {
//       cb(null, true);
//     } else {
//       cb(new AppError('Image only', 401, false));
//     }
//   }

//   const upload = multer({
//     storage,
//     fileFilter,
//     limits: {
//       fileSize: 1 * 2024 * 2024 // 1MB
//     }
//   });

//   return upload;
// };

// export const uploadSingleFile = (fieldName, folderName) => fileUpload(folderName).single(fieldName);
// export const uploadMixOfFiles = (arrayOfFields, folderName) => fileUpload(folderName).fields(arrayOfFields);








import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { AppError } from "../utils/appError.js";
import fs from 'fs';
import path from 'path';

// Create the folder if it does not exist
const ensureFolderExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

const fileUpload = (folderName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join('uploads', folderName);
      ensureFolderExists(uploadPath);
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + "_" + file.originalname);
    }
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new AppError('Only image files are allowed', 401, false));
    }
  }

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024 // 5MB
    }
  });

  return upload;
};

export const uploadSingleFile = (fieldName, folderName) => fileUpload(folderName).single(fieldName);
export const uploadMixOfFiles = (arrayOfFields, folderName) => fileUpload(folderName).fields(arrayOfFields);
