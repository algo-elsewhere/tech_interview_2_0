---
layout: default
title: Content Manager Guide
nav_order: 4
has_children: true
permalink: /content-manager/
---

# Content Manager User Guide
{: .no_toc }

A comprehensive guide for non-technical users to manage content, courses, blog posts, and other materials on the Tech Interview 2.0 platform.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Welcome Content Managers! 👋

This guide is designed specifically for **non-technical users** who need to add, edit, or manage content on the Tech Interview 2.0 website. You don't need any programming knowledge to follow this guide.

## What You Can Manage

As a content manager, you can update:

✅ **Blog Posts** - Write and publish articles about technical interviews  
✅ **Course Content** - Create and update educational materials  
✅ **Course Videos** - Add video links and descriptions  
✅ **Page Content** - Update text on existing pages  
✅ **Translations** - Manage content in English, Chinese (Simplified), and Chinese (Traditional)  
✅ **Images** - Upload and organize images  
✅ **SEO Settings** - Update page titles and descriptions  

## Quick Start Checklist

Before you begin, make sure you have:

- [ ] Access to the GitHub repository
- [ ] A GitHub account with edit permissions
- [ ] Basic understanding of Markdown (we'll teach you!)
- [ ] Content ready to upload (text, images, videos)

## Content Management Sections

### 🖊️ [Managing Blog Posts](./blog-posts.html)
Learn how to create, edit, and publish blog articles in multiple languages.

### 📚 [Managing Courses](./courses.html)
Add new courses, update existing content, and organize learning materials.

### 🎥 [Managing Videos](./videos.html)
Upload video content, add descriptions, and organize video libraries.

### 🌍 [Managing Translations](./translations.html)
Update text content in English, Simplified Chinese, and Traditional Chinese.

### 🖼️ [Managing Images](./images.html)
Upload, optimize, and organize images for the website.

### 🔍 [SEO Management](./seo.html)
Update page titles, descriptions, and search engine settings.

## How Content Works on This Website

### File-Based Content System

This website uses a **file-based content management system**. This means:

- **Blog posts** are stored as files in folders
- **Course content** is organized in structured folders
- **Translations** are kept in separate language files
- **Images** are stored in organized directories

### Content Languages

All content can be managed in three languages:

| Language | Code | Example URL |
|----------|------|-------------|
| **English** | `en` | `/en/blog/my-post` |
| **Simplified Chinese** | `zh-Hans` | `/zh-Hans/blog/my-post` |
| **Traditional Chinese** | `zh-Hant` | `/zh-Hant/blog/my-post` |

### Content Workflow

```
1. Create/Edit Content → 2. Save Changes → 3. Submit for Review → 4. Publish Live
```

## Content Guidelines

### Writing Style
- **Clear and concise**: Use simple, direct language
- **Professional tone**: Maintain expertise while being approachable
- **Consistent terminology**: Use the same terms throughout
- **Include examples**: Provide practical examples when possible

### Image Guidelines
- **High quality**: Use clear, professional images
- **Appropriate size**: Optimize for web (under 1MB)
- **Alt text**: Always include descriptive alt text
- **Copyright**: Only use images you have rights to use

### Video Guidelines
- **Professional quality**: Clear audio and video
- **Appropriate length**: Keep videos focused and concise
- **Transcripts**: Include transcripts when possible
- **Thumbnails**: Use attractive, relevant thumbnails

## Content Types Overview

### 1. Blog Posts
```
📝 Individual articles about technical interviews
📂 Location: src/content/blog/[language]/
🏷️ Include: title, description, tags, publication date
🌍 Languages: English, Simplified Chinese, Traditional Chinese
```

### 2. Course Materials
```
📚 Structured educational content
📂 Location: src/content/courses/[category]/
🎯 Include: course description, objectives, lessons
📊 Progress tracking and completion
```

### 3. Page Content
```
📄 Static page content (About, Contact, etc.)
📂 Location: src/messages/[language].json
🔧 Editable: titles, descriptions, navigation text
🌐 Multi-language support
```

### 4. Course Videos
```
🎥 Educational video content
📂 Location: public/videos/ or external links
📝 Include: title, description, duration
🎬 Support for YouTube, Vimeo, and direct uploads
```

### 5. Images and Media
```
🖼️ Visual content for posts and pages
📂 Location: public/images/
📐 Formats: JPG, PNG, WebP, SVG
🔧 Automatic optimization for web
```

## Getting Help

### Step-by-Step Guides
Each section includes detailed, illustrated instructions for common tasks.

### Need Technical Help?
If you encounter any technical issues:

1. **Check the FAQ** in each section
2. **Contact the development team** via GitHub issues
3. **Request training** for complex tasks

### Content Review Process
All content changes go through a review process:

1. **Create content** using this guide
2. **Submit for review** via GitHub
3. **Receive feedback** from reviewers
4. **Make revisions** if needed
5. **Content goes live** after approval

---

## Next Steps

1. **Start with [Blog Posts](./blog-posts.html)** if you're adding articles
2. **Check [Courses](./courses.html)** if you're managing educational content
3. **Review [Translations](./translations.html)** if you're working with multiple languages

## Important Notes

⚠️ **Always backup important content** before making changes  
⚠️ **Test changes** in the preview environment when possible  
⚠️ **Follow the review process** for all public content  
⚠️ **Ask for help** if you're unsure about anything  

---

*This guide is designed to be beginner-friendly. If you find any section confusing or need additional help, please let the development team know so we can improve the documentation.*