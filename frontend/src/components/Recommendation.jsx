import React from "react";
import Card from "./Card"; // Import your Card component
import { videos } from "../../Utils/Dummy";
const Recommendation = () => {
  // Static recommendation data

  return (
    <div className="flex flex-col space-y-4">
      {videos.map((video) => (
        <Card key={video.id} type="sm" video={video} />
      ))}
    </div>
  );
};

export default Recommendation;
