

# Retrieve name from package.json
name=$(node -p "require('./package.json').name")

# Save as variable
source="./$name"
destination="/mnt/f/fivem/dev/ride-app/txData/QBCoreFramework_A84CB6.base/resources/[standalone]"

echo "Moving $name"

# Move source to destination
cp -r $source $destination

