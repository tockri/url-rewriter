/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { UrlRewriteRule } from '../../../types/url-rewrite-rule';

const styles = {
  container: css`
    background: #f8f9fa;
    border: 1px solid #e8eaed;
    border-radius: 6px;
    padding: 8px 12px;
    margin-bottom: 8px;
    display: grid;
    grid-template-columns: auto 1fr auto 1fr auto;
    align-items: center;
    gap: 8px;
    min-width: 0;
  `,
  enableButton: css`
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 16px;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  `,
  input: css`
    padding: 4px 8px;
    border: 1px solid #dadce0;
    border-radius: 4px;
    font-size: 13px;
    min-width: 0;
  `,
  arrow: css`
    color: #5f6368;
    font-size: 14px;
    font-weight: bold;
  `,
  deleteButton: css`
    background: #f1f3f4;
    color: #ea4335;
    border: 1px solid #dadce0;
    border-radius: 4px;
    padding: 4px 6px;
    cursor: pointer;
    font-size: 14px;
    width: 28px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #fce8e6;
    }
  `
};

interface RuleItemProps {
  rule: UrlRewriteRule;
  onUpdate: (rule: UrlRewriteRule) => void;
  onRemove: () => void;
}

export const RuleItem: React.FC<RuleItemProps> = ({ rule, onUpdate, onRemove }) => {
  const [localRule, setLocalRule] = useState<UrlRewriteRule>(rule);

  useEffect(() => {
    setLocalRule(rule);
  }, [rule]);

  const handleInputBlur = () => {
    onUpdate(localRule);
  };

  return (
    <div css={styles.container}>
      <button
        css={styles.enableButton}
        onClick={() => {
          const updatedRule = { ...localRule, enabled: !localRule.enabled };
          setLocalRule(updatedRule);
          onUpdate(updatedRule);
        }}
        title={localRule.enabled ? '有効（クリックで無効化）' : '無効（クリックで有効化）'}
      >
        {localRule.enabled ? '✅' : '❌'}
      </button>
      <input
        css={styles.input}
        type="text"
        placeholder="example.com"
        value={localRule.fromHost}
        onChange={(e) => setLocalRule({ ...localRule, fromHost: e.target.value })}
        onBlur={handleInputBlur}
      />
      <span css={styles.arrow}>→</span>
      <input
        css={styles.input}
        type="text"
        placeholder="example.org"
        value={localRule.toHost}
        onChange={(e) => setLocalRule({ ...localRule, toHost: e.target.value })}
        onBlur={handleInputBlur}
      />
      <button 
        css={styles.deleteButton}
        onClick={onRemove}
        title="削除"
      >
        🗑️
      </button>
    </div>
  );
};