sh ./install_node.sh && rm -rf ./node_modules && rm -f package-lock.json && npm update --depth 5 @babel/preset-env && npm update --depth 5 @babel/compat-data && npm run deploy-online
