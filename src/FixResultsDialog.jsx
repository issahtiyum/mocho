export default function FixResultsDialog({ dialogRef, fixResultsInputRef }) {
  const closeDialog = () => {
    dialogRef.current.close();
  };

  function handleSubmit(e) {
    e.preventDefault();
    closeDialog();
    console.log(fixResultsInputRef.current.value);
    fixResultsInputRef.current.value = "";
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
