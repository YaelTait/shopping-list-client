import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import classNames from 'classnames';
import { OrderList } from 'primereact/orderlist';
import { selectShoppingList } from '../redux/shoppingListSlice';

const OrderSummary = () => {

  const [products, setProducts] = useState(useSelector(selectShoppingList));
  const toast = useRef(null);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      address: '',
      email: '',
    },
    validate: (data) => {
      let errors = {};

      if (!data.fullName) {
        errors.fullName = 'שם הוא שדה חובה';
      }

      if (!data.address) {
        errors.address = 'כתובת זה שדה חובה';
      }

      if (!data.email) {
        errors.email = 'מייל זה שדה חובה';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'פורמט לא חוקי של מייל';
      }

      return errors;
    },
    onSubmit: async (data) => {
      try {
        const response = await fetch('https://localhost:44318/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            FullName: data.fullName,
            FullAddress: data.address,
            Email: data.email,
            OrderDetailsJson: JSON.stringify(
              products.map(item => `${item.category}: ${item.product}`).join(', ')
            ),
          }),
        });

        // Check response and show toast
        if (response.ok) {
          toast.current.show({ severity: 'success', summary: 'ההזמנה נשלחה', detail: 'ההזמנה שלחה נשלחה בהצלחה' });
        } else {
          toast.current.show({ severity: 'error', summary: 'ההזמנה נכשלה', detail: 'ההזמנה שלך לא הצליחה להיקלט במערכת' });
        }

      } catch (error) {
        console.error('טעות ביצירת ההזמנה', error);
      }
    },
  });

  const itemTemplate = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <div className="flex-1 flex flex-column gap-2 xl:mr-8">
          <span className="font-bold">{item.product}</span>
          <div className="flex align-items-center gap-2">
            <i className="pi pi-tag text-sm"></i>
            <span>{item.category}</span>
          </div>
        </div>

      </div>
    );
  };


  return (

    <div className="flex flex-wrap justify-content-center gap-2">

      <Card className="p-m-4 p-d-flex p-flex-column" style={{ width: '400px', textAlign: 'right' }}>
        <Toast ref={toast} />
        <h1 className="p-text-right">סיכום הזמנה</h1>
        <form onSubmit={formik.handleSubmit} className="p-fluid">
          <div className="p-field">
            <label htmlFor="fullName" className="p-text-right">שם</label>
            <InputText
              id="fullName"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              className={classNames({ 'p-invalid': formik.touched.fullName && formik.errors.fullName })}
            />
            {formik.touched.fullName && <small className="p-error">{formik.errors.fullName}</small>}
          </div>

          <div className="p-field">
            <label htmlFor="address" className="p-text-right">כתובת</label>
            <InputText
              id="address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              className={classNames({ 'p-invalid': formik.touched.address && formik.errors.address })}
            />
            {formik.touched.address && <small className="p-error">{formik.errors.address}</small>}
          </div>

          <div className="p-field">
            <label htmlFor="email" className="p-text-right">מייל</label>
            <InputText
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className={classNames({ 'p-invalid': formik.touched.email && formik.errors.email })}
            />
            {formik.touched.email && <small className="p-error">{formik.errors.email}</small>}
          </div>
          <br />

          <OrderList onChange={(e) => setProducts(e.value)}
            value={products} itemTemplate={itemTemplate} header="מוצרים"></OrderList>
          <div className="p-field">
            <br />

            <Button type="submit" label="אשר הזמנה" className="p-mt-2" />
          </div>
        </form>


      </Card>
    </div>
  );
};

export default OrderSummary;





