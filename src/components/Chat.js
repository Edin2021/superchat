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
  const dummy = useRef(null);

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
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const scrollToBottom = () => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
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
        <section className="chat">
          {messages.map((message, i) => {
            const values = { messages, message, i };
            return <ChatMessage key={message.id} values={values} />;
          })}
          <span ref={dummy}></span>
        </section>{" "}
        <SendMessageForm scrollToBottom={scrollToBottom} />
      </div>
    </main>
  );
}

export default Chat;
