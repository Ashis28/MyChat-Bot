import type {
    PortfolioKnowledge,
    About,
    Skills,
    Project,
    Experience,
    Education,
    Contact,
    FAQ,
    SystemConfig,
} from "../types/knowledge";

const KNOWLEDGE_BASE = "http://127.0.0.1:8787/knowledge";

let cache: PortfolioKnowledge | null = null;

async function loadJson<T>(file: string): Promise<T> {
    const response = await fetch(`${KNOWLEDGE_BASE}/${file}`);

    if (!response.ok) {
        throw new Error(`Failed to load ${file}`);
    }

    return (await response.json()) as T;
}

export async function getPortfolioKnowledge(): Promise<PortfolioKnowledge> {
    // Return cached knowledge if already loaded
    if (cache) {
        console.log("Cache is being returned 🌵")
        return cache;
    }

    const [
        about,
        skills,
        projects,
        experience,
        education,
        contact,
        faqs,
        system,
    ] = await Promise.all([
        loadJson<About>("about.json"),
        loadJson<Skills>("skills.json"),
        loadJson<{ projects: Project[] }>("projects.json"),
        loadJson<{ experiences: Experience[] }>("experience.json"),
        loadJson<{ education: Education[] }>("education.json"),
        loadJson<Contact>("contacts.json"),
        loadJson<{ faqs: FAQ[] }>("faqs.json"),
        loadJson<SystemConfig>("system.json"),
    ]);

    cache = {
        about,
        skills,
        projects,
        experience,
        education,
        contact,
        faqs,
        system,
    };
    console.log("Added to the cache 🌵 ➡️");
    return cache;
}