import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ links }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {links.map((link, index) => (
          <li key={index} className="inline-flex items-center">
            {index === links.length+1  ? (
              <span className="text-sm font-medium text-primary dark:text-gray-400">
                {link.label}
              </span>
            ) : (
              <Link
                to={link.path}
                className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-secondary"
              >
                {index !== 0 && (
                  <svg
                    className="w-4 h-4 mx-1 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
