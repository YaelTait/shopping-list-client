// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopList from './components/ShopList';
import OrderSummary from './components/OrderSummary';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShopList />} />
        <Route path="/order-summary" element={<OrderSummary />} />
      </Routes>
    </Router>
  );
};

export default App;
