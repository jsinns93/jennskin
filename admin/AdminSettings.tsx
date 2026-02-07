import React, { useEffect, useState } from 'react';
import { api } from './api';

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.getSettings().then(setSettings);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      await api.updateSettings(settings);
      setMsg('Saved!');
      setTimeout(() => setMsg(''), 2000);
    } catch (err: any) {
      setMsg('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!settings) return <p className="text-slate-400">Loading...</p>;

  const links = settings.store_links || {};

  return (
    <div>
      <h1 className="text-3xl font-black text-slate-800 mb-8">Site Settings</h1>
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Brand Tagline</label>
          <input className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-blue focus:outline-none text-sm" value={settings.brand_tagline || ''} onChange={e => setSettings({ ...settings, brand_tagline: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">BPOM Number</label>
          <input className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-blue focus:outline-none text-sm" value={settings.bpom_number || ''} onChange={e => setSettings({ ...settings, bpom_number: e.target.value })} />
        </div>
        <h3 className="text-lg font-bold text-slate-700 pt-4">Store Links</h3>
        {['shopee', 'tokopedia', 'lazada', 'tiktok', 'whatsapp'].map(key => (
          <div key={key}>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{key}</label>
            <input className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-blue focus:outline-none text-sm" value={links[key] || ''} onChange={e => setSettings({ ...settings, store_links: { ...links, [key]: e.target.value } })} />
          </div>
        ))}
        <div className="flex items-center gap-4 pt-4">
          <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-brand-blue text-white rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-brand-dark disabled:opacity-50">{saving ? 'Saving...' : 'Save Settings'}</button>
          {msg && <span className="text-sm text-green-600 font-semibold">{msg}</span>}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
