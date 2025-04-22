import { useRef, useState } from "react";
import calculateCalories from "./ai";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  function handleInputClick() {
    fileInputRef.current.click();
  }
  function handleImageUpload(e) {
    const image = e.target.files[0];
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      // console.log(imageUrl);
      setSelectedImage({ image, imageUrl });
    }
  }
  return (
    <>
      <h1>Mocho</h1>
      <div className="upload-container">
        {selectedImage?.imageUrl ? (
          <>
            <img src={selectedImage.imageUrl} alt="Selected Image" />
            <div className="buttons-container">
              <button onClick={handleInputClick}>Change Image</button>
              <button
                onClick={async () => {
                  setIsLoading(true);
                  await calculateCalories(selectedImage.image);
                  setIsLoading(false);
                }}
              >
                {isLoading ? "Loading..." : "Check Calories"}
              </button>
            </div>
          </>
        ) : (
          <>
            <img src="./camera-upload.svg" alt="" />
            <button onClick={handleInputClick}>Upload Image</button>
          </>
        )}
      </div>
      <input
        className="file-input"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={fileInputRef}
        style={{
          display: "none",
        }}
      />
    </>
  );
}
