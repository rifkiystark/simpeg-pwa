import LoadingIcon from "../loading-icon/LoadingIcon";

function LoadingWrapper() {
  return (
    <div className="page-wrapper" style={{ height: "100vh" }}>
      <div
        className="card"
        style={{
          width: 200,
          height: 100,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <span style={{ textAlign: "center", paddingTop: 37 }}>
          <LoadingIcon primary />
        </span>
      </div>
    </div>
  );
}

export default LoadingWrapper
