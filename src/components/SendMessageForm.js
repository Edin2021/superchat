import { BsBoxArrowDown } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useRef } from "react";

function SendMessageForm({ scrollToBottom, showArrow }) {
  const [currMessage, setCurrMessage] = useState("");

  const { user } = useAuth();

  const inputRef = useRef();

  const handleMessage = async (e) => {
    e.preventDefault();
    const sendBtn = e.currentTarget;
    if (!sendBtn.classList.contains("animate-icon")) {
      sendBtn.classList.add("animate-icon");
      setTimeout(() => {
        sendBtn.classList.remove("animate-icon");
      }, 1000);
    }

    inputRef.current.focus();
    if (currMessage) {
      const collectionRef = collection(db, "messages");
      const payload = {
        uid: user.uid,
        userName: user.displayName,
        text: currMessage,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
      };
      setCurrMessage("");
      await addDoc(collectionRef, payload);
    } else {
    }
    scrollToBottom();
  };

  return (
    <form className="message-form">
      <button
        type="button"
        className={`arrow-down-btn ${showArrow && "active"}`}
        onClick={scrollToBottom}
      >
        <span className="visually-hidden">go to last message in chat</span>
        <BsBoxArrowDown />
      </button>
      <label>
        <span className="visually-hidden">message textarea</span>
        <input
          type="text"
          value={currMessage}
          ref={inputRef}
          onChange={(e) => {
            if (e.target.value.length < 1000) {
              setCurrMessage(e.target.value);
            }
          }}
        />
      </label>
      <button
        type="submit"
        className="send-btn"
        onClick={(e) => {
          handleMessage(e);
        }}
      >
        <span className="icon">
          <FiSend />
        </span>
        <span>Send</span>
      </button>
    </form>
  );
}

export default SendMessageForm;
