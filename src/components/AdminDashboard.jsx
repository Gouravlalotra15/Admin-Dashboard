import { useEffect, useState } from "react";
import SeachBar from "./SeachBar";
import User from "./User";
import useFetchData from "../hooks/useFetchData";
import TableHeader from "./TableHeader";

const AdminData = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  //custoum hooks call
  const { users, setUsers, totalpage } = useFetchData();

  const [isPageSelected, setIsPageSelected] = useState(
    new Array(totalpage).fill(false)
  );

  const startPageIndex = 10 * page - 10;
  const endPageIndex = 10 * page;

  const handleSelectAll = () => {
    const selectedAllUsers = filteredUsers.map((item, idx) => {
      if (idx >= startPageIndex && idx < endPageIndex) {
        item.checked = isPageSelected[page];
      }
      return item;
    });

    setUsers(selectedAllUsers);
  };

  useEffect(() => {
    handleSelectAll();
  }, [isPageSelected]);

  // delete a user
  const handleDel = (id) => {
    const newUsers = users.filter((item) => {
      return item.id !== id;
    });
    setUsers(newUsers);
  };
  const handleCheckbox = (id) => {
    const newUsers = users.map((item) => {
      if (item.id === id) {
        if (item.checked === false) return { ...item, checked: true };
        else return { ...item, checked: false };
      }
      return { ...item };
    });
    setUsers(newUsers);
  };
  const filteredUsers = users.filter((user) => {
    const searchTerm = search.toLowerCase();
    if (
      user.name.toLowerCase().startsWith(searchTerm) ||
      user.email.toLowerCase().startsWith(searchTerm) ||
      user.role.toLowerCase().startsWith(searchTerm)
    )
      return user;
  });
  console.log(filteredUsers);

  const handleDelete = () => {
    setUsers(
      filteredUsers.filter((item) => {
        return item.checked != true;
      })
    );
  };

  const handleSave = (id, name, mail, role) => {
    const newEditedName = filteredUsers.map((item) => {
      if (item.id == id) {
        item.name = name;
        item.email = mail;
        item.role = role;
      }
      return item;
    });
    setUsers(newEditedName);
  };

  const handleIsPageSelected = () => {
    const newData = [...isPageSelected];
    newData[page] = !newData[page];

    setIsPageSelected(newData);
  };

  const leftclick = (page) => {
    if (page <= 1) return;
    setPage(page - 1);
    // const newData = users.slice(startPageIndex, endPageIndex).map((item) => {
    //   return { ...item, checked: false };
    // });
    // setUsers(newData);
  };

  const rightclick = (page) => {
    if (page >= totalpage) return;
    setPage(page + 1);

    // const newData = users.slice(startPageIndex, endPageIndex).map((item) => {
    //   return { ...item, checked: false };
    // });
    // setUsers(newData);
  };

  return (
    <>
      <SeachBar
        handleDelete={handleDelete}
        search={search}
        setSearch={setSearch}
      />
      <TableHeader
        handleSelectAll={handleSelectAll}
        isPageSelected={isPageSelected}
        setIsPageSelected={setIsPageSelected}
        handleIsPageSelected={handleIsPageSelected}
        page={page}
      />
      <div className="users">
        {filteredUsers.slice(startPageIndex, endPageIndex).map((item, idx) => {
          return (
            <User
              key={idx}
              {...item}
              handleDel={handleDel}
              handleCheckbox={handleCheckbox}
              handleSave={handleSave}
            />
          );
        })}
      </div>

      {users.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => leftclick(page)}
            className={page == 1 ? "no-class" : ""}
          >
            ◀
          </span>
          {[...Array(totalpage)].map((item, i) => {
            return (
              <span
                key={i}
                onClick={() => {
                  setPage(i + 1);
                }}
                className={page === i + 1 ? "active" : ""}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => rightclick(page)}
            className={page == totalpage ? "no-class" : ""}
          >
            ▶
          </span>
        </div>
      )}
    </>
  );
};

export default AdminData;
