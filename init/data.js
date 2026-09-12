const sampleRepositories = [
  {
    name: "genesis",
    description:
      "Developer collaboration platform built as a backend engineering project.",
    language: "JavaScript",
    visibility: "public",
    owner: "Om",
    createdAt: new Date("2026-09-12T08:30:00"),
  },
  {
    name: "taskforge",
    description:
      "A lightweight task management application for small development teams.",
    language: "JavaScript",
    visibility: "public",
    owner: "alex",
    createdAt: new Date("2026-09-11T17:20:00"),
  },
  {
    name: "quantum-notes",
    description:
      "Interactive notes and experiments for introductory quantum computing.",
    language: "Python",
    visibility: "public",
    owner: "maya",
    createdAt: new Date("2026-09-10T13:45:00"),
  },
  {
    name: "campus-hub",
    description:
      "A platform for managing campus resources and student activities.",
    language: "Java",
    visibility: "private",
    owner: "rahul",
    createdAt: new Date("2026-09-09T19:10:00"),
  },
  {
    name: "pixel-engine",
    description: "Experimental 2D rendering engine for browser-based games.",
    language: "TypeScript",
    visibility: "public",
    owner: "sarah",
    createdAt: new Date("2026-09-08T11:30:00"),
  },
  {
    name: "ml-lab",
    description:
      "Experiments with machine learning models and data preprocessing.",
    language: "Python",
    visibility: "public",
    owner: "daniel",
    createdAt: new Date("2026-09-07T16:25:00"),
  },
  {
    name: "api-gateway",
    description:
      "A small service demonstrating API routing and middleware patterns.",
    language: "JavaScript",
    visibility: "private",
    owner: "nina",
    createdAt: new Date("2026-09-06T09:40:00"),
  },
  {
    name: "compiler-playground",
    description: "Learning project for exploring lexical analysis and parsing.",
    language: "C++",
    visibility: "public",
    owner: "vikram",
    createdAt: new Date("2026-09-05T14:15:00"),
  },
  {
    name: "weather-dashboard",
    description:
      "A dashboard displaying weather information through an external API.",
    language: "JavaScript",
    visibility: "public",
    owner: "emma",
    createdAt: new Date("2026-09-04T18:50:00"),
  },
  {
    name: "secure-notes",
    description:
      "A private notes application focused on authentication experiments.",
    language: "Python",
    visibility: "private",
    owner: "aarav",
    createdAt: new Date("2026-09-03T12:35:00"),
  },
  {
    name: "distributed-chat",
    description:
      "Experimenting with real-time messaging and distributed systems concepts.",
    language: "Go",
    visibility: "public",
    owner: "liam",
    createdAt: new Date("2026-09-02T20:05:00"),
  },
  {
    name: "portfolio-site",
    description: "Personal developer portfolio and project showcase.",
    language: "HTML",
    visibility: "public",
    owner: "olivia",
    createdAt: new Date("2026-09-01T10:20:00"),
  },
  {
    name: "inventory-service",
    description: "Backend service for tracking products and inventory levels.",
    language: "Java",
    visibility: "private",
    owner: "arjun",
    createdAt: new Date("2026-08-30T15:40:00"),
  },
  {
    name: "algorithm-lab",
    description:
      "Implementations and experiments involving algorithms and data structures.",
    language: "C++",
    visibility: "public",
    owner: "meera",
    createdAt: new Date("2026-08-28T17:55:00"),
  },
  {
    name: "blog-engine",
    description: "A server-rendered blogging platform with CRUD functionality.",
    language: "JavaScript",
    visibility: "public",
    owner: "noah",
    createdAt: new Date("2026-08-26T09:15:00"),
  },
  {
    name: "finance-tracker",
    description: "Application for recording and analyzing personal expenses.",
    language: "Python",
    visibility: "private",
    owner: "ishita",
    createdAt: new Date("2026-08-24T21:30:00"),
  },
  {
    name: "rust-experiments",
    description:
      "Small programs exploring Rust ownership and memory management.",
    language: "Rust",
    visibility: "public",
    owner: "ethan",
    createdAt: new Date("2026-08-22T13:05:00"),
  },
  {
    name: "markdown-editor",
    description: "Browser-based Markdown editor with live preview.",
    language: "TypeScript",
    visibility: "public",
    owner: "ava",
    createdAt: new Date("2026-08-20T16:45:00"),
  },
  {
    name: "network-monitor",
    description:
      "Experimental tool for monitoring network activity and service health.",
    language: "Go",
    visibility: "private",
    owner: "rohan",
    createdAt: new Date("2026-08-18T11:10:00"),
  },
  {
    name: "study-planner",
    description:
      "Planning tool for organizing courses, assignments, and study sessions.",
    language: "JavaScript",
    visibility: "public",
    owner: "sophia",
    createdAt: new Date("2026-08-16T19:25:00"),
  },
  {
    name: "database-playground",
    description:
      "Experiments with database queries, indexes, and data modeling.",
    language: "SQL",
    visibility: "public",
    owner: "kabir",
    createdAt: new Date("2026-08-14T14:35:00"),
  },
  {
    name: "image-processing",
    description: "Experiments with image manipulation and computer vision.",
    language: "Python",
    visibility: "public",
    owner: "lucas",
    createdAt: new Date("2026-08-12T10:50:00"),
  },
  {
    name: "cli-tools",
    description: "Collection of small command-line utilities for developers.",
    language: "Rust",
    visibility: "public",
    owner: "zoya",
    createdAt: new Date("2026-08-10T18:15:00"),
  },
  {
    name: "ecommerce-api",
    description: "RESTful backend for products, carts, and orders.",
    language: "Java",
    visibility: "private",
    owner: "aditya",
    createdAt: new Date("2026-08-08T12:00:00"),
  },
  {
    name: "open-source-guide",
    description:
      "A collection of notes and resources for learning open-source contribution.",
    language: "Markdown",
    visibility: "public",
    owner: "maya",
    createdAt: new Date("2026-08-05T15:30:00"),
  },
];

module.exports = { data: sampleRepositories }

