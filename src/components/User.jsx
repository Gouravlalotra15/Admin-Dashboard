import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosCheckbox } from "react-icons/io";
import { MdCancel } from "react-icons/md";
const User = ({
  id,
  name,
  email,
  role,
  checked,
  handleDel,
  handleCheckbox,
  handleEdit,
  handleSave,
}) => {
  const [isEditing, setIsEditing] = useState(true);
  const [nameInput, setNameInput] = useState(name);
  const [emailInput, setEmailInput] = useState(email);
  const [roleInput, setRoleInput] = useState(role);
  return (
    <>
      <div className={checked ? "user active" : "user"}>
        <input
          type="checkbox"
          onChange={() => handleCheckbox(id)}
          checked={checked}
        ></input>
        {isEditing ? (
          <span>{name}</span>
        ) : (
          <input
            type="text"
            className="editInput"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        )}
        {isEditing ? (
          <span>{email}</span>
        ) : (
          <input
            type="text"
            className="editInput"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
        )}
        {isEditing ? (
          <span>{role}</span>
        ) : (
          <input
            type="text"
            className="editInput"
            value={roleInput}
            onChange={(e) => setRoleInput(e.target.value)}
          />
        )}

        <div>
          <button className="btn" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? <FaRegEdit /> : <MdCancel />}
          </button>

          {isEditing ? (
            <button className="btn" onClick={() => handleDel(id)}>
              <MdDelete />
            </button>
          ) : (
            <button
              className="btn"
              onClick={() => {
                handleSave(id, nameInput, emailInput, roleInput);
                setIsEditing(!isEditing);
              }}
            >
              <IoIosCheckbox />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default User;
