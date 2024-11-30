'use client';
import RecentOrder from '@/components/domain/recentorder/RecentOrder';
import axios from 'axios';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const addCategory = async ({ name, parent, id }) => {
  try {
    if (id) {
      const newcategory = await axios.put('/api/categories', {
        name,
        parent,
        id,
      });
      return newcategory.data;
    } else {
      const newcategory = await axios.post('/api/categories', { name, parent });
      return newcategory.data;
    }
  } catch (error) {
    return new Error('category creation failed');
  }
};

const getCategories = async () => {
  try {
    const result = await axios.get('/api/categories');
    return result.data;
  } catch (error) {
    return new Error('category fetching failed');
  }
};

const Page = () => {
  const [category, setCategory] = useState('');
  const [parent, setParent] = useState(null);
  const [categoryId, setCategoryId] = useState('');
  const queryClient = useQueryClient();
  const thead = ['Category Name', 'Parent Category', 'Action'];

  // React Query
  const {
    data: categories,
    error,
    isLoading,
  } = useQuery(['category'], getCategories);
  const mutation = useMutation(addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(['category']);
      setCategory('');
      setParent('');
      setCategoryId('');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category.trim()) {
      alert('Category name cannot be empty');
      return;
    }
    mutation.mutate({ name: category, parent: parent, id: categoryId });
  };

  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleParentChange = (e) => setParent(e.target.value);

  const getCategoryFromChild = ({ name, parent, id }) => {
    setCategory(name);
    setParent(parent);
    setCategoryId(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching categories: {error.message}</div>;

  return (
    <div className="w-full">
      <h3 className="subtext">Add New Catalog</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 w-full mt-5">
          <input
            value={category ?? ''}
            onChange={handleCategoryChange}
            placeholder="Category Name"
            className="p-3 rounded-sm w-full text-md border border-slate-600 focus:border-blue-300"
          />
          <select
            value={parent ?? ''}
            onChange={handleParentChange}
            className="p-3 rounded-sm w-full text-md border border-slate-600 focus:border-blue-300"
          >
            <option value="">No parent selected</option>
            {categories?.data?.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="border border-blue-600 bg-blue-500 text-white p-3 rounded-md font-semibold mt-5"
        >
          Add
        </button>
      </form>

      <div>
        <RecentOrder
          title="Category List"
          thead={thead}
          body={categories?.data}
          page="category"
          receive={getCategoryFromChild}
        />
      </div>
    </div>
  );
};

export default Page;
