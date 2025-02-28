import React from "react";
import "./Chatpage.css";
import Newprompt from "../../components/newPromt/Newprompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { IKImage } from "imagekitio-react";
import Markdown from "react-markdown";

const Chatpage = () => {
  const chatId = useLocation().pathname.split("/").pop();
  console.log("Extracted chatId:", chatId);

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  console.log(data);
  

  return (
    <>
      <div className="chatpage">
        <div className="wrapper">
          <div className="chat">
            {isPending
              ? "Loading..!"
              : error
              ? "Something Went Worng  :  " + error.message
              : data?.history?.map((message, i) => (
                  <React.Fragment key={i}>
                    {message.img && (
                      <IKImage
                        urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                        path={message.img}
                        height="300"
                        width="400"
                        transformation={[{ height: 300, width: 400 }]}
                        loading="lazy"
                        lqip={{ active: true, quality: 20 }}
                      />
                    )}

                    <div
                      className={message.role === "user" ? "msg user" : "msg"}
                      key={i}
                    >
                      <Markdown>{message.parts[0].text}</Markdown>
                    </div>
                  </React.Fragment>
                ))}
            <Newprompt data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatpage;
