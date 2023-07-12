import React from "react";
import { File } from "../Icons/File";
import Send from "../Icons/Send";

const MessageForm = ({ submitHandler, text, setText, setImg }) => {
  return (
    <form className="message_form" onSubmit={submitHandler}>
      <label htmlFor="img">
        <File />
      </label>
      <input
        type="file"
        id="img"
        accept="image/*"
        onChange={(e) => setImg(e.target.files[0])}
      />
      <div>
        <input
          type="text"
          placeholder="Enter message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <button>
          <Send />
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
