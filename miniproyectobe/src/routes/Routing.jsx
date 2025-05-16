import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import TheAmazingCRUD from '../pages/TheAmazingCRUD';




function Routing() {


  return (
    <div>
      <Router>
        <Routes>
      
                        

                    <Route path="/" element={<TheAmazingCRUD/>}/>

                      
                            
        </Routes>
      </Router>
    </div>
  );
}


export default Routing