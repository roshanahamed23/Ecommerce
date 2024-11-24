'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { FiUpload } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';

const FileUpload = ({ ImageData, trigger, dataToEdit }) => {
  const [imageLink, setImageLink] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);

  // Refresh images on trigger
  function refreshImg() {
    setPreviewImage([]);
    setImageLink([]);
    ImageData([]);
  }

  useEffect(() => {
    if (trigger) {
      refreshImg();
    }
  }, [trigger]);

  // Update state when editing existing data
  useEffect(() => {
    if (dataToEdit) {
      setPreviewImage(dataToEdit.product_id?.image || []);
      setImageLink(dataToEdit.product_id?.image || []);
      ImageData(dataToEdit.product_id?.image || []);
    }
  }, [dataToEdit]);

  // Handle file selection and upload
  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setPreviewImage((prev) => [...prev, base64Image]);

      try {
        const res = await axios.post('/api/upload', { data: base64Image });
        const newImageLink = res.data.data;

        // Update imageLink state and pass it to the parent
        setImageLink((prev) => {
          const updatedLinks = [...prev, newImageLink];
          ImageData(updatedLinks); // Pass the updated list to the parent
          return updatedLinks;
        });
      } catch (err) {
        console.error('Upload error:', err);
      }
    };

    reader.readAsDataURL(file);
  };

  // Delete image from state
  const handleDeleteImage = (index) => {
    setPreviewImage((prev) => {
      const updatedPreview = prev.filter((_, i) => i !== index);
      return updatedPreview;
    });

    setImageLink((prev) => {
      const updatedLinks = prev.filter((_, i) => i !== index);
      ImageData(updatedLinks); // Update parent with the new list
      return updatedLinks;
    });
  };

  // Trigger file input click
  const handleUploadImageClick = () => {
    document.getElementById('image').click();
  };

  return (
    <div className="my-5">
      <input
        type="file"
        name="image"
        id="image"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="flex gap-3">
        <div
          className="w-[200px] h-[200px] flex items-center border border-slate-800 justify-center flex-col gap-4 border-[#e5eaf2] rounded-md cursor-pointer"
          onClick={handleUploadImageClick}
        >
          <FiUpload className="text-[2rem] text-[#777777]" />
          <p className="text-[#777777] whitespace-nowrap">Upload image</p>
        </div>

        {previewImage.length !== 0 &&
          previewImage.map((item, index) => (
            <div key={index} className="relative w-[200px] mr-2 h-[200px]">
              <img
                src={item}
                alt={`Uploaded ${index}`}
                className="w-full h-full object-cover"
              />
              <MdDelete
                className="text-[2rem] text-white bg-[#000000ad] p-1 absolute top-0 right-0 cursor-pointer"
                onClick={() => handleDeleteImage(index)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FileUpload;
