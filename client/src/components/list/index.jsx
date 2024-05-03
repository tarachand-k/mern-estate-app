import { listData } from "../../lib/dummyData";
import Card from "../card";
import "./index.scss";

function List() {
  const data = listData;
  return (
    <div className="list">
      {data.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default List;
