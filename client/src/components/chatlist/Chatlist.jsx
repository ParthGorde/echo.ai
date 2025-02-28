import React from "react";
import { Link } from "react-router-dom";
import "./chatlist.css";
import { useQuery } from "@tanstack/react-query";

const Chatlist = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <>
      <div className="chatlist">
        <span className="title">Dashboard</span>
        <Link to="/dashboard">Create a New Chat</Link>
        <Link to="/">Explore Echo.ai</Link>
        <Link to="/">Contact</Link>
        <hr />
        <span className="title">Recent Chats</span>
        <div className="list">
          {isPending
            ? "Loading...!"
            : error
            ? "Something Went Wrong"
            : data?.map((chat) => (
                <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                  {chat.title}
                </Link>
              ))}
        </div>
        <hr />
        <div className="upgrade">
          <img src="/echo.webp" alt="" height={64} width={64} />
          <div className="text">
            <span>Upgrade to Echo.ai</span>
            <span>Get Unlimited Access to all features</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatlist;
