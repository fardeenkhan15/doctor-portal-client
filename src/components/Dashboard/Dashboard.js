import React from 'react';
import { useTable, usePagination } from 'react-table';
import logo from '../../assets/icons/logo-full.svg';
import AdminProfile from '../../assets/images/admin.png';

const Dashboard = () => {
  const data = React.useMemo(
    () => [
      { id: 1, name: 'Phoenix Baker', date: 'Jan 4, 2022', status: 'Scheduled', doctor: 'Dr. Alex Ramirez' },
      { id: 2, name: 'Candice Wu', date: 'Jan 2, 2022', status: 'Pending', doctor: 'Dr. Michael May' },
      { id: 3, name: 'Lana Steiner', date: 'Jan 4, 2022', status: 'Cancelled', doctor: 'Dr. Jasmine Lee' },
      { id: 4, name: 'Drew Cano', date: 'Jan 8, 2022', status: 'Scheduled', doctor: 'Dr. Hardik Sharma' },
      { id: 5, name: 'Natali Craig', date: 'Jan 6, 2022', status: 'Pending', doctor: 'Dr. Alyana Cruz' },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      { Header: 'Patient', accessor: 'name' },
      { Header: 'Date', accessor: 'date' },
      { Header: 'Status', accessor: 'status' },
      { Header: 'Doctor', accessor: 'doctor' },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <button
            className="bg-blue-500 p-1 rounded"
            onClick={() => viewPatientDetails(row.original.id)}
          >
            View
          </button>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  const viewPatientDetails = (id) => {
    // Navigate to patient detail page
    console.log(`View details for patient with ID: ${id}`);
  };

  return (
    <div className="bg-[#131619] text-white p-6 gap-6 w-full h-full mx-auto overflow-hidden">
      <nav className="flex items-center rounded-t-2xl rounded-b-2xl justify-between p-4 bg-black">
        <img src={logo} alt="CarePulse Logo" className="h-10" />
        <div className="flex items-center">
          <div className="relative">
            <img src={AdminProfile} alt="Admin Profile" className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </nav>
      
      <div className="p-6">
        <h2 className="text-3xl mb-4">Welcome, Admin</h2>
        <p className="mb-4">Start day with managing new appointments</p>

        <div className="summary-cards flex justify-between mb-4">
          <div className="bg-gray-800 p-3 rounded-lg text-center flex-1 mx-2">
            <h3 className="text-lg">Total number of linked patients</h3>
            <p className="text-2xl">5</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg text-center flex-1 mx-2">
            <h3 className="text-lg">Total number of patients available</h3>
            <p className="text-2xl">32</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg text-center flex-1 mx-2">
            <h3 className="text-lg">Total number of PDFs uploaded</h3>
            <p className="text-2xl">56</p>
          </div>
        </div>

        <div className="patient-table mb-4">
          <h3 className="text-2xl mb-2">Linked Patients</h3>
          <table {...getTableProps()} className="w-full text-left">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()} className="py-1 px-2">
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()} className="py-1 px-2">
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="pagination mt-4">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="mr-1">
              {'<<'}
            </button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage} className="mr-1">
              {'<'}
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage} className="mr-1">
              {'>'}
            </button>
            <button onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage} className="mr-1">
              {'>>'}
            </button>
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
            <select
              value={pageSize}
              onChange={e => setPageSize(Number(e.target.value))}
              className="ml-2"
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
