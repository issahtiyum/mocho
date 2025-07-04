import { useRef, useState } from "react";
import calculateCalories from "./ai";
import Results from "./Results";
import FixResultsDialog from "./FixResultsDialog";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [userCorrection, setUserCorrection] = useState([]);

  const fileInputRef = useRef(null);
  const dialogRef = useRef(null);
  const fixResultsInputRef = useRef(null);

  const handleInputClick = () => fileInputRef.current.click();

  function handleImageUpload(e) {
    const image = e.target.files[0];
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      setResults(null);
      setSelectedImage({ imageFile: image, imageUrl });
    }
  }
  function handleReset() {
    setSelectedImage(null);
    setResults(null);
    setUserCorrection([]);
  }
  async function handleResult() {
    setIsLoading(true);
    try {
      setResults(await calculateCalories(selectedImage.imageFile));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  const openDialog = () => dialogRef.current.showModal();

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
                  {results?.description ? (
                    <>
                      <button onClick={openDialog} className="primary">
                        Fix Results
                      </button>
                      <button className="primary" onClick={handleReset}>
                        Done
                      </button>
                      <FixResultsDialog
                        dialogRef={dialogRef}
                        fixResultsInputRef={fixResultsInputRef}
                        setIsLoading={setIsLoading}
                        setResults={setResults}
                        setUserCorrection={setUserCorrection}
                        userCorrection={userCorrection}
                        calculateCalories={calculateCalories}
                        selectedImage={selectedImage}
                        previousResult={results}
                      />
                    </>
                  ) : (
                    <>
                      <button onClick={handleInputClick} className="primary">
                        Change Image
                      </button>
                      <button className="primary" onClick={handleResult}>
                        Check Rating
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <img src="./camera-upload.svg" alt="" />
            <button onClick={handleInputClick} className="primary">
              Upload Image
            </button>
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
