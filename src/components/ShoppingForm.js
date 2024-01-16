import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ListBox } from 'primereact/listbox';

const ShoppingForm = ({ onAddProduct }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const categoryOptions = categories.map(({ category_name }) => ({ label: category_name, value: category_name }));

  const handleInputChange = (e) => setInputText(e.target.value);

  const handleCategoryChange = (e) => setSelectedCategory(e.value);

  const handleAddProduct = () => {
    if (selectedCategory && inputText) {
      onAddProduct({ category: selectedCategory, product: inputText });
      setSelectedCategory('');
      setInputText('');
    }
  };

  return (
    <div className="shopping-form p-m-4 p-d-flex p-flex-column" style={{ width: 'auto', textAlign: 'center' }}>
      <h3>רשימת קניות</h3>
      <InputText value={inputText} onChange={handleInputChange} placeholder="מוצר" />
      <br /> <br />
      <div className="card flex justify-content-center">
        <ListBox
          className="w-full md:w-14rem"
          value={selectedCategory}
          options={categoryOptions}
          optionLabel="label"
          onChange={handleCategoryChange}
        />
      </div>
      <br />
      <Button label="הוסף" onClick={handleAddProduct} className="p-button-primary" />
      <br /> <br />
    </div>
  );
};

export default ShoppingForm;
