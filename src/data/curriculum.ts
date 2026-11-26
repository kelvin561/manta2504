export type LanguageKey = 'html' | 'css' | 'javascript' | 'python';

export interface CodePreset {
  id: string;
  label: string;
  description: string;
  code: string;
}

export interface LanguageCurriculum {
  key: LanguageKey;
  name: string;
  roleLabel: string;
  tagline: string;
  learningNow: string;
  teachingToOthers: string;
  topics: string[];
  studyNotes: {
    title: string;
    summary: string;
    keyConcepts: { heading: string; explanation: string }[];
    practicePrompt: string;
  };
  presets: CodePreset[];
}

export interface MilestoneItem {
  period: string;
  title: string;
  detail: string;
  language: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  meta: string;
  summary: string;
  image: string;
  imageAlt: string;
  conceptsTaught: string[];
  whatILearned: string;
  overview: string;
  sampleCodeTitle: string;
  sampleCode: string;
}

export const PROFILE_INFO = {
  brandName: 'K. Kiptoo',
  email: 'kkiptoo934@gmail.com',
  roleKicker: 'Developer · Learner · Programming Mentor',
  heroImage: '/src/assets/images/hero_developer_workspace_1795673090221.jpg',
  heroImageAlt:
    'Minimalist oak desk with a laptop displaying clean code beside a handwritten architecture notebook in natural daylight.',
  portraitImage: '/src/assets/images/about_educator_portrait_1795673091474.jpg',
  portraitImageAlt:
    'Editorial portrait of K. Kiptoo in a bright study studio with programming books and a laptop.',
};

export const HERO_METRICS = [
  { value: '04', label: 'Core Languages', detail: 'HTML, CSS, JavaScript & Python' },
  { value: '24+', label: 'Guided Lessons', detail: 'Hands-on workshops & study notes' },
  { value: '12', label: 'Built Projects', detail: 'Shipped while learning in public' },
  { value: '1-on-1', label: 'Peer Mentoring', detail: 'Beginner code reviews & walkthroughs' },
];

export const LEARNING_MILESTONES: MilestoneItem[] = [
  {
    period: '2024 Q1',
    title: 'Semantic Document Structure & Accessibility',
    detail:
      'Moved beyond generic div layouts to landmarks, accessible forms, keyboard navigation, and screen-reader hierarchy.',
    language: 'HTML',
  },
  {
    period: '2024 Q3',
    title: 'Modern Layout Systems & Design Tokens',
    detail:
      'Mastered Flexbox, CSS Grid subgrids, fluid clamp typography, and responsive spacing without fragile pixel overrides.',
    language: 'CSS',
  },
  {
    period: '2025 Q2',
    title: 'State, Async Data & Browser DOM Mechanics',
    detail:
      'Built interactive tools with event delegation, fetch APIs, array transformations, and clean modular TypeScript.',
    language: 'JavaScript',
  },
  {
    period: '2026',
    title: 'Algorithmic Thinking, Data Structures & Automation',
    detail:
      'Deepening Python fluency through file automation scripts, dictionary algorithms, and beginner-friendly CLI tools.',
    language: 'Python',
  },
];

export const TEACHING_MILESTONES: MilestoneItem[] = [
  {
    period: '2024 Q2',
    title: 'First Page From Scratch Workshop',
    detail:
      'Guided first-time coders through building and publishing a clean personal bio page using pure semantic HTML.',
    language: 'HTML',
  },
  {
    period: '2024 Q4',
    title: 'Visualizing Flexbox & Grid for Beginners',
    detail:
      'Created box-model worksheets and live alignment drills so learners stop guessing why elements shift.',
    language: 'CSS',
  },
  {
    period: '2025 Q3',
    title: 'DOM Events Without Frameworks',
    detail:
      'Taught peer study groups how variables, functions, and click listeners power real interactive web pages.',
    language: 'JavaScript',
  },
  {
    period: '2026',
    title: 'Python Problem-Solving Labs',
    detail:
      'Running weekly logic walkthroughs covering loops, dictionaries, functions, and debugging mindset.',
    language: 'Python',
  },
];

