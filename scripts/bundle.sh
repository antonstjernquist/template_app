

# Retrieve name from package.json
name=$(node -p "require('./package.json').name")

# Save as variable
destination="./$name"

echo "Bundling $name"

# Remove old bundle
rm -rf $destination

# Copy dist
mkdir $destination
cp -r dist $destination/dist
cp -r web $destination/web

# Copy config files
cp config.json $destination
cp framework.json $destination
cp npwd.config.ts $destination
cp fxmanifest.lua $destination