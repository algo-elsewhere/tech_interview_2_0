---
layout: default
title: Managing Courses
parent: Content Manager Guide
nav_order: 2
---

# Managing Courses
{: .no_toc }

Complete guide for creating and managing educational courses on the Tech Interview 2.0 platform.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

Courses are structured educational content that help users learn technical interview skills. They include lessons, exercises, videos, and progress tracking.

## Course Structure

### Course Categories

The platform supports three main course categories:

```
src/content/courses/
├── algorithms/              # Algorithm and data structure courses
├── system-design/          # System design courses  
└── generative-ai/          # AI and machine learning courses
```

### Course File Organization

Each course has this structure:

```
src/content/courses/algorithms/
├── fundamentals/
│   ├── index.mdx           # Course overview
│   ├── lesson-1.mdx        # Individual lessons
│   ├── lesson-2.mdx
│   └── exercises/
│       ├── exercise-1.mdx
│       └── solutions/
├── advanced/
│   ├── index.mdx
│   └── lessons...
└── meta.json               # Category metadata
```

## Creating a New Course

### Step 1: Choose Course Category

Decide which category your course belongs to:

- **Algorithms**: Data structures, algorithms, coding patterns
- **System Design**: Architecture, scalability, distributed systems  
- **Generative AI**: Machine learning, AI interviews, model design

### Step 2: Create Course Directory

1. **Navigate to the category folder** (e.g., `src/content/courses/algorithms/`)
2. **Create a new folder** with your course name (use lowercase and hyphens)
3. **Example**: `data-structures-fundamentals`

### Step 3: Create Course Overview

Create an `index.mdx` file in your course folder:

```yaml
---
title: "Data Structures Fundamentals"
description: "Master essential data structures for technical interviews"
level: "beginner"
duration: "4 weeks"
lessons: 12
category: "algorithms"
prerequisites: ["basic-programming"]
objectives:
  - "Understand core data structures"
  - "Implement arrays, linked lists, and trees"
  - "Analyze time and space complexity"
tags: ["data-structures", "arrays", "linked-lists", "trees"]
featured: true
thumbnail: "/images/courses/data-structures-thumb.jpg"
instructor: "Your Name"
updatedAt: "2024-01-15"
---

# Data Structures Fundamentals

## Course Overview

This comprehensive course covers the essential data structures every software engineer needs to know...

## What You'll Learn

By the end of this course, you will:

- Understand when to use different data structures
- Implement common data structures from scratch
- Solve interview problems efficiently
- Analyze algorithmic complexity

## Course Structure

### Week 1: Arrays and Strings
- Introduction to arrays
- String manipulation techniques
- Common patterns and problems

### Week 2: Linked Lists
- Singly and doubly linked lists
- List manipulation algorithms
- Advanced linked list problems

### Week 3: Stacks and Queues
- Stack operations and applications
- Queue implementations
- Real-world use cases

### Week 4: Trees and Graphs
- Binary trees and traversals
- Graph representations
- Search algorithms

## Prerequisites

Before taking this course, you should:

- Know basic programming concepts
- Be familiar with at least one programming language
- Understand basic mathematics

## Getting Started

Ready to begin? Start with [Lesson 1: Array Fundamentals](./lesson-1.html).
```

## Course Front Matter Fields

### Required Fields

| Field | Description | Example |
|-------|-------------|---------|
| `title` | Course name | `"Data Structures Fundamentals"` |
| `description` | Brief course summary | `"Master essential data structures..."` |
| `level` | Difficulty level | `"beginner"`, `"intermediate"`, `"advanced"` |
| `category` | Course category | `"algorithms"`, `"system-design"`, `"generative-ai"` |

### Optional Fields

| Field | Description | Example |
|-------|-------------|---------|
| `duration` | Expected completion time | `"4 weeks"`, `"20 hours"` |
| `lessons` | Number of lessons | `12` |
| `prerequisites` | Required knowledge | `["basic-programming"]` |
| `objectives` | Learning outcomes | List of goals |
| `tags` | Topic tags | `["arrays", "sorting"]` |
| `featured` | Show prominently | `true` or `false` |
| `thumbnail` | Course image | `"/images/courses/thumb.jpg"` |
| `instructor` | Teacher name | `"John Doe"` |
| `price` | Course cost | `"free"`, `"$99"` |

## Creating Course Lessons

### Lesson File Structure

Each lesson is an individual `.mdx` file:

