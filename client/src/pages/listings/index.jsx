import "./index.scss";
import Filter from "../../components/Filter";
import Card from "../../components/card";
import Map from "../../components/map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../../components/loader";

function Listings() {
  const { postResponse } = useLoaderData();

  return (
    <div className="listings">
      <div className="list-content-box">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<Loader />}>
            <Await
              resolve={postResponse}
              errorElement={<p>Error loading posts</p>}
            >
              {(postResponse) => {
                console.log(postResponse);
                return postResponse.data.posts.map((item) => (
                  <Card key={item.id} item={item} />
                ));
              }}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="map-box">
        <Suspense fallback={<Loader />}>
          <Await
            resolve={postResponse}
            errorElement={<p>Error loading posts</p>}
          >
            {(postResponse) => (
              <Map items={postResponse.data.posts} scrollWheelZoom={true} />
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default Listings;
