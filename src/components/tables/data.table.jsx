import React from "react";

export const DataTable = ({
  columns,
  data = [],
  showDelete = false,
  onDelete,
}) => {
  // Defensive: Ensure data is an array
  if (!Array.isArray(data)) {
    return (
      <div className="overflow-x-auto bg-darkBlue rounded-md">
        <p className="text-center text-white p-4">No data found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-darkBlue rounded-md">
      <table className="min-w-full border border-white text-sm text-left">
        <thead className="text-white uppercase bg-darkBlue">
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} className="px-4 py-2">
                {col.header}
              </th>
            ))}
            {showDelete && <th className="px-4 py-2">Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (showDelete ? 1 : 0)}
                className="px-4 py-2 text-center"
              >
                No data found.
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                // Use unique key fallback to index if accessor is missing or duplicate keys exist
                key={
                  item[columns[0].accessor] != null
                    ? `${item[columns[0].accessor]}-${index}`
                    : index
                }
                className="border-t border-white hover:bg-blue-950 transition"
              >
                {columns.map((col) => (
                  <td key={col.accessor} className="px-4 py-2">
                    {col.format
                      ? col.format(item[col.accessor], item)
                      : item[col.accessor]}
                  </td>
                ))}
                {showDelete && (
                  <td className="px-4 py-2">
                    <button
                      onClick={() => onDelete(item[columns[0].accessor])}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
