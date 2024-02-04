import { Twirl as Hamburger } from 'hamburger-react'
import {  Drawer } from 'antd';
import { useState } from 'react';

function MenuAnimation() {

  const [open, setOpen] = useState(false);

    const showDrawer = () => {
    setOpen(true);
};

    const onClose = () => {
    setOpen(false);
};
    return (
    <div className='menuu d-md-none'>
        <Hamburger onToggle={showDrawer}  toggled={open} distance="sm" size={25} />
    <Drawer  className='ind' title="Menu" style={{ position: 'relative',zIndex: 3,}} onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        </Drawer>
    </div>
)
}

export default MenuAnimation
