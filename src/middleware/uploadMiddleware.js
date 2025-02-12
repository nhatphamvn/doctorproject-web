import formidable from 'formidable';
import path from 'path';

// Dùng CommonJS thay vì import.meta.url
const __dirname = path.resolve();

const formConfig = () => {
  return formidable({
    multiples: false,
    uploadDir: path.join(__dirname, 'uploads'), // Sửa lại đường dẫn
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024,
    filter: ({ mimetype }) => ['image/jpeg', 'image/png', 'image/gif'].includes(mimetype),
  });
};

export default formConfig;