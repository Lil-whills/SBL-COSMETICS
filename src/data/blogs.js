import perfume from "../assets/perfume.png";
import skincare from "../assets/skincare.png";
import haircream from "../assets/haircream.png";
import makeup from "../assets/makeup.png";
import lipstick from "../assets/lipstick.png";
import heropic from "../assets/heroPic.png";

export const blogs = [
  {
    id: 1,
    slug: "how-to-choose-a-signature-perfume",
    title: "How to Choose a Signature Perfume",
    image: perfume,
    likes: 18,
    description:
      "Choosing a signature perfume is about more than just smelling nice. It is about finding a scent that matches your personality, your daily lifestyle, and the kind of presence you want to leave behind. Some people prefer floral notes for softness, while others enjoy woody or musky fragrances for confidence and depth. A good way to start is by testing perfumes in small amounts and observing how they settle on your skin after some time. The perfect scent should feel natural, memorable, and comfortable enough to wear again and again.",
  },
  {
    id: 2,
    slug: "simple-skincare-routine-for-glowing-skin",
    title: "Simple Skincare Routine for Glowing Skin",
    image: skincare,
    likes: 24,
    description:
      "A simple skincare routine can make a huge difference when followed consistently. The goal is not to use too many products but to understand what your skin needs and keep things balanced. Start with a gentle cleanser, follow up with a good moisturizer, and use products that help support hydration and smoothness. Healthy glowing skin often comes from regular care, patience, and choosing quality products that work well with your skin type. The simplest routines are often the easiest to maintain and the most effective over time.",
  },
  {
    id: 3,
    slug: "why-hair-cream-matters-for-healthy-hair",
    title: "Why Hair Cream Matters for Healthy Hair",
    image: haircream,
    likes: 15,
    description:
      "Hair cream plays an important role in keeping hair soft, manageable, and well nourished. Many people focus only on shampooing but forget that moisture and treatment are what help hair stay healthy-looking. A good hair cream can reduce dryness, improve texture, and make styling easier throughout the week. Whether your hair is natural, curly, relaxed, or braided, using the right cream consistently can help it feel smoother and appear better cared for. It is a simple step that adds real value to a beauty routine.",
  },
  {
    id: 4,
    slug: "makeup-basics-every-beginner-should-know",
    title: "Makeup Basics Every Beginner Should Know",
    image: makeup,
    likes: 31,
    description:
      "Makeup becomes much easier when you understand the basics and focus on simple products first. Beginners do not need a large collection to achieve a clean and beautiful look. Starting with the right tools, blending properly, and choosing shades that suit your skin tone will already make a big difference. The best approach is to practice a few simple steps until they become natural. Makeup should not feel stressful. It should feel like a creative way to highlight your features and express your style with confidence.",
  },
  {
    id: 5,
    slug: "finding-the-right-lipstick-for-everyday-wear",
    title: "Finding the Right Lipstick for Everyday Wear",
    image: lipstick,
    likes: 22,
    description:
      "The right everyday lipstick should be comfortable, flattering, and easy to wear with different outfits. Some people prefer nude shades for a soft natural look, while others love richer tones that add character without being too bold. A good lipstick should feel smooth on the lips and give enough color to brighten the face without becoming difficult to maintain throughout the day. Choosing an everyday shade is about finding balance between beauty, comfort, and how easily it fits into your routine.",
  },
  {
    id: 6,
    slug: "how-to-make-your-fragrance-last-longer",
    title: "How to Make Your Fragrance Last Longer",
    image: heropic,
    likes: 27,
    description:
      "A fragrance can last longer when it is applied with the right habits in mind. Clean skin, moisturized areas, and applying perfume to pulse points can all help improve how long a scent stays noticeable. Rubbing the perfume immediately after spraying can reduce its performance, so it is better to let it settle naturally. Storage also matters because heat and sunlight may affect the quality of a fragrance over time. With the right care, your favorite perfume can stay fresher and perform better whenever you wear it.",
  },
  {
    id: 7,
    slug: "self-care-and-confidence-go-hand-in-hand",
    title: "Self-Care and Confidence Go Hand in Hand",
    image: skincare,
    likes: 19,
    description:
      "Self-care is not only about appearance. It is also about how personal habits influence confidence and self-respect. Taking time to care for your skin, hair, and overall presentation can improve how you feel on a daily basis. Beauty routines often create a sense of order, freshness, and readiness that supports confidence in social situations, school, work, and personal life. When people feel comfortable in their appearance, they often carry themselves with more ease and assurance. Small acts of care can have a strong impact over time.",
  },
  {
    id: 8,
    slug: "building-a-premium-beauty-routine-on-a-budget",
    title: "Building a Premium Beauty Routine on a Budget",
    image: makeup,
    likes: 14,
    description:
      "A premium beauty routine does not always require the most expensive products. What matters more is selecting a few reliable items that serve real purposes and using them well. A quality routine can be built around essentials like a fragrance you love, skincare that supports your skin, and beauty products that suit your everyday style. Instead of buying too many random items, it is smarter to invest in a small collection that feels intentional and consistent. Beauty becomes more satisfying when it is thoughtful and sustainable.",
  },
];

export const getBlogPreview = (text, limit = 50) => {
  if (!text) return "";
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
};

export default blogs;