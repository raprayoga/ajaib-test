import React,{ useState, useEffect } from "react"
import get from 'services/xhr'
import { USERAPI } from 'constant/url'

import Filter from 'components/Filter'
import List from 'components/List'

import { CircularProgress, Box } from '@mui/material';

export default function Main() {
  const include = 'inc=login,name,email,gender,registered'
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState({
    keyword: "",
    gender: "all",
    results: 10,
    page: 1
  });

  const getEmployees = async (data) => {
    const queryKeyword = data.keyword ? `&keyword=${data.keyword}` : ""
    const queryGender = data.gender !== "all" ? `&gender=${data.gender}` : ""
    try {
      setIsLoading(true);
      await get(`${USERAPI}?${include}&results=${data.results}&page=${data.page}${queryKeyword}${queryGender}`)
        .then((resp) => {
          setData(resp.data.results);
        })
        .catch((error) => {
          window.$toast.fire({
            icon: "error",
            title: error.response.data.error || "Connection Error",
          });
        });
    } catch (err) {
      window.$toast.fire({
        icon: "error",
        title: "Connection Error",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getEmployees(filter)
  }, []);

  const resetFilter = () => {
    const filterTemp = { ...filter };
    filterTemp.keyword = "";
    filterTemp.gender = "all";
    setFilter(filterTemp);
  }

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    const filterTemp = { ...filter };
    filterTemp[name] = value;
    setFilter(filterTemp);
  }

  const onPageChange = (page) => {
    const filterTemp = { ...filter };
    filterTemp.page = page;
    setFilter(filterTemp);

    getEmployees(filterTemp)
  }

  const onRowsPerPageChange = async (e) => {
    const value = e.target.value
    const filterTemp = { ...filter };
    filterTemp.results = value;
    await setFilter(filterTemp);
    
    getEmployees(filterTemp)
  }

  return (
    <>
      <Filter 
        gender={filter.gender}
        keyword={filter.keyword}
        resetFilter={() => resetFilter()}
        handleChange={(e) => handleChange(e)}
        onSearch={() => getEmployees(filter)}/>

      { isLoading ? (
        <Box display="flex" mt={5} style={{justifyContent: "center", alignItems: "center"}}>
          <CircularProgress />
        </Box>
      ) : (
        <List 
          onPageChange={(e) => onPageChange(e)}
          onRowsPerPageChange={(page) => onRowsPerPageChange(page)}
          data={data}
          page={filter.page}
          results={filter.results}
        />
      )}
    </>
  )
}
