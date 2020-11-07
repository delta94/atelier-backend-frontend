import React from 'react';
import logoa from '../../../img-new/icon-a.svg';
import './logoa.scss';

class Alogo extends React.Component {
   render() {
      return (
         <div className="header-logo-only text-right">
              <img src={logoa} alt="alogo" /> 
         </div>
      );
   }
}
export default Alogo;