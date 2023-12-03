import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_ENDPOINT } from "../constant";

const useFetchData = () => {
  const [users, setUsers] = useState([]);
  const [totalpage, setTotalpage] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(BASE_ENDPOINT);

      const newData = data.map((item) => {
        return { ...item, checked: false };
      });
      setUsers(newData);
      setTotalpage(Math.ceil(data.length / 10));
    };
    fetch();
  }, []);

  return { users, setUsers, totalpage, setTotalpage };
};

export default useFetchData;
