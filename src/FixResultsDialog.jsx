import { useState } from "react";

export default function FixResultsDialog({
  dialogRef,
  fixResultsInputRef,
  setResults,
  setIsLoading,
  setUserCorrection,
  userCorrection,
  calculateCalories,
  selectedImage,
  previousResult,
}) {
  const closeDialog = () => {
    dialogRef.current.close();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const updatedUserCorrections = [
      ...userCorrection,
      fixResultsInputRef.current.value.trim(),
    ];
    setUserCorrection(updatedUserCorrections);
    closeDialog();
    setIsLoading(true);
    try {
      setResults(
        await calculateCalories(
          selectedImage.imageFile,
          updatedUserCorrections,
          previousResult
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <dialog ref={dialogRef} className="fix-dialog">
      <div className="dialog-content">
        <h2 className="dialog-header">Fix Results</h2>
        <p className="dialog-subtext">
          Make changes to your food description here. Click save when you're
          done.
        </p>
        <form method="dialog" onSubmit={handleSubmit}>
          <input
            type="text"
            className="dialog-input"
            placeholder="e.g. It is two balls of banku instead of one"
            ref={fixResultsInputRef}
          />
          <button className="save-button primary" type="submit">
            Save changes
          </button>
        </form>
        <button className="close-button" onClick={closeDialog}>
          ×
        </button>
      </div>
    </dialog>
  );
}
