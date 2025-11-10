# ConfidensAgro - AI Coding Instructions

## Project Overview
**ConfidensAgro** is a Next.js agricultural credit consultation platform for Brazilian rural credit programs (PNCF/PRONAF). It manages farmer eligibility assessment, project documentation, and multi-step agricultural credit applications with complex financial calculations.

## Architecture & Tech Stack
- **Framework**: Next.js 14 with App Router
- **Database**: Supabase (PostgreSQL with RLS)
- **Authentication**: Supabase Auth with middleware session management
- **Styling**: Tailwind CSS + shadcn/ui components
- **Forms**: React Hook Form + Zod validation
- **State**: React useState (no global state management)

## Critical Authentication Pattern
Uses **3-layer Supabase client pattern**:
- `utils/supabase/client.js` - Browser client for client components
- `utils/supabase/server.js` - Server client for server components/actions
- `utils/supabase/middleware.js` - Session refresh in middleware.js

Always use `createClient()` from appropriate file based on context.

## Data Flow Architecture
1. **Server Actions** in `app/*/actions.js` handle all database operations
2. **RLS (Row Level Security)** enforces data isolation by `authuser_id`
3. **Admin users** bypass RLS (defined in `ADMIN_EMAIL` constant)
4. **Form data** flows: Component → Server Action → Supabase → Component state

## Key Business Logic Patterns

### Multi-Step Project Forms
The `/projeto` page uses tab-based navigation with shared state:
```javascript
// Pattern: Each tab component receives data from central state
const renderContent = (tabName) => {
  switch (tabName) {
    case "Pré-análise": 
      return <PreAnaliseTab defaultValues={formData?.aba_preanalise} isAdmin={isAdmin} />;
    // ... other tabs
  }
};
```

### Document Management System
Documents are categorized by type and tracked in `DOCUMENTOS` constant:
- Beneficiário, Técnicos, Vendedor, Imóvel categories
- File upload/download via Supabase Storage
- Status tracking per document ID

### Admin vs Regular User Logic
```javascript
const isAdmin = await isAdminUser(); // Check against ADMIN_EMAIL array
// Admin users can edit all forms, regular users have restrictions
```

## Form Patterns

### Standard Form Component Structure
```javascript
const form = useForm({ defaultValues });
const onSubmit = async (data) => {
  try {
    await serverAction(data); // Always use server actions
  } catch (error) {
    // Handle error with toast
  }
};
```

### Reusable UI Components
- All UI components in `components/ui/` follow shadcn/ui patterns
- Use `FormField` wrapper for consistent form styling
- `Button` component supports loading states with `Loader2` icon

## Development Workflows

### Running the Application
```bash
npm run dev    # Development server on :3000
npm run build  # Production build
npm run start  # Production server
```

### Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Project-Specific Conventions

### File Organization
- **Server Actions**: Always in `app/*/actions.js` files
- **Page Components**: `app/*/page.jsx` (server components by default)
- **UI Components**: `components/ui/` for reusable, `components/[feature]/` for feature-specific
- **Constants**: Centralized in `utils/constants.js`

### Data Fetching Pattern
```javascript
// Server component pattern
export default async function Page() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return redirect("/login");
  
  const data = await getDataServerAction();
  return <ClientComponent data={data} />;
}
```

### Error Handling
- Use `toast` from shadcn/ui for user feedback
- Server actions should throw descriptive errors
- Redirect to `/login` for unauthorized access

## Critical Integration Points

### Supabase RLS Configuration
Tables must have RLS policies filtering by `authuser_id` except for admin users. Admin detection happens in server actions.

### CSS Custom Properties
The app uses CSS variables for theming defined in `app/globals.css`. Tailwind extends these via `tailwind.config.js`.

### Constants Management
All business logic constants (document types, project tabs, municipalities) are centralized in `utils/constants.js` for easy maintenance.

## Common Pitfalls to Avoid
- Don't use client-side Supabase operations for sensitive data
- Always validate `authuser_id` in server actions
- Don't forget `"use server"` directive for server actions
- Use appropriate Supabase client for the context (client/server/middleware)
- Follow the established tab-based state management pattern for complex forms