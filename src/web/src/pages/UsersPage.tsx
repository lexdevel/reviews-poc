import { FunctionComponent } from 'react';
import { UsersTable } from '../components';

export const UsersPage: FunctionComponent = () => {

  return (
    <>
      <h2>Users</h2>
      <p className="small"><i>Single query returns all the required data, already combined from different services.</i></p>
      <UsersTable />
    </>
  )
}
