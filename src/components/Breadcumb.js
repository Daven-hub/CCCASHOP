
import React from "react";
import { Link } from "react-router-dom";
import {ChevronRightIcon } from "lucide-react";

const Breadcrumb = ({data}) => {
  return (
    <nav aria-label="breadcrumb" className="text-sm text-text-secondary truncate">
      <ol style={{ display: "flex", listStyle: "none", padding: 0 }}>
        {data.map((item, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              // color: index === data.length - 1 ? "#0b304a" : "#062338",
              fontWeight: index === data.length - 1 ? "bold" : "normal",
            }}
          >
            {index < data.length - 1 ? (
              <>
                <Link to={item.path} style={{ textDecoration: "none" }}>
                  {item.label}
                </Link>
                {/* <span style={{ margin: "0 6px",fontSize:12 }}>></span> */}
                <ChevronRightIcon className='inline-flex mx-[5px]' size={14} />
              </>
            ) : (
              <span className="text-ellipsis text-text-primary text-nowrap">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
