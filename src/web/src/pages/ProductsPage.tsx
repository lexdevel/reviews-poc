import { FunctionComponent } from 'react';
import { ProductsTable } from '../components';

export const ProductsPage: FunctionComponent = () => {

  return (
    <>
      <h2>Products</h2>
      <p className="small"><i>Single query returns all the required data, already combined from different services.</i></p>
      <ProductsTable />
    </>
  )
}
