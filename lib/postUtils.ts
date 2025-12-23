import { BlogPost } from "@/types/blog";
import { postTranslations, translations } from "./translations";
import { Language } from "@/contexts/LanguageContext";

export function getLocalizedPost(post: BlogPost, language: Language): BlogPost {
  if (language === "ko") {
    return post;
  }

  const translation = postTranslations[post.id];
  if (!translation) {
    return post;
  }

  return {
    ...post,
    title: translation.title || post.title,
    excerpt: translation.excerpt || post.excerpt,
    category: translation.category || post.category,
    tags: translation.tags || post.tags,
  };
}

export function getLocalizedCategory(category: string, language: Language): string {
  if (language === "ko") {
    return category;
  }
  return translations.en.blog.categories[category as keyof typeof translations.en.blog.categories] || category;
}






