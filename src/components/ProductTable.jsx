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
    <div className="d-flex gap-1 flex-wrap">
      {row.images && row.images.length > 0 ? (
        row.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="product"
            width="50"
            height="50"
            style={{
              objectFit: "cover",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          />
        ))
      ) : (
        <img
          src={row.thumbnail}
          alt="product"
          width="50"
          height="50"
          style={{
            objectFit: "cover",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
      )}
    </div>
  ),
  width: "200px",
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