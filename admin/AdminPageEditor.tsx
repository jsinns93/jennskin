import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from './api';
import ImageUploader from './ImageUploader';

const sectionConfig: Record<string, { label: string; fields: { key: string; label: string; type: 'text' | 'textarea' | 'image' | 'array' | 'features' }[] }[]> = {
  home: [
    { label: 'Hero Section', fields: [
      { key: 'badge', label: 'Badge Text', type: 'text' },
      { key: 'title_line1', label: 'Title Line 1', type: 'text' },
      { key: 'title_line2', label: 'Title Line 2', type: 'text' },
      { key: 'title_line3', label: 'Title Line 3 (highlighted)', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { key: 'image', label: 'Hero Image', type: 'image' },
      { key: 'badge_text', label: 'Floating Badge Text', type: 'text' },
    ]},
    { label: 'Trust Ticker', fields: [
      { key: 'items', label: 'Ticker Items (comma separated)', type: 'array' },
    ]},
    { label: 'Best Sellers Section', fields: [
      { key: 'title_line1', label: 'Title Line 1', type: 'text' },
      { key: 'title_line2', label: 'Title Line 2', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'text' },
    ]},
    { label: 'Why Jennskin Section', fields: [
      { key: 'title_line1', label: 'Title Line 1', type: 'text' },
      { key: 'title_line2', label: 'Title Line 2', type: 'text' },
      { key: 'image', label: 'Section Image', type: 'image' },
      { key: 'features', label: 'Features', type: 'features' },
    ]},
    { label: 'CTA Section', fields: [
      { key: 'title_line1', label: 'Title Line 1', type: 'text' },
      { key: 'title_line2', label: 'Title Line 2', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
    ]},
  ],
  products: [
    { label: 'Products Page Header', fields: [
      { key: 'badge', label: 'Badge Text', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
    ]},
  ],
  about: [
    { label: 'About Intro', fields: [
      { key: 'badge', label: 'Badge Text', type: 'text' },
      { key: 'title_line1', label: 'Title Line 1', type: 'text' },
      { key: 'title_line2', label: 'Title Line 2 (highlighted)', type: 'text' },
      { key: 'title_line3', label: 'Title Line 3', type: 'text' },
      { key: 'paragraph1', label: 'Paragraph 1', type: 'textarea' },
      { key: 'paragraph2', label: 'Paragraph 2', type: 'textarea' },
      { key: 'image', label: 'About Image', type: 'image' },
      { key: 'quote', label: 'Quote', type: 'text' },
    ]},
    { label: 'Philosophy Items', fields: [
      { key: 'items', label: 'Philosophy Items', type: 'features' },
    ]},
  ],
  contact: [
    { label: 'Contact Header', fields: [
      { key: 'title_line1', label: 'Title Line 1', type: 'text' },
      { key: 'title_line2', label: 'Title Line 2', type: 'text' },
    ]},
    { label: 'Booth Information', fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'line1', label: 'Address Line 1', type: 'text' },
      { key: 'line2', label: 'Address Line 2', type: 'text' },
      { key: 'line3', label: 'Address Line 3', type: 'text' },
    ]},
  ],
};

const sectionKeyMap: Record<string, string[]> = {
  home: ['hero', 'ticker', 'bestsellers', 'why', 'cta'],
  products: ['header'],
  about: ['intro', 'philosophy'],
  contact: ['header', 'booth'],
};

const AdminPageEditor: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sections, setSections] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (slug) api.getPage(slug).then(data => setSections(data.sections || {}));
  }, [slug]);

  if (!slug || !sectionConfig[slug]) return <p>Invalid page</p>;

  const configs = sectionConfig[slug];
  const keys = sectionKeyMap[slug];

  const updateField = (sectionKey: string, fieldKey: string, value: any) => {
    setSections(prev => ({
      ...prev,
      [sectionKey]: { ...prev[sectionKey], [fieldKey]: value }
    }));
  };

  const saveSection = async (sectionKey: string, idx: number) => {
    setSaving(sectionKey);
    setMsg('');
    try {
      await api.updateSection(slug, sectionKey, sections[sectionKey] || {});
      setMsg(`${configs[idx].label} saved!`);
      setTimeout(() => setMsg(''), 2000);
    } catch (err: any) {
      setMsg('Error: ' + err.message);
    } finally {
      setSaving(null);
    }
  };

  const renderField = (sectionKey: string, field: { key: string; label: string; type: string }) => {
    const content = sections[sectionKey] || {};
    const value = content[field.key];

    if (field.type === 'image') {
      return <ImageUploader key={field.key} currentUrl={value || ''} onUpload={url => updateField(sectionKey, field.key, url)} label={field.label} />;
    }
    if (field.type === 'array') {
      return (
        <div key={field.key}>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{field.label}</label>
          <input className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-blue focus:outline-none text-sm" value={(value || []).join(', ')} onChange={e => updateField(sectionKey, field.key, e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))} />
        </div>
      );
    }
    if (field.type === 'features') {
      const items: any[] = value || content.items || [];
      return (
        <div key={field.key} className="space-y-3">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">{field.label}</label>
          {items.map((item: any, i: number) => (
            <div key={i} className="flex gap-2 items-start">
              {item.id !== undefined && (
                <input className="w-16 px-2 py-2 rounded-lg border border-slate-200 text-sm" value={item.id} onChange={e => { const updated = [...items]; updated[i] = { ...updated[i], id: e.target.value }; updateField(sectionKey, field.key, updated); }} placeholder="ID" />
              )}
              <input className="flex-1 px-2 py-2 rounded-lg border border-slate-200 text-sm" value={item.title} onChange={e => { const updated = [...items]; updated[i] = { ...updated[i], title: e.target.value }; updateField(sectionKey, field.key, updated); }} placeholder="Title" />
              <input className="flex-[2] px-2 py-2 rounded-lg border border-slate-200 text-sm" value={item.desc} onChange={e => { const updated = [...items]; updated[i] = { ...updated[i], desc: e.target.value }; updateField(sectionKey, field.key, updated); }} placeholder="Description" />
              <button type="button" className="text-red-400 hover:text-red-600 text-sm font-bold px-2" onClick={() => { const updated = items.filter((_: any, j: number) => j !== i); updateField(sectionKey, field.key, updated); }}>×</button>
            </div>
          ))}
          <button type="button" className="text-xs text-brand-blue font-bold hover:underline" onClick={() => { updateField(sectionKey, field.key, [...items, { id: String(items.length + 1).padStart(2, '0'), title: '', desc: '' }]); }}>+ Add Item</button>
        </div>
      );
    }
    if (field.type === 'textarea') {
      return (
        <div key={field.key}>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{field.label}</label>
          <textarea className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-blue focus:outline-none text-sm" rows={3} value={value || ''} onChange={e => updateField(sectionKey, field.key, e.target.value)} />
        </div>
      );
    }
    return (
      <div key={field.key}>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{field.label}</label>
        <input className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-blue focus:outline-none text-sm" value={value || ''} onChange={e => updateField(sectionKey, field.key, e.target.value)} />
      </div>
    );
  };

  const pageName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div>
      <h1 className="text-3xl font-black text-slate-800 mb-8">{pageName} Page</h1>
      {msg && <div className="mb-4 text-sm text-green-600 font-semibold bg-green-50 px-4 py-2 rounded-lg">{msg}</div>}
      <div className="space-y-8">
        {configs.map((section, idx) => {
          const sectionKey = keys[idx];
          return (
            <div key={sectionKey} className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-700 mb-5">{section.label}</h2>
              <div className="space-y-4">
                {section.fields.map(field => renderField(sectionKey, field))}
              </div>
              <div className="mt-5">
                <button onClick={() => saveSection(sectionKey, idx)} disabled={saving === sectionKey} className="px-6 py-2.5 bg-brand-blue text-white rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-brand-dark disabled:opacity-50">
                  {saving === sectionKey ? 'Saving...' : `Save ${section.label}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPageEditor;
