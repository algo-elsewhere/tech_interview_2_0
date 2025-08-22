---
layout: default
title: Managing Blog Posts
parent: Content Manager Guide
nav_order: 1
---

# Managing Blog Posts
{: .no_toc }

Complete guide for creating, editing, and managing blog posts on the Tech Interview 2.0 platform.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

Blog posts are articles that appear on the `/blog` page of the website. They can be written in three languages and include rich content like code examples, images, and videos.

## Blog Post Structure

### Where Blog Posts Live

```
src/content/blog/
├── en/                    # English blog posts
│   ├── my-first-post.mdx
│   ├── algorithm-tips.mdx
│   └── system-design-basics.mdx
├── zh-Hans/               # Simplified Chinese posts
│   ├── my-first-post.mdx
│   └── algorithm-tips.mdx
└── zh-Hant/               # Traditional Chinese posts
    ├── my-first-post.mdx
    └── algorithm-tips.mdx
```

### Blog Post File Format

Each blog post is a `.mdx` file that contains:
1. **Front matter** - Metadata about the post
2. **Content** - The actual article content

## Creating a New Blog Post

### Step 1: Choose Your Language

Decide which language(s) you want to write in:
- **English**: Create in `src/content/blog/en/`
- **Simplified Chinese**: Create in `src/content/blog/zh-Hans/`
- **Traditional Chinese**: Create in `src/content/blog/zh-Hant/`

### Step 2: Create the File

1. **Go to GitHub**: Navigate to the appropriate language folder
2. **Click "Add file"** → **"Create new file"**
3. **Name your file**: Use lowercase letters and hyphens (e.g., `my-new-post.mdx`)

### Step 3: Add Front Matter

Start your file with front matter (metadata):

```yaml
---
title: "How to Ace Your Technical Interview"
description: "Essential tips and strategies for succeeding in technical interviews at top tech companies."
publishedAt: "2024-01-15"
updatedAt: "2024-01-15"
tags: ["interview", "algorithms", "preparation"]
category: "Interview Tips"
author: "Your Name"
featured: false
image: "/images/blog/technical-interview-tips.jpg"
imageAlt: "Person coding on laptop during technical interview"
readTime: "8 min read"
---
```

### Step 4: Write Your Content

After the front matter, write your article using Markdown:

```markdown
# Introduction

Welcome to this comprehensive guide on technical interviews...

## Key Strategies

### 1. Practice Coding Problems

The most important preparation step is...

### 2. Understand System Design

For senior positions, you'll need to...

## Code Examples

Here's a sample solution to a common interview question:

```python
def two_sum(nums, target):
    """
    Find two numbers that add up to target
    """
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
```

## Images

You can include images like this:

![Interview preparation](/images/blog/interview-prep.jpg)

## Conclusion

Remember these key points...
```

## Front Matter Fields Explained

### Required Fields

| Field | Description | Example |
|-------|-------------|---------|
| `title` | Post title (appears in browser tab) | `"How to Ace Your Technical Interview"` |
| `description` | Brief summary for SEO and previews | `"Essential tips and strategies..."` |
| `publishedAt` | Publication date (YYYY-MM-DD) | `"2024-01-15"` |

### Optional Fields

| Field | Description | Example |
|-------|-------------|---------|
| `updatedAt` | Last update date | `"2024-01-20"` |
| `tags` | Topic tags for organization | `["interview", "algorithms"]` |
| `category` | Main category | `"Interview Tips"` |
| `author` | Author name | `"Your Name"` |
| `featured` | Show on homepage | `true` or `false` |
| `image` | Header image path | `"/images/blog/post-image.jpg"` |
| `imageAlt` | Image description | `"Person coding during interview"` |
| `readTime` | Estimated reading time | `"8 min read"` |

## Writing Content with Markdown

### Basic Formatting

```markdown
# Main Heading
## Section Heading
### Subsection Heading

**Bold text**
*Italic text*
`Code snippet`

- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2

[Link text](https://example.com)
```

### Code Blocks

```markdown
```python
def hello_world():
    print("Hello, World!")
```

```javascript
function greet(name) {
    console.log(`Hello, ${name}!`);
}
```
```

### Adding Images

```markdown
![Alt text description](/images/blog/image-name.jpg)
```

**Image Guidelines:**
- Store images in `public/images/blog/`
- Use descriptive filenames
- Optimize images (under 1MB)
- Always include alt text

### Adding Videos

