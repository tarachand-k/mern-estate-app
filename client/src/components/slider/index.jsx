import { useState } from "react";
import "./index.scss";

function Slider({ images }) {
  const [currImg, setCurrImg] = useState(null);

  function slideImg(direction) {
    setCurrImg((curr) => {
      if ((direction === -1) & (curr === 0)) return images.length - 1;
      if ((direction === 1) & (curr === images.length - 1)) return 0;

      return curr + direction;
    });
  }

  return (
    <div className="slider">
      {currImg !== null && (
        <div className="full-slider">
          <div className="arrow" onClick={() => slideImg(-1)}>
            <img src="/arrow.png" alt="" />
          </div>
          <div className="img-box">
            <img src={images[currImg]} alt="" />
          </div>
          <div className="arrow" onClick={() => slideImg(1)}>
            <img src="/arrow.png" className="right" alt="" />
          </div>
          <div className="close-btn" onClick={() => setCurrImg(null)}>
            X
          </div>
        </div>
      )}
      <div className="main-img-box" onClick={() => setCurrImg(0)}>
        <img src={images[0]} alt="" />
      </div>
      <div className="other-imgs-box">
        {images.slice(1).map((img, idx) => (
          <img key={idx} src={img} alt="" onClick={() => setCurrImg(idx + 1)} />
        ))}
      </div>
    </div>
  );
}

export default Slider;
