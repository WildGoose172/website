# WG Website

A monorepo project featuring a Next.js 16 frontend with internationalization support and a Sanity CMS studio for content management.

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS, Shadcn UI
- **CMS**: Sanity v5 with document internationalization
- **Internationalization**: next-intl
- **Package Manager**: pnpm with workspaces
- **Linting/Formatting**: ESLint, Prettier

## Project Structure

```
wg-website/
├── web/                # Next.js frontend application
├── studio/             # Sanity CMS studio
├── .env                # Symlinked env file for both packages
└── package.json        # Root workspace configuration
```

## Getting Started

### Prerequisites

- Node.js 24+
- pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/WildGoose172/website.git
   cd wg-website
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Environment Variables

Create a `.env` file in the root directory and add the variables.
The env file is symlinked to both the `web` and `studio` packages.

### Development

Start both the frontend and studio in development mode:

```bash
pnpm dev
```

This will run both applications concurrently:
- Frontend: http://localhost:3000
- Studio: http://localhost:3333

### Individual Development

Run only the frontend:
```bash
pnpm web:dev
```

Run only the studio:
```bash
pnpm studio:dev
```

## Available Scripts

### Root Scripts
- `pnpm dev` - Start both frontend and studio in development
- `pnpm build` - Build both applications
- `pnpm lint` - Lint all packages
- `pnpm format` - Format code in all packages
- `pnpm typegen` - Generate types for Sanity schemas and next routes
- `pnpm typecheck` - Run TypeScript type checking

### Web Scripts
- `pnpm web:dev` - Start Next.js development server
- `pnpm web:build` - Build Next.js application
- `pnpm web:preview` - Preview built application

### Studio Scripts
- `pnpm studio:dev` - Start Sanity studio development server
- `pnpm studio:build` - Build Sanity studio
- `pnpm studio:deploy` - Deploy Sanity studio to production

## Typegen Support
Sanity schema types are automatically generated and used in both the studio and frontend for type safety.
After making changes to the Sanity schema, cd into the studio folder and run:

```bash
pnpm typegen
```

## Internationalization

The project supports multiple languages with next-intl:
- English (`en`)
- Dutch (`nl`)

Content is managed through Sanity's document internationalization plugin.

## Blocks and Templates
The CMS uses a block-based approach for building pages. Blocks are defined in the Sanity studio and rendered in the frontend.
Templates are used for specific pages that need a predefined structure, such as vacancy or policy pages.
Both blocks and templates can be created by following the steps below.

### How to create new CMS blocks
1. Define a new schema in the `studio/schemaTypes/blocks` file.
2. Add the new block to the page builder schema in `studio/schemaTypes/page-builder`.
3. Run the typegen script at the root of the project or inside the studio folder
4. Add the new block name to the BLOCK_TYPES array in `web/types/blocks`.
5. Create a new React component for the block in `web/components/blocks` following the existing structure.
6. Update the page builder component in `web/components/page-builder` to include the new block component in the switch statement.

### How to create new CMS template (vacancy, policy)
1. Create a new schema in the `studio/schemaTypes` folder.
2. Add the new schema to the schemaTypes array in `studio/schemaTypes/index`.
3. Run the typegen script at the root of the project or inside the studio folder
4. Add the new template name to the TEMPLATE_TYPES array in `web/types/blocks`.
5. Create a new React component for the template in `web/components/templates` following the existing structure.
6. Update the `web/app/[[...slug]]/page.tsx` to include the new template component in the switch statement.

## Deployment

### Frontend
The `web` folder get's automatically deployed via Vercel when pushing to the main branch.

### Studio (Sanity)
Deploy the studio using:
```bash
pnpm studio:deploy
```

## Contributing

1. Follow the existing code style
2. Run `pnpm lint` and `pnpm format` before committing
3. Test changes in both frontend and studio

## License

This project is private and unlicensed.
