import React from 'react';
import './index.css';

interface TableProps {
  caption: string;
  headers: string[];
  rows: any[][];
}

const Table = (props: TableProps) => {
  return (
    <table>
      <caption>{props.caption}</caption>
      <thead>
        <tr>
          {props.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {props.rows.map((row) =>
            row.map((rowText, index) => <td key={index}>{rowText}</td>)
          )}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
