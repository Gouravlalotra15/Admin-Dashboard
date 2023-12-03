const TableHeader = ({
  handleSelectAll,
  isPageSelected,
  setIsPageSelected,
  handleIsPageSelected,
  page,
}) => {
  return (
    <div className="user tableHeader">
      <input
        type="checkbox"
        checked={isPageSelected[page]}
        onChange={() => {
          handleIsPageSelected();
        }}
      />
      <span>Name</span>
      <span>Email</span>
      <span>Role</span>
      <span>Actions</span>
    </div>
  );
};

export default TableHeader;
