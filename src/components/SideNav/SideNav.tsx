import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItems from './ListItem';
import logo from '../../assets/logo.svg';
import './SideNav.scss';

const SideNav = () => {
  return (
    <Drawer variant='permanent' anchor='left'>
      <List>
        <div className='logo'>
          <a href='https://uppersanpedrowhip.org/'>
            <img src={logo} alt='Web-Based Hydrologic Informational Portal logo' />
          </a>
        </div>
        <ListItems />
      </List>
    </Drawer>
  );
};

export default SideNav;
