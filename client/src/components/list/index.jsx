import Card from "../card";
import "./index.scss";

function List({ posts }) {
  if (posts.length === 0)
    return (
      <p>No post created yet. Click on `Create New Post` button to create</p>
    );

  return (
    <div className="list">
      {posts.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default List;
