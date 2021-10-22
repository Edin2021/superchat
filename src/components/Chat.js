import { db } from "../firebase";
import { useEffect, useRef } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { useState } from "react";
import logo from "../styles/images/logo.png";
import ChatMessage from "./ChatMessage";
import Logout from "./Logout";
import SendMessageForm from "./SendMessageForm";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [scrollHeight, setScrollHeight] = useState(null);
  const [showArrow, setShowArrow] = useState(false);
  const dummy = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const messagesArray = snapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .reverse();
      setMessages(messagesArray);
      return;
    });

    return unsub;
  }, []);

  useEffect(() => {
    if (messages) {
      dummy.current.scrollIntoView();
    }
  }, [messages]);

  const scrollToBottom = () => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  const reportSize = () => {
    dummy.current.scrollIntoView();
    setScrollHeight(chatRef.current.scrollTop);
    checkHeight();
  };

  useEffect(() => {
    setScrollHeight(chatRef.current.scrollTop);
    window.addEventListener("resize", reportSize);
    return () => window.removeEventListener("resize", reportSize);
  }, [messages]);

  const checkHeight = () => {
    const currScrollHeight = chatRef.current.scrollTop;
    if (scrollHeight === null) setScrollHeight(currScrollHeight);
    if (currScrollHeight < scrollHeight - 200) setShowArrow(true);
    else setShowArrow(false);
  };

  return (
    <main className="chat-bcg">
      <div className="chat-wrapper">
        <header>
          <h1>
            <img src={logo} alt="" />
            Superchat
          </h1>
          <Logout />
        </header>
        <section className="chat" onScroll={checkHeight} ref={chatRef}>
          {messages.map((message, i) => {
            const values = { messages, message, i };
            return <ChatMessage key={message.id} values={values} />;
          })}
          <span ref={dummy}></span>
        </section>{" "}
        <SendMessageForm
          scrollToBottom={scrollToBottom}
          showArrow={showArrow}
        />
      </div>
    </main>
  );
}

export default Chat;
