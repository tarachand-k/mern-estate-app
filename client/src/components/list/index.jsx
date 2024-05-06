import Card from "../card";
import "./index.scss";

function List({ posts, type = "post" }) {
  if (posts.length === 0)
    return (
      <p>
        No post {type === "save" ? "saved" : "created"} yet!{" "}
        {type === "post" && "Click on 'Create New Post' button to create"}
      </p>
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
