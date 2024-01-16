import { Card } from 'primereact/card';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/shoppingListSlice';
import { increment } from '../redux/totalItemsSlice';
import { useNavigate } from 'react-router-dom';
import ShoppingForm from './ShoppingForm';
import ShoppingTable from './ShoppingTable';
import { Button } from 'primereact/button';

const ShopList = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const totalItems = useSelector((state) => state.totalItems.count);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddProduct = (product) => {
    setSelectedProducts([...selectedProducts, product]);
    dispatch(addItem(product));
    dispatch(increment());
  };

  return (
    <div className="flex flex-wrap justify-content-center gap-2">

      <Card className="p-m-4 p-d-flex p-flex-column" style={{ width: '50%', textAlign: 'center' }}>
        <p>מוצרים בסל: {totalItems}</p>
        <ShoppingForm onAddProduct={handleAddProduct} />

        <ShoppingTable selectedProducts={selectedProducts} />


        <Button label="סיים הזמנה" onClick={() => navigate('/order-summary')} />
      </Card>
    </div>
  );
};

export default ShopList;