```markdown
<video controls width="100%">
  <source src="/videos/interview-demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

## Managing Existing Posts

### Editing a Post

1. **Find the post** in the appropriate language folder
2. **Click the file name** to open it
3. **Click the edit button** (pencil icon)
4. **Make your changes**
5. **Scroll down** and add a commit message
6. **Click "Commit changes"**

### Updating Metadata

To update post information:

1. **Edit the front matter** at the top of the file
2. **Update the `updatedAt` field** to today's date
3. **Save your changes**

### Deleting a Post

⚠️ **Warning**: Deleting posts will break any existing links to them.

1. **Navigate to the post file**
2. **Click the trash/delete button**
3. **Confirm deletion**
4. **Add a commit message**

## Multi-Language Blog Posts

### Creating Translations

To create the same post in multiple languages:

1. **Create the English version first** (`en/my-post.mdx`)
2. **Copy the file structure** to other language folders
3. **Translate the content** while keeping the same file name
4. **Update the front matter** in the appropriate language

### Example: Multi-Language Structure

```
src/content/blog/
├── en/
│   └── algorithm-basics.mdx        # English version
├── zh-Hans/
│   └── algorithm-basics.mdx        # Simplified Chinese version
└── zh-Hant/
│   └── algorithm-basics.mdx        # Traditional Chinese version
```

### Translation Guidelines

- **Keep file names identical** across languages
- **Translate titles and descriptions** in front matter
- **Adapt content** for cultural context when appropriate
- **Maintain the same structure** and formatting

## SEO Best Practices

### Writing Good Titles
- **Be specific**: "Algorithm Interview Questions" vs "Interview Tips"
- **Include keywords**: Words people might search for
- **Keep under 60 characters**: For optimal search display

### Writing Good Descriptions
- **Summarize the post** in 1-2 sentences
- **Include main keywords**
- **Keep under 160 characters**
- **Make it compelling** to encourage clicks

### Using Tags Effectively
- **Use relevant tags**: Choose tags that describe the content
- **Be consistent**: Use the same tags across similar posts
- **Don't overuse**: 3-6 tags per post is ideal

### Popular Tag Categories
- **Topics**: `algorithms`, `system-design`, `data-structures`
- **Difficulty**: `beginner`, `intermediate`, `advanced`
- **Companies**: `google`, `amazon`, `meta`, `apple`
- **Types**: `coding`, `behavioral`, `preparation`

## Common Blog Content Types

### 1. Tutorial Posts
Step-by-step guides for learning concepts:

```markdown
---
title: "Complete Guide to Binary Search"
category: "Algorithms"
tags: ["algorithms", "binary-search", "tutorial"]
---

# Complete Guide to Binary Search

In this tutorial, you'll learn...

## Prerequisites
Before starting, you should know...

## Step 1: Understanding the Concept
Binary search works by...

## Step 2: Implementation
Let's implement binary search step by step...
```

### 2. Problem-Solution Posts
Interview question breakdowns:

```markdown
---
title: "LeetCode 1: Two Sum - Multiple Solutions"
category: "Problem Solutions"
tags: ["leetcode", "algorithms", "arrays", "hash-map"]
---

# LeetCode 1: Two Sum - Multiple Solutions

## Problem Statement
Given an array of integers nums and an integer target...

## Approach 1: Brute Force
The naive approach is to...

## Approach 2: Hash Map
A more efficient solution uses...

## Complexity Analysis
- Time: O(n)
- Space: O(n)
```

### 3. Experience Sharing Posts
Personal interview experiences:

```markdown
---
title: "My Google Interview Experience - Software Engineer"
category: "Interview Experiences"
tags: ["google", "experience", "software-engineer"]
---

# My Google Interview Experience

I recently went through the Google interview process...

## Application Process
I applied through...

## Round 1: Phone Screening
The first round was...

## Lessons Learned
Key takeaways from my experience...
```

## Publishing Workflow

### 1. Draft Creation
- Create your post file
- Add front matter
- Write initial content
- Set `featured: false` for drafts

### 2. Content Review
- Check spelling and grammar
- Verify all links work
- Test code examples
- Ensure images display correctly

### 3. SEO Check
- Review title and description
- Add appropriate tags
- Check image alt text
- Verify meta information

### 4. Publishing
- Set final publication date
- Update `featured` status if needed
- Commit changes
- Content goes live automatically

## Troubleshooting

### Common Issues

#### 1. Post Not Appearing
**Possible causes:**
- File not in correct folder
- Invalid front matter syntax
- Missing required fields

**Solution:**
- Check file location
- Validate YAML syntax
- Ensure title and description are present

#### 2. Images Not Loading
**Possible causes:**
- Incorrect image path
- Image not uploaded
- File size too large

**Solution:**
- Verify image path starts with `/images/`
- Check image exists in `public/images/blog/`
- Compress large images

#### 3. Code Not Highlighting
**Possible causes:**
- Missing language specification
- Unsupported language

**Solution:**
```markdown
```python  # ✅ Correct - specify language
```         # ❌ Wrong - no language specified
```

#### 4. Formatting Issues
**Common problems:**
- Missing blank lines around headers
- Incorrect Markdown syntax
- Front matter not properly closed

**Solution:**
- Add blank lines before/after headers
- Check Markdown syntax guides
- Ensure front matter has `---` at start and end

## Best Practices

### Content Quality
- **Write for your audience**: Technical but accessible
- **Use examples**: Concrete examples are better than abstract concepts
- **Be comprehensive**: Cover the topic thoroughly
- **Stay current**: Update content regularly

### Organization
- **Use clear headings**: Help readers navigate
- **Break up long sections**: Use subsections and bullet points
- **Include a table of contents**: For longer posts
- **Add internal links**: Connect related content

### Maintenance
- **Review old posts**: Update outdated information
- **Fix broken links**: Check links periodically
- **Update screenshots**: Keep visual content current
- **Respond to feedback**: Address reader comments

---

## Next Steps

1. **Practice**: Try creating a simple blog post
2. **Learn Markdown**: Get comfortable with formatting
3. **Explore examples**: Look at existing posts for inspiration
4. **Plan content**: Create an editorial calendar

## Need Help?

- **Markdown Guide**: [Basic Markdown Syntax](https://www.markdownguide.org/basic-syntax/)
- **Technical Support**: Contact the development team
- **Content Questions**: Reach out to the content team lead