export default function FixResultsDialog({ ref }) {
  const closeDialog = () => {
    ref.current.close();
  };
  return (
    <dialog ref={ref} className="fix-dialog">
      <div className="dialog-content">
        <h2 className="dialog-header">Fix Results</h2>
        <p className="dialog-subtext">
          Make changes to your food description here. Click save when you're
          done.
        </p>
        <form method="dialog">
          <input
            type="text"
            className="dialog-input"
            placeholder="e.g. It is two balls of banku instead of one"
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
