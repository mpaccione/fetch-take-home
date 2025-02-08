import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";

import { MemoizedMenu } from "./components/Menu";
import { getDogs } from "./actions";

const Dogs = () => {
  const [results, setResults] = useState([]);

  const submit = async (p) => {
    const res = await getDogs(p);
    res?.data && setResults(res.data.resultIds);
  };

  return (
    <div style={{ margin: "auto", width: "50%" }}>
      <MemoizedMenu {...{ submit }} />
      <Table>
        <TableHeader>
          <TableRow>
            {results &&
              Object.keys(results[0]).map((k, idx) => (
                <TableHeaderCell key={idx}>{k}</TableHeaderCell>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {results &&
            results.map((r, idx) => (
              <TableRow key={idx}>
                {r.map((c, idx2) => (
                  <TableCell key={idx2}>{c}</TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Dogs;
