import makeStyles from "@mui/styles/makeStyles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ItemVO } from "../types/vo";
import { Theme } from "@mui/material/styles";
import { FC } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  completed: {
    color: "#808080",
  },
}));

type Props = {
  items: ItemVO[];
  onCheckItem: (id: string, isDone: boolean) => Promise<void>;
  onDeleteItem: (id: string) => Promise<void>;
};

const ItemList: FC<Props> = ({ items, onCheckItem, onDeleteItem }) => {
  const styles = useStyles();

  const onClickCheckbox = (ItemVO: ItemVO) => {
    onCheckItem(ItemVO.id, !ItemVO.isDone);
  };

  const onClickDelete = (id: string) => {
    onDeleteItem(id);
  };

  return (
    <List className={styles.root}>
      {items.map((ItemVO) => {
        return (
          <ListItem
            key={ItemVO.id}
            dense
            secondaryAction={
              <>
                <IconButton edge="end" onClick={() => onClickDelete(ItemVO.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={ItemVO.isDone}
                // tabIndex={-1}
                onClick={() => onClickCheckbox(ItemVO)}
              />
            </ListItemIcon>
            <ListItemText
              id={ItemVO.id}
              primary={ItemVO.content}
              className={ItemVO.isDone ? styles.completed : undefined}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default ItemList;
