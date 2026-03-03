import React, { useRef, useState, useEffect } from "react";

const AddItem: React.FC = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const openFolder = () => {
    fileRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    if (!file.type.startsWith("image/")) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  
  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
    
      <input
        type="file"
        ref={fileRef}
        className="hidden"
        accept="image/*"
        onChange={handleChange}
      />

      
      <div
        onClick={openFolder}
        className="w-150 ml-20 mt-20 h-72 object-cover rounded-xln"
      >
        {image ? (
          <img
            src={image}
            alt="Selected"
            className="w-150 h-72 object-cover rounded-xl"
          />
        ) : (
          <span className="text-4xl text-gray-500">+</span>
        )}
      </div>
         <h1></h1>
    </div>
  );
};

export default AddItem;
