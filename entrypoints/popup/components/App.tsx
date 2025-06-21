/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { UrlRewriteRule } from '../../../types/url-rewrite-rule';
import { RuleItem } from './RuleItem';

const styles = {
  container: css`
    padding: 0;
  `,
  title: css`
    color: #5f6368;
    margin: 0 0 16px 0;
    border-bottom: 1px solid #e8eaed;
    padding-bottom: 8px;
    font-size: 18px;
    font-weight: 500;
  `,
  rulesContainer: css`
    margin-bottom: 16px;
  `,
  loading: css`
    text-align: center;
    padding: 20px;
    color: #5f6368;
    font-size: 14px;
  `,
  addButton: css`
    background: #1a73e8;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    margin-top: 16px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #1557b0;
    }
  `
};

export const App: React.FC = () => {
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
    return <div css={styles.loading}>読み込み中...</div>;
  }

  return (
    <div css={styles.container}>
      <h2 css={styles.title}>
        URL置換ルール
      </h2>
      <div css={styles.rulesContainer}>
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
        css={styles.addButton}
        onClick={addRule}
      >
        新しいルールを追加
      </button>
    </div>
  );
};