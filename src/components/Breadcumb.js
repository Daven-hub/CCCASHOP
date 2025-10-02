
import React from "react";
import { Link } from "react-router-dom"; // Si vous utilisez react-router

const Breadcrumb = ({data}) => {
  return (
    <nav aria-label="breadcrumb" className="text-[1rem] max-md:text-[0.75rem] truncate">
      <ol style={{ display: "flex", listStyle: "none", padding: 0 }}>
        {data.map((item, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              color: index === data.length - 1 ? "black" : "#062338",
              fontWeight: index === data.length - 1 ? "bold" : "normal",
            }}
          >
            {index < data.length - 1 ? (
              <>
                <Link to={item.path} style={{ textDecoration: "none" }}>
                  {item.label}
                </Link>
                <span style={{ margin: "0 6px" }}>/</span>
              </>
            ) : (
              <span className="text-ellipsis text-nowrap">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
