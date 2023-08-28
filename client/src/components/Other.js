import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AdjustIcon from "@mui/icons-material/Adjust";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
export default function Other({ status }) {
  return (
    <List
      sx={{
        maxWidth: 360,

        overflow: "auto",
        maxHeight: 400,
      }}
    >
      <li>
        <ul>
          <ListSubheader>
            <div className="flex justify-center items-center">
              <AdjustIcon />{" "}
              <h1 className=" font-bold text-black text-2xl"> {status}</h1>
            </div>
          </ListSubheader>
          <div>
            <ListItem>
              <Link>
                <ListItemText> Grocery order</ListItemText>
              </Link>

              <Button>Edit</Button>
              <Button>Del</Button>
            </ListItem>
          </div>

          <ListItem>
            <ListItemText> Assignment</ListItemText>
            <Button>Edit</Button>
            <Button>Del</Button>
          </ListItem>
          <ListItem>
            <ListItemText> Hi</ListItemText>
            <Button>Edit</Button>
            <Button>Del</Button>
          </ListItem>
          <ListItem>
            <ListItemText> Hi</ListItemText>
            <Button>Edit</Button>
            <Button>Del</Button>
          </ListItem>
          <ListItem>
            <ListItemText> Hi</ListItemText>
            <Button>Edit</Button>
            <Button>Del</Button>
          </ListItem>
        </ul>
      </li>
    </List>
  );
}

{
  /* <div className="flex flex-col items-center mt-5 w-full border border-gray-500 shadow-lg shadow-slate-600">
        <div className="flex justify-between items-center w-1/2 px-0 py-1 text-gray-500 text-lg font-bold">
          <h4>Title</h4>
         
          <h4>Due date</h4>
          <h4>Status</h4>
        </div>
      </div> */
}
