export interface About {
    name: string;
    title: string;
    summary: string;
    current_focus: string[];
    career_goal: string;
    location: string;
}

export interface Skills {
    languages: string[];
    frontend: string[];
    backend: string[];
    database: string[];
    cloud_devops: string[];
    ai_ml: string[];
}

export interface Project {
    id: string;
    name: string;
    category: string;
    status: string;

    description: string;
    problem_solved: string;

    tech_stack: string[];

    features: string[];

    architecture: string[];

    my_role: string;

    highlights: string[];

    github: string;
    live_demo: string;

    future_improvements: string[];
}

export interface ExperienceDuration {
    start: string;
    end: string;
    total: string;
}

export interface Experience {
    id: string;

    company: string;

    role: string;

    employment_type: string;

    status: string;

    duration: ExperienceDuration;

    location: string;

    mode: string;

    summary: string;

    responsibilities: string[];

    technologies: string[];

    skills_gained: string[];

    key_highlights: string[];

    achievements: string[];

    mentor_feedback: string;

    certificate_available: boolean;
}

export interface Education {
    institution: string;
    degree: string;
    field: string;
    status: string;
    start_year: string;
    expected_graduation: string;
    cgpa: string;
    location: string;
    key_learning: string[];
}

export interface Contact {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    portfolio: string;
    resume: string;
    availability: string;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface Personality {
    tone: string;
    style: string;
    emoji_usage: string;
}

export interface ResponseRules {
    maximum_length: string;
    use_bullets_for_lists: boolean;
    never_make_up_information: boolean;
    answer_only_from_knowledge_base: boolean;
}

export interface SystemConfig {
    assistant_name: string;
    personality: Personality;
    response_rules: ResponseRules;
}

export interface PortfolioKnowledge {
    about: About;

    skills: Skills;

    projects: {
        projects: Project[];
    };

    experience: {
        experiences: Experience[];
    };

    education: {
        education: Education[];
    };

    contact: Contact;

    faqs: {
        faqs: FAQ[];
    };

    system: SystemConfig;
}

export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}
