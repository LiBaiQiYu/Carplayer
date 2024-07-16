'use client'
import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

export default function NestedList(prop: any) {
  const { click,brands } = prop;
  const [open, setOpen] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = (index: number) => {
    // setOpen(!open);
    setSelectedIndex(index)
    click(index)
  };

  const brandList:Brand[] = brands

  const listItem = brandList.map((item, index) => 
  <ListItemButton selected={selectedIndex === index} key={index} onClick={() => handleClick(index)}>
    <ListItemIcon>

    </ListItemIcon>
    <ListItemText primary={item.name} />
  </ListItemButton>
  )
  return (
    <List
      className='h-full overflow-auto'
      sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          品牌列表
        </ListSubheader>
      }
    >
      {listItem}

      {/* <ListItemButton onClick={handleClick}>
        <ListItemIcon>

        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse> */}
    </List>
  );
}