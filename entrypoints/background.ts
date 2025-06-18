import { UrlRewriteRule } from '../types/url-rewrite-rule';

export default defineBackground(() => {
  let cachedRules: UrlRewriteRule[] = [];

  // URL置換ルールを取得してキャッシュ
  const loadRewriteRules = async (): Promise<void> => {
    const result = await browser.storage.sync.get('urlRewriteRules');
    cachedRules = result.urlRewriteRules || [];
  };

  // URLを置換する関数（同期版）
  const rewriteUrl = (url: string): string => {
    console.log('Checking URL:', url, 'against', cachedRules.length, 'rules');
    for (const rule of cachedRules) {
      if (!rule.enabled) {
        console.log('Rule disabled:', rule);
        continue;
      }
      
      try {
        const urlObj = new URL(url);
        if (urlObj.hostname === rule.fromHost) {
          urlObj.hostname = rule.toHost;
          console.log('URL rewritten:', url, '->', urlObj.toString());
          return urlObj.toString();
        }
      } catch (error) {
        console.error('Invalid URL:', url, error);
      }
    }
    
    return url;
  };

  // タブの作成・更新を監視
  browser.tabs.onCreated.addListener(async (tab) => {
    if (tab.url && tab.id) {
      const newUrl = rewriteUrl(tab.url);
      if (newUrl !== tab.url) {
        await browser.tabs.update(tab.id, { url: newUrl });
      }
    }
  });

  browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.url && tab.url) {
      const newUrl = rewriteUrl(tab.url);
      if (newUrl !== tab.url) {
        await browser.tabs.update(tabId, { url: newUrl });
      }
    }
  });

  // ストレージの変更を監視してキャッシュを更新
  browser.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync' && changes.urlRewriteRules) {
      cachedRules = changes.urlRewriteRules.newValue || [];
      console.log('Rules updated:', cachedRules);
    }
  });

  // 初期化：起動時にルールをロードし、デフォルトルールを設定
  browser.runtime.onInstalled.addListener(async () => {
    await loadRewriteRules();
    if (cachedRules.length === 0) {
      const defaultRules: UrlRewriteRule[] = [
        {
          fromHost: 'example.com',
          toHost: 'example.org',
          enabled: true
        }
      ];
      await browser.storage.sync.set({ urlRewriteRules: defaultRules });
      cachedRules = defaultRules;
    }
  });

  // 起動時にルールをロード
  browser.runtime.onStartup.addListener(async () => {
    await loadRewriteRules();
  });

  // 初回実行時もルールをロード
  loadRewriteRules();
});
