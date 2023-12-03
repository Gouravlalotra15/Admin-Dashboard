import { MdDelete } from "react-icons/md";

const SeachBar = ({ handleDelete, search, setSearch }) => {
  return (
    <div className="searchbar">
      <input
        type="text"
        className="search-icon"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></input>
      <button onClick={handleDelete}>
        <MdDelete className="btn" />
      </button>
    </div>
  );
};

export default SeachBar;