export const LANGUAGES_CURRICULUM: Record<LanguageKey, LanguageCurriculum> = {
  html: {
    key: 'html',
    name: 'HTML',
    roleLabel: 'Structure & Semantics',
    tagline: 'Every clear website starts with honest, meaningful document structure.',
    learningNow:
      'ARIA landmark patterns, native dialog accessibility, and semantic form validation attributes.',
    teachingToOthers:
      'Why tags carry meaning, heading hierarchy (h1 to h3), clean media alt text, and building pages without layout shortcuts.',
    topics: [
      'Semantic landmarks: header, main, article, section, footer',
      'Accessible forms with explicit labels and input types',
      'Document outline, metadata, and clean nested lists',
      'Tables, figures, and descriptive image attributes',
    ],
    studyNotes: {
      title: 'HTML Study Guide: Meaning Before Styling',
      summary:
        'When teaching HTML, I ask students to turn off all CSS first. If the page still reads like a clean outline, the markup is doing its job.',
      keyConcepts: [
        {
          heading: '01. Landmarks Over Div Soup',
          explanation:
            'Use <header>, <nav>, <main>, and <footer> so browsers and assistive tools understand page regions automatically.',
        },
        {
          heading: '02. Forms Need Explicit Labels',
          explanation:
            'Always pair <label for="id"> with an input id. Clicking the label focuses the input and improves usability for everyone.',
        },
        {
          heading: '03. Heading Order Matters',
          explanation:
            'Treat headings like a book table of contents—one <h1> for the page topic, followed by logical <h2> and <h3> sections.',
        },
      ],
      practicePrompt:
        'Challenge: Add a <footer> inside the live HTML editor with a short copyright line and inspect how cleanly it reads.',
    },
    presets: [
      {
        id: 'html-profile',
        label: 'Semantic Card',
        description: 'Live HTML structure rendered immediately in the preview.',
        code: `<article style="font-family: system-ui, sans-serif; max-width: 420px; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background: #ffffff;">
  <header>
    <p style="margin: 0; font-size: 12px; color: #2563eb; font-weight: 600;">Lesson 01 · Semantic Markup</p>
    <h2 style="margin: 6px 0 8px; font-size: 20px; color: #111827;">Why Tags Have Meaning</h2>
  </header>
  <p style="margin: 0 0 14px; font-size: 14px; line-height: 1.6; color: #4b5563;">
    Using <strong>article</strong>, <strong>header</strong>, and <strong>ul</strong> makes your page readable for both humans and screen readers.
  </p>
  <ul style="margin: 0; padding-left: 18px; font-size: 14px; color: #374151; line-height: 1.7;">
    <li>One clear main heading per page</li>
    <li>Lists for grouped items</li>
    <li>Buttons for actions, links for navigation</li>
  </ul>
</article>`,
      },
      {
        id: 'html-form',
        label: 'Accessible Form',
        description: 'Form controls with proper labels and native input types.',
        code: `<form style="font-family: system-ui, sans-serif; max-width: 400px; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background: #ffffff;">
  <h2 style="margin: 0 0 12px; font-size: 18px; color: #111827;">Workshop Check-In</h2>
  <label for="student-name" style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
    Your Name
  </label>
  <input id="student-name" type="text" placeholder="e.g. Amina" style="width: 100%; box-sizing: border-box; padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 8px; margin-bottom: 12px; font-size: 14px;" />
  <label for="track" style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
    Today's Topic
  </label>
  <select id="track" style="width: 100%; padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 8px; margin-bottom: 14px; font-size: 14px; background: #fff;">
    <option>HTML Landmarks</option>
    <option>Accessible Forms</option>
  </select>
  <button type="button" style="background: #2563eb; color: #fff; border: none; padding: 9px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer;">
    Submit Check-In
  </button>
</form>`,
      },
    ],
  },
  css: {
    key: 'css',
    name: 'CSS',
    roleLabel: 'Layout & Visual Craft',
    tagline: 'Turning static structure into calm, responsive, readable interfaces.',
    learningNow:
      'CSS container queries, modern :has() selectors, and fluid spacing scales without media-query clutter.',
    teachingToOthers:
      'The box model (padding vs margin), Flexbox alignment axes, CSS Grid tracks, and crisp readable contrast.',
    topics: [
      'Box model intuition: content, padding, border, margin',
      'Flexbox alignment for navbars and toolbars',
      'CSS Grid responsive columns using repeat and minmax',
      'Custom properties (CSS variables) for consistent theming',
    ],
    studyNotes: {
      title: 'CSS Study Guide: Think in Boxes & Axes',
      summary:
        'Most CSS confusion disappears once you visualize every element as a box and understand the main axis versus cross axis in Flexbox.',
      keyConcepts: [
        {
          heading: '01. Padding Is Inside, Margin Is Outside',
          explanation:
            'Use padding to give text breathing room inside a card border. Use gap or margin to separate sibling elements.',
        },
        {
          heading: '02. Flexbox for 1D, Grid for 2D',
          explanation:
            'Reach for Flexbox when aligning items along a single row or column. Reach for Grid when placing cards into rows and columns.',
        },
        {
          heading: '03. Readable Typography Scales',
          explanation:
            'Pair a comfortable 1.5–1.6 line-height on body text with generous spacing above section headings.',
        },
      ],
      practicePrompt:
        'Challenge: Change the gap or background color in the CSS editor below and watch the preview cards respond live.',
    },
    presets: [
      {
        id: 'css-grid',
        label: 'Responsive Grid',
        description: 'Edit CSS rules directly and inspect the live card layout.',
        code: `.lesson-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  font-family: system-ui, sans-serif;
}

.lesson-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 16px;
}

.lesson-card h3 {
  margin: 0 0 6px;
  font-size: 15px;
  color: #111827;
}

.lesson-card p {
  margin: 0;
  font-size: 13px;
  color: #4b5563;
  line-height: 1.5;
}

.highlight {
  border-color: #2563eb;
  background: #eff6ff;
}`,
      },
      {
        id: 'css-flex',
        label: 'Flexbox Toolbar',
        description: 'Classic space-between header layout using Flexbox.',
        code: `.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-family: system-ui, sans-serif;
}

.brand {
  font-weight: 700;
  font-size: 15px;
  color: #111827;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 7px 14px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  background: #2563eb;
  color: #ffffff;
}`,
      },
    ],
  },
  javascript: {
    key: 'javascript',
    name: 'JavaScript',
    roleLabel: 'Interactivity & Logic',
    tagline: 'Bringing static pages to life with clean state, events, and functions.',
    learningNow:
      'Asynchronous patterns (async/await), clean state reducers, and predictable TypeScript interfaces.',
    teachingToOthers:
      'Variables, functions, array methods (.map and .filter), conditionals, and thinking step by step about data flow.',
    topics: [
      'Pure functions, parameters, and return values',
      'Transforming arrays with map, filter, and reduce',
      'Objects and structured data modeling',
      'DOM events and updating UI from application state',
    ],
    studyNotes: {
      title: 'JavaScript Study Guide: Data In, UI Out',
      summary:
        'When teaching JavaScript, I separate data logic from DOM updates. First make sure your function transforms inputs accurately, then render the result.',
      keyConcepts: [
        {
          heading: '01. Prefer const, Use let Intentionally',
          explanation:
            'Default to const so readers know a variable reference will not be reassigned unexpectedly.',
        },
        {
          heading: '02. Think With .filter() and .map()',
          explanation:
            'Instead of mutating arrays in place, filter out what you do not need and map each item to its new shape.',
        },
        {
          heading: '03. Inspect Values With console.log()',
          explanation:
            'Debugging is not guesswork. Log intermediate values to verify your assumptions at every step.',
        },
      ],
      practicePrompt:
        'Challenge: Add another language or change the minHours filter in the JavaScript sandbox and click Run Code.',
    },
    presets: [
      {
        id: 'js-study-tracker',
        label: 'Array Filter & Map',
        description: 'Filter study sessions and compute total practice hours.',
        code: `const sessions = [
  { topic: "HTML Semantics", hours: 2.5, taught: true },
  { topic: "CSS Grid Layouts", hours: 4.0, taught: true },
  { topic: "JS Async Fetch", hours: 3.5, taught: false },
  { topic: "Python Dictionaries", hours: 5.0, taught: true }
];

const taughtTopics = sessions
  .filter((item) => item.taught)
  .map((item) => item.topic);

const totalHours = sessions.reduce((sum, item) => sum + item.hours, 0);

console.log("Topics taught:", taughtTopics.join(", "));
console.log("Total study hours:", totalHours);`,
      },
      {
        id: 'js-quiz-grader',
        label: 'Score Calculator',
        description: 'Write a reusable function to grade coding exercise attempts.',
        code: `function evaluatePractice(correct, total) {
  const percent = Math.round((correct / total) * 100);
  const status = percent >= 80 ? "Ready to teach others" : "Keep practicing";
  return { percent, status };
}

const htmlQuiz = evaluatePractice(9, 10);
const jsQuiz = evaluatePractice(7, 10);

console.log("HTML Check:", htmlQuiz.percent + "% -", htmlQuiz.status);
console.log("JS Check:", jsQuiz.percent + "% -", jsQuiz.status);`,
      },
    ],
  },
  python: {
    key: 'python',
    name: 'Python',
    roleLabel: 'Algorithms & Automation',
    tagline: 'Readable, expressive problem solving for data, logic, and scripts.',
    learningNow:
      'Clean object-oriented design, file automation with pathlib, and algorithmic problem decomposition.',
    teachingToOthers:
      'Indentation and readability, lists and dictionaries, loops, functions, and breaking big problems into small steps.',
    topics: [
      'Variables, f-strings, and clean control flow (if/elif/else)',
      'Lists, dictionaries, and list comprehensions',
      'Writing focused functions with clear inputs and outputs',
      'Problem decomposition and tracing variable state',
    ],
    studyNotes: {
      title: 'Python Study Guide: Readability Counts',
      summary:
        'Python is my favorite language for teaching beginners how to think algorithmically—its syntax reads almost like plain English.',
      keyConcepts: [
        {
          heading: '01. Trace Your Loops by Hand',
          explanation:
            'Before writing complex loops, trace the first two iterations on paper to see how each variable changes.',
        },
        {
          heading: '02. Dictionaries for Fast Lookups',
          explanation:
            'Use dictionaries to count frequencies, group learners by track, or map keys to values cleanly.',
        },
        {
          heading: '03. Small Functions Beat Giant Scripts',
          explanation:
            'A function should do one clear job. If it needs a long explanation, split it into two smaller functions.',
        },
      ],
      practicePrompt:
        'Challenge: Modify the scores list or threshold in the Python sandbox and click Run Python to test your logic.',
    },
    presets: [
      {
        id: 'py-grades',
        label: 'Cohort Score Analyzer',
        description: 'Compute averages and filter passing scores in Python.',
        code: `scores = [78, 92, 85, 64, 95, 88]
passing_mark = 80

passing = [s for s in scores if s >= passing_mark]
average = round(sum(scores) / len(scores), 1)

print(f"Total learners: {len(scores)}")
print(f"Average score: {average}")
print(f"Passing scores: {passing}")`,
      },
      {
        id: 'py-loop',
        label: 'Lesson Planner Loop',
        description: 'Iterate through languages and format a weekly plan.',
        code: `languages = ["HTML", "CSS", "JavaScript", "Python"]

def format_plan(week, topic):
    return f"Week {week}: Practice & teach {topic}"

for i in range(len(languages)):
    plan_line = format_plan(i + 1, languages[i])
    print(plan_line)`,
      },
    ],
  },
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'web-foundations-workbook',
    title: 'Web Foundations Layout Workbook',
    meta: 'HTML & CSS · Study Guide & Starter Kit',
    summary:
      'A printable and interactive set of Flexbox and Grid layout exercises I built to help beginners visualize responsive spacing.',
    image: '/src/assets/images/project_web_foundations_1795673090775.jpg',
    imageAlt:
      'Overhead view of hand-drawn web layout wireframes beside a laptop showing a clean geometric grid layout.',
    conceptsTaught: [
      'Semantic HTML5 document landmarks',
      'Flexbox main-axis and cross-axis alignment',
      'Responsive CSS Grid without brittle pixel widths',
    ],
    whatILearned:
      'Teaching spacing and hierarchy forced me to strip away unnecessary rules and rely on consistent typographic scales.',
    overview:
      'Beginners often struggle with why elements jump across the screen. This workbook pairs paper wireframe sketches with minimal HTML/CSS starter templates so learners build spatial intuition first.',
    sampleCodeTitle: 'Responsive Card Grid Pattern',
    sampleCode: `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 1.5rem;\n}`,
  },
  {
    id: 'python-logic-notebooks',
    title: 'Python Logic & Data Structure Labs',
    meta: 'Python · Guided Problem Sets',
    summary:
      'Step-by-step exercises using lists, dictionaries, and loops to turn everyday tasks into clean Python functions.',
    image: '/src/assets/images/project_python_logic_1795673091985.jpg',
    imageAlt:
      'Mechanical keyboard and dot-grid notebook showing Python list, tuple, and dictionary diagrams on a bright desk.',
    conceptsTaught: [
      'Choosing between lists, tuples, sets, and dictionaries',
      'Breaking word problems into reusable helper functions',
      'Tracing loop variables step by step',
    ],
    whatILearned:
      'Explaining dictionaries as labeled drawers made hash-map lookups click immediately for students with zero prior coding background.',
    overview:
      'Designed as a bridge between basic Python syntax and practical problem solving. Each lab begins with a paper diagram before a single line of code is written.',
    sampleCodeTitle: 'Frequency Counter Pattern',
    sampleCode: `def count_topics(items):\n    counts = {}\n    for item in items:\n        counts[item] = counts.get(item, 0) + 1\n    return counts`,
  },
  {
    id: 'js-dom-flashcards',
    title: 'Interactive DOM & State Mini-Apps',
    meta: 'JavaScript · Live Workshop',
    summary:
      'A collection of small vanilla JavaScript apps—countdown timers, quiz graders, and live search filters—built with zero frameworks.',
    image: '/src/assets/images/hero_developer_workspace_1795673090221.jpg',
    imageAlt:
      'Developer laptop displaying structured code alongside a handwritten MVC diagram notebook.',
    conceptsTaught: [
      'Single source of truth state arrays',
      'Event delegation and accessible keyboard handlers',
      'Pure render functions that keep UI predictable',
    ],
    whatILearned:
      'Building small tools in plain JavaScript made React and modern component architecture much clearer to both me and my students.',
    overview:
      'Before jumping into large frameworks, learners build three crisp single-file JavaScript utilities to understand how browser events and state updates actually work under the hood.',
    sampleCodeTitle: 'State-Driven Filter Pattern',
    sampleCode: `function filterLessons(lessons, query) {\n  const term = query.trim().toLowerCase();\n  return lessons.filter((l) => l.title.toLowerCase().includes(term));\n}`,
  },
  {
    id: 'peer-code-review-notes',
    title: 'Beginner Code Review Playbook',
    meta: 'HTML · CSS · JavaScript · Python',
    summary:
      'A practical checklist I use when reviewing beginner code so feedback stays encouraging, specific, and actionable.',
    image: '/src/assets/images/about_educator_portrait_1795673091474.jpg',
    imageAlt:
      'K. Kiptoo smiling thoughtfully in a study room with programming books and a laptop.',
    conceptsTaught: [
      'Naming variables for clarity over cleverness',
      'Checking edge cases and empty states early',
      'Refactoring repeated blocks into clean functions',
    ],
    whatILearned:
      'Reviewing other people’s code sharpened my own eye for edge cases, readability, and calm debugging.',
    overview:
      'Good code reviews teach habits, not just fixes. This playbook organizes feedback into three gentle layers: does it work, is it readable, and how can we simplify it?',
    sampleCodeTitle: 'Clear Naming Refactor',
    sampleCode: `// Clear intent beats short abbreviations\nfunction calculateStudyStreakDays(completedDates) {\n  return completedDates.length;\n}`,
  },
];
