import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductService } from '../services/api';
import { LoadingSpinner } from '../components/Shared';
import { PackagePlus, Save, ArrowLeft, Trash2, Image as ImageIcon } from 'lucide-react';

export const ProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);

  const imageUrl = watch('image');

  useEffect(() => {
    ProductService.getCategories().then(res => setCategories(res.data));

    if (isEditMode) {
      ProductService.getById(id)
        .then(res => {
          reset(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          navigate('/dashboard');
        });
    }
  }, [id, isEditMode, reset, navigate]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (isEditMode) {
        await ProductService.update(id, data);
        alert('Product updated successfully (Simulated)');
      } else {
        await ProductService.create(data);
        alert('Product created successfully (Simulated)');
      }
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await ProductService.delete(id);
        alert('Product deleted successfully (Simulated)');
        navigate('/dashboard');
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-bold transition-colors">
          <ArrowLeft size={20} /> Back
        </button>
        {isEditMode && (
          <button 
            onClick={handleDelete}
            className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl font-bold transition-all"
          >
            <Trash2 size={20} /> Delete Product
          </button>
        )}
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center">
            <PackagePlus className="text-indigo-600" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900">{isEditMode ? 'Edit Product' : 'Create Product'}</h1>
            <p className="text-gray-500">{isEditMode ? `Updating product ID: ${id}` : 'Add a new product to your inventory'}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Product Title</label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. Premium Leather Jacket"
                />
                {errors.title && <p className="mt-1 text-xs text-red-500 font-medium">{errors.title.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('price', { required: 'Required', min: 0 })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="29.99"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <select
                    {...register('category', { required: 'Required' })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none capitalize"
                  >
                    <option value="">Select</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
                <input
                  {...register('image', { required: 'Image URL is required' })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="https://images.unsplash.com/..."
                />
                {errors.image && <p className="mt-1 text-xs text-red-500 font-medium">{errors.image.message}</p>}
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 min-h-[300px]">
              {imageUrl ? (
                <img src={imageUrl} alt="Preview" className="max-w-full max-h-[250px] object-contain mix-blend-multiply" />
              ) : (
                <div className="text-center text-gray-400">
                  <ImageIcon size={48} className="mx-auto mb-2 opacity-20" />
                  <p className="text-sm font-bold uppercase tracking-widest">Image Preview</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
            <textarea
              rows="5"
              {...register('description', { required: 'Description is required' })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Tell customers about your product..."
            ></textarea>
            {errors.description && <p className="mt-1 text-xs text-red-500 font-medium">{errors.description.message}</p>}
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={submitting}
              className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-70"
            >
              {submitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Save size={20} />}
              {isEditMode ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
