export function Button({ children, variant = "primary", ...props }) {
  const base = "px-5 py-2.5 rounded-xl font-medium transition-all duration-200";
  const styles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
  };

  return (
    <button className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
}
