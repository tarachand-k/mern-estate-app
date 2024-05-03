import "./index.scss";
import { listData } from "../../lib/dummyData";
import Filter from "../../components/Filter";
import Card from "../../components/card";
import Map from "../../components/map";

function Listings() {
  const data = listData;

  return (
    <div className="listings">
      <div className="list-content-box">
        <div className="wrapper">
          <Filter />
          {data.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="map-box">
        <Map items={data} scrollWheelZoom={true} />
      </div>
    </div>
  );
}

export default Listings;
