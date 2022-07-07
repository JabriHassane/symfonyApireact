import React, {useEffect, useState} from "react";
import moment from "moment";
import Pagination from "../components/Pagination";
import invoicesAPI from "../services/invoicesAPI";

const InvoicesPage = (props) => {

    const STATUS_CLASSES = {
        PAID : "success",
        SENT : "secondary",
        CANCELLED : "danger"
    };

    // State
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    // Fetch invoices :
    const fetchInvoices = async () => {
        try {
            const data = await invoicesAPI.findAll();
            setInvoices(data);
        } catch (e) {
            console.log(e.response);
        }
    };
    useEffect(() => {
        fetchInvoices();
    }, []);

    //delete invoice
    const handleDelete = async id => {
        console.log(id);
        const originalInvoices = [...invoices];

        setInvoices(invoices.filter(invoice => invoice.id !== id));
        try {
            await invoicesAPI.delete(id);
        } catch (e) {
            setInvoices(originalInvoices);
            console.log(e.response);
        }
    };
    //Format date
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // handle search & pagination
    const handleSearch = event => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const itemsPerPage = 10;

    const filteredInvoices = invoices.filter(i => i.customer.firstName.toLowerCase().includes((search.toLowerCase())) || i.customer.lastName.toLowerCase().includes((search.toLowerCase())));

    const paginatedInvoices = Pagination.getData(filteredInvoices, currentPage, itemsPerPage);

    return (
        <>
            <h1>Liste of Invoices</h1>
            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control"
                       placeholder="Rechercher..."/>
            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Chronos</th>
                    <th>Costumer</th>
                    <th className="text-center">date</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Amount</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {paginatedInvoices.map(invoice =>
                    <tr key={invoice.id}>
                        <td>{invoice.chrono}</td>
                        <td><a href="#">{invoice.customer.firstName} {invoice.customer.lastName}</a></td>
                        <td className="text-center">{formatDate(invoice.sentAt)}</td>
                        <td className="text-center">
                          <span className={"badge bg-" + STATUS_CLASSES[invoice.status]}>
                                {invoice.status}
                          </span>
                        </td>
                        <td className="text-center">{invoice.amount}</td>
                        <td>
                            <button
                                className="btn btn-sm btn-info">
                                Edit
                            </button>
                            &nbsp;
                            <button
                                onClick={() => handleDelete(invoice.id)}
                                className="btn btn-sm btn-danger">
                                Delete
                            </button>
                        </td>
                    </tr>
                )}

                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChanged={handlePageChange}
                length={filteredInvoices.length}
            />
        </>
    );
};

export default InvoicesPage;