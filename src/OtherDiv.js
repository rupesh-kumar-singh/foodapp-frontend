import ReactDom from "react-dom";

const OtherDiv = () => {
  return ReactDom.createPortal(
    <h1>this is mt side</h1>,
    document.getElementById("other-div")
  );
};
export default OtherDiv;
