const InputField = ({ type, placeholder, value, onChange, required }) => (
    <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="p-2 rounded border border-black focus:outline-none flex-1"
    />
);

export default InputField;
