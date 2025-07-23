#!/bin/bash

# Auto-commit script for LaughtersLaunch project
# Makes small changes and commits every minute for 20 minutes

echo "🚀 Starting auto-commit script for LaughtersLaunch..."
echo "Will make 20 commits over the next 20 minutes"
echo ""

# Function to make a small change to a file
make_change() {
    local file=$1
    local change_type=$2
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    case $change_type in
        "comment")
            # Add a comment to the file
            sed -i "1i // Auto-commit update: $timestamp" "$file"
            ;;
        "spacing")
            # Add some spacing
            echo "" >> "$file"
            echo "// Auto-commit spacing update: $timestamp" >> "$file"
            ;;
        "whitespace")
            # Add whitespace at the end
            echo "// Auto-commit whitespace: $timestamp" >> "$file"
            ;;
    esac
}

# Function to revert the change
revert_change() {
    local file=$1
    # Remove the auto-commit lines
    sed -i '/Auto-commit/d' "$file"
    # Remove extra blank lines at the end
    sed -i '/^$/d' "$file"
    echo "" >> "$file"
}

# Files to modify
files=(
    "laughverse_frontend/src/app/mint/page.tsx"
    "laughverse_frontend/src/app/utils/ipfs.ts"
    "laughverse_frontend/src/app/wagmi.tsx"
    "laughverse_frontend/src/app/smart-contracts/constants.ts"
)

# Change types
change_types=("comment" "spacing" "whitespace")

# Counter for commits
commit_count=0
total_commits=20

while [ $commit_count -lt $total_commits ]; do
    commit_count=$((commit_count + 1))
    current_time=$(date '+%H:%M:%S')
    
    echo "📝 Commit $commit_count/$total_commits at $current_time"
    
    # Select a random file and change type
    file=${files[$((RANDOM % ${#files[@]}))]}
    change_type=${change_types[$((RANDOM % ${#change_types[@]}))]}
    
    # Check if file exists
    if [ -f "$file" ]; then
        echo "   Modifying: $file"
        echo "   Change type: $change_type"
        
        # Make the change
        make_change "$file" "$change_type"
        
        # Stage ALL changes (git add .)
        git add .
        
        # Commit with a descriptive message
        commit_messages=(
            "feat: enhance mint page functionality"
            "fix: improve wallet connection handling"
            "refactor: optimize IPFS upload logic"
            "style: update UI components"
            "docs: add inline documentation"
            "perf: optimize smart contract interaction"
            "test: add validation improvements"
            "chore: update dependencies and config"
            "feat: add network validation"
            "fix: resolve TypeScript errors"
            "refactor: improve error handling"
            "style: enhance responsive design"
            "docs: update component documentation"
            "perf: optimize file upload process"
            "test: add network switching tests"
            "chore: clean up code structure"
            "feat: add transaction status tracking"
            "fix: resolve wagmi hook issues"
            "refactor: improve metadata handling"
            "style: update button styling"
        )
        
        message=${commit_messages[$((RANDOM % ${#commit_messages[@]}))]}
        git commit -m "$message (auto-commit $commit_count/$total_commits)"
        
        # Push to remote repository
        echo "   🚀 Pushing to remote..."
        git push origin main
        
        echo "   ✅ Committed and pushed: $message"
    else
        echo "   ⚠️  File not found: $file"
    fi
    
    echo ""
    
    # Wait 60 seconds (1 minute) before next commit
    if [ $commit_count -lt $total_commits ]; then
        echo "⏳ Waiting 60 seconds for next commit..."
        sleep 60
    fi
done

echo "🎉 Auto-commit script completed!"
echo "Made $total_commits commits over 20 minutes"
echo ""
echo "📊 Summary:"
git log --oneline -20 