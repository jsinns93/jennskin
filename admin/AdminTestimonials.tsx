import React, { useEffect, useState } from 'react';
import { api } from './api';

const AdminTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const load = () => api.getTestimonials().then(setTestimonials);
  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    setSaving(true); setMsg('');
    try {
      if (editing.id) {
        await api.updateTestimonial(editing.id, editing);
      } else {
        await api.createTestimonial(editing);
      }
      setEditing(null);
      await load();
      setMsg('Testimonial saved!');
      setTimeout(() => setMsg(''), 2000);
    } catch (err: any) {
      setMsg('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this testimonial?')) return;
    await api.deleteTestimonial(id);
    await load();
  };

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-slate-800">{editing.id ? 'Edit Testimonial' : 'New Testimonial'}</h1>
          <button onClick={() => setEditing(null)} className="text-sm text-slate-500 hover:text-slate-700 font-bold">← Back to List</button>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Name</label>
            <input className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-blue focus:outline-none text-sm" value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Role</label>
            <input className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-blue focus:outline-none text-sm" value={editing.role || ''} onChange={e => setEditing({ ...editing, role: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Testimonial Text</label>
            <textarea className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-blue focus:outline-none text-sm" rows={4} value={editing.text} onChange={e => setEditing({ ...editing, text: e.target.value })} />
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-brand-blue text-white rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-brand-dark disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
            <button onClick={() => setEditing(null)} className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-slate-200">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-slate-800">Testimonials</h1>
        <button onClick={() => setEditing({ name: '', text: '', role: '' })} className="px-5 py-2.5 bg-brand-blue text-white rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-brand-dark">+ Add Testimonial</button>
      </div>
      {msg && <div className="mb-4 text-sm text-green-600 font-semibold bg-green-50 px-4 py-2 rounded-lg">{msg}</div>}
      <div className="space-y-4">
        {testimonials.map(t => (
          <div key={t.id} className="bg-white rounded-xl border border-slate-200 p-5 flex items-start justify-between">
            <div>
              <p className="font-bold text-slate-800">{t.name} <span className="text-slate-400 font-normal text-sm">• {t.role}</span></p>
              <p className="text-sm text-slate-500 mt-1 italic">"{t.text}"</p>
            </div>
            <div className="flex gap-2 flex-shrink-0 ml-4">
              <button onClick={() => setEditing({ ...t })} className="text-sm text-brand-blue font-bold hover:underline">Edit</button>
              <button onClick={() => handleDelete(t.id)} className="text-sm text-red-500 font-bold hover:underline">Delete</button>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && <p className="text-center py-8 text-slate-400 text-sm">No testimonials yet</p>}
      </div>
    </div>
  );
};

export default AdminTestimonials;
