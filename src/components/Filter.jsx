import React from "react";

import {
  Grid,
  Container,
  OutlinedInput,
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Filter(props) {
  const handleChange = (e) => {
    props.handleChange(e);
  };

  const resetFilter = () => {
    props.resetFilter()
  }

  const onSearch = () => {
    props.onSearch()
  }

  return (
    <>
      <Card>
        <CardContent>
          <Box component="form" autoComplete="off">
            <Container maxWidth="lg">
              <Grid container spacing={1}>
                <Grid item xs={4} md={3}>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Search
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={() => onSearch()}>
                            <SearchIcon  />
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Search"
                      name="keyword"
                      value={props.keyword}
                      onChange={(e) => handleChange(e)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      id="gender"
                      name="gender"
                      value={props.gender}
                      label="Gender"
                      onChange={(e) => handleChange(e)}
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4} md={3}>
                  <Button variant="contained" onClick={() => resetFilter()}>Reset Filter</Button>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
