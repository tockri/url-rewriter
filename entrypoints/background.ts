interface UrlRewriteRule {
  fromHost: string;
  toHost: string;
  enabled: boolean;
}

export default defineBackground(() => {
  console.log('URL Rewriter background started', { id: browser.runtime.id });

  // URL置換ルールを取得
  const getRewriteRules = async (): Promise<UrlRewriteRule[]> => {
    const result = await browser.storage.sync.get('urlRewriteRules');
    return result.urlRewriteRules || [];
  };

  // URLを置換する関数
  const rewriteUrl = async (url: string): Promise<string> => {
    const rules = await getRewriteRules();
    
    for (const rule of rules) {
      if (!rule.enabled) continue;
      
      try {
        const urlObj = new URL(url);
        if (urlObj.hostname === rule.fromHost) {
          urlObj.hostname = rule.toHost;
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
      const newUrl = await rewriteUrl(tab.url);
      if (newUrl !== tab.url) {
        console.log(`Rewriting URL: ${tab.url} -> ${newUrl}`);
        browser.tabs.update(tab.id, { url: newUrl });
      }
    }
  });

  browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.url && tab.url) {
      const newUrl = await rewriteUrl(tab.url);
      if (newUrl !== tab.url) {
        console.log(`Rewriting URL: ${tab.url} -> ${newUrl}`);
        browser.tabs.update(tabId, { url: newUrl });
      }
    }
  });

  // デフォルトのルールを設定（初回起動時）
  browser.runtime.onInstalled.addListener(async () => {
    const rules = await getRewriteRules();
    if (rules.length === 0) {
      const defaultRules: UrlRewriteRule[] = [
        {
          fromHost: 'example.com',
          toHost: 'example.org',
          enabled: true
        }
      ];
      await browser.storage.sync.set({ urlRewriteRules: defaultRules });
      console.log('Default URL rewrite rules set');
    }
  });
});
