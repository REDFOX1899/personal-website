# Shantanu Patil — personal website

A minimal personal site for AI and data engineering hiring and collaboration. Configured for static deployment on Vercel at https://shantanu-patil.com.

## Preview

Requires Node.js 18 or newer. No dependencies to install.

```sh
npm run dev
```

Open http://localhost:4173. Stop with Ctrl+C. If the port is occupied, use `PORT=4174 npm run dev`.

## Edit

- `content.js`: introduction, career timeline, links, learning library, and project notes.
- `app.js`: navigation and interactions.
- `styles.css`: layout and responsive styling.
- `assets/Shantanu-Patil-CV.pdf`: downloadable CV.

The introduction has 106 words in three short paragraphs, expanded at the user’s request to reflect the current role and education. Navigation remains five tabs. Artwork animates, while automatic page changes are disabled so readers can scan at their own pace. The original reading tab and `?page=reading` URL contain the learning library. Header and navigation spacing follow the reference at each responsive breakpoint. Writing links to four published build logs on fde.guru; the reading page also links to the full archive. Learning links open the canonical field guides and chapters.

The original local template is preserved in the first Git commit. Personalization and fde.guru links are recorded separately. The Desktop folder is the Git checkout; the Codex outputs folder is a matching deliverable copy.

## Check

```sh
npm run check
```

## Deploy

Live at https://www.shantanu-patil.com/ (the apex domain redirects to `www`). Vercel project: https://vercel.com/redfox1899s-projects/shantanu-personal-website. Fallback address: https://shantanu-personal-website-dun.vercel.app/.

Deployment uses Vercel Drop, without GitHub integration. GitHub remains a private source backup; pushing a commit does not publish it.

For future updates, run `npm run build:drop`, open https://vercel.com/drop, upload the generated `dist/` folder, and choose **Deploy to an existing project instead** → **shantanu-personal-website**. The generated configuration preserves direct article links. Do not create another project for routine updates. The build copies only public website files, assets, and the reference license; local tooling and repository files are excluded.

Domain records stay managed at IONOS: `A @ 216.198.79.1` and `CNAME www 7278eeb76f2d4c9e.vercel-dns-017.com`. The prior IONOS placeholder A/AAAA records were replaced; mail records and nameservers were preserved. Vercel provisions HTTPS automatically. Recheck the targets in the Vercel Domains page before any future DNS change.

## Sources and assets

The design reference is https://www.connorhyatt.com/. Its public repository, https://github.com/hyattc1/connorhyatt.com, contains an older design. Its MIT notice is retained in `REFERENCE-LICENSE.txt`.

The font, video artwork, card texture, and reference photos were obtained from the live reference site for this local prototype. They are separate from the older repository's source; the retained MIT notice does not establish licensing for every live asset. The SVG project covers were created for this site.

Personal copy is based on the user's CVs and project records. Published work and learning resources link directly to https://fde.guru/, https://systemdesign.fde.guru/, and https://thesis.fde.guru/. Employer projects preserve the distinction between production work, prototypes, and work submitted for review. No source CVs, private project records, or credentials are included beyond the selected downloadable CV.

Small university marks in the education text come from the official UMass Amherst brand site and IIT (ISM) Dhanbad website. Career details were updated from the user’s direct clarifications: Power BI for global leadership reporting; Oracle Exadata to AlloyDB and BigQuery; Terraform and Harness; AI-assisted mainframe modernization; and the insurance underwriting agent’s second-place challenge result. The visible design copy omits attribution; the project’s source and license notices remain in place.
