// Public-facing copy grounded in the user's CVs and project records.
// The user approved a modestly expanded introduction, keeping three short paragraphs.
export const profile = {
  name: 'Shantanu Patil',
  email: 'shantanupatil1899@gmail.com',
  autoAdvance: false,
  socials: {
    linkedin: 'https://www.linkedin.com/in/patil-shantanu/',
    github: 'https://github.com/REDFOX1899',
    cv: '/assets/Shantanu-Patil-CV.pdf'
  },
  about: [
    `I'm an engineer based in New York. At Virtusa, I build <a href="/writing/connecting-ai-to-enterprise-data" data-route>AI tools</a> and <a href="/writing/checking-the-numbers" data-route>data systems</a> for Dun &amp; Bradstreet’s data supply chain, using AI to understand legacy systems and help move them off the mainframe.`,
    `My work includes the <a href="https://www.dnb.com/en-us/solutions/artificial-intelligence/connectors.html" target="_blank" rel="noreferrer">Finance Analytics MCP server</a> and Trade ETL across the U.S. and Canada. At E-Touch, I started with Power BI dashboards for senior leadership, then moved into cloud migrations, Terraform, and Harness deployments.`,
    `I studied computer science at <a class="education-link" href="https://www.umass.edu/" target="_blank" rel="noreferrer"><img class="school-mark" src="/assets/umass-amherst.png" alt="" aria-hidden="true" width="18" height="18">UMass Amherst</a> and completed an integrated B.Tech. + M.Tech. in Mathematics and Computing at <a class="education-link" href="https://www.iitism.ac.in/" target="_blank" rel="noreferrer"><img class="school-mark" src="/assets/iit-dhanbad.png" alt="" aria-hidden="true" width="18" height="18">IIT Dhanbad</a>. I write at <a href="https://fde.guru/" target="_blank" rel="noreferrer">fde.guru</a> and am open to AI and data engineering roles.`
  ],
  goal: 'I’m looking for AI and data engineering work where I can build useful systems, learn from thoughtful people, and take responsibility for what actually ships.',
  timelineIntro: 'A few chapters in my work, education, and ongoing projects:',
  timeline: [
    { label: '2026–now', title: 'AI and data at Virtusa.', details: [
      'Building D&B’s data supply chain with Scala, Java, and MongoDB.',
      'Mapping U.S. and Canadian Trade ETL and helping migrate UCC, SLJ, and bankruptcy workflows off the mainframe.',
      'Built the Finance Analytics MCP server for Dun & Bradstreet.',
      'Built a D&B insurance underwriting agent with Google ADK on GCP; our team placed second in Google’s Rapid Agent Development Challenge.'
    ] },
    { label: '2024–25', title: 'Analytics and cloud at E-Touch.', details: [
      'Started with Power BI dashboards for senior VPs, tracking Finance Analytics users and platform metrics worldwide.',
      'Helped migrate Oracle Exadata workloads to AlloyDB and BigQuery on GCP.',
      'Managed infrastructure with Terraform and CI/CD deployments through Harness.'
    ] },
    { label: '2022–24', title: 'Master’s at UMass Amherst.', logo: '/assets/umass-amherst.png', details: ['Studied computer and information sciences at the University of Massachusetts Amherst.'] },
    { label: '2020–21', title: 'Backend systems at Sariska.', details: ['Built Python services with Redis caching for real-time communications.', 'Managed AWS infrastructure and automated deployments.'] },
    { label: '2015–20', title: 'Integrated degree at IIT Dhanbad.', logo: '/assets/iit-dhanbad.png', details: ['Completed an integrated B.Tech. + M.Tech. in Mathematics and Computing.'] },
    { label: 'Alongside', title: 'Building and writing at fde.guru.', details: ['Publishing build logs, system design guides, and experiments in AI and data engineering.'] },
    { label: 'Next', title: 'More useful things to build.', details: ['Looking for AI and data engineering roles, and thoughtful collaborators.'] }
  ],
  readingIntro: 'My field guides and build notes live over at fde.guru:',
  books: [
    { title: 'System Design — foundations and worked designs', href: 'https://systemdesign.fde.guru/' },
    { title: 'AI Systems — retrieval, agents, and operations', href: 'https://systemdesign.fde.guru/ai' },
    { title: 'The Reasoning Decade — an evolving AI thesis', href: 'https://thesis.fde.guru/' },
    { title: 'Rate limiters — controlling work and traffic', href: 'https://systemdesign.fde.guru/chapters/4' },
    { title: 'Key-value stores — partitioning and replication', href: 'https://systemdesign.fde.guru/chapters/6' },
    { title: 'Chat systems — delivery and persistence', href: 'https://systemdesign.fde.guru/chapters/12' },
    { title: 'Build notes — experiments at fde.guru', href: 'https://fde.guru/posts' }
  ],
  design: 'I like tools that make complex work feel simple. These small studies explore interaction and motion: the details that make software clearer, more useful, and easier to trust.'
};

