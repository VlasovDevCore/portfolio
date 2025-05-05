export const sectionMetadata = {
  about: {
    title: "Обо мне | Vlasov.Dev Core — Фронтенд с 4+ годами опыта",
    description:
      "Меня зовут Влад. 4 года в веб-разработке. Специализация: React, TypeScript, Next.js. Делаю интерфейсы, которыми приятно пользоваться.",
    keywords: [
      "фронтенд разработчик",
      "резюме",
      "опыт работы",
      "React",
      "TypeScript",
    ],
    og: {
      title: "Обо мне | Vlasov.Dev Core — Фронтенд с 4+ годами опыта",
      description: "Мой путь в IT, навыки и подход к разработке.",
      image: "https://vlasovdevcore.ru/og-about.jpg",
      url: "https://vlasovdevcore.ru/about",
    },
    twitter: {
      card: "summary_large_image",
      title: "Обо мне | Vlasov.Dev Core — Фронтенд с 4+ годами опыта",
      description: "Мой путь в IT, навыки и подход к разработке.",
      image: "https://vlasovdevcore.ru/twitter-about.jpg",
    },
  },
  skills: {
    title: "Навыки | Vlasov.Dev Core — Технологический стек",
    description:
      "Мой стек технологий: React, TypeScript, Next.js, Tailwind CSS и другие инструменты для современной веб-разработки.",
    keywords: ["навыки", "React", "TypeScript", "Next.js", "Tailwind CSS"],
    og: {
      title: "Навыки | Vlasov.Dev Core — Технологический стек",
      description: "Технологии, которые я использую в разработке.",
      image: "https://vlasovdevcore.ru/og-skills.jpg",
      url: "https://vlasovdevcore.ru/skills",
    },
    twitter: {
      card: "summary",
      title: "Навыки | Vlasov.Dev Core — Технологический стек",
      description: "Технологии, которые я использую в разработке.",
    },
  },
  project: {
    title: "Проекты | Vlasov.Dev Core — Реальные кейсы и пет-проекты",
    description:
      "Мои работы: от лендингов до сложных веб-приложений. ArtiCore, Stepura Conditioner и другие проекты с деталями реализации.",
    keywords: ["проекты", "портфолио", "ArtiCore", "Stepura", "React"],
    og: {
      title: "Проекты | Vlasov.Dev Core — Реальные кейсы и пет-проекты",
      description: "Что я сделал и как это работает под капотом.",
      image: "https://vlasovdevcore.ru/og-project.jpg",
      url: "https://vlasovdevcore.ru/project",
    },
    twitter: {
      card: "summary_large_image",
      title: "Проекты | Vlasov.Dev Core — Реальные кейсы и пет-проекты",
      description: "Что я сделал и как это работает под капотом.",
      image: "https://vlasovdevcore.ru/twitter-project.jpg",
    },
  },
  blog: {
    title: "Блог | Vlasov.Dev Core — Заметки о разработке",
    description:
      "Статьи о фронтенд-разработке, разборы технологий и личный опыт в IT.",
    keywords: ["блог", "разработка", "JavaScript", "React", "программирование"],
    og: {
      title: "Блог | Vlasov.Dev Core — Заметки о разработке",
      description: "Мысли вслух о коде, карьере и IT.",
      image: "https://vlasovdevcore.ru/og-blog.jpg",
      url: "https://vlasovdevcore.ru/blog",
    },
    twitter: {
      card: "summary",
      title: "Блог | Vlasov.Dev Core — Заметки о разработке",
      description: "Мысли вслух о коде, карьере и IT.",
    },
  },
  default: {
    title: "Обо мне | Vlasov.Dev Core — Фронтенд с 4+ годами опыта",
    description:
      "Меня зовут Влад. 4 года в веб-разработке. Специализация: React, TypeScript, Next.js. Делаю интерфейсы, которыми приятно пользоваться.",
    keywords: [
      "фронтенд разработчик",
      "резюме",
      "опыт работы",
      "React",
      "TypeScript",
    ],
    og: {
      title: "Обо мне | Vlasov.Dev Core — Фронтенд с 4+ годами опыта",
      description: "Мой путь в IT, навыки и подход к разработке.",
      image: "https://vlasovdevcore.ru/og-about.jpg",
      url: "https://vlasovdevcore.ru/about",
    },
    twitter: {
      card: "summary_large_image",
      title: "Обо мне | Vlasov.Dev Core — Фронтенд с 4+ годами опыта",
      description: "Мой путь в IT, навыки и подход к разработке.",
      image: "https://vlasovdevcore.ru/twitter-about.jpg",
    },
  },
};

export const updateMetaTags = (metadata) => {
  // <title>
  document.title = metadata.title;

  // <meta name="description">
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", metadata.description);
  }

  // <meta name="keywords">
  const metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metadata.keywords && metaKeywords) {
    metaKeywords.setAttribute("content", metadata.keywords.join(", "));
  } else if (metaKeywords) {
    metaKeywords.remove();
  }

  // Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector(
    'meta[property="og:description"]'
  );
  const ogImage = document.querySelector('meta[property="og:image"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');

  if (ogTitle) ogTitle.setAttribute("content", metadata.og.title);
  if (ogDescription)
    ogDescription.setAttribute("content", metadata.og.description);
  if (ogImage) ogImage.setAttribute("content", metadata.og.image);
  if (ogUrl) ogUrl.setAttribute("content", metadata.og.url);

  // Twitter Cards
  const twitterCard = document.querySelector('meta[name="twitter:card"]');
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  const twitterDescription = document.querySelector(
    'meta[name="twitter:description"]'
  );
  const twitterImage = document.querySelector('meta[name="twitter:image"]');

  if (twitterCard) twitterCard.setAttribute("content", metadata.twitter.card);
  if (twitterTitle)
    twitterTitle.setAttribute("content", metadata.twitter.title);
  if (twitterDescription)
    twitterDescription.setAttribute("content", metadata.twitter.description);
  if (twitterImage)
    twitterImage.setAttribute("content", metadata.twitter.image);

  // Canonical URL
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute("href", metadata.og.url);
};
