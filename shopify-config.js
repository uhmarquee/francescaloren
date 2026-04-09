// shopify-config.js

const SHOPIFY_CONFIG = {
  storeDomain: "francescaloren.myshopify.com",                    
  storefrontAccessToken: "33f515e504b05a5a1cf0b892abd06f06", 
  apiVersion: "2026-04"
};

// Helper function to connect to Shopify
async function shopifyFetch(query, variables = {}) {
  const url = `https://${SHOPIFY_CONFIG.storeDomain}/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_CONFIG.storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables })
    });

    const result = await response.json();

    if (result.errors) {
      console.error("Shopify Error:", result.errors);
      throw new Error(result.errors[0].message);
    }

    return result.data;
  } catch (error) {
    console.error("Error connecting to Shopify:", error);
    throw error;
  }
}

// Make it available to index.html
window.shopifyFetch = shopifyFetch;