// Technical notes describe documented work. The date is the preparation date
// of these portfolio notes, not an invented historic publication date.
export const posts = [
  {
    slug: 'connecting-ai-to-enterprise-data',
    title: 'Connecting AI to enterprise data, with limits',
    date: '2026-10-30', cover: 'mcp-cover.svg',
    description: 'A production MCP integration for AlloyDB, with query validation, read-only transactions, and existing access controls.',
    intro: 'Connecting a model to a database is only part of the work. The more useful question is what that connection should allow.',
    sections: [
      ['The problem', [
        'At Virtusa, working with Dun & Bradstreet, I built a production MCP server for AlloyDB. It exposed four tools across six GCP clusters, giving AI tools a defined way to work with enterprise data.',
        'The integration needed more than a working query path. Database access had to remain constrained, and the checks needed to live in the system rather than depend on a model following instructions.'
      ]],
      ['Checks in two places', [
        'I combined SQL abstract syntax tree validation with database-enforced read-only transactions. The validation checks query structure before execution. The transaction mode constrains what the database will allow during execution.',
        'GCP IAM supplied access control. These mechanisms address different parts of the problem: who can connect, what the application accepts, and what the database permits. Each matters on its own.'
      ]],
      ['A small interface', [
        'MCP makes tools available through a common interface. That does not remove the need to decide what each tool exposes. In this implementation, the interface was deliberately limited to four tools rather than an unrestricted route to the underlying systems.',
        'Python, FastMCP, and SQL validation were the implementation pieces. The important engineering choice was to keep the tool interface, access checks, and execution constraints explicit.'
      ]],
      ['What this work demonstrates', [
        'This was a production integration, distinct from the agent prototypes I have also built. It brought together backend implementation, cloud access control, and database behavior in an enterprise environment.',
        'For me, the interesting part of applied AI is this boundary: taking a capability that works in a demonstration and defining how it should operate alongside existing systems. A useful connection needs a clear shape, a clear purpose, and limits that the surrounding software actually enforces.'
      ]]
    ]
  },
  {
    slug: 'checking-the-numbers', title: 'Checking the numbers',
    date: '2026-10-30', cover: 'data-cover.svg',
    description: 'Company-level UCC summaries in Scala/Spark, checked against independent Python calculations across real-data batches.',
    intro: 'A summary is easy to read and easy to get subtly wrong. I wanted a separate way to check the numbers.',
    sections: [
      ['From filings to companies', [
        'For Dun & Bradstreet, I implemented company-level UCC financing summaries using Scala/Spark, MongoDB, and GCS. The work brought filing counts, open status, and date ranges together across states.',
        'The challenge was to translate the business rules into consistent company-level results. A pipeline can complete successfully while still giving the wrong answer, so execution alone was not enough evidence.'
      ]],
      ['An independent calculation', [
        'I validated summaries for 37 companies across four real-data batches against independent Python calculations. A separate calculation gave me something concrete to compare with the Spark output.',
        'I also isolated test writes from shared data and checked results across repeated batches. The checks needed to be useful without disturbing the data other work depended on. Repeated runs were another opportunity to compare behavior rather than rely on a single successful execution.'
      ]],
      ['Keeping the claim precise', [
        'The implementation was submitted for code-owner review. That is different from saying it had already rolled out or processed every record in the source collection.',
        'The evidence I can point to is the implementation, the independent calculations, and the batches I actually checked. This is the part of data engineering I want to keep doing: understanding what an output means, making it repeatable, and giving the next person a reason to trust it.'
      ]]
    ]
  },
  {
    slug: 'an-underwriting-agent', title: 'An underwriting agent, end to end',
    date: '2026-10-30', cover: 'agent-cover.svg',
    description: 'A Google ADK proof of concept connecting authentication, company search, ownership checks, and decisioning.',
    intro: 'An agent becomes more interesting when it has to connect several steps into one workflow. This project explored that for underwriting.',
    sections: [
      ['Following the workflow', [
        'I developed a Google ADK underwriting proof of concept connecting authentication, company search, beneficial-ownership checks, and decisioning. It placed second in Google’s Rapid Agent Development Challenge.',
        'The work was about more than producing a final response. The system needed to move through a sequence of tools, with each stage supplying information the next stage needed.'
      ]],
      ['Connecting the tools', [
        'Company search and ownership checks represent different questions. Authentication sits before them. Decisioning sits after them. Putting those operations behind an agent does not make the distinctions disappear.',
        'Google ADK provided the framework for connecting the steps. The useful engineering work was in assembling a coherent path through enterprise services, rather than treating the model as a substitute for those services.',
        'This is also why I describe it as an underwriting workflow rather than a general-purpose assistant. The purpose of the prototype was specific, and the tool sequence reflected that purpose.'
      ]],
      ['A prototype with a clear scope', [
        'This was a proof of concept, not a claim of autonomous production underwriting. The challenge result is one outcome; the implemented workflow is the more useful thing to discuss.',
        'It is an example of the work I enjoy in applied AI: starting with an existing process, understanding the services involved, and building the connections that let the steps work together. The model is one component of that system, alongside the tools and the surrounding software.'
      ]]
    ]
  },
  {
    slug: 'finding-the-conversations', title: 'Finding the conversations',
    date: '2026-10-30', cover: 'talks-cover.svg',
    description: 'A local tool for collecting someone’s YouTube talks, interviews, and podcasts in one place, with metadata and review.',
    intro: 'I wanted a better way to collect the talks and interviews someone has given. That became a small local tool called Talk Index.',
    sections: [
      ['One person, many channels', [
        'A person’s conversations can be spread across podcast channels, event recordings, and interviews. I wanted to search by name and keep the useful details together: the video link, channel, upload date, and description.',
        'The MVP combines four YouTube searches and removes duplicates. It keeps candidate results even when the person’s name is missing from the title, rather than silently throwing those results away.'
      ]],
      ['Search, then review', [
        'A search result is a candidate, not proof that someone appears in a video. The app lets me mark a result as a confirmed speaking appearance or reject it.',
        'Saved videos and review decisions stay in the browser. Results can be exported as CSV, and completed searches are cached to avoid spending search quota every time the same person is looked up. There are no accounts or payments in this local version.'
      ]],
      ['Keeping it small', [
        'The current version focuses on discovery and metadata. It does not transcribe videos or automatically verify speakers, and YouTube search cannot guarantee every appearance will be found.',
        'That narrower scope is useful on its own. It turns a scattered search into a list I can inspect, save, and return to. It is the kind of side project I like: start with a problem I actually have, make a small working tool, and improve it where the limitations become visible.'
      ]]
    ]
  }
];

