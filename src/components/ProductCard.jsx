import { Edit2, Trash2, Star, Box } from 'lucide-react';

export const ProductCard = ({ product, onEdit, onDelete }) => {
  // Fake API data: price, title, image, category, rating
  const { title, price, category, image, rating } = product;

  // Let's randomly assign stock status since Fake Store API doesn't have it natively
  // but requirements asked for 'Stock Status'. We base it off id just to be deterministic.
  const inStock = product.id % 5 !== 0; 
  const stockText = inStock ? 'In Stock' : 'Out of Stock';

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md hover:ring-slate-300">
      <div className="aspect-h-1 aspect-w-1 overflow-hidden bg-white p-6 sm:aspect-none sm:h-64 flex justify-center items-center">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-contain object-center sm:h-full sm:w-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-slate-900 line-clamp-2" title={title}>
              {title}
            </h3>
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 ml-2 whitespace-nowrap">
              {category}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="ml-1 text-sm font-medium text-slate-700">{rating?.rate || 0}</span>
            </div>
            <span className="text-sm text-slate-500">({rating?.count || 0} reviews)</span>
          </div>
        </div>
        <div className="mt-4 flex flex-1 flex-col justify-end">
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold tracking-tight text-slate-900">${Number(price).toFixed(2)}</p>
            <div className={`flex items-center text-sm font-medium ${inStock ? 'text-emerald-600' : 'text-red-600'}`}>
              <Box className="mr-1.5 h-4 w-4" />
              {stockText}
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <button
              onClick={() => onEdit(product)}
              className="flex flex-1 items-center justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors"
            >
              <Edit2 className="mr-2 h-4 w-4 text-slate-500" />
              Edit
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="flex flex-1 items-center justify-center rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-red-100 hover:bg-red-100 transition-colors"
            >
              <Trash2 className="mr-2 h-4 w-4 text-red-500" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
