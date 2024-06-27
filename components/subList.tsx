'use client'
import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

export default function NestedList(prop:any) {
  const { click } = prop;
  const [open, setOpen] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = (item:any) => {
    // setOpen(!open);
    setSelectedIndex(item.id)
    click(item.id)
  };
  const brandList = [
    {
      name: '现代Hyundai',
      id: 0,
    },
    {
      name: '起亚KIA',
      id: 1,
    },
    {
      name: '大众VW',
      id: 2,
    },
    {
      name: '荣威Roewe',
      id: 3,
    },
    {
      name: '丰田Toyota',
      id: 4,
    },
    {
      name: '本田Honda',
      id: 5,
    },
    {
      name: '马自达Mazda',
      id: 6,
    },
    {
      name: '名爵MG',
      id: 7,
    },
    {
      name: '尼桑Nissan',
      id: 8,
    },
  ]
  const listItem = brandList.map((item) => <ListItemButton selected={selectedIndex === item.id} key={item.id} onClick={() => handleClick(item)}>
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