```yaml
---
title: "Lesson 1: Array Fundamentals"
description: "Learn the basics of arrays and their operations"
lessonNumber: 1
duration: "45 minutes"
objectives:
  - "Understand array structure"
  - "Learn basic operations"
  - "Practice with examples"
prerequisites: []
nextLesson: "lesson-2"
prevLesson: null
videoUrl: "https://youtube.com/watch?v=example"
codeExamples: true
exercises: 3
---

# Lesson 1: Array Fundamentals

## Introduction

Arrays are one of the most fundamental data structures...

## Key Concepts

### What is an Array?

An array is a collection of elements...

### Array Operations

#### 1. Access
```python
arr = [1, 2, 3, 4, 5]
first_element = arr[0]  # O(1) time complexity
```

#### 2. Insertion
```python
# Insert at end
arr.append(6)  # O(1) amortized

# Insert at beginning  
arr.insert(0, 0)  # O(n) time complexity
```

## Practice Problems

### Problem 1: Two Sum

Given an array of integers, find two numbers that add to a target...

```python
def two_sum(nums, target):
    # Your solution here
    pass
```

## Video Lesson

<iframe width="560" height="315" src="https://youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>

## Exercises

1. **Basic Array Operations**: Implement insert, delete, and search
2. **Array Rotation**: Rotate an array by k positions
3. **Maximum Subarray**: Find the contiguous subarray with maximum sum

## Next Steps

Continue to [Lesson 2: Array Algorithms](./lesson-2.html) to learn about sorting and searching.
```

### Lesson Front Matter Fields

| Field | Description | Example |
|-------|-------------|---------|
| `title` | Lesson title | `"Lesson 1: Array Fundamentals"` |
| `lessonNumber` | Order in course | `1`, `2`, `3` |
| `duration` | Estimated time | `"45 minutes"` |
| `objectives` | Learning goals | List of objectives |
| `nextLesson` | Next lesson file | `"lesson-2"` |
| `prevLesson` | Previous lesson | `"lesson-1"` or `null` |
| `videoUrl` | Video link | YouTube, Vimeo URL |
| `exercises` | Number of exercises | `3` |

## Adding Course Exercises

### Exercise Structure

Create an `exercises/` folder in your course directory:

```
course-folder/
├── index.mdx
├── lesson-1.mdx
├── lesson-2.mdx
└── exercises/
    ├── exercise-1.mdx
    ├── exercise-2.mdx
    └── solutions/
        ├── exercise-1-solution.mdx
        └── exercise-2-solution.mdx
```

### Exercise Format

```yaml
---
title: "Exercise 1: Implement Dynamic Array"
difficulty: "medium"
timeLimit: "30 minutes"
topics: ["arrays", "dynamic-arrays"]
lesson: "lesson-1"
hints: 3
testCases: 5
---

# Exercise 1: Implement Dynamic Array

## Problem Statement

Implement a dynamic array (similar to Python's list or Java's ArrayList) that can:

1. Add elements to the end
2. Remove elements by index
3. Access elements by index
4. Resize automatically when needed

## Requirements

Your implementation should support these operations:

```python
class DynamicArray:
    def __init__(self):
        # Initialize your array
        pass
    
    def append(self, value):
        # Add element to end
        pass
    
    def get(self, index):
        # Get element at index
        pass
    
    def remove(self, index):
        # Remove element at index
        pass
    
    def size(self):
        # Return number of elements
        pass
```

## Test Cases

```python
# Test case 1
arr = DynamicArray()
arr.append(1)
arr.append(2)
assert arr.get(0) == 1
assert arr.size() == 2

# Test case 2
arr.remove(0)
assert arr.get(0) == 2
assert arr.size() == 1
```

## Hints

1. **Hint 1**: Start with a fixed-size array and track the number of elements
2. **Hint 2**: When the array is full, create a new array with double the size
3. **Hint 3**: For removal, shift all elements after the removed index

## Difficulty: Medium
**Time Limit**: 30 minutes  
**Topics**: Arrays, Dynamic Arrays

## Next Exercise

Move on to [Exercise 2: Array Rotation](./exercise-2.html)
```

## Adding Course Videos

### Video Integration Options

#### 1. YouTube Embed
```markdown
## Video Lesson

<iframe 
  width="560" 
  height="315" 
  src="https://youtube.com/embed/VIDEO_ID" 
  frameborder="0" 
  allowfullscreen>
</iframe>
```

#### 2. Vimeo Embed
```markdown
<iframe 
  src="https://player.vimeo.com/video/VIDEO_ID" 
  width="560" 
  height="315" 
  frameborder="0" 
  allow="fullscreen">
</iframe>
```

#### 3. Direct Video File
```markdown
<video controls width="100%" poster="/images/video-thumbnail.jpg">
  <source src="/videos/lesson-1.mp4" type="video/mp4">
  <source src="/videos/lesson-1.webm" type="video/webm">
  Your browser does not support the video tag.
</video>
```

### Video Guidelines

