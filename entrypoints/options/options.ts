interface UrlRewriteRule {
  fromHost: string;
  toHost: string;
  enabled: boolean;
}

export default defineUnlistedScript(() => {
  const rulesContainer = document.getElementById('rules-list') as HTMLDivElement;
  const ruleTemplate = document.getElementById('rule-template') as HTMLDivElement;
  const addRuleBtn = document.getElementById('add-rule') as HTMLButtonElement;
  const saveBtn = document.getElementById('save') as HTMLButtonElement;
  const resetBtn = document.getElementById('reset') as HTMLButtonElement;

  let rules: UrlRewriteRule[] = [];

  // ルールを読み込み
  const loadRules = async () => {
    const result = await browser.storage.sync.get('urlRewriteRules');
    rules = result.urlRewriteRules || [];
    renderRules();
  };

  // ルールを描画
  const renderRules = () => {
    rulesContainer.innerHTML = '';
    
    rules.forEach((rule, index) => {
      const ruleElement = createRuleElement(rule, index);
      rulesContainer.appendChild(ruleElement);
    });
  };

  // ルール要素を作成
  const createRuleElement = (rule: UrlRewriteRule, index: number): HTMLElement => {
    const template = ruleTemplate.cloneNode(true) as HTMLElement;
    template.style.display = 'block';
    template.id = '';

    const fromHostInput = template.querySelector('.from-host') as HTMLInputElement;
    const toHostInput = template.querySelector('.to-host') as HTMLInputElement;
    const enabledInput = template.querySelector('.enabled') as HTMLInputElement;
    const removeBtn = template.querySelector('.remove-rule') as HTMLButtonElement;

    fromHostInput.value = rule.fromHost;
    toHostInput.value = rule.toHost;
    enabledInput.checked = rule.enabled;

    // イベントリスナーを追加
    fromHostInput.addEventListener('input', () => {
      rules[index].fromHost = fromHostInput.value;
    });

    toHostInput.addEventListener('input', () => {
      rules[index].toHost = toHostInput.value;
    });

    enabledInput.addEventListener('change', () => {
      rules[index].enabled = enabledInput.checked;
    });

    removeBtn.addEventListener('click', () => {
      rules.splice(index, 1);
      renderRules();
    });

    return template;
  };

  // 新しいルールを追加
  const addRule = () => {
    rules.push({
      fromHost: '',
      toHost: '',
      enabled: true
    });
    renderRules();
  };

  // ルールを保存
  const saveRules = async () => {
    // 空のルールを除外
    const validRules = rules.filter(rule => rule.fromHost.trim() && rule.toHost.trim());
    
    await browser.storage.sync.set({ urlRewriteRules: validRules });
    
    // 保存完了メッセージを表示
    saveBtn.textContent = '保存完了!';
    setTimeout(() => {
      saveBtn.textContent = '保存';
    }, 2000);
  };

  // ルールをリセット
  const resetRules = async () => {
    if (confirm('すべてのルールをリセットしますか？')) {
      rules = [];
      await browser.storage.sync.set({ urlRewriteRules: [] });
      renderRules();
    }
  };

  // イベントリスナーを設定
  addRuleBtn.addEventListener('click', addRule);
  saveBtn.addEventListener('click', saveRules);
  resetBtn.addEventListener('click', resetRules);

  // 初期化
  loadRules();
});