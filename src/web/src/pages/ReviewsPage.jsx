import { ReviewsTable } from '../components';

export function ReviewsPage() {

  return (
    <>
      <h2>Reviews</h2>
      <p className="small"><i>Single query returns all the required data, already combined from different services.</i></p>
      <ReviewsTable />
    </>
  )
}
