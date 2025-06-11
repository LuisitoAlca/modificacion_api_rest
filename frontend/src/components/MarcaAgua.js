import React from 'react';
import logo from '../assets/LogoTransparente.png';

const MarcaAgua = () => (
  <div className="absolute top-6 left-10 flex items-center gap-2 z-50">
    <img src={logo} alt="Logo ATLAS" className="h-10 w-10 object-contain" />
    <span className="font-bold text-purple-700 text-2xl tracking-wide">ATLAS </span>
  </div>
);

export default MarcaAgua;