import connectDB from '@/lib/db';
import Category from '@/modals/Category';

export async function handler(req, res) {
  const { method } = req;
  await connectDB();

  try {
    if (method === 'POST') {
      const { name, parent } = req.body;
      const category = await Category.create({
        name,
        parent_category: parent,
      });

      if (!category) {
        return res
          .status(500)
          .json({ error: 'Category creation failed', success: false });
      }

      return res
        .status(201)
        .json({
          message: 'Category created successfully',
          success: true,
          data: category,
        });
    }

    if (method === 'GET') {
      if (req.query?.id) {
        const category = await Category.findOne({ _id: req.query.id }).populate(
          'parent_category'
        );

        if (!category) {
          return res
            .status(404)
            .json({ message: 'Category not found', success: false });
        }

        return res.status(200).json({ success: true, data: category });
      } else {
        const categories = await Category.find().populate('parent_category');
        return res.status(200).json({ success: true, data: categories });
      }
    }

    if (method === 'PUT') {
      const { id, name, parent } = req.body;
      const updateCategory = await Category.updateOne(
        { _id: id },
        { name, parent_category: parent }
      );

      if (updateCategory.modifiedCount === 0) {
        return res
          .status(404)
          .json({ message: 'Category not found for update', success: false });
      }

      return res
        .status(200)
        .json({ message: 'Category updated successfully', success: true });
    }

    if (method === 'DELETE') {
      if (req.query?.id) {
        const deleteCategory = await Category.deleteOne({ _id: req.query.id });

        if (deleteCategory.deletedCount === 0) {
          return res
            .status(404)
            .json({
              message: 'Category not found for deletion',
              success: false,
            });
        }

        return res
          .status(200)
          .json({ message: 'Category deleted successfully', success: true });
      } else {
        return res
          .status(400)
          .json({ message: 'Category ID is required', success: false });
      }
    }

    // Method Not Allowed
    return res
      .status(405)
      .json({ message: 'Method Not Allowed', success: false });
  } catch (error) {
    // Catch-all for unexpected server errors
    res
      .status(500)
      .json({
        message: 'Internal server error',
        error: error.message,
        success: false,
      });
  }
}
