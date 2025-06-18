import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { UrlRewriteRule } from '../../types/url-rewrite-rule';

const RuleItem: React.FC<{
  rule: UrlRewriteRule;
  onUpdate: (rule: UrlRewriteRule) => void;
  onRemove: () => void;
}> = ({ rule, onUpdate, onRemove }) => {
  return (
    <div style={{ 
      background: '#f8f9fa', 
      border: '1px solid #e8eaed', 
      borderRadius: '6px', 
      padding: '16px', 
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          元のホスト名:
          <input
            type="text"
            placeholder="example.com"
            value={rule.fromHost}
            onChange={(e) => onUpdate({ ...rule, fromHost: e.target.value })}
            style={{ padding: '8px 12px', border: '1px solid #dadce0', borderRadius: '4px' }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          置換先ホスト名:
          <input
            type="text"
            placeholder="example.org"
            value={rule.toHost}
            onChange={(e) => onUpdate({ ...rule, toHost: e.target.value })}
            style={{ padding: '8px 12px', border: '1px solid #dadce0', borderRadius: '4px' }}
          />
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <input
              type="checkbox"
              checked={rule.enabled}
              onChange={(e) => onUpdate({ ...rule, enabled: e.target.checked })}
            />
            有効
          </label>
          <button 
            onClick={onRemove}
            style={{ 
              background: '#ea4335', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              padding: '6px 12px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [rules, setRules] = useState<UrlRewriteRule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    try {
      const result = await browser.storage.sync.get('urlRewriteRules');
      setRules(result.urlRewriteRules || []);
    } catch (error) {
      console.error('Failed to load rules:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveRules = async (newRules: UrlRewriteRule[]) => {
    try {
      await browser.storage.sync.set({ urlRewriteRules: newRules });
      setRules(newRules);
    } catch (error) {
      console.error('Failed to save rules:', error);
    }
  };

  const addRule = () => {
    const newRule: UrlRewriteRule = {
      fromHost: '',
      toHost: '',
      enabled: true
    };
    saveRules([...rules, newRule]);
  };

  const updateRule = (index: number, updatedRule: UrlRewriteRule) => {
    const newRules = rules.map((rule, i) => 
      i === index ? updatedRule : rule
    );
    saveRules(newRules);
  };

  const removeRule = (index: number) => {
    const newRules = rules.filter((_, i) => i !== index);
    saveRules(newRules);
  };

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      <h2 style={{ color: '#5f6368', marginBottom: '16px', borderBottom: '1px solid #e8eaed', paddingBottom: '8px' }}>
        URL置換ルール
      </h2>
      <div>
        {rules.map((rule, index) => (
          <RuleItem
            key={index}
            rule={rule}
            onUpdate={(updatedRule) => updateRule(index, updatedRule)}
            onRemove={() => removeRule(index)}
          />
        ))}
      </div>
      <button 
        onClick={addRule}
        style={{ 
          background: '#1a73e8', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          padding: '8px 16px',
          marginTop: '16px',
          cursor: 'pointer'
        }}
      >
        新しいルールを追加
      </button>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  try {
    const root = createRoot(container);
    root.render(<App />);
  } catch (error) {
    console.error('Error rendering React app:', error);
    container.innerHTML = '<div style="color: red;">エラーが発生しました: ' + error + '</div>';
  }
} else {
  console.error('Root element not found');
}