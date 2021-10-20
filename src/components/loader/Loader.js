import ReactLoading from "react-loading"

export const Loader = ({ width, height, color, type }) => {
  return (
    <ReactLoading
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: `${width}px`,
        height: `${height}px`,
        fill: color,
      }}
      type={type}
    />
  )
}
