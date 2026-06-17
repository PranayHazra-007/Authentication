import React from "react";
import DataTable from "react-data-table-component";

const ProductTable = ({
  products,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      name: "Image",
      cell: (row) => (
        <img
          src={row.thumbnail}
          alt={row.title}
          width="60"
          height="60"
          style={{
            objectFit: "cover",
            borderRadius: "5px",
          }}
        />
      ),
    },

    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },

    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      cell: (row) => <>₹{row.price}</>,
    },

    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },

    {
      name: "Description",
      selector: (row) => row.description,
      wrap: true,
      grow: 2,
    },

    {
      name: "Actions",

      cell: (row) => (
        <div>

          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => onEdit(row)}
          >
            Edit
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(row.id)}
          >
            Delete
          </button>

        </div>
      ),
    },
  ];

  return (
    <div className="card shadow p-3 mt-4">

      <DataTable
        title="Manage Products"
        columns={columns}
        data={products}
        pagination
        highlightOnHover
        striped
        responsive
        persistTableHead
      />

    </div>
  );
};

export default ProductTable;