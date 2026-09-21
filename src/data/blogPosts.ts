// src/data/blogPosts.ts

export interface BlogPostFaq {
  q: string;
  a: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  image: string;
  readTime: string;
  date: string;
  dateISO: string;
  author: string;
  authorRole: string;
  headline: string;
  excerpt: string;
  content: string[];
  /** SEO */
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** AEO — answer engine / featured snippet content */
  quickAnswer: string;
  keyTakeaways: string[];
  faqs: BlogPostFaq[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'introducing-braham-bold-new-identity',
    number: '001',
    title: 'Introducing Braham: A Bold New Identity for a Bold Future',
    category: 'Business',
    image:
      'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/LLO/neww1.webp',
    readTime: '5 MIN READ',
    date: 'SEPTEMBER 2026',
    dateISO: '2026-09-21',
    author: 'Segun Abodurin',
    authorRole: 'Founder & CEO',
    headline:
      'At Findar, our mission has always been clear  to empower businesses and individuals',
    excerpt:
      'Findar unveils Braham — a refreshed creative identity built on clarity, boldness, and craft. Here is what changes, what stays the same, and why.',
    content: [
      'At Findar, our mission has always been clear — to empower businesses and individuals by blending creativity, technology, and strategy in ways that create lasting impact. As we enter a new chapter of growth, we are proud to unveil our refreshed identity: Braham.',
      'Why Braham? The name Braham is inspired by vision, pioneering spirit, and the boldness to create what lasts. It reflects who we are becoming as a company that doesn\'t just deliver campaigns but builds legacies.',
      'Braham is more than a new name. It\'s a renewed commitment to clarity, boldness, and creativity, with a visual identity that captures trust (aqua blue), optimism (yellow), and authority (black). The new logo reflects our belief in spotlighting brands, ensuring every client stands out with purpose and precision.',
      'Part of the Findar Ecosystem. Braham is proudly a Findar company. As Findar sharpens its focus on being product-led, each of our ventures plays a unique role in delivering value at scale: Braham is our advertising and creative consultancy arm, helping brands tell their stories with clarity and boldness. Wodbrick is our soon-to-launch platform simplifying website development, making digital building blocks accessible to businesses everywhere. And our other Findar ventures, anchored in healthcare, skills, and digital transformation, are all unified by a single vision: using technology and creativity to solve real-world problems.',
      'What This Means for Our Clients. For our partners and clients, Braham represents deeper creative capability to elevate brands locally and globally; integrated solutions — from brand strategy to execution — all under one roof; and future-ready thinking, powered by Findar\'s wider product ecosystem.',
      'Looking Ahead. This rebrand is more than a new logo or colour palette. It\'s a declaration of intent. With Braham, we are building bold futures for our clients, for our people, and for the communities we serve. We can\'t wait to embark on this new journey together.',
    ],
    metaTitle:
      'Introducing Braham: A Bold New Identity for a Bold Future | Braham Journal',
    metaDescription:
      'Findar unveils Braham — a refreshed creative identity built on clarity, boldness, and craft. Discover the new name, logo, colour system, and what it means for our clients.',
    keywords: [
      'Braham rebrand',
      'Findar Braham',
      'creative agency rebrand',
      'Braham new identity',
      'brand refresh announcement',
      'Braham creative consultancy',
      'Wodbrick',
    ],
    quickAnswer:
      'Braham is the refreshed creative identity of Findar\'s advertising and creative consultancy arm. Built on clarity, boldness, and craft, the new name and visual system — anchored by aqua blue, yellow, and black — reinforce a renewed commitment to spotlighting client brands with purpose and precision.',
    keyTakeaways: [
      'Braham replaces the previous identity of Findar\'s creative consultancy arm — same team, same mission, sharper focus.',
      'The name reflects vision, pioneering spirit, and the boldness to build what lasts.',
      'The visual identity is built on three pillars: trust (aqua blue), optimism (yellow), and authority (black).',
      'Braham operates alongside Wodbrick and other Findar ventures, unified by a single vision of solving real-world problems through technology and creativity.',
      'For clients, this means deeper creative capability, integrated strategy-to-execution, and future-ready thinking backed by Findar\'s wider ecosystem.',
    ],
    faqs: [
      {
        q: 'What is Braham?',
        a: 'Braham is the refreshed creative identity of Findar\'s advertising and creative consultancy arm. It represents a renewed commitment to clarity, boldness, and creativity — expressed through a new name, logo, and colour system, and anchored in the studio\'s mission to help brands tell their stories with purpose and precision.',
      },
      {
        q: 'What does the name Braham mean?',
        a: 'Braham is inspired by vision, pioneering spirit, and the boldness to create what lasts. It reflects who we are becoming as a company that doesn\'t just deliver campaigns, but builds legacies.',
      },
      {
        q: 'How does Braham relate to Findar?',
        a: 'Braham is proudly a Findar company. It operates as the creative and advertising consultancy arm of the Findar ecosystem, working alongside Wodbrick (a soon-to-launch website-building platform) and other ventures anchored in healthcare, skills, and digital transformation.',
      },
      {
        q: 'What does the Braham rebrand mean for clients?',
        a: 'For partners and clients, Braham represents deeper creative capability, integrated solutions from strategy to execution, and future-ready thinking powered by Findar\'s wider product ecosystem. The rebrand is a declaration of intent — not just a new logo or colour palette.',
      },
      {
        q: 'What colours define the Braham identity?',
        a: 'The Braham visual identity captures three principles: trust (aqua blue), optimism (yellow), and authority (black). Together they reinforce a brand language built on clarity, boldness, and precision.',
      },
    ],
  },
  {
    id: 'post-2',
    slug: 'hired-almost-too-late-confessions-web-team',
    number: '002',
    title: 'We Were Hired Almost Too Late: Confessions from the Web Team',
    category: 'Business',
    image:
      'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/LLO/Blog-1_-Website.webp',
    readTime: '6 MIN READ',
    date: 'SEPTEMBER 2026',
    dateISO: '2026-09-14',
    author: 'Segun Abodurin',
    authorRole: 'Director of Web Engineering',
    headline:
      'Every agency has war stories. Ours usually start with a call that begins like this:',
    excerpt:
      'A digital rescue mission in five acts — vanished logins, undocumented frameworks, zero analytics, invisible SEO, and the tiny details that scream "unfinished." Here\'s why you should call us before the damage is done.',
    content: [
      'Every agency has war stories. Ours usually start with a call that begins like this: "We\'ve got a bit of a situation…" By the time we\'re brought in, the website is either broken, buggy, or barely usable. What follows is a digital rescue mission, complete with late-night coffee, panicked passwords, and a lot of "why didn\'t they just…?"',
      'This is our open letter to business owners: call us before the damage is done.',
      'We were hired after… the login details vanished. The client had no access to their own website or hosting. Their former "developer" used personal email addresses, withheld passwords, and held the site hostage when asked for updates. We had to start from scratch just to return ownership to the rightful owner. Lesson: If you can\'t access it, you don\'t own it.',
      'We were hired after… the site was built in a language no one else uses. It looked okay from the outside, but the backend was a nightmare. Obscure frameworks. No documentation. Locked features. Why? Because the original dev wanted to force a long-term retainer. Lesson: Complexity isn\'t the same as quality.',
      'We were hired after… no analytics were ever installed. No Google Analytics. No tracking. No idea who was visiting or why bounce rates were high. The business had been online for 18 months and didn\'t even know how many people had visited the site. Lesson: What you can\'t measure, you can\'t grow.',
      'We were hired after… SEO was an afterthought. No meta tags. No keywords. Images weren\'t compressed or named properly. No sitemap. The client wondered why they weren\'t showing up on Google. Turns out, Google barely knew they existed. Lesson: A beautiful site that no one finds is like a billboard in the desert.',
      'We were hired after… someone asked, "What\'s a favicon?" That tiny little icon on your browser tab? It\'s a small thing, but when it\'s missing, it screams "unfinished." The details were overlooked, and clients noticed. Lesson: The small things speak volumes.',
      'The Truth: We love rescuing brands. It\'s what we do. But we\'d rather start on a blank canvas than erase someone else\'s mistakes. When we\'re involved early, we can build you a site that grows with you, not a mess that holds you hostage. Call us before the damage is done. Because good strategy beats a good-looking disaster every time.',
    ],
    metaTitle:
      'We Were Hired Almost Too Late: Confessions from the Web Team | Braham Journal',
    metaDescription:
      'Five real rescue missions — vanished logins, locked frameworks, no analytics, invisible SEO, and missing favicons. Why good strategy beats a good-looking disaster every time.',
    keywords: [
      'web development rescue',
      'website ownership',
      'website security',
      'web design mistakes',
      'SEO best practices',
      'web analytics setup',
      'favicon',
      'agency war stories',
    ],
    quickAnswer:
      'Most rescue missions we run come from the same five mistakes: a former developer holding the logins hostage, undocumented frameworks that lock the client in, no analytics installed, SEO treated as an afterthought, and missed details like the favicon. All five are preventable when a professional team is brought in early — good strategy beats a good-looking disaster every time.',
    keyTakeaways: [
      'If you can\'t access your own website, logins, or hosting, you don\'t own it — you\'re renting it from someone else\'s decisions.',
      'Complexity isn\'t quality. Undocumented frameworks and locked features are signs of a developer forcing a retainer, not building you a system.',
      'Install analytics on day one. Eighteen months of traffic with zero tracking is eighteen months of lost decisions.',
      'SEO isn\'t decoration. No meta tags, no sitemap, no compressed images means Google barely knows you exist.',
      'The small things — favicon, file formats, alignment — speak volumes. Clients notice when they\'re missing.',
    ],
    faqs: [
      {
        q: 'What should I check before hiring a web developer?',
        a: 'Ask three things before you sign anything: (1) Will I own my domain, hosting, and CMS logins in my own name? (2) What framework or platform will you build on, and is it documented and portable? (3) What analytics, SEO, and performance setup is included? If any answer is vague, walk away.',
      },
      {
        q: 'How do I get back ownership of a website from a former developer?',
        a: 'Start by contacting your domain registrar and hosting provider directly — if the account is in your name, you can regain access without the developer\'s help. If accounts were registered under their personal email, you may need to escalate to the registrar, file a dispute, or (in worst cases) rebuild from scratch. This is exactly why ownership must be in your name from day one.',
      },
      {
        q: 'What analytics should every business website have?',
        a: 'At minimum: Google Analytics 4 (or an equivalent), Google Search Console, and heat-mapping or session-recording for user behavior. These three cover traffic, search visibility, and on-page behavior — the foundation for any growth decision.',
      },
      {
        q: 'Why is a favicon important?',
        a: 'A favicon is the tiny icon in your browser tab, bookmarks, and search results. Its absence signals unfinished work to anyone paying attention. It\'s a 5-minute fix that quietly communicates professionalism.',
      },
      {
        q: 'Should I start a new website or fix the existing one?',
        a: 'If the existing site is well-documented, on a mainstream platform, and you own the accounts — fix it. If it\'s built on obscure frameworks, undocumented, or the previous developer controls access, a clean rebuild is usually faster and cheaper than trying to rescue what\'s there.',
      },
    ],
  },
  {
    id: 'post-3',
    slug: 'what-your-logo-would-say-if-it-could-talk',
    number: '003',
    title: 'What Your Logo Would Say If It Could Talk',
    category: 'Consultation',
    image:
      'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/LLO/Blog-3_-Logo.webp',
    readTime: '5 MIN READ',
    date: 'SEPTEMBER 2026',
    dateISO: '2026-09-07',
    author: 'Segun Abodurin',
    authorRole: 'Director of Brand Strategy',
    headline:
      'Logos have feelings. Okay, maybe not literally, but if they could talk, some would be crying',
    excerpt:
      'A playful, painfully honest look at what your logo would say about its font, its file formats, its scalability, and the night on Canva it was born. Plus: how to give it a voice worth hearing.',
    content: [
      'Logos have feelings. Okay, maybe not literally, but if they could talk, some would be crying into their gradients. I\'ve seen logos that scream "Help!" and others that whisper "I was made on Microsoft Word." So here\'s a fun (and painfully true) take: what your logo would say, if it finally had a voice.',
      'I\'m Tired. Your font\'s been stretched more than your patience. The colours are faded. The alignment? Crooked. You were built in 2013 and haven\'t had a facelift since. "I\'ve served well," your logo sighs, "but I need a spa day."',
      'Nobody Knows What I Mean. Your logo is a mysterious triangle with a line and a dot. It\'s abstract, yes — but too abstract. Am I a startup? A plumbing service? A yoga brand? Even I don\'t know! Your logo should say something about your identity.',
      'I\'m Not Like the Other Files. I exist only as a blurry JPEG. Try printing this on a billboard and you\'ll end up with pixel soup. Also, your designer is nowhere to be found. You need proper file formats. Think: SVG, EPS, PNG, PDF.',
      'I\'m Not Scalable and It Hurts. On your website header, I\'m okay. On Instagram? I\'m a dot. Please, I wasn\'t meant to be this small. Your logo needs to work across all formats and screen sizes.',
      'I Was a Last-Minute Decision. Remember that one night on Canva? Yeah, I was born then. I\'m not judging, okay, but I deserve better. DIY can work. But if your brand\'s grown up, maybe your logo should too.',
      'I Have a Cousin. And Another. And Another. Every department uses a different version of me. Different colours. Different fonts. Chaos. "I\'m losing my identity!" You need a brand guideline before I develop multiple personalities.',
      'And what happens when logos find their voice? They become distinct. They communicate instantly. They spark connections.',
      'At Braham, we don\'t just design logos. We create identities with souls — ones that speak clearly, proudly, and consistently. Logos that say: "This is who we are, and we\'re proud of it." If your logo\'s whispering sad things behind your back, maybe it\'s time to listen. Give it a new voice. Let it speak with clarity and confidence. Let it be heard.',
    ],
    metaTitle:
      'What Your Logo Would Say If It Could Talk | Braham Journal',
    metaDescription:
      'A playful, painfully honest look at what your logo would say about its font, file formats, scalability, and Canva origins — plus how to give it a voice worth hearing.',
    keywords: [
      'logo design',
      'brand identity',
      'logo redesign',
      'brand guidelines',
      'logo file formats',
      'SVG EPS PNG',
      'scalable logo',
      'Canva logo',
      'brand consultation',
    ],
    quickAnswer:
      'If your logo could talk, it would complain about four things: fonts stretched and colours faded from years of DIY edits, no proper vector files (only blurry JPEGs), a lack of scalability across screen sizes, and multiple inconsistent versions used across departments. The fix is a proper brand identity system — vector files, brand guidelines, and a logo designed to work at every scale.',
    keyTakeaways: [
      'A logo should exist in proper vector formats (SVG, EPS) alongside raster (PNG, PDF) — not just as a blurry JPEG.',
      'Consistency across every touchpoint — website, social, print, favicon — is what turns a logo into a brand.',
      'Abstract marks without clear meaning confuse audiences. A good logo communicates category and personality instantly.',
      'Brand guidelines prevent the "multiple personalities" problem where every department uses a different version.',
      'DIY logos can work for early-stage brands, but as the brand grows, the identity should grow with it.',
    ],
    faqs: [
      {
        q: 'What file formats should my logo be saved in?',
        a: 'At minimum: SVG and EPS (vector, infinitely scalable), PNG with transparent background (for digital), and PDF (for print). If you only have a JPEG, you don\'t have a logo — you have a screenshot of one. Any designer who delivers only JPEGs has not delivered a logo system.',
      },
      {
        q: 'How often should a logo be redesigned?',
        a: 'Not on a fixed schedule — on a brand-maturity signal. Redesign when: your business has grown into a different market or category, your current mark no longer communicates your values, or it fails at small sizes and modern formats. A logo built in 2013 that\'s been stretched and recolored dozens of times is overdue for a refresh.',
      },
      {
        q: 'What is a brand guideline and why do I need one?',
        a: 'A brand guideline is a document that specifies exactly how your logo, colour palette, typography, and spacing should be used across every medium. Without one, every team member invents their own version — different fonts, different colours, different clear-space rules — and your brand fragments. A guideline is what keeps a logo consistent as the team scales.',
      },
      {
        q: 'Can I use a logo I made myself on Canva?',
        a: 'Yes, for an early-stage or personal brand — many successful companies started with DIY marks. The limits appear as you scale: Canva exports are raster-only (no true vectors), so the mark gets blurry when enlarged; colours and fonts rarely match across uses; and there is no version system for different contexts. When the brand outgrows the DIY stage, it\'s time to commission a proper identity.',
      },
      {
        q: 'What makes a logo scalable across all sizes?',
        a: 'A scalable logo is built as a vector (SVG, EPS) with strong contrast, simple geometry, and enough clarity to read clearly at 16px (favicon) and 16 feet (billboard). It often ships in multiple lockups — horizontal, stacked, icon-only — so the same identity works in every context without being stretched or squashed.',
      },
    ],
  },
];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  BLOG_POSTS.find((p) => p.slug === slug);