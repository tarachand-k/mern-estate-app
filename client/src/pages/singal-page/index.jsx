import { singlePostData, userData } from "../../lib/dummyData";

import Slider from "../../components/slider";
import "./index.scss";
import Map from "../../components/map";

function SingalPage() {
  const data = singlePostData;

  return (
    <div className="singal-page">
      <div className="details">
        <div className="wrapper">
          <Slider images={data.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{data.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{data.address}</span>
                </div>
                <p className="price">${data.price}</p>
              </div>
              <div className="user">
                <img src={userData.img} alt="" />
                <span>{userData.name}</span>
              </div>
            </div>
            <p className="bottom">{data.description}</p>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <div className="feature-box">
            <h2 className="title">General</h2>
            <div className="feature-list">
              <div className="feature">
                <img src="/utility.png" alt="" />
                <div className="feature-text">
                  <h3>Utilities</h3>
                  <p>Renter is responsible</p>
                </div>
              </div>
              <div className="feature">
                <img src="/pet.png" alt="" />
                <div className="feature-text">
                  <h3>Pet Policy</h3>
                  <p>Pets Allowed</p>
                </div>
              </div>
              <div className="feature">
                <img src="/fee.png" alt="" />
                <div className="feature-text">
                  <h3>Property Fees</h3>
                  <p>Must have 3x the rent in total household income</p>
                </div>
              </div>
            </div>
          </div>
          <div className="feature-box">
            <h2 className="title">Room Sizes</h2>
            <div className="sizes">
              <div className="size">
                <img src="/size.png" alt="" />
                <span>80 sqft</span>
              </div>
              <div className="size">
                <img src="/bed.png" alt="" />
                <span>2 beds</span>
              </div>
              <div className="size">
                <img src="/bath.png" alt="" />
                <span>1 bathroom</span>
              </div>
            </div>
          </div>
          <div className="feature-box">
            <h2 className="title">Nearby Places</h2>
            <div className="feature-list">
              <div className="feature">
                <img src="/school.png" alt="" />
                <div className="feature-text">
                  <h3>School</h3>
                  <p>250m away</p>
                </div>
              </div>
              <div className="feature">
                <img src="/bus.png" alt="" />
                <div className="feature-text">
                  <h3>Bus Stop</h3>
                  <p>100m away</p>
                </div>
              </div>
              <div className="feature">
                <img src="/restaurant.png" alt="" />
                <div className="feature-text">
                  <h3>Restaurant</h3>
                  <p>200m away</p>
                </div>
              </div>
            </div>
          </div>
          <div className="feature-box">
            <h2 className="title">Location</h2>
            <div className="map-box">
              <Map items={[data]} />
            </div>
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              <span>Send a message</span>
            </button>
            <button>
              <img src="/save.png" alt="" />
              <span>Save the place</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingalPage;
