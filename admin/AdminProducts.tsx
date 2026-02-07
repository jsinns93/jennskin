import React, { useEffect, useState } from 'react';
import { api } from './api';
import ImageUploader from './ImageUploader';

const CATEGORIES = ['Serum', 'Moisturizer', 'Deodorant', 'Cleanser', 'Toner'];

const emptyProduct = {
  slug: '', name: '', category: 'Serum', description: '', benefits: [] as string[],
  ingredients: [] as string[], image_url: '', scents: [] as string[], best_seller: false, sort_order: 0
};

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const load = () => api.getProducts().then(setProducts);
  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    setSaving(true); setMsg('');
    try {
      const data = {
        ...editing,
        benefits: typeof editing.benefits === 'string' ? editing.benefits.split(',').map((s: string) => s.trim()).filter(Boolean) : editing.benefits,
        ingredients: typeof editing.ingredients === 'string' ? editing.ingredients.split(',').map((s: string) => s.trim()).filter(Boolean) : editing.ingredients,
        scents: typeof editing.scents === 'string' ? (editing.scents ? editing.scents.split(',').map((s: string) => s.trim()).filter(Boolean) : null) : (editing.scents?.length ? editing.scents : null),
      };
      if (editing.id) {
        await api.updateProduct(editing.id, data);
      } else {
        await api.createProduct(data);
      }
      setEditing(null);
      await load();
      setMsg('Product saved!');
      setTimeout(() => setMsg(''), 2000);
    } catch (err: any) {
      setMsg('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this product?')) return;
    await api.deleteProduct(id);
    await load();
  };

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-slate-800">{editing.id ? 'Edit Product' : 'New Product'}</h1>
          <button onClick={() => setEditing(null)} className="text-sm text-slate-500 hover:text-slate-700 font-bold">← Back to List</button>
        </div>
        {msg && <div className="mb-4 text-sm text-green-600 font-semibold bg-green-50 px-4 py-2 rounded-lg">{msg}</div>}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Name</label>
              <input className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-blue focus:outline-none text-sm" value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value, slug: editing.id ? editing.slug : e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Slug</label>
              <input className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-blue focus:outline-none text-sm" value={editing.slug} onChange={e => setEditing({ ...editing, slug: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
              <select className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-blue focus:outline-none text-sm" value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sort Order</label>
              <input type="number" className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-blue focus:outline-none text-sm" value={editing.sort_order || 0} onChange={e => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
            <textarea className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-blue focus:outline-none text-sm" rows={3} value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} />
          </div>
          <ImageUploader currentUrl={editing.image_url} onUpload={url => setEditing({ ...editing, image_url: url })} label="Product Image" />
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Benefits (comma separated)</label>
            <input className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-blue focus:outline-none text-sm" value={Array.isArray(editing.benefits) ? editing.benefits.join(', ') : editing.benefits} onChange={e => setEditing({ ...editing, benefits: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ingredients (comma separated)</label>
            <input className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-blue focus:outline-none text-sm" value={Array.isArray(editing.ingredients) ? editing.ingredients.join(', ') : editing.ingredients} onChange={e => setEditing({ ...editing, ingredients: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Scents (comma separated, leave empty if none)</label>
            <input className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-blue focus:outline-none text-sm" value={Array.isArray(editing.scents) ? (editing.scents || []).join(', ') : editing.scents || ''} onChange={e => setEditing({ ...editing, scents: e.target.value })} />
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="bestSeller" checked={editing.best_seller} onChange={e => setEditing({ ...editing, best_seller: e.target.checked })} className="w-4 h-4" />
            <label htmlFor="bestSeller" className="text-sm font-bold text-slate-600">Best Seller</label>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-brand-blue text-white rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-brand-dark disabled:opacity-50">{saving ? 'Saving...' : 'Save Product'}</button>
            <button onClick={() => setEditing(null)} className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-slate-200">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-slate-800">Products</h1>
        <button onClick={() => setEditing({ ...emptyProduct })} className="px-5 py-2.5 bg-brand-blue text-white rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-brand-dark">+ Add Product</button>
      </div>
      {msg && <div className="mb-4 text-sm text-green-600 font-semibold bg-green-50 px-4 py-2 rounded-lg">{msg}</div>}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase">Image</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase">Name</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase">Category</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase">Best Seller</th>
              <th className="text-right px-4 py-3 text-xs font-bold text-slate-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3"><div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200"><img src={p.image_url} alt="" className="w-full h-full object-cover" /></div></td>
                <td className="px-4 py-3 font-semibold text-sm">{p.name}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{p.category}</td>
                <td className="px-4 py-3 text-sm">{p.best_seller ? '⭐' : '—'}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => setEditing({ ...p, benefits: p.benefits || [], ingredients: p.ingredients || [], scents: p.scents || [] })} className="text-sm text-brand-blue font-bold hover:underline">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-sm text-red-500 font-bold hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && <p className="text-center py-8 text-slate-400 text-sm">No products yet</p>}
      </div>
    </div>
  );
};

export default AdminProducts;
