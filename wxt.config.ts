import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: 'URL Rewriter',
    description: '登録されたURLを新しいタブで開く際に、別のホスト名に置換する拡張機能',
    permissions: ['tabs', 'storage']
  },
  vite: () => ({
    esbuild: {
      jsx: 'automatic'
    }
  })
});
