import React from "react";
import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
var content = [
  {
    title: "chintan",
    description: ["hey i am chintan", "more content"],
  },
  {
    title: "your content",
    description: [
      "the content you went to show your user in site",
      "many more",
    ],
  },
  {
    title: "next content",
    description: ["next content of your site", "how are you"],
  },
];
function Textanimation() {
  const [currentindex, setCurrentindex] = useState(0);
  // const [currentstring, setCurrentstring] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentindex((previndex) => (previndex + 1) % content.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [content]);

  const currentobj = content[currentindex];

  return (
    <div
      className="font-serif font-bold"
      style={{ color: "rgb(210, 146, 255)" }}
    >
      <h1 className="text-5xl duration-300 mb-3 transition-shadow">
        {currentobj.title}
      </h1>
      <div className="flex text-xl">
        <Typewriter
          options={{
            strings: currentobj.description,
            autoStart: true,
            loop: true,
            cursor: "●",
            delay: 100,
          }}
        />
      </div>
    </div>
  );
}

export default Textanimation;
