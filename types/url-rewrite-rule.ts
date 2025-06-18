export interface UrlRewriteRule {
  readonly fromHost: string;
  readonly toHost: string;
  readonly enabled: boolean;
}