import { useAuth } from "../contexts/AuthContext";

function Message({ values }) {
  const { user } = useAuth();

  const { messages, message, i } = values;

  const checkPhoto = (messages, i) => {
    const photo =
      messages[i - 1] !== undefined ? messages[i - 1].photoURL : null;

    return photo;
  };

  return (
    <article className={user.uid === message.uid ? "curr-user" : "user"}>
      <div>
        <span className="visually-hidden">{message.userName}</span>
        {message.text}
      </div>
      {message.photoURL !== checkPhoto(messages, i) && (
        <div className="img-wrapper">
          {message.photoURL ? (
            <img src={message.photoURL} alt="" />
          ) : (
            <span>{message.userName && message.userName[0]}</span>
          )}
        </div>
      )}
    </article>
  );
}

export default Message;
