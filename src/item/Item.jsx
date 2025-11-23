const Item = ({ image, name, oldPrice, newPrice }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition">
      <img
        src={image}
        alt={name}
        className="h-40 w-full object-contain mb-4 mx-auto"
      />
      <h3 className="text-gray-800 font-semibold text-sm mb-2 truncate">{name}</h3>
      <div className="flex justify-center items-center gap-2">
        <span className="text-gray-400 line-through">${oldPrice}</span>
        <span className="text-blue-600 font-bold">${newPrice}</span>
      </div>
    </div>
  );
};

export default Item;
