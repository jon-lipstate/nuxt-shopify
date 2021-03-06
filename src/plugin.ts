import ShopifyBuy from 'shopify-buy';
// @ts-ignore
import ShopifyModule from '<%= options.shopifyPath %>';
import { Context } from '@nuxt/types';

if (process.server || (process.client && !window.fetch)) {
  require('isomorphic-fetch');
}

export default async (
  ctx: Context & { $shopify: ShopifyBuy.Client },
  inject: (name: string, value: unknown) => void
): Promise<void> => {
  const config: ShopifyBuy.Config = {
    domain: '<%= options.domain %>',
    storefrontAccessToken: '<%= options.storefrontAccessToken %>',
  };

  const client: ShopifyBuy.Client = ShopifyModule.buildClient(config);

  // Inject shopify to the context as $shopify
  ctx.$shopify = client;
  inject('shopify', client);
};