// Published writing is linked to its canonical location rather than copied.
export const writingPosts = [
  { slug:'india-trade-analysis-bigquery-cloud-run-app', title:'An India trade explorer on Cloud Run', date:'2026-07-18', href:'https://fde.guru/posts/india-trade-analysis-bigquery-cloud-run-app/', cover:'data-cover.svg', description:'A Next.js trade explorer backed by BigQuery and pre-aggregated data, running on Cloud Run.' },
  { slug:'youtube-transcript-fastapi-service', title:'A small transcript service', date:'2026-07-14', href:'https://fde.guru/posts/youtube-transcript-fastapi-service/', cover:'talks-cover.svg', description:'A FastAPI utility for fetching YouTube transcripts in JSON, text, SRT, and WebVTT formats.' },
  { slug:'india-trade-data-plane', title:'Four trade pipelines on GCP', date:'2026-07-08', href:'https://fde.guru/posts/india-trade-data-plane/', cover:'data-cover.svg', description:'Four resumable ingestion pipelines, from raw data through staging to curated BigQuery marts.' },
  { slug:'nic-2008-msme-bigquery-pipeline', title:'A PDF, five BigQuery tables', date:'2026-07-06', href:'https://fde.guru/posts/nic-2008-msme-bigquery-pipeline/', cover:'data-cover.svg', description:'A deterministic parser for a 193-page classification document, with hierarchy checks and source corrections.' }
];
