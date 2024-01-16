import React from 'react';
import Navbar from './Navbar';
import SidePanel from './SidePanel';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className=''>
        <div className='row'>
          <div className='col-lg-2' style={{width:"280px"}}>
            <SidePanel />
          </div>
          <div className='col-lg-8'>
            <div className='row'>
              <div className='col-lg-12'>LIFE</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
