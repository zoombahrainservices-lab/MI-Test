# Multiple Intelligence Test Website

A modern, responsive web application built with Next.js, TypeScript, and Tailwind CSS that implements Howard Gardner's Multiple Intelligence Theory assessment.

## Features

- **Comprehensive Assessment**: 24 carefully crafted questions covering all 8 intelligence types
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Real-time Progress**: Visual progress tracking during the test
- **Instant Results**: Immediate personalized results with detailed insights
- **TypeScript**: Full type safety and better development experience
- **Mobile Responsive**: Works perfectly on all device sizes

## Intelligence Types Tested

1. **Linguistic Intelligence** - Word smart
2. **Logical-Mathematical Intelligence** - Number smart  
3. **Spatial Intelligence** - Picture smart
4. **Musical Intelligence** - Music smart
5. **Bodily-Kinesthetic Intelligence** - Body smart
6. **Interpersonal Intelligence** - People smart
7. **Intrapersonal Intelligence** - Self smart
8. **Naturalist Intelligence** - Nature smart

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase database:
   - Follow the instructions in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
   - Create a `.env` file with your Supabase credentials

4. Set up the database:
   ```bash
   npm run db:setup
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Database Commands

- `npm run db:setup` - Complete database setup (generate, push, seed)
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with questions
- `npm run db:studio` - Open Prisma Studio (database GUI)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── TestIntro.tsx
│   │   ├── TestQuestions.tsx
│   │   └── TestResults.tsx
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page component
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.js         # Next.js configuration
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React 18** - Modern React with hooks
- **Prisma** - Modern database ORM
- **Supabase** - PostgreSQL database with real-time features
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