- **Quality**: 1080p minimum for screen recordings
- **Audio**: Clear, professional audio quality
- **Length**: 10-30 minutes per lesson
- **Format**: MP4 (H.264) for compatibility
- **Subtitles**: Include closed captions when possible

## Course Navigation

### Automatic Navigation

The platform automatically generates:
- Course overview pages
- Lesson navigation (previous/next)
- Progress tracking
- Table of contents

### Custom Navigation

You can create custom navigation in course overviews:

```markdown
## Course Lessons

### Module 1: Fundamentals
1. [Introduction to Arrays](./lesson-1.html)
2. [Array Operations](./lesson-2.html)
3. [Common Patterns](./lesson-3.html)

### Module 2: Advanced Topics
4. [Dynamic Arrays](./lesson-4.html)
5. [Multi-dimensional Arrays](./lesson-5.html)
6. [Performance Optimization](./lesson-6.html)

### Module 3: Practice
7. [Easy Problems](./lesson-7.html)
8. [Medium Problems](./lesson-8.html)
9. [Hard Problems](./lesson-9.html)
```

## Multi-Language Courses

### Translation Structure

```
src/content/courses/
├── algorithms/
│   ├── en/                 # English courses
│   │   └── fundamentals/
│   ├── zh-Hans/           # Simplified Chinese
│   │   └── fundamentals/
│   └── zh-Hant/           # Traditional Chinese
│       └── fundamentals/
```

### Translation Guidelines

- **Keep structure identical** across languages
- **Adapt code comments** to the target language
- **Localize examples** when culturally relevant
- **Maintain consistent terminology**

## Course Metadata Management

### Category Metadata

Each course category has a `meta.json` file:

```json
{
  "title": "Algorithm Courses",
  "description": "Master algorithms and data structures for technical interviews",
  "courses": [
    {
      "id": "fundamentals",
      "title": "Fundamentals",
      "level": "beginner",
      "featured": true
    },
    {
      "id": "advanced-algorithms",
      "title": "Advanced Algorithms", 
      "level": "advanced",
      "featured": false
    }
  ],
  "tags": ["algorithms", "data-structures", "coding-interviews"]
}
```

### Course Ordering

Courses appear in the order listed in `meta.json`. To reorder:

1. Edit the `courses` array
2. Change the order of course objects
3. Save the file

## Progress Tracking

### Lesson Completion

The platform automatically tracks:
- Lessons completed
- Time spent on each lesson
- Exercise completion
- Overall course progress

### Adding Progress Checkpoints

Mark important milestones in lessons:

```markdown
## Checkpoint: Array Fundamentals Complete! ✅

Congratulations! You've mastered:
- Array structure and indexing
- Basic operations (insert, delete, search)
- Time complexity analysis

**Progress**: 25% of course complete

**Next up**: Learn about linked lists in [Lesson 4](./lesson-4.html)
```

## Course Publishing Workflow

### 1. Course Planning
- Define learning objectives
- Outline lesson structure
- Prepare exercises and solutions
- Plan video content

### 2. Content Creation
- Write course overview
- Create individual lessons
- Develop exercises
- Record videos (if applicable)

### 3. Content Review
- Check all links work
- Verify code examples
- Test exercises
- Review for clarity

### 4. Publishing
- Set course to `featured: true` if ready
- Update category metadata
- Test course navigation
- Announce new course

## Best Practices

### Course Design
- **Start with objectives**: Define what students will learn
- **Build progressively**: Each lesson builds on previous ones
- **Include practice**: Exercises reinforce learning
- **Provide feedback**: Clear solutions and explanations

### Content Quality
- **Be practical**: Focus on interview-relevant skills
- **Use examples**: Concrete examples are easier to understand
- **Explain why**: Don't just show how, explain reasoning
- **Test everything**: Verify all code examples work

### Student Experience
- **Clear navigation**: Easy to move between lessons
- **Progress indicators**: Show completion status
- **Multiple formats**: Text, video, and exercises
- **Self-paced**: Students can learn at their own speed

---

## Troubleshooting

### Common Issues

#### Course Not Appearing
- Check `meta.json` includes your course
- Verify course folder name matches ID
- Ensure `index.mdx` exists

#### Videos Not Loading
- Check video URL is correct
- Verify embed code syntax
- Test video accessibility

#### Navigation Broken
- Check `nextLesson`/`prevLesson` fields
- Verify lesson file names match
- Ensure all referenced files exist

## Next Steps

1. **Plan your first course**: Choose a topic and outline
2. **Study existing courses**: Look at current examples
3. **Start with one lesson**: Create a simple lesson to test
4. **Get feedback**: Share drafts for review

## Need Help?

- **Content Questions**: Contact the curriculum team
- **Technical Issues**: Reach out to developers
- **Video Production**: Ask about recording resources