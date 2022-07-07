import React, {useEffect, useState} from "react";
import axios from "axios";
import Pagination from "../components/Pagination";

const CustomersPage = props => {

  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/api/customers")
        .then(response => response.data['hydra:member'])
        .then(data => setCustomers(data))
        .catch(error => console.log(error.response))
    ;
  }, []);

  const handleDelete = id => {
    console.log(id);
    const originalCustomers = [...customers];

    setCustomers(customers.filter(customer => customer.id !== id));

    axios
        .delete("http://127.0.0.1:8000/api/customers/" + id)
        .then(response => console.log(id+ "OK") )
        .catch(e => {
          setCustomers(originalCustomers);
          console.log(e.response);
        });
  };

  const handleSearch = event => {
    const value = event.currentTarget.value;
    setSearch(value);
    setCurrentPage(1);
  }

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 10;

  const filteredCustomers = customers.filter(c => c.firstName.toLowerCase().includes((search.toLowerCase())) || c.lastName.toLowerCase().includes((search.toLowerCase())));

  const paginatedCustomers = Pagination.getData(filteredCustomers, currentPage, itemsPerPage);

  return <>
    <h1>Customers List</h1>
    <div className="form-group">
      <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher..."/>
    </div>
    <table className="table table-hover">
      <thead>
      <tr>
        <th>id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Enterprise</th>
        <th className="text-center">Factures</th>
        <th className="text-center">Total amount</th>
        <th/>
      </tr>
      </thead>
      <tbody>
      {paginatedCustomers.map(customer => (
          <tr key={customer.id}>
            <td>{customer.id}</td>
            <td><a href="">{customer.firstName} {customer.lastName}</a></td>
            <td>{customer.email}</td>
            <td>{customer.company}</td>
            <td className="text-center">
              <span className="badge bg-secondary">{customer.invoices.length}</span>
            </td>
            <td className="text-center">
              <span className="badge bg-light">{customer.totalAmount.toFixed(2)} €</span>
            </td>
            <td>
              <button
                  onClick={() => handleDelete(customer.id)}
                  disabled={customer.invoices.length > 0}
                  className="btn btn-sm btn-danger">
                Delete
              </button>
            </td>
          </tr>
      ))}

      </tbody>
    </table>

    {itemsPerPage < filteredCustomers.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={filteredCustomers.length}
          onPageChanged={handleChangePage}
      />
    )}

    </>;
}
export default CustomersPage;