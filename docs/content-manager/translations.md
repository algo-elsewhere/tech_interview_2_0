---
layout: default
title: Managing Translations
parent: Content Manager Guide
nav_order: 3
---

# Managing Translations
{: .no_toc }

Complete guide for managing multi-language content and translations on the Tech Interview 2.0 platform.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Tech Interview 2.0 platform supports three languages:
- **English** (`en`)
- **Simplified Chinese** (`zh-Hans`) 
- **Traditional Chinese** (`zh-Hant`)

All text content can be translated and managed through easy-to-edit files.

## Translation System Structure

### Translation Files Location

```
src/messages/
├── en.json           # English translations
├── zh-Hans.json      # Simplified Chinese translations
└── zh-Hant.json      # Traditional Chinese translations
```

### How Translations Work

Each translation file contains **key-value pairs** where:
- **Key**: Identifies the text element (like `"navigation.home"`)
- **Value**: The actual text displayed (like `"Home"` or `"首页"`)

Example structure:
```json
{
  "navigation": {
    "home": "Home",
    "about": "About", 
    "blog": "Blog",
    "courses": "Courses",
    "contact": "Contact"
  },
  "homepage": {
    "title": "Master Technical Interviews",
    "subtitle": "Get expert guidance and practice"
  }
}
```

## Editing Translations

### Step 1: Find the Translation File

1. **Navigate to** `src/messages/` in the GitHub repository
2. **Choose the language file** you want to edit:
   - `en.json` for English
   - `zh-Hans.json` for Simplified Chinese  
   - `zh-Hant.json` for Traditional Chinese

### Step 2: Edit the File

1. **Click the file name** to open it
2. **Click the edit button** (pencil icon)
3. **Find the text** you want to change
4. **Update the value** (keep the key the same)
5. **Save your changes**

### Example: Changing Navigation Text

**Before:**
```json
{
  "navigation": {
    "home": "Home",
    "about": "About Us"
  }
}
```

**After:**
```json
{
  "navigation": {
    "home": "Home",
    "about": "About Our Company"
  }
}
```

## Translation File Structure

### Main Sections

| Section | Description | Contains |
|---------|-------------|----------|
| `navigation` | Website navigation | Menu items, buttons |
| `homepage` | Homepage content | Hero text, sections |
| `about` | About page content | Page title, descriptions |
| `blog` | Blog-related text | Categories, labels |
| `courses` | Course content | Course names, descriptions |
| `contact` | Contact page | Form labels, messages |
| `common` | Shared text | Buttons, alerts, errors |
| `meta` | SEO content | Page titles, descriptions |

### Nested Structure Example

```json
{
  "homepage": {
    "hero": {
      "title": "Master Technical Interviews",
      "subtitle": "Expert guidance for your career success",
      "cta": {
        "primary": "Start Learning",
        "secondary": "View Courses"
      }
    },
    "features": {
      "title": "Why Choose Us",
      "algorithms": {
        "title": "Algorithm Mastery",
        "description": "Learn data structures and algorithms"
      }
    }
  }
}
```

## Common Translation Tasks

### 1. Updating Navigation Menu

**Location**: `navigation` section

```json
{
  "navigation": {
    "home": "Home",           # Homepage link
    "about": "About",         # About page link
    "blog": "Blog",           # Blog page link
    "courses": "Courses",     # Courses page link
    "contact": "Contact",     # Contact page link
    "language": "Language"    # Language switcher label
  }
}
```

### 2. Changing Homepage Content

**Location**: `homepage` section

```json
{
  "homepage": {
    "hero": {
      "title": "Master Technical Interviews",
      "subtitle": "Get the skills you need to succeed",
      "description": "Comprehensive courses and expert guidance"
    },
    "stats": {
      "students": "500+ Students Helped",
      "success": "95% Success Rate", 
      "companies": "50+ Partner Companies"
    }
  }
}
```

### 3. Updating About Page

**Location**: `about` section

```json
{
  "about": {
    "hero": {
      "title": "About Tech Interview 2.0",
      "description": "Our mission is to help engineers succeed"
    },
    "story": {
      "title": "Our Story", 
      "paragraph1": "We started with a simple goal...",
      "paragraph2": "Today, we've helped hundreds of engineers..."
    }
  }
}
```

### 4. Course Content Translation

**Location**: `courses` section

```json
{
  "courses": {
    "title": "Our Courses",
    "categories": {
      "algorithms": "Algorithms & Data Structures",
      "systemDesign": "System Design",
      "genai": "Generative AI"
    },
    "levels": {
      "beginner": "Beginner",
      "intermediate": "Intermediate", 
      "advanced": "Advanced"
    }
  }
}
```

### 5. Form Labels and Messages

**Location**: `contact` and `common` sections

```json
{
  "contact": {
    "title": "Get In Touch",
    "form": {
      "name": "Full Name",
      "email": "Email Address",
      "subject": "Subject",
      "message": "Message",
      "send": "Send Message"
    },
    "success": "Message sent successfully!",
    "error": "Please check your input and try again"
  }
}
```

## Translation Guidelines

### Writing Quality Translations

#### 1. Maintain Consistency
- **Use the same terms** for the same concepts across the site
- **Keep tone consistent** with the brand voice
- **Follow language conventions** for the target audience

#### 2. Cultural Adaptation
- **Adapt content** for cultural context when needed
- **Use appropriate formality levels** for each language
- **Consider local business practices** and expectations

#### 3. Technical Accuracy
- **Preserve technical terms** when appropriate
- **Explain concepts clearly** in the target language
- **Maintain accuracy** of technical information

### Language-Specific Guidelines

#### English (en.json)
- **Professional but approachable** tone
- **Clear, concise language**
- **American English spelling** and conventions
- **Action-oriented** button text

#### Simplified Chinese (zh-Hans.json)
- **Simplified Chinese characters** only
- **Professional business tone**
- **Appropriate use of technical terms**
- **Clear call-to-action** phrases

#### Traditional Chinese (zh-Hant.json)
- **Traditional Chinese characters** only
- **Respectful, professional tone**
- **Culturally appropriate** expressions
- **Clear navigation** language

## Managing SEO Translations

### Meta Information

Each language file includes SEO metadata:

```json
{
  "meta": {
    "title": "Tech Interview 2.0 - Master Technical Interviews",
    "description": "Expert guidance and courses for technical interviews",
    "keywords": "technical interviews, coding, algorithms, system design"
  }
}
```

### Page-Specific SEO

```json
{
  "blog": {
    "meta": {
      "title": "Technical Interview Blog",
      "description": "Latest tips and insights for technical interviews"
    }
  },
  "courses": {
    "meta": {
      "title": "Interview Preparation Courses", 
      "description": "Comprehensive courses for technical interview success"
    }
  }
}
```

### SEO Best Practices

- **Translate keywords** appropriately for each market
- **Maintain optimal length** for titles (under 60 chars) and descriptions (under 160 chars)
- **Include relevant search terms** for each language/region
- **Consider local search patterns** and user behavior

## Adding New Translation Keys

### When to Add New Keys

Add new translation keys when:
- Adding new pages or sections
- Creating new UI components
- Adding new form fields
- Introducing new features

### How to Add New Keys

1. **Choose appropriate section** or create a new one
2. **Use descriptive key names** that indicate purpose
3. **Add to all language files** to maintain consistency
4. **Use placeholder text** if translation isn't ready yet

### Example: Adding New Feature

**Step 1**: Add to English (`en.json`)
```json
{
  "features": {
    "videoLessons": {
      "title": "Video Lessons",
      "description": "Learn with interactive video content",
      "cta": "Watch Now"
    }
  }
}
```

**Step 2**: Add to Simplified Chinese (`zh-Hans.json`)
```json
{
  "features": {
    "videoLessons": {
      "title": "视频课程",
      "description": "通过互动视频内容学习",
      "cta": "立即观看"
    }
  }
}
```

**Step 3**: Add to Traditional Chinese (`zh-Hant.json`)
```json
{
  "features": {
    "videoLessons": {
      "title": "影片課程",
      "description": "透過互動影片內容學習",
      "cta": "立即觀看"
    }
  }
}
```

## Translation Workflow

### 1. Content Planning
- **Identify content** that needs translation
- **Plan translation schedule** for different languages
- **Coordinate with content creators** for original text

### 2. Translation Process
- **Start with English** as the base language
- **Translate to target languages** maintaining meaning and tone
- **Review translations** for accuracy and cultural appropriateness

### 3. Quality Assurance
- **Test translations** on the actual website
- **Check text length** and formatting
- **Verify all translations** are properly displayed

### 4. Publication
- **Commit changes** to the repository
- **Test in staging environment** if available
- **Deploy to production** after verification

## Tools and Resources

### JSON Validation
- **Online JSON validators** to check syntax
- **Code editors** with JSON highlighting
- **Git diff tools** to review changes

### Translation Memory
- **Keep glossaries** of important terms
- **Maintain consistency** across translations
- **Document style decisions** for future reference

### Collaboration Tools
- **GitHub comments** for translation discussions
- **Issue tracking** for translation requests
- **Review process** for quality assurance

## Troubleshooting

### Common Issues

#### 1. Text Not Displaying
**Possible causes:**
- Missing translation key
- JSON syntax error
- Wrong language file

**Solutions:**
- Check key exists in all language files
- Validate JSON syntax
- Verify correct file was edited

#### 2. Text Too Long/Short
**Problem:** Translated text doesn't fit in UI

**Solutions:**
- Adjust translation length
- Use abbreviations when appropriate
- Inform developers if UI needs adjustment

#### 3. Characters Not Displaying
**Problem:** Special characters appear as squares

**Solutions:**
- Ensure UTF-8 encoding
- Check font supports character set
- Test on different browsers

#### 4. JSON Syntax Errors
**Problem:** File won't load due to formatting errors

**Common mistakes:**
```json
{
  "key": "value",    # ✅ Correct
  "key": "value"     # ❌ Missing comma
  "key": "value,     # ❌ Missing quote
  "key": "value"     # ✅ Last item, no comma
}
```

## Best Practices

### File Management
- **Always backup** before major changes
- **Test changes** before committing
- **Use descriptive commit messages**
- **Coordinate with team** on large updates

### Translation Quality
- **Review translations** with native speakers when possible
- **Test user flows** in each language
- **Keep translations updated** when content changes
- **Document translation decisions** for consistency

### Maintenance
- **Regular reviews** of existing translations
- **Update outdated content** across all languages
- **Monitor user feedback** about translation quality
- **Plan translation updates** with content releases

---

## Next Steps

1. **Practice editing**: Try changing a simple translation
2. **Learn JSON syntax**: Understand the file format
3. **Review existing translations**: Study current examples
4. **Plan translation projects**: Identify content needing updates

## Need Help?

- **Translation Questions**: Contact language leads
- **Technical Issues**: Reach out to development team  
- **Cultural Guidance**: Consult with native speakers
- **Process Questions**: Review with content management team