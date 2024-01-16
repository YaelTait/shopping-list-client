import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';

const ShoppingTable = ({ selectedProducts }) => {
  if (!selectedProducts.length) {
    return null;
  }

  const productMap = selectedProducts.reduce((map, { category, product }) => {
    if (!map[category]) {
      map[category] = [];
    }

    const existingProduct = map[category].find((p) => p.product === product);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      map[category].push({ product, quantity: 1 });
    }

    return map;
  }, {});

  const columns = Object.keys(productMap).map((category) => (
    <Column
      key={category}
      field={category}
      header={`${category} - ${productMap[category].reduce((sum, { quantity }) => sum + quantity, 0)} `}
      style={{ width: 'auto' }}
    />
  ));

  const data = Array.from({ length: Math.max(...Object.values(productMap).map((products) => products.length)) }, (_, index) => {
    const rowData = {};
    Object.keys(productMap).forEach((category) => {
      const productInfo = productMap[category][index];
      if (productInfo) {
        rowData[category] = productInfo.quantity > 1 ? `${productInfo.product} (${productInfo.quantity})` : productInfo.product;
      }
    });
    return rowData;
  });

  return (
    <Card>
      <DataTable value={data} style={{ width: 'auto' }} responsive>
        {columns}
      </DataTable>
    </Card>
  );
};

export default ShoppingTable;
