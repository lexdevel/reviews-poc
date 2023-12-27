import { ProductsTable } from '../components/ProductsTable';

export function ProductsPage() {

  return (
    <>
      <h2>Products</h2>
      <p className="small"><i>Single query returns all the required data, already combined from different services.</i></p>
      <ProductsTable />
    </>
  )
}
