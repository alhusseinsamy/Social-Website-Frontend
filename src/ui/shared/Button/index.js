export class Buttons {
  static primary({ props, text, isLoading }) {
    return (
      <button
        type="submit"
        className="btn btn-primary btn-block"
        style={{ minWidth: "100px" }}
      >
        {!isLoading ? (
          text
        ) : (
          <div
            className="spinner-border"
            role="status"
            style={{ height: "17px", width: "17px" }}
          >
            <span className="sr-only"></span>
          </div>
        )}
      </button>
    );
  }
}
