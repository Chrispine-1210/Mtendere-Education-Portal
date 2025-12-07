#!/bin/bash

echo "🧹 Cleaning project dependencies..."

# Delete node_modules and package-lock.json
rm -rf node_modules
rm -f package-lock.json

# Clear dependencies in package.json
echo "🔄 Removing dependencies from package.json..."

# Use jq to safely edit package.json if installed
if command -v jq &> /dev/null
then
  jq 'del(.dependencies, .devDependencies)' package.json > tmp.$$.json && mv tmp.$$.json package.json
    echo "✅ Dependencies cleared using jq."
    else
      # Fallback: manual sed removal (less safe, for small projects)
        sed -i '/"dependencies": {/,/},/d' package.json
          sed -i '/"devDependencies": {/,/},/d' package.json
            echo "⚠️ Used sed fallback. Please verify package.json formatting."
            fi

            echo "🎉 Cleanup complete. Your project is dependency-free."