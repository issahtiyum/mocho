import { useRef, useState } from "react";
import calculateCalories from "./ai";
import Results from "./Results";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);

  results && console.table(results);
  function handleInputClick() {
    fileInputRef.current.click();
  }
  function handleImageUpload(e) {
    const image = e.target.files[0];
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      setSelectedImage({ imageFile: image, imageUrl });
    }
  }
  return (
    <>
      <h1>Mocho</h1>
      <div className="upload-container">
        {selectedImage?.imageUrl ? (
          <>
            <img src={selectedImage.imageUrl} alt="Selected Image" />
            {isLoading ? (
              <span className="loader"></span>
            ) : (
              <>
                {results?.description && <Results results={results} />}

                <div className="buttons-container">
                  <button onClick={handleInputClick}>Change Image</button>
                  <button
                    onClick={async () => {
                      setIsLoading(true);
                      setResults(
                        await calculateCalories(selectedImage.imageFile)
                      );
                      setIsLoading(false);
                    }}
                  >
                    Check Calories
                  </button>
                </div>
              </>
            )}
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
