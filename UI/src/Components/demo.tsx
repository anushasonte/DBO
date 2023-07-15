import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";

interface food {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

interface documents{
    docid: string,
    doc_category: string,
    doc_room_number: number,
    doc_room_level: number,
    doc_rack_number: number,
    doc_rack_level: number,
    doc_isdigitalversion: string,
}

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

var docs: documents[] ;



const originalRows: food[] = [
  { name: "Pizza", calories: 200, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: "Hot Dog", calories: 300, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: "Burger", calories: 400, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: "Hamburger", calories: 500, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: "Fries", calories: 600, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: "Ice Cream", calories: 700, fat: 6.0, carbs: 24, protein: 4.0 }
];

export default function BasicTable() {


  const [rows, setRows] = useState<documents[]>(docs);
  const [searched, setSearched] = useState<string>("");

  const classes = useStyles();
  console.log(rows);

  useEffect(() => {
    retrieveTutorials();
  });


  function retrieveTutorials() {
    fetch(
    "http://localhost:8080/api/v1/documents")
    .then((res) => res.json())
    .then((json) => {
      setRows(json);
    })
}
  const requestSearch = (searchedVal: string) => {
    const filteredRows = docs.filter((row) => {
      return row.docid.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <>
      <Paper>
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Documents</TableCell>
                <TableCell align="right">Calories</TableCell>
                {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.docid}>
                  <TableCell component="th" scope="row">
                    {row.docid}
                  </TableCell>
                  <TableCell align="right">{row.doc_category}</TableCell>
                  {/* <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <br />

    </>
  );
}
