import { defer } from "react-router-dom";
import apiRequests from "./api-requests";

export async function singalPageLoader({ params }) {
  const { id } = params;
  const res = await apiRequests("/posts/" + id);
  return res.data;
}

export async function listingsLoader({ request }) {
  console.log(request);
  const query = request.url.split("?")[1] || "";
  console.log({ query });

  const postPromise = apiRequests("/posts?" + query || "");
  return defer({
    postResponse: postPromise,
  });
}

export async function profilePageLoader() {
  const postPromise = apiRequests.get("/users/profilePosts", {
    withCredentials: true,
  });
  return defer({
    postResponse: postPromise,
  });
}
