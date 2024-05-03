import SearchBar from "../../components/SearchBar";
import "./index.scss";

function Home() {
  return (
    <div className="home">
      <div className="content-box">
        <div className="pad-wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p className="description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit
            corporis aspernatur recusandae quod porro, laboriosam mollitia
          </p>
          <SearchBar />
          <div className="stats">
            <div className="box">
              <h2>16+</h2>
              <p>Years of Experience</p>
            </div>
            <div className="box">
              <h2>200+</h2>
              <p>Award Gained</p>
            </div>
            <div className="box">
              <h2>1200+</h2>
              <p>Property Ready</p>
            </div>
          </div>
        </div>
      </div>
      <div className="img-box">
        <img src="/bg.png" alt="background img" />
      </div>
    </div>
  );
}

export default Home;